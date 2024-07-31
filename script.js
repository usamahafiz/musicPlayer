const image = document.getElementById('cover');
      title = document.getElementById("music-title")
      artist = document.getElementById("music-artist")
      currenttimeE1 = document.getElementById("current-time")
      durationE1 = document.getElementById("duration")
      progress = document.getElementById("progress")
      playerProgress = document.getElementById("player-progress")
      prevBtn = document.getElementById("prev")
      playBtn = document.getElementById("play")
      nextBtn = document.getElementById("next")
      background = document.getElementById("bg-img")

    const music = new Audio();

    const songs = [{
        path: 'assets/1.mp3',
        displayName: "The Charmer's call",
        cover: 'assets/image 4.jpeg',
        artist: "Hanu Dixit",
    },
    {
        path: 'assets/2.mp3',
        displayName: "You Will never See Me coming",
        cover: 'assets/image 6.webp',
        artist: "NEFFEX",
       
    },
    {
        path: 'assets/1.mp3',
        displayName: "Intellect",
        cover: 'assets/image 5.jpeg',
        artist: "Young Logos",
       
    },
    
    ];
 
    let musicIndex = 0;
    let isPlaying = false;
function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }
    else{
        playMusic();
    }

}

function playMusic(){
    isPlaying = true;
    // change play button icon 
    playBtn.classList.replace("fa-play", "fa-pause");
    // set the hover button 
   playBtn.setAttribute('title','pause');
   music.play();
}

function pauseMusic(){
    isPlaying = false;
    // change play button icon 
    playBtn.classList.replace("fa-pause", "fa-play");
    // set the hover button 
   playBtn.setAttribute('title','Play');
   music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    image.src = song.cover;
    artist.textContent = song.artist;
    background.src = song.cover;

}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration , currentTime} = music;
    const progresspercent = (currentTime / duration) * 100;
    progress.style.width = `${progresspercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currenttimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;

}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;

}

playBtn.addEventListener('click',togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', ()=> changeMusic(1));
music.addEventListener('ended', ()=>changeMusic(1));
music.addEventListener('timeUpadate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);



