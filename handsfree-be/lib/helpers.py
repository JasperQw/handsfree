import json

def convert_language_abbr(abbr: str) -> str:
    if abbr == 'ms':
        return "Malay"
    elif abbr == 'en':
        return "English"
    elif abbr == 'ta':
        return "Tamil"
    elif abbr == 'zh-CN':
        return "Simplified Chinese"
    elif abbr == 'ja':
        return "Japanese"
    elif abbr == 'kr':
        return "Korea"
    else:
        return "English"
    
def isJson(string: str) -> bool:
    try: 
        json.loads(string)
        return True
    except:
        return False