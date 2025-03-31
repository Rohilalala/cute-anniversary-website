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
