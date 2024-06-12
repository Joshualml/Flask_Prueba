const btnPlay = document.querySelector("#play_button"); 
const btnPlayIcon = document.querySelector("#play");
const btnPuaseIcon = document.querySelector("#pause");
const btnRepeat = document.querySelector("#btn-repeat");
const iconoRepeat = document.querySelector("#icono repeat");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnVolume = document.querySelector("#btn-volume");
const iconVolumeUP = document.querySelector("#UP");
const iconVolumeMID = document.querySelector("#MID");
const iconVolumeDOWN = document.querySelector("#DOWN");
const iconVolumeMUTE = document.querySelector("#MUTE");
const playerVolume = document.querySelector(".player-volume");
const songName = document.querySelector("#song-name");
const songAuthor = document.querySelector("#song-author");
const playerCurrentTime = document.querySelector("#player-current-time");
const playerDuration = document.querySelector("#player-duration");
const playerProgress = document.querySelector(".player-progress");
const audioPlayer = document.querySelector("#audio-player");
const slideValue = document.querySelector(".slide-value");
const Album = document.querySelector(".album");




let currentSong = 0;
let repeatSong = false;
let miniRangeVal = 0;

const formatSecondsToMinutes = (seconds) => {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
};

const songs = [ 
    {
        name: "Hikaru Nara",
        author: "Goose House",
        path: "./Audio/Hikaru Nara.mp3",
        Album: "./Theme/Game.jpg"
    },
    {
        name: "Nothing is Lost",
        author: "Marco Sfogli",
        path: "./Audio/Nothing is Lost.mp3",
        Album: "./Theme/Marco.jpg"
    },
    {
        name: "This game",
        author: "Konomi Suzuki",
        path: "./Audio/This game.mp3",
        Album: "./Theme/No-song-no-life.jpg"
    }
];


btnPlay.addEventListener("click", () => play_pause());
playerVolume.addEventListener("input", () => changeVolume());
audioPlayer.addEventListener("timeupdate", () => timeUpdate());
playerProgress.addEventListener("input", () => changeTime());
btnNext.addEventListener("click", () => changeSong());
btnPrev.addEventListener("click", () => changeSong(false));
audioPlayer.addEventListener("ended", () => ended());


const play_pause = () => {
    
    if (audioPlayer.paused) {
        audioPlayer.play();
        btnPlayIcon.classList.remove("visible");
        btnPuaseIcon.classList.add("visible");
    } else {
        audioPlayer.pause();
        btnPlayIcon.classList.add("visible");
        btnPuaseIcon.classList.remove("visible");
    }

    const song = songs[currentSong];
    songName.innerHTML = song.name;
    songAuthor.innerHTML = song.author;
    Album.src = song.Album;
}
const changeVolume = () => {
    const { value } = playerVolume;
    slideValue.innerHTML = value;
    miniRangeVal = value / 100;
    audioPlayer.volume = miniRangeVal;

    if((value <= 60)&(value > 30)){
        iconVolumeUP.classList.remove("visible");
        iconVolumeMID.classList.add("visible");
        iconVolumeDOWN.classList.remove("visible");
    }
    else if((value <= 30)&(value > 0)){
        iconVolumeMID.classList.remove("visible");
        iconVolumeDOWN.classList.add("visible");
        iconVolumeMUTE.classList.remove("visible");
    }
    else if(value == 0){
        iconVolumeDOWN.classList.remove("visible");
        iconVolumeMUTE.classList.add("visible");
    }
    else{
        iconVolumeUP.classList.add("visible");
    }
}
const timeUpdate = () => {
    const { currentTime, duration } = audioPlayer;
    playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
    playerDuration.innerHTML = formatSecondsToMinutes(duration);
    playerProgress.max = duration;
    playerProgress.value = currentTime;
}
const changeTime = () => {
    audioPlayer.currentTime = playerProgress.value;
};
const changeSong = (next = true) => {
    if (next && (currentSong < songs.length - 1)) {
        currentSong = currentSong + 1;
    } else if (!next && currentSong > 0) {
        currentSong--;
    } else {
        return;
    }

    updatePlayer();
    togglePlaySong();
};
const updatePlayer = () => {
    const song = songs[currentSong];

    Album.src = song.Album;
    songName.innerHTML = song.name;
    songAuthor.innerHTML = song.author;
    audioPlayer.src = song.path;
    playerProgress.value = audioPlayer.currentTime;
    audioPlayer.play();
};

const ended = () => {
    repeatSong ? togglePlaySong() : changeSong(true);
};

btnRepeat.addEventListener("click", () => {
    repeatSong = !repeatSong;
    iconoRepeat.classList.add("activado");
    // audioPlayer.play();
});


// const RepeatSong = () => {
    
// };


// window.onload = () => {
//     updatePlayer();
// };