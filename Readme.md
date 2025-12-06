# 🌍 PollyGlot

### AI-Powered Language Translator with Real-Time Results

### 🔗 Live App URL: https://polyglot-ai-translation-app.netlify.app/

### Tech Stack: 
JavaScript 
- OpenAI API 
- HTML 
-  CSS


*PollyGlot* is a clean, mobile-friendly translator web app powered by OpenAI.
It allows you to input text, choose a language, and receive a polished translation—all without page reloads.

It was built as part of the Scrimba Solo Project: PollyGlot, using  `JavaScript`, modern `CSS`, and the `OpenAI SDK`.

## Features

- ✔️ Translate text instantly using OpenAI
-  ✔️ Simple UI with two screens: Translate View & Result View
-  ✔️ Loading state while fetching translation
-  ✔️ Input validation & error handling
-  ✔️ Flags & emoji-enhanced UI
-  ✔️ Clean, mobile-friendly responsive design
-  ✔️ Ability to reset and translate again



## Tech Stack

| Category   | Tool                                   |
| ---------- | -------------------------------------- |
| Front-End  | HTML, CSS, JavaScript (ES Modules)     |
| API        | OpenAI Chat Completions                |
| Model      | `gpt-3.5-turbo-1106`                   |
| Deployment | Works in browser (no backend required) |





## 📦 Setup & Installation

Clone or download the project.

Create a config.js file containing your OpenAI client:

``` bash
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
```


### ⚠ Note: dangerouslyAllowBrowser is used only for learning/demo purposes.

Production apps should hide `API keys` on a backend server!

Run the project using Live Server or any static hosting.

## 🧠 What I Learned

### 📌 While building PollyGlot, I gained deeper experience with:

### 🔸 Working with the OpenAI JavaScript SDK

- Calling `openai.chat.completions.create()`

- Passing system instructions for better translations

- Controlling outputs using `temperature` and `max_tokens`

- Extracting `.choices[0].message.content`

### 🔸 Prompt Engineering for Translation

- Explicitly instructing the model:

- -  Specify the language

- - Only return translated text

- - Act as a polyglot expert translator

### 🔸 Front-End Design Concepts

- Responsive UI layout

- Consistent card components across screens

- Semantic spacing and button states

- Icons/flags for better usability

### 🔸 App Flow & State Management

- Passing data between views without reloading

- Using stored variables (`storedOriginalText`, `storedTranslationText`)

- Safely resetting the app view

- UI loading states (`Translate → Translating…`)

### 🔸 Error Handling & Validation

- Blocking empty inputs

- Failing gracefully if API request fails




### 🌟 Future Enhancements (Optional)

- 🔹 Add more languages
- 🔹 Add speech synthesis
- 🔹 Save translation history
- 🔹 Support automatic language detection




