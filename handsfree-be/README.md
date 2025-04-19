## DEX Voice Assistant

### Create Virtual Environment in Visual Studio Code

Refer to https://code.visualstudio.com/docs/python/environments#_creating-environments to create virtual environment in python.

### Activate Virtual Environment

After that, activate virtual environment using terminal command

For MacOS:

```bash
source .venv/bin/activate
```

For Windows with CMD:

```bash
.\venv\Scripts\activate.bat
```

For Windows with Powershell:

```bash
.\venv\Scripts\activate.ps1
```

For Windows with Unix Like Shell (exp: Git Bash CLI):

```bash
source .venv/Scripts/activate
```

### Install Python Packages

Then, install the python packages

```bash
pip install -r requirements.txt
```

### Add Gemini API KEY

In the .env file, add your Gemini API Key

```bash
GEMINI_API_KEY=<<API_KEY>>
```

### Start Flask Application

After all completed, run below command to start the flask application.

```bash
flask run
```
# handsfree-be
