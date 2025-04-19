import os
from lib.logger import logger
import requests

MESOLITICA_TOKEN = os.environ.get("MESOLITICA_TOKEN")
MESOLITICA_API_URL = "https://api.mesolitica.com/audio/transcriptions";

if not MESOLITICA_TOKEN:
    logger.warning("WARNING: MESOLITICA_TOKEN environment variable not set.")

def transcribe_audio(uri: str):
    '''
    Send a POST request to Mesolitica Speech API to transcribe the audio file.
    '''

    with open(uri, "rb") as f:
        file = {"file": f}
        headers = {
            'Authorization': f"Bearer {MESOLITICA_TOKEN}"
        }
        data = {
            'model': 'base',
            'response_format': 'text',
            'language': 'en'
        }

        try:
            res = requests.post(MESOLITICA_API_URL, files=file, data=data, headers=headers)
            res.raise_for_status()  # Raise an exception for HTTP errors (4xx or 5xx)
            return res.json()
        except Exception as e:
            logger.error(f'Error calling Mesolitica API: {str(e)}')


    
