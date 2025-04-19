from database.database import db, Chat, multiple_chat_schema
import time

def get_chat_data():
    """API endpoint to get all chat data."""
    all_chat_records = Chat.query.all()
    result = multiple_chat_schema.dump(all_chat_records)
    return result

def add_chat_data(message: str, sender: str) -> None:
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
        db.session.rollback()