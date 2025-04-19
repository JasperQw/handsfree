# main.py
import json
import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from agent.agent import run_agent_query
from database.database import create_mock_data, db, ma
from database.db_actions import add_chat_data, get_chat_data
from lib.helpers import convert_language_abbr, isJson
from websocket.websocket import socketio
import warnings

load_dotenv()

warnings.simplefilter("ignore", UserWarning)
# --- Basic Flask App Setup ---
basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)

# Configure the database URI
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, 'database/app.db')

# --- Initialize extensions with the Flask app ---
db.init_app(app)
ma.init_app(app)
socketio.init_app(app)

# --- Create Database Tables ---
with app.app_context():
    print("Creating database tables if they don't exist...")
    db.drop_all()
    db.create_all()
    create_mock_data()
    print("Database tables checked/created.")

# --- Flask Routes ---
@app.route('/')
def hello():
    return "Hello, World"

@app.route('/agent', methods=["POST"])
def call_agent():
    text = language = None
    
    try:
        text = request.json['text']
    except:
        return jsonify({"error": "Please provide the prompt!"}), 500

    try:
        language = request.json['language']
        if language not in ['ms', "en", "ta", "zh-CN", "ja", "ko"]:
            language = "en"
    except:
        language = "en"

    result = run_agent_query(f"{text} (Ignore and don't reply to this remark if the task given by the user is not sending message: My preference language is {convert_language_abbr(language)})")

    if (result == "chat" or result == "map"):
        return jsonify({"text": result, "isAction": True, "action": "change_tabs"})
    elif result == "call" or result == "accept_call" or result == "reject_call":
        return jsonify({"text": result, "isAction": True, "action": "phone_call"})
    elif result == "emergency" or result == "continue_sos" or result == "cancel_sos":
        return jsonify({"text": result, "isAction": True, "action": "emergency_call"})
    elif result == "route_clarification":
        return jsonify({"text": result, "isAction": True, "action": "route_clarification"})
    elif result == "current_order_details" or result == "accept_order" or result == "reject_order":
        return jsonify({"text": result, "isAction": True, "action": "order"})
    elif isJson(result):
        jsonData = json.loads(result)
        if ("isTranslated" in jsonData.keys()):
            return jsonify({"text": jsonData["text"], "language": jsonData['language'], "isAction": False})
        return jsonify({"text": result, "isAction": True, "action": "incoming_order_details"})
    elif result == "read_passenger_chat" or result == "read_message":
        return jsonify({"text": result, "isAction": True, "action": "read_passenger_chat"})

    translate_result = run_agent_query(f"Translate the following text into {convert_language_abbr(language)} (Just perform the translation, don't say anything else, even if the text cannot translate or no need to be translated): '{result}'")

    if isJson(translate_result):
        translated_result_json = json.loads(translate_result)
        return jsonify({"text": translated_result_json['text'], "language": translated_result_json['language'], "isAction": False})
    else:
        return jsonify({"text": translate_result, "language": language, "isAction": False})

@app.route('/translate', methods=["POST"])
def translate_text():
    text = language = None
    
    try:
        text = request.json['text']
    except:
        return jsonify({"error": "Please provide the text!"}), 500

    try:
        language = request.json['language']
        if language not in ['ms', "en", "ta", "zh-CN", "ja", "ko"]:
            language = "en"
    except:
        language = "en"

    translate_result = run_agent_query(f"Translate the following text into {convert_language_abbr(language)}: '{text}'")
    return jsonify({"text": translate_result, "language": language})

@app.route('/summarise-translate', methods=["POST"])
def summarise_and_translate_messages():
    try:
        text = request.json['text']
    except:
        return jsonify({"error": "Please provide the text!"}), 500

    try:
        language = request.json['language']
        if language not in ['ms', "en", "ta", "-CN", "ja", "ko"]:
            language = "en"
    except:
        language = "en"

    summarized_and_translated_message = run_agent_query(f"Summarize and translate the messages in the list into {convert_language_abbr(language)}: '{text}'")
    return jsonify({"text": summarized_and_translated_message, "language": language})



@app.route('/messages')
def get_chat_data_route():
    """API endpoint to get all chat data."""
    try:
        chats = get_chat_data()
        return jsonify(chats)
    except Exception as e:
        print(f"Error retrieving chat data: {e}")
        return jsonify({"error": "Could not retrieve message data"}), 500

@app.route('/passenger/message/send', methods=["POST"])
def passenger_send_message():
    message = None
    
    try:
        message = request.json['message']
    except:
        return jsonify({"error": "Please provide the message!"}), 500
    add_chat_data(message, "Passenger")
    return jsonify(success=True)

# --- Run the App ---
if __name__ == '__main__':
    socketio.run(app, debug=False, host='127.0.0.1', port=5000, log_output=False)