# DAX Voice Assistant - Handsfree Backend

## Create Virtual Environment in Visual Studio Code

Refer to https://code.visualstudio.com/docs/python/environments#_creating-environments to create virtual environment in python.

## Activate Virtual Environment

After that, activate virtual environment using terminal command

For **MacOS**:

```bash
source .venv/bin/activate
```

For **Windows with CMD**:

```bash
.\venv\Scripts\activate.bat
```

For **Windows with Powershell**:

```bash
.\venv\Scripts\activate.ps1
```

For **Windows with Unix Like Shell (exp: Git Bash CLI)**:

```bash
source .venv/Scripts/activate
```

## Install Python Packages

Then, install the python packages

```bash
pip install -r requirements.txt
```

## Environment Variable

Create a **.env** file in root directory, and put below environment variables into it (may refer to the **.env.example** file)

```bash
FLASK_APP=main
GEMINI_API_KEY=<<FILL IN YOUR API_KEY>>
MESOLITICA_TOKEN=<<FILL IN YOUR MESOLITICA TOKEN>>
```

## Start Flask Application

After all completed, run below command to start the flask application.

```bash
flask run
```
