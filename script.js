const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('userInput');

// List of jokes
const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why don't skeletons fight each other? They don't have the guts.",
    "What do you get when you cross a snowman and a vampire? Frostbite.",
    "Why did the bicycle fall over? Because it was two-tired!"
];

// Function to send a message
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        appendMessage(userMessage, 'user-message');
        userInput.value = '';
        processCommand(userMessage);
    }
}

// Function to append a message to the chat box
function appendMessage(text, className) {
    const message = document.createElement('div');
    message.className = `message ${className}`;
    message.textContent = text;
    messagesContainer.appendChild(message);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to process user commands
function processCommand(command) {
    let response = "I'm sorry, I don't understand.";
    command = command.toLowerCase();

    if (command.includes('open google')) {
        response = 'Opening Google...';
        window.open('https://www.google.com', '_blank');
    } else if (command.includes('open youtube')) {
        response = 'Opening YouTube...';
        window.open('https://www.youtube.com', '_blank');
    } else if (command.includes('open gmail')) {
        response = 'Opening Gmail...';
        window.open('https://mail.google.com', '_blank');
    } else if (command.includes('open maps')) {
        response = 'Opening Google Maps...';
        window.open('https://maps.google.com', '_blank');
    } else if (command.includes('open whatsapp')) {
        response = 'Opening WhatsApp...';
        // Implementation of opening WhatsApp or any local application would require a server-side implementation or specific configurations not possible through plain JavaScript due to security reasons.
    } else if (command.includes('who makes you')) {
        response = 'I am a Advanced Virtual Assistant made by Sir SUDIP. I can perform like chatgpt and also like Bixby or Siri.I am here to help you. What can I do for you?';
    } else if (command.includes('hi') || command.includes('hello')) {
        response = 'Hi there!';
    } else if (command.includes('good morning')) {
        response = 'Good morning! How can I assist you today?';
    } 
    
    else if (command.includes('good evening')) {
        response = 'Good evening! How can I assist you today?';
    } else if (command.includes('good night')) {
        response = 'Good night! Have a restful sleep!';
    } else if (command.includes('goodbye')) {
        response = 'Goodbye! Have a great day!';
    } else if (command.includes('is there anybody')) {
        response = 'Yes, I am here to help you!';
    } else if (command.includes('which language are used to make you')) {
        response = 'I am built using HTML, CSS, and JavaScript.';
    } else if (command.includes('what is the date')) {
        response = `Today's date is ${new Date().toLocaleDateString()}.`;
    } else if (command.includes('what is the time')) {
        response = `The current time is ${new Date().toLocaleTimeString()}.`;
    } else if (command.includes('say a joke')) {
        response = jokes[Math.floor(Math.random() * jokes.length)];
    } else if (command.includes('sing')) {
        response = 'La la la... I love to sing!';
    } else if (command.includes('open anything')) {
        response = 'What do you want me to open?';
    } else {
        response = 'Ok. I think this is the answer that you want';
        window.open(`https://www.google.com/search?q=${command}`, '_blank');
    }

    appendMessage(response, 'bot-message');
    speak(response);
}

// Function to start listening to user voice
function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
    };

    recognition.onerror = function (event) {
        console.error(event.error);
    };
}

// Function to make the assistant speak
function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Set voice properties
    const voices = synth.getVoices();
    utterance.voice = voices.find(voice => voice.name === 'Google UK English Male') || voices[0];
    utterance.volume = 1; // Maximum volume
    utterance.pitch = 1.1; // Higher pitch
    utterance.rate = 1; // Normal rate

    synth.speak(utterance);
}

// Function to speak user input
function speakResponse() {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        speak(userMessage);
    }
}

// Function to greet based on the time of day
function timeBasedGreeting() {
    const hours = new Date().getHours();
    let greeting;
    if (hours < 12) {
        greeting = 'Good morning!';
    } else if (hours < 18) {
        greeting = 'Good afternoon!';
    } else if (hours < 22) {
        greeting = 'Good evening!';
    } else {
        greeting = 'Good night!';
    }
    appendMessage(greeting, 'bot-message');
    speak(greeting);
}

// Initial greeting
timeBasedGreeting();
