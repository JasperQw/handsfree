# DAX Voice Assistant - Handsfree Frontend

## Project Structures

| Folder          |Content                                                                                              |
|----------------------|---------------------------------------------------------------------------------------------------------|
|  **app**     | Containing the screen files for file-based routing  |
|  **common**     | Containing the codes shared across different modules   |
|  **modules**     | Containing the codes for different modules   |

## Common File Structures

| Folder          |Content                                                                                              |
|----------------------|---------------------------------------------------------------------------------------------------------|
|  **api**     | Containing API calling functions  |
|  **components**     | Containing reusable UI components   |
|  **constants**     | Containing the reusable constant values   |
|  **data**     | Containing mock data   |
|  **hooks**     | Containing custom React Hooks   |
|  **stores**     | Containing the codes for Zustand store   |
|  **types**     | Containing Typescripts types   |
|  **utils**     | Containing the utilities functions   |

## Modules

| Folder          |Content                                                                                              |
|----------------------|---------------------------------------------------------------------------------------------------------|
|  **driver**     | Containing codes for driver-related implementations  |
|  **sos**     | Containing codes for SOS-related implementations   |
|  **voice-assistant**     | Containing codes for the implementations of voice assistant|
|  **websocket**     | Containing codes to handle the Web Socket connections, events emitting and events listening   |
|  **home**     | Containing UI components for Home page   |

## Installation Guides
### 1. Install Dependencies

```bash
npm install
```

### 2. Connect to Your Android Real Devices
Plug your android device with your laptop using a cable

### 3. Expose Backend Port to Android Device Port

```bash
adb reverse tcp:5000 tcp:5000
```

### 4. Start the Backend Application

Refer to the [installation guides](https://github.com/JasperQw/handsfree/blob/main/handsfree-be/README.md) here

### 5. Start the app

```bash
npx expo run:android
```
