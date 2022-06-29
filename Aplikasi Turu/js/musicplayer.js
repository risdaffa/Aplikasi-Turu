var loadVar;

function loadFunction() {
    loadVar = setTimeout(masukMusik, 3000);
    document.body.style.background = "#391E8A";
}

function masukMusik() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("musik").style.display = "flex";
}

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "Nature",
        artist: "Anonymous",
        image: "other/m1_cover.jpg",
        path: "other/Music1-TerapiAlam.mp3"
    },
    {
        name: "Instrumental",
        artist: "Anonymous",
        image: "other/m2_cover.jpg",
        path: "other/Music2-TerapiInstrumen.mp3",
    },
    {
        name: "It's Showtime",
        artist: "Undertale",
        image: "other/m3_cover.jpg",
        path: "other/Music3-Its_Showtime.mp3"
    },
    {
        name: "Bangun dan Semangat",
        artist: "Patrick Star",
        image: "other/m4_cover.jpg",
        path: "other/Music4-Bangun_dan_Semangat.mp3"
    },
    {
        name: "Safe and Sound",
        artist: "Different Heaven",
        image: "other/m5_cover.jpg",
        path: "other/Music5-Safe_And_Sound.mp3",
    },
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    // Load track musik baru
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Update details musik seperti nama, penyanyi
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "MEMUTAR LAGU KE-" + (track_index + 1) + " DARI " + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;

    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;

    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto;
    seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Hitung durasi
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Setting durasi jika kurang dari 10 menit maka ditambah 0 di depan
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Load the first track in the tracklist
loadTrack(track_index);