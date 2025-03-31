document.addEventListener("DOMContentLoaded", function() {
    const totalImages = 83;
    const imageElement = document.getElementById("slideshow");
    const questionSlide = document.getElementById("question-slide");
    const questionText = document.getElementById("question");
    const yesButton = document.getElementById("yesBtn");
    const noButton = document.getElementById("noBtn");
    const gifContainer = document.getElementById("gif-container");
    const responseGif = document.getElementById("response-gif");
    const nextButton = document.getElementById("nextBtn");
    const prevButton = document.getElementById("prevBtn");
    const finalMessage = document.getElementById("finalMessage");
    const finalYesButton = document.getElementById("finalYesBtn");
    const audioPlayer = document.getElementById("audioPlayer");
    const currentSongTitle = document.getElementById("currentSongTitle");

    let currentIndex = 0;

    // Define slides (mix of images and questions)
    const slides = [];
const questions = [
    "Will you be my partner in crime for the rest of my life?",
    "Will you let me annoy you for the rest of our lives? 🌍",
    "Will you let me lick you in all the right places? 👅",
    "Will you always come to me whenever life gets tough?",
    "Will you always be there to cheer me up when I’m feeling low?",
    "Will you always be my shoulder to cry on?",
    "Will you let me play with Tingu-Mingu? 👀"
];
let questionIndex = 0;

for (let i = 1; i <= totalImages; i++) {
    slides.push({ type: "image", src: `public/images/photo_${i}.jpeg` }); // Updated path
    if (i % 10 === 0 && questionIndex < questions.length) {
        slides.push({
            type: "question",
            text: questions[questionIndex]
        });
        questionIndex++;
    }
}

// GIFs for responses
const happyGif = "public/gifs/happy.gif"; // Updated path
const sadGif = "public/gifs/sad.gif";     // Updated path

// Music Playlist
const songs = [
    "public/music/song1.mp3", // Updated path
    "public/music/song2.mp3", // Updated path
    "public/music/song3.mp3"  // Updated path
];
    let currentSongIndex = 0;

    // Initialize Plyr
    const player = new Plyr('#audioPlayer', {
        controls: ['play', 'progress', 'volume']
    });

    function updateSlide() {
        const currentSlide = slides[currentIndex];
        gifContainer.classList.add("hidden"); // Hide GIF by default
        if (currentSlide.type === "image") {
            imageElement.classList.add("fade");
            questionSlide.classList.add("hidden");
            setTimeout(() => {
                imageElement.src = currentSlide.src;
                imageElement.classList.remove("fade");
                imageElement.classList.remove("hidden");
            }, 250);
        } else if (currentSlide.type === "question") {
            imageElement.classList.add("hidden");
            questionSlide.classList.add("fade");
            setTimeout(() => {
                questionText.innerText = currentSlide.text;
                questionSlide.classList.remove("fade");
                questionSlide.classList.remove("hidden");
            }, 250);
        }
    }

    function showGif(gifSrc) {
        questionSlide.classList.add("hidden");
        responseGif.src = gifSrc;
        gifContainer.classList.add("fade");
        gifContainer.classList.remove("hidden");
        setTimeout(() => {
            gifContainer.classList.remove("fade");
        }, 50); // Small delay to trigger fade-in
        setTimeout(() => {
            gifContainer.classList.add("fade");
            setTimeout(() => {
                gifContainer.classList.add("hidden");
                if (currentIndex < slides.length - 1) {
                    currentIndex++;
                    updateSlide();
                } else {
                    finalMessage.classList.remove("hidden");
                }
            }, 500); // Fade-out duration
        }, 2000); // Show GIF for 2 seconds
    }

    function updateSong() {
        const songTitle = songs[currentSongIndex].split('/').pop().replace('.mp3', '');
        currentSongTitle.textContent = songTitle;
        player.source = {
            type: 'audio',
            sources: [{ src: songs[currentSongIndex], type: 'audio/mp3' }]
        };
        player.play();
    }

    nextButton.addEventListener("click", function() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlide();
        } else {
            nextButton.classList.add("hidden");
            imageElement.classList.add("hidden");
            questionSlide.classList.add("hidden");
            finalMessage.classList.remove("hidden");
        }
    });

    prevButton.addEventListener("click", function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide();
            finalMessage.classList.add("hidden");
            nextButton.classList.remove("hidden");
        }
    });

    yesButton.addEventListener("click", function() {
        showGif(happyGif);
    });

    noButton.addEventListener("click", function() {
        alert("Aww, really? Let’s pretend you said yes anyway! 😜💕");
        showGif(sadGif);
    });

    finalYesButton.addEventListener("click", function() {
        alert("Yay! You’re mine forever! 💖🥰");
    });

    player.on('ended', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updateSong();
    });

    // Floating Hearts Animation
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerText = "💖";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 4 + "s";
        document.getElementById("heart-container").appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }

    setInterval(createHeart, 500);

    // Load the first slide and song
    updateSlide();
    updateSong();
});
