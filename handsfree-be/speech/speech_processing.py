import speech_recognition as sr
from pydub import AudioSegment
import tempfile
import io
import base64
import os
from lib.logger import logger
from speech.noise_reduction import noise_reduction

# Initialize speech recognizer
recognizer = sr.Recognizer()

def perform_speech_to_text(client_id, client_buffer):
    """
    Perform speech-to-text on the complete audio buffer for a client.
    """

    try:
        temp_filename = combine_audio(client_buffer)
        noise_reduction(temp_filename, client_id)

        # Perform speech recognition
        with sr.AudioFile(f"enhanced_{client_id}.wav") as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)

        # Clean up the temporary file
        os.unlink(temp_filename)
        return text
        
    except sr.UnknownValueError:
        # logger.info("Speech recognition could not understand audio")
        return;
    except sr.RequestError as e:
        logger.error(f"Could not request results from Google Speech Recognition service: {e}")
    except Exception as e:
        logger.error(f"Error in speech-to-text processing: {str(e)}")


def combine_audio(client_buffer: dict) -> str:
    """
    Combine multiple audio buffers into one and temporary save it.
    Returns the temporary file's name
    """

    combined_audio = None
        
    for chunk in client_buffer['buffer']:
        # Decode and convert each chunk
        audio_segment = decode_audio_format(
            chunk
        )
        
        if combined_audio is None:
            combined_audio = audio_segment
        else:
            combined_audio += audio_segment
    
    # Export combined audio to a temporary WAV file (speech_recognition requires a file)
    with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as temp_file:
        temp_filename = temp_file.name
        combined_audio.export(temp_filename, format="wav")
    
    return temp_filename

def decode_audio_format(base64_audio):
    """
    Decode base64 audio data and convert it to the proper format for speech recognition.
    Returns an AudioSegment object.
    """

    # Decode base64 to binary
    audio_data = base64.b64decode(base64_audio)
    
    # Create an in-memory file-like object
    audio_io = io.BytesIO(audio_data)
    audio_segment = AudioSegment.from_raw(audio_io, sample_rate=44100, sample_width=2, frame_rate=44100, channels=1)
    return audio_segment
