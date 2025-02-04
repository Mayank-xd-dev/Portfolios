document.addEventListener("DOMContentLoaded", function () {
    const chatbotBtn = document.getElementById("chatbot-btn");
    const chatbot = document.getElementById("chatbot");
    const closeBtn = document.getElementById("close-chatbot");
    const sendBtn = document.getElementById("send-btn");
    const userInput = document.getElementById("user-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    // Open and close the chatbot
    chatbotBtn.addEventListener("click", () => {
        chatbot.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        chatbot.style.display = "none";
    });

    // Function to send a message
    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        // Append the user's message
        const userMessageDiv = document.createElement("div");
        userMessageDiv.classList.add("message", "user-message");
        userMessageDiv.innerHTML = `<span>${userMessage}</span>`;
        chatbotMessages.appendChild(userMessageDiv);

        // Scroll to the latest message
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Clear the input field
        userInput.value = "";

        // Simulate bot response after 1 second
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            const botMessageDiv = document.createElement("div");
            botMessageDiv.classList.add("message", "bot-message");
            botMessageDiv.innerHTML = `<span>${botResponse}</span>`;
            chatbotMessages.appendChild(botMessageDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000);
    }

    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();

        const responses = {
            "hi": ["Hello! How can I assist you today?", "Hey there! Need any help?", "Hi! What can I do for you?"],
            "hello": ["Hello! How's your day going?", "Hi! How can I assist?", "Hey! Need help?"],
            "projects": ["You can check out my projects in the 'Projects' section of the website!",
                "I have worked on AI, Web Development, and more. Visit my portfolio for details!",
                "Check out my latest projects on my website!"],
            "about": ["I am Mayank, a 14-year-old programmer. I love coding and creating cool projects!",
                "I specialize in AI development, web design, and building innovative tech!",
                "I am passionate about coding and always working on new ideas!"]
        };

        // Find a matching response
        for (let key in responses) {
            if (lowerCaseMessage.includes(key)) {
                const possibleResponses = responses[key];
                return possibleResponses[Math.floor(Math.random() * possibleResponses.length)]; // Pick a random response
            }
        }

        return "I'm sorry, I didn't understand that. Could you try again?";
    }

    // Send message when the user clicks the Send button
    sendBtn.addEventListener("click", sendMessage);

    // Send message when the user presses Enter key
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    // Typewriter effect code
    const roles = ["Programmer", "Web Developer", "AI Enthusiast", "Innovator", "Coder"];
    let roleIndex = 0;
    let charIndex = 0;
    const typewriter = document.getElementById("typewriter");
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenWords = 2000;

    function typeText() {
        if (charIndex < roles[roleIndex].length) {
            typewriter.innerHTML = roles[roleIndex].substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            setTimeout(eraseText, delayBetweenWords);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            typewriter.innerHTML = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, deletingSpeed);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeText, typingSpeed);
        }
    }

    setTimeout(typeText, 500); // Start the typewriter effect after a short delay
});

function toggleGameSection() {
    let section = document.getElementById("gameContainer");
    section.style.display = section.style.display === "block" ? "none" : "block";
}

function launchGame(game) {
    let gameFrame = document.getElementById("gameFrame");
    if (game === "flappy") gameFrame.src = "https://flappybird.io/";
    else if (game === "dino") gameFrame.src = "https://chromedino.com/";
    else if (game === "shooter") gameFrame.src = "https://shooting-game.vercel.app/";
    
    gameFrame.style.display = "block";
}