# DAX Voice Assistant - Handsfree Model Evaluation

Evaluating the **Mesolitica** Speech Recognition model.

## Project Structures

| Folder          |Content                                                                                              |
|----------------------|---------------------------------------------------------------------------------------------------------|
|  **dataset**     | Containing the audio dataset for Speech Recognition model evaluation  |

## Dataset Introduction
Read random sentences from IIUM Confession.

Coice by [Husein Zolkepli](https://www.linkedin.com/in/husein-zolkepli/) and [Shafiqah Idayu](https://www.facebook.com/shafiqah.ayu).

Heavily speaking in Selangor dialect.

Recorded using low-end tech microphone.

## Installation Guides
### 1. Environment Variable

Create a **.env** file in root directory, and put below environment variables into it (may refer to the **.env.example** file)

```bash
MESOLITICA_TOKEN=<<FILL IN YOUR MESOLITICA TOKEN>>
```

## Evaluation Result
| Metrics          |Average Result                                                                                              |
|----------------------|---------------------------------------------------------------------------------------------------------|
|  **WER (Word Error Rate)**     | 11.625%  |
|  **MER (Match Error Rate)**     | 10.625%  |
|  **CER (Character Error Rate)**     | 11.625%  |
|  **WIL (Word Information Loss)**     | 11.625%  |
|  **WIP (Word Information Preserved)**     | 84.398%  |
