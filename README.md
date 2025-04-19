# 🤖 DAX AI Assistant – Handsfree
DAX AI Assistant is a voice-activated, hands-free system designed to enhance road safety and convenience for e-hailing and delivery drivers in Malaysia.

## 📂 Project Structures

| 📁 Folder          |✨ Content                                                                                              |
|----------------------|---------------------------------------------------------------------------------------------------------|
|  **handsfree-be**     | Containing backend application & installation guides  |
|  **handsfree-fe**     | Containing frontend application & installation guides |
|  **handsfree-eval**   | Containing jupyter notebook for machine learning model evaluation |


## 📚 Project Resources

| 🔗 Resource          |🌐 Link                                                                                                 |
|----------------------|---------------------------------------------------------------------------------------------------------|
| 🧠 Pitch Deck     | [View on Canva](https://www.canva.com/design/DAGkZAjYwKw/5Xs-gyU3BhZAZKuO0wrJCQ/view?utm_content=DAGkZAjYwKw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he82ba88cc3) |
| 📃 Documentation     | [View on Google Document](https://docs.google.com/document/d/1TX2a6lx0_AFkOTKpydGjF57h4HRl_6X5cUk275dIC6g/edit?tab=t.0) |
| 🎨 Figma Prototype   | [View on Figma](https://www.figma.com/design/iMYYMaCDqtL5fQEn8U7n9C/UM-Hackathon?node-id=0-1&t=SDS0En4heBDCH6Sb-1) |


## 🧩 Key Functionalities
All functionalities are hands-free!
| 📦 Module                        | 🛠️ Prime Function                                                                 |
|----------------------------------|------------------------------------------------------------------------------------|
| 📢 Trip Initiation       | <ul> <li>Accept / reject incoming orders</li> <li>Screen navigation</li> <li>Read order details (current / incoming)</li> <li> Get latest message updates from the passenger chat </li> <li>Send messages to passenger </li> </ul>        |
| 🌐 In-Ride Communication   | <ul> <li>Translates conversations between driver and passenger on the fly via voice </li> <ul>        |
| 📞 On Demand Communication         |  <ul> <li> Initiates calls to customer</li> <li> Initiates calls to emergency contacts</li> <ul>          |
| 🌧️ Navigation Support         | <ul> <li> Route clarification with a summary of current route</li> <li> Real-time updates on traffic conditions   </li> <li> Immediate guidance in flood situation   </li> </ul>                    |
| 🚨 Incident Response | <ul> <li> Shaking-triggered SOS alert</li> <li> Continue / cancel SOS alert</li> <ul>              |


## 🧑‍💻 User Interaction Scenario
- Drivers trigger actions via wake word and voice commands.

- Assistant reads aloud order details and messages.
  
- Multilingual translation happens in real time during conversation.

- Drivers call customers or trigger SOS alerts hands-free.

- Weather navigation support and general driving advice is voice-initiated.


## 🏗️ Solution Architecture
<img width="731" alt="image" src="https://github.com/user-attachments/assets/e7757697-2dc0-4f7c-9921-d4454989e146" />


- **Frontend**: React Native + TypeScript

- **Backend**: Python + Flask

- **AI Agent**: SmolAgents + Gemini 
  
- **Noise Reduction**: DeepFilterNet 3

- **Speech Recognition**: 
   1) **Mesolitica** - Speech-to-Text (STT) model for Malaysian dialects
   2) **Google Speech Recognition** - For wake word detection


## 📊 Data Utilization
- No custom training — using pre-trained machine learning models

- Mesolitica for STT in Manglish and Malay

- Gemini for accurate, low-hallucination multilingual translation

- DeepFilterNet 3 for noise reduction


## 🎯 Personalization Strategies
🗣️ Language Customization: Supports Malaysian English, Bahasa, Mandarin, Tamil

👨‍👩‍👧‍👦 Emergency Contact Setup: Voice or manual addition for SOS feature

🔇 HEX AI Toggle: Enable or disable voice assistant with a button


