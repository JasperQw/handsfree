import json
import time
from smolagents import tool

from database.database import Chat, db

@tool
def send_message(message: str) -> str:
    """
    This is a tool to send text message to another user, need to be called when user want to send message to another user.
    When using this tools, make sure the message to be sent is polite.
    If preference language is provided, send the message to another user with the language.
    Only send message when user tell you to do so! (Like user ask you to send message, tell passenger something, let passenger know something, etc.) 

    Args:
        message: The plain text message send by the user. This must be a text only message without any formatting such as JSON.
    """
    chat = Chat(
        sender="Driver",
        message=message,
        timestamp=time.time()
    )
    db.session.add(chat)
    try:
        db.session.commit()
        return "I have sent the message to the passenger."
    except Exception as e:
        print(f"Error committing chat: {e}")
        db.session.rollback()
        return "Sorry, I can't send the message at the moment, please try again later."

@tool
def no_tools_to_use(message: str) -> str:
    """
    This is a tool that return default message to user when no tools is suitable for the user's instruction.
    Don't ask the user do anything, and don't tell the user what you will do.
    Only use this tool when user is not asking to perform any task!

    Args:
        message: The message to be sent to the user to because of unable to complete the instruction
    """
    return message

@tool
def get_incoming_order_details_as_json_string() -> str:
    """
    This is a tool that return incoming order's details in JSON format, ignore the language preference in prompt.
    Only use this tool when user is asking you to provide the incoming order details!
    Directly return the data to user as final answer, don't do translation.
    """
    return json.dumps({
        "name": "John Cena",
        "pickUpLocation": "Restaurant Nasi Kandar, Resident Kerinchi",
        "pickUpAddress": "12, Taman Bahagia 3, 81300 Skudai, Johor.",
        "dropOffLocation": " Kolej Kediaman Ketujuh, Universiti Malaya",
        "dropOffAddress": "12, Taman Kecewa 3, 81300 Skudai, Johor.",
        "phone": "+6012345678",
        "paymentAmmount": "RM 12.00",
        "paymentMethod": "cash"
    })

@tool
def get_current_order_details() -> str:
    """
    This is a tool that return a message to tell frontend to get a current order details.
    Only use this tool when user is asking you to provide the current order details!
    Directly return the text "current_order_details" to user as final answer, don't do translation.
    """
    return "current_order_details"

@tool
def accept_or_reject_order(choice: str) -> str:
    """
    This is a tool that return a message to tell frontend to accept or reject the order.
    Directly return the "choice" parameter to user, don't do translation.

    Args:
        choice: The choice of the user to accept or reject order, only "accept_order" and "reject_order" is allowed
    """
    return choice
    

@tool
def accept_or_reject_call(choice: str) -> str:
    """
    This is a tool that return a message to tell frontend to accept or reject the call.
    Directly return the "choice" parameter to user, don't do translation.

    Args:
        choice: The choice of the user to accept or reject call, only "accept_call" and "reject_call" is allowed
    """
    return choice

@tool
def traffic_highlight() -> str:
    """
    This is a tool that returns a the traffic or road highlight message to the user.
    """

    return "Heavy rain is causing traffic delays, reduced visibility, and waterlogging in some areas. Please proceed cautiously and consider alternate routes if available. Stay safe!"

@tool
def open_tabs(tab: str) -> str:
    """
    This is a tool that return a message to tell frontend to open a specific tabs.
    Directly return the tab parameter to user, don't do translation.

    Args:
        tab: The tab that frontend need to open, only "chat" and "map" is allowed
    """
    return tab

@tool
def phone_call() -> str:
    """
    This is a tool that return a message to tell frontend make a phone call.
    Only use this tool when users want to call someone.
    Directly return the string "call" to user, don't do translation.
    """
    return "call"

@tool
def continue_or_cancel_sos(choice: str) -> str:
    """
    This is a tool that return a message to tell frontend to continue or cancel sos.
    Only use this tool when users tell you to continue or cancel (with or without any context).
    Directly return the choice parameter to user, don't do translation.

    Args:
        choice: The choice of the user to be sent to frontend, only "continue_sos" and "cancel_sos" is allowed.
    """
    return choice

@tool
def call_emergency() -> str:
    """
    This is a tool that return a message to tell frontend to make emergency call, this tool will be used when user want to make emergency call.
    Only use this tool when user ask you to make emergency call!
    Directly return the string "emergency" to user, don't do translation.
    """
    return "emergency"

@tool
def precaution_steps(steps: str) -> str:
    """
    This is a tool that return a message to tell user what to do when in an emergency situation, use this tool only when user provided an emergency situation.
    Don't provide the steps in list, return in sentences.

    Args:
        steps: The steps to deal with the emergency situation.
    """
    return steps

@tool
def route_clarification() -> str:
    """
    This is a tool that return a message to tell frontend to clarify the route.
    Only use this tool when user ask to clarify the route or user want to know the route.
    """
    return "route_clarification"

@tool
def translate_answer(translated_answer: str, language: str) -> str:
    """
    This is a tool that return a translated final answer to the user.
    Translate and return the answer depends on user's language preference, use English as default.
    Only return the translated words into "text" field in the JSON only! Don't add any description!
    The language of "translated_answer" argument and must match with the IETF language tag in "language" argument.

    Args:
        translated_answer: The translated answer to be sent to the user depends on user's language preference, use English as default.
        language: The language of the translated answer, only the code of IETF language tag is allowed. For example: "en" for English, "ms" for Malay, "zh-CN" for Chinese, "ta" for Tamil, "ko" for Korean, "ja" for Japanese.
    """
    return json.dumps({
        "text": translated_answer,
        "isTranslated": True,
        "language": language
    })

@tool
def read_passenger_chat() -> str:
    """
    This is a tool that return a message to tell frontend to read passenger messages that are sent through the chat
    Only use this tool when user ask to read out the passenger chat messages.
    Directly return the string "read_passenger_chat" to user, don't do translation
    """
    return "read_passenger_chat"

@tool
def summarise_message(summarized_messages: str) -> str:
    """
    This is a tool that summarize a list of messages and return a summarized message to the user.
    Assuming the messages is sent by the passenger, use "The passenger said ..." to start.
    You are helping me to summarize the message, so you should address me as "you" instead of anything else.

    Args:
        summarized_messages: The summarize message.
    """
    return summarized_messages