// #########  #########  #########  #########  
// 
// where necessary put each html element in their own div
// 
// #########  #########  #########  #########  

// STEP 1 — Initialize OpenAI
import { openai } from "./config.js";

// STEP 1.3 — Create the OpenAI client instance

// const openAiApi = new OpenAIApi('YOUR_API_KEY');



// STEP 2 — Choose a model for translation
const translationModel = "gpt-3.5-turbo-1106"









document.addEventListener("DOMContentLoaded", () => {
    
    let storedOriginalText = ""
    let storedTranslationText = ""

    const app = document.getElementById("app");

    // -----------------------------
    // PAGE 1 — TRANSLATE VIEW
    // -----------------------------
    function renderTranslateView() {
        app.innerHTML = `
            <section id= "translateView" class="container">
                <header class= "header">
                    <img src="assets/parrot.png" class="logo" alt="PollyGlot Logo">
                    <h1 class="app-title">PollyGlot</h1>
                    <p class="subtitle">Perfect Translation Every Time</p>
                </header>

                <div class="card">

                    <div class="card-translateView">
                        <h2 class="label">Text to translate 👇</h2>
                        <textarea id="inputText" placeholder="How are you?"></textarea>

                        <h2 class="label">Select language 👇</h2>

                        <div class="language-options">
                            <label>
                                    <input type="radio" name="lang" value="french"> French
                                    <img src="assets/fr-flag.png" class="flag-icon">
                            </label>

                            <label>
                                    <input type="radio" name="lang" value="spanish"> Spanish 🇪🇸
                                    <img src="assets/sp-flag.png" class="flag-icon">
                            </label>
                            
                            
                            <label>
                                    <input type="radio" name="lang" value="japanese"> Japanese 🇯🇵
                                    <img src="assets/jpn-flag.png" class="flag-icon">
                            </label>
                        
                        </div>
                        <button id="translateBtn" class="btn-primary">Translate</button>

                    </div>
                </div>
            </section>
        `;

        const inputField = document.getElementById("inputText")
        inputField.value = ""
        const selectedRadio = document.querySelector('input[name="lang"]:checked')
        if (selectedRadio) selectedRadio.checked = false

        document.getElementById("translateBtn").onclick = async() =>{

            // STEP 3 — Gather user inputs
            // 3.1 — Get the text typed by the user
            const userText = document.getElementById("inputText").value

            // 3.2 — Get the selected language (radio button)
            const selectedLanguage = document.querySelector('input[name="lang"]:checked').value
            
            // Disable the Translate Button While Loading
            const translateButton = document.getElementById("translateBtn")
            translateButton.disabled = true
            translateButton.textContent = "Translating..."


            // Validate user inputs
            if (userText.trim() === ""){
                alert("Please enter text to translated")
                return 
            }

            if(!selectedLanguage){
                alert("Please select a language!")
                return
            }

            // STEP 4 — Build the translation prompt
            const translationPrompt = `
                Translate the following text into ${selectedLanguage}.
                You are a polyglot expert translator.
                Provide only the translated text, no explanation.

                Text:
                """ ${userText} """

            `

            // STEP 5 — Call OpenAI to generate translation
            
            let completionResponse

            try{
                completionResponse  = await openai.chat.completions.create({
                model: translationModel,
                messages: [
                    { role: "system", content: "You are an expert translator." },
                    { role: "user",   content: translationPrompt }
                ],
                temperature: 0.2,
                max_tokens: 200 
            })
            }
            catch(error){
                alert("Translation failed. Please try again later.")
                console.error(error)

                // Re-enable the button on failure
                translateButton.disabled = false
                translateButton.textContent = "Translate"
                return
            }
            


            // STEP 6 — Display translation results

            // 6.1 — Extract translation text from response
            const translatedText = completionResponse.choices[0].message.content


            // // 6.2 — Show original text in result textarea
            

            storedOriginalText  = userText


            // // 6.3 — Show translated text in translation textarea
            storedTranslationText  = translatedText
            
            translateButton.disabled = false
            translateButton.textContent = "Translate"


            // 6.4 — Switch to result view
            renderResultView()

        }
    }

    // -----------------------------
    // PAGE 2 — RESULT VIEW
    // -----------------------------
    function renderResultView() {
        app.innerHTML = `
            <section id="resultView" class="container">
                <header class="header">
                    <img src="assets/parrot.png" class="logo" alt="PollyGlot Logo">
                    <h1 class="app-title">PollyGlot</h1>
                    <p class="subtitle">Perfect Translation Every Time</p>
                </header>

                <div class="card">
                    <h2 class="label">Original text 👇</h2>
                    <textarea id="originalDisplay" disabled></textarea>

                    <h2 class="label">Your translation 👇</h2>
                    <textarea id="translatedDisplay" disabled></textarea>

                    <button id="startOverBtn" class="btn-primary">Start Over</button>
                </div>
            </section>
        `;

        // originalDisplayField
        // translatedDisplayField
            
        // 6.2 — Show original text in result textarea
        const originalDisplayField = document.getElementById("originalDisplay") 
        // 6.3 — Show translated text in translation textarea
        const translatedDisplayField = document.getElementById("translatedDisplay")
        
        originalDisplayField.value = storedOriginalText
        translatedDisplayField.value = storedTranslationText
        document.getElementById("startOverBtn").onclick = () => {
            

            // STEP 7 — Reset when user clicks Start Over
            // 7.1 — Clear original text input
            storedOriginalText = ""

            // 7.2 — Clear translated text
            storedTranslationText = ""

            // 7.3 — Return to the main translation screen
            renderTranslateView()
        }
    }

    // -----------------------------
    // PAGE 3 — CHAT VIEW
    // -----------------------------
    function renderChatView() {
        app.innerHTML = `
            <section id="chatView" class="container">
                <header class="header">
                    <img src="assets/parrot.png" class="logo" alt="PollyGlot Logo">
                    <h1 class="app-title">PollyGlot</h1>
                    <p class="subtitle">Perfect Translation Every Time</p>
                </header>

                <div class="card">
                    <div class="instructions-box">
                        Select the language you want me to translate into, type your text and hit send!
                    </div>

                    <!-- Green bubble (your original text) -->
                    <div id="chatOriginalBubble" class="bubble bubble-user">How are you?</div>

                    <!-- Blue bubble (model output) -->
                    <div id="chatTranslationBubble" class="bubble bubble-bot">Comment allez-vous?</div>

                    <!-- Input bar + send button -->
                    <div class="chat-input-row">
                        <input id="chatInput" placeholder="Type your message…">
                        <button id="sendBtn" class="send-btn">➤</button>
                    </div>

                    <!-- Language buttons -->
                    <div class="chat-language-row">
                        <button class="lang-btn" data-lang="french">🇫🇷</button>
                        <button class="lang-btn" data-lang="spanish">🇪🇸</button>
                        <button class="lang-btn" data-lang="japanese">🇯🇵</button>
                    </div>
                    <div class="chat-input-row">
                        <input id="chatInput">
                        <button id="sendBtn" class="send-btn">➤</button>
                    </div>
                </div>
            </section>
        `;

        document.getElementById("sendBtn").onclick = () => renderTranslateView();
    }

    // Start the app:
    renderTranslateView();

});
