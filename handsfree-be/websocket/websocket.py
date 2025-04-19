from flask_socketio import SocketIO, emit, join_room, leave_room
from flask import request
from lib.logger import logger
from speech.speech_processing import perform_speech_to_text
from speech.mesolitica_transcribe import transcribe_audio

socketio = SocketIO()

# Structure: {client_id: {'buffer': [audio_chunks]}}
audio_buffers = {}

# Structure: {client_id: {'is_listening': boolean}}
listening_wake_word = {}

# Structure: {client_id: {'text': str, 'count': number}}
instruction_text = {}

@socketio.on('connect')
def handle_connect():
    """Handle client connection."""
    client_id = request.sid
    join_room(client_id)
    audio_buffers[client_id] = {
        'buffer': [],
    }
    listening_wake_word[client_id] = {
        'is_listening': True
    }
    instruction_text[client_id] = {
        'text': '',
        'count': 0
    }
    logger.info(f"Client connected: {client_id}")

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection."""
    client_id = request.sid
    leave_room(client_id)
    if client_id in audio_buffers:
        del audio_buffers[client_id]
    if client_id in listening_wake_word:
        del listening_wake_word[client_id]
    if client_id in instruction_text:
        del instruction_text[client_id]
    logger.info(f"Client disconnected: {client_id}")

@socketio.on('instruction_listening')
def handle_instruction_listening(data):
    """
    Handle incoming audio chunks for instruction.
    
    Expected data format:
    {
        'audio_data': base64_encoded_audio_data
    }
    """
    client_id = request.sid
    client_buffer = audio_buffers.get(client_id)
    client_listening_wake_word = listening_wake_word.get(client_id)
    client_instruction = instruction_text.get(client_id)

    try:
        if client_listening_wake_word['is_listening'] == True or client_listening_wake_word['is_listening'] == None:
            client_instruction['text'] = ""
            client_instruction['count'] = 0
            return

        client_buffer['buffer'].append(data['audio_data'])
        client_instruction = instruction_text.get(client_id)
        text = perform_speech_to_text(client_id, client_buffer)
        if client_instruction['count'] >= 2:
            if client_instruction['text'] is None or client_instruction['text'].strip() == "":
                emit("driver_final_text", {"text": "", "isValid": False}, to=client_id)
            else:
                transcribed_text = transcribe_audio(f"enhanced_{client_id}.wav")
                emit(f"driver_final_text", {"text": transcribed_text, "isValid": True}, to=client_id)
            client_buffer['buffer'] = []
            client_listening_wake_word['is_listening'] = None
            client_instruction['text'] = ""
            client_instruction['count'] = 0
        elif client_instruction['text'] == text:
            client_instruction['count'] += 1
        elif client_instruction['text'] != text:
            emit("driver_text", {"text": text}, to=client_id)
            client_instruction['text'] = text
            client_instruction['count'] = 0
        
    except Exception as e:
        logger.error(f"Error processing instruction audio chunk: {str(e)}")

@socketio.on('wake_word_listening')
def handle_wake_word_listening(data):
    """
    Handle incoming audio chunks for wake word.
    
    Expected data format:
    {
        'audio_data': base64_encoded_audio_data
    }
    """
    client_id = request.sid
    client_buffer = audio_buffers.get(client_id)
    client_listening_wake_word = listening_wake_word.get(client_id)
    
    try:
        if client_listening_wake_word['is_listening'] == False or client_listening_wake_word['is_listening'] == None:
            return;

        client_buffer['buffer'].append(data['audio_data'])

        if len(client_buffer['buffer']) > 6:
            client_buffer['buffer'].pop(0)
        text = perform_speech_to_text(client_id, client_buffer)

        if text is not None:
            if "hey alex" in text.lower():
                client_buffer['buffer'] = []
                if (client_listening_wake_word['is_listening'] == False):
                    return
                client_listening_wake_word['is_listening'] = False
                emit('voice_assistant_wake_up', to=client_id)
        
    except Exception as e:
        logger.error(f"Error processing audio chunk: {str(e)}")

@socketio.on("start_listen_wake_word")
def start_listen_wake_word():
    client_id = request.sid
    client_listening_wake_word = listening_wake_word.get(client_id)
    client_listening_wake_word['is_listening'] = True