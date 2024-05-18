let songIndex = 0;
let audioElement = new Audio('songs/7.mp3');
let songCover = document.querySelectorAll('.song-cover');
let playBtn = document.getElementById('playBtn');
let playNext = document.getElementById('nextSong');
let previousSong = document.getElementById('previousSong');
let totalTime = document.getElementById('music-duration');
let current_time = document.getElementById('current-time');
let songItems = Array.from(document.getElementsByClassName('songs'));
let currentSong = document.getElementById('currentSongName');
let currentSongCover = document.getElementById('currentSongCover');
let currentArtist = document.getElementById('currentSongArtist');
let progressBar = document.getElementById('myProgressBar')
let playSong = Array.from(document.getElementsByClassName('playSong'));
let searchInput = document.getElementById('search-input');
const songCollection = document.getElementById('song-collection');



let songs = [
    {songName: "Did it Again", artist: "Lil Tecca", filePath: "songs/0.mp3", coverPath: "musicCovers/cover1.jpg"},
    {songName: "Die For You", artist: "The Weeknd", filePath: "songs/1.mp3", coverPath: "musicCovers/cover2.png"},
    {songName: "Don't check on me", artist: "Chris Brown ft. Justin Bieber", filePath: "songs/2.mp3", coverPath: "musicCovers/cover3.jpg"},
    {songName: "Everybody knows", artist: "Chris Brown", filePath: "songs/3.mp3", coverPath: "musicCovers/cover4.png"},
    {songName: "Falling", artist: "Lil Mosey", filePath: "songs/4.mp3", coverPath: "musicCovers/cover5.jpg"},
    {songName: "Fly N' Ghetto", artist: "Ayo & Teo", filePath: "songs/5.mp3", coverPath: "musicCovers/cover6.jfif"},
    {songName: "Heat Waves", artist: "Glass Animals", filePath: "songs/6.mp3", coverPath: "musicCovers/cover7.png"},
    {songName: "In Your Eyes", artist: "The Weeknd", filePath: "songs/7.mp3", coverPath: "musicCovers/cover8.jfif"},
    {songName: "Swim", artist: "Chase Atlantic", filePath: "songs/8.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b2735a0c2870f4f309e382d1fad6"},
    {songName: "Let Me Down Slowly", artist: "Alec Benjamin ft.Alessia Cara", filePath: "songs/9.mp3", coverPath: "musicCovers/cover10.png"},
    {songName: "Kill Bill", artist: "SZA", filePath: "songs/10.mp3", coverPath: "https://i1.sndcdn.com/artworks-y7Tyi9W7mwWNHxMi-uU9FyA-t500x500.jpg"},
    {songName: "Consume", artist: "Chase Atlantic", filePath: "songs/11.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b2735a0c2870f4f309e382d1fad6"},
    {songName: "BRB", artist: "Bazzi", filePath: "songs/12.mp3", coverPath: "https://i1.sndcdn.com/artworks-000333664125-av7zmk-t500x500.jpg"},
    {songName: "Ambition For Cash", artist: "Key Glock", filePath: "songs/13.mp3", coverPath: "https://upload.wikimedia.org/wikipedia/en/b/b3/Key_Glock_-_Yellow_Tape_2.jpg"},
    {songName: "GREECE (ft.Drake)", artist: "DJ Khaled, Drake", filePath: "songs/14.mp3", coverPath: "https://upload.wikimedia.org/wikipedia/en/8/82/DJ_Khaled_-_Khaled_Khaled.png"},
    {songName: "Overseas", artist: "D-Block Europe, Central Cee", filePath: "songs/15.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b273881de5c93d75eee36d9cee69"},
    {songName: "MotorSports", artist: "Migos, Nicki Minaj, Cardi B", filePath: "songs/16.mp3", coverPath: "https://upload.wikimedia.org/wikipedia/en/b/b6/MotorSport_song_cover.png"},
    {songName: "Sucker", artist: "Jonash Brothers", filePath: "songs/17.mp3", coverPath: "musicCovers/cover9.png"}
]

songItems.forEach((e, i) => {
    e.getElementsByTagName('img')[0].src = songs[i].coverPath;
    e.getElementsByClassName('song-title')[0].textContent = songs[i].songName;
    e.getElementsByClassName('artist-name')[0].textContent = songs[i].artist;
})

playBtn.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play()
        playBtn.classList.remove('fa-play');
        playBtn.classList.add('fa-pause');
    } else {
        audioElement.pause()
        playBtn.classList.remove('fa-pause');
        playBtn.classList.add('fa-play');
        makeAllPlays(playSong)
    }
})

let seconds = audioElement.currentTime
let minutes


function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
}


audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    progressBar.value = progress;

    current_time.innerText = `${formatTime(audioElement.currentTime)}`
    totalTime.innerText = `${formatTime(audioElement.duration)}`
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    playSong.forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

playSong.forEach((element) => {
    element.addEventListener("click", (e) => {
        if (audioElement.paused || audioElement.currentTime === 0){
            makeAllPlays()
            songIndex = parseInt(e.target.id)
            e.target.classList.remove('fa-play')
            e.target.classList.add('fa-pause')
            audioElement.src = `songs/${songIndex}.mp3`
            currentSong.innerText = songs[songIndex].songName;
            currentArtist.innerText = songs[songIndex].artist;
            currentSongCover.src = songs[songIndex].coverPath;
            audioElement.currentTime = 0;
            audioElement.play()
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
        } else if(e.target.classList === 'fa-solid playSong fa-1x fa-pause'){
            e.target.classList.remove('fa-pause')
            e.target.classList.add('fa-play')
            audioElement.pause()
            playBtn.classList.remove('fa-pause');
            playBtn.classList.add('fa-play');
        } else {
            makeAllPlays()
            songIndex = parseInt(e.target.id)
            e.target.classList.remove('fa-play')
            e.target.classList.add('fa-pause')
            audioElement.src = `songs/${songIndex}.mp3`
            currentSong.innerText = songs[songIndex].songName;
            currentArtist.innerText = songs[songIndex].artist;
            currentSongCover.src = songs[songIndex].coverPath;
            audioElement.currentTime = 0;
            audioElement.play()
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
        }
    })
})

nextSong.addEventListener('click', () =>{
    if(songIndex >= 9){
        songIndex = 0
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`
    currentSong.innerText = songs[songIndex].songName;
    currentArtist.innerText = songs[songIndex].artist;
    currentSongCover.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play()
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
})
    
previousSong.addEventListener('click', () =>{
    if(songIndex <= 0){
        songIndex = 0
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`
    currentSong.innerText = songs[songIndex].songName;
    currentArtist.innerText = songs[songIndex].artist;
    currentSongCover.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play()
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
})

async function handleAPICall(){
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchInput.value}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '64ad459420msh4c2e7251457deddp1f0181jsne6f520562247',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data);
        songCollection.innerHTML = "";
        
        let newResults = result.data;

        newResults.map((e) => {
            const songDiv = document.createElement('div');
            songDiv.classList.add('songs');
            const imgCover = document.createElement('img');
            imgCover.src = e.album.cover
            const playIcon = document.createElement('i');
            playIcon.classList.add('fa-solid');
            playIcon.classList.add('playSong');
            playIcon.classList.add('fa-1x');
            playIcon.classList.add('fa-play')
            const songTitle = document.createElement('h3');
            songTitle.classList.add('song-title');
            songTitle.innerText = e.title
            const artistName = document.createElement('h4');
            artistName.classList.add('artist-name');
            artistName.innerText = e.artist.name;

            songDiv.appendChild(imgCover)
            songDiv.appendChild(playIcon)
            songDiv.appendChild(songTitle)
            songDiv.appendChild(artistName)

            songCollection.appendChild(songDiv)
        })
        

    } catch (error) {
        console.error(error);
    }
};

document.getElementById('search-button').addEventListener('click', (e) => {
    e.preventDefault();
    handleAPICall()
})