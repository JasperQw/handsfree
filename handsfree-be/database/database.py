
import time
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# Initialize extensions WITHOUT the app object yet
db = SQLAlchemy()
ma = Marshmallow()

# --- Database Model ---
class Chat(db.Model):
    __tablename__ = "chat"
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String)
    message = db.Column(db.String)
    timestamp = db.Column(db.Float)

    def __init__(self, sender, message, timestamp) -> None:
        super(Chat, self).__init__()
        self.sender = sender
        self.message = message
        self.timestamp = timestamp

    def __repr__(self) -> str:
        return f'<Chat id={self.id} sender={self.sender}>'

# --- Marshmallow Schema ---
class ChatSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('id', 'sender', 'message', 'timestamp')

# Create instances of the schema
single_chat_schema = ChatSchema()
multiple_chat_schema = ChatSchema(many=True)

def create_mock_data():
    messages = [
        Chat(
        sender="Passenger",
        message="Hi, are you on your way?",
        timestamp=1744214998.6916249
        ),
        Chat(
        sender="Driver",
        message="Yes, I'm about 20 minutes away.",
        timestamp=1744215094.1306822
        ),
        Chat(
        sender="Passenger",
        message="Okay, great. I'm waiting near the main entrance.",
        timestamp=1744215482.343916
        ),
        Chat(
        sender="Driver",
        message="Got it. See you in a bit.",
        timestamp=1744215495.177994
        )
    ]
    db.session.add_all(messages)
    try:
        db.session.commit()
    except Exception as e:
        print(f"Error committing messages: {e}")
        db.session.rollback() # Rollback on error

# --- Database Action Function ---
def add_chat_data(message: str, sender: str):
    """Adds a chat message to the database session."""
    chat = Chat(
        sender=sender,
        message=message,
        timestamp=time.time()
    )
    db.session.add(chat)
    
    try:
        db.session.commit()
        print(f"Committed chat from {sender}")
    except Exception as e:
        print(f"Error committing chat: {e}")
        db.session.rollback() # Rollback on error

def get_all_chats():
    """Queries all chat messages from the database."""
    return Chat.query.all()