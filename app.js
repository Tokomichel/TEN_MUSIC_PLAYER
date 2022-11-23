let current_music = document.createElement('audio');
let track_index = 0;

let is_playing = false;
let is_paused = false;
let auto_play = true;

let track_duration = document.querySelector('.elapsed');
let volume = document.querySelector('.le-volume');

let total = document.getElementById('.elapsed_time');
let title = document.querySelector('.track-title');
let author = document.querySelector('.track-author');
let vibration = document.getElementsByClassName('vibration');
let button_auto = document.querySelector('.auto-play');
let image = document.querySelector(".track-img");

let body = document.body;
let button_mode = document.getElementById('mode');
let is_day = true;

let timer;
let timer2;


let colorPicker = document.getElementById("colorPicker");
let box = document.getElementById("box");
let output;



let musics_list = 
[
    {
        source: "musics/Mayole.mp3",
        auteur: "Kareyce Fotso",
        image: "images/Mayole.jpg",
        titre: "Mayole"
    },
    {
        source: "musics/Stromae - Mon amour (Official Audio).mp3",
        auteur: "Stromae Romae",
        image: "images/Stromae - Mon amour (Official Audio).jpg",
        titre: "Mon Amour"
    },
    {
        source: "musics/Maître Gims - J me tire (Clip officiel).mp3",
        auteur: "Maitre Gims",
        image: "images/Maître Gims - J me tire (Clip officiel).jpg",
        titre: "J'me tire"
    },
    {
        source: "musics/Elle reste ta meilleur.mp3",
        auteur: "Sexion d'assaut",
        image: "",
        titre: "Ta meilleure amie"
    },
    {
        source: "musics/Curtis Harding - On And On.mp3",
        auteur: "Curtis Harding",
        image: "images/Curtis Harding - On And On.jpg",
        titre: "On and On"
    }
    
];

output = document.getElementById("output");

box.style.borderColor = colorPicker.value;

colorPicker.addEventListener("input", function(event) {
    box.style.borderColor = event.target.value;
}, false);

colorPicker.addEventListener("change", function(event) {
    output.innerText = "Couleur choisie : " + colorPicker.value;
}, false);

//checker le cote ftp



remove_vibrations();
autoPlay();
mode();

function mode()
{
    if(is_day)
    {
        body.style.backgroundColor = "rgb(26, 47, 69)";
        is_day = false;
        console.log(body.style.backgroundColor);
        button_mode.innerHTML = "Nuit";

    }
    else
    {
        button_mode.innerHTML = "Jour";
        body.style.backgroundColor = "rgb(191, 194, 197)";
        is_day = true;
    }
}

function animate() //fonction permettant d'animer les spectres
{
    let rand_value = [0.4, 0.2, 0.5, 0.2, 0.5, 0.6, 0.2];
    for(let i = 0; i < vibration['length']; i++)
    {
        vibration[i].style.display = 'flex';
        vibration[i].style.animation = 'animate 1.4s linear infinite';
        vibration[i].style.animationDelay = rand_value[i] + 's';
    }
}

function remove_vibrations() //fonction qui enleve les spectre du document html
{
    for(let i = 0; i < vibration['length']; i++)
    {
        vibration[i].style.display = 'none';
    }
}

function next_track() //permet de passer ala piste suivante
{
    if(track_index == musics_list.length - 1)
       track_index = 0;
    else
       track_index ++;
    load_track();
    play_transition();
}

function preview_track() //permet de passer a la piste precedente
{
    if( track_index == 0)
    {
        track_index = musics_list.length - 1;
    }
    else
        track_index --;
    load_track();
    play_transition();
}

function autoPlay() //permet de jouer la musique aurtomatiquement
{
    if(auto_play)
    {
        auto_play = false;
        button_auto.style.background = "rgb(119, 158, 111)";
    }
    else
    {
        auto_play = true;
        button_auto.style.background = "rgb(255, 158, 200)";
    }
}

function replay() //permet de rejouer la piste
{
    is_paused = false;
    is_playing = false;
    load_track();
    play_music();
}

function load_track() //charge les donnees
{
    track_duration.value = 0;
    // current_music.volume = volume.value;
    current_music.src = musics_list[track_index].source;
    title.innerHTML = musics_list[track_index].titre;
    author.innerHTML = musics_list[track_index].auteur;
    if(musics_list[track_index].image == "")
    {
        image.src = "images/null.jpg";
    }
    else
    {
        image.src = musics_list[track_index].image;

    }
    current_music.load();
}

function play_transition()
{
    current_music.play();
    animate();
    is_playing = true;
    is_paused = false;
}

function play_music()
{    
    if(!is_playing)
    {
        if(is_paused)
        {
            current_music.play();
            animate();
            is_paused = false;
            is_playing = true;
        }
        else
        {
            load_track();
            current_music.play();
            animate();
            is_playing = true;
            is_paused = true;
        }
        timer = setInterval(update_slider, 500);
    }
    else
    {
        clearInterval(timer);
        current_music.pause();
        remove_vibrations();
        is_playing = false;
        is_paused = true;

    }
}

function reset_slider() //remet le slider a zero
{
    track_duration.value = 0;
}

function random_bg_color() //genere un code de couleur aleatoire hexadecimale
{
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;
 

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }

    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}

function seek_to() //permet de se deplacer sur les slide en meme temps que la musique
{
    let ici = current_music.duration * (track_duration.value / 100);
    clearInterval(timer);
    current_music.currentTime = ici;
    timer = setInterval(update_slider, 500);
}

function seek_to_volume() //version de seek_to du volume
{
    let ici = volume.value / 100;
    current_music.volume = ici;
}

function random() //selection des pistes aleatoirement
{
    track_index = Math.round(Math.random() * (musics_list.length - 1));
    is_playing = false;
    is_paused = false;
    load_track();
    current_music.play();
}

function update_slider() //update la position du slider par unite de temps
{
    let position = 0;
    if(!isNaN(current_music.duration))
    {
        position = current_music.currentTime * (100 / current_music.duration);
        track_duration.value = position;

    }

    if(current_music.ended)
    {
        if(auto_play)
        {
            is_playing = false;
            is_paused = false;
            play_music();
        }
        else
        {
            is_playing = false;
            is_paused = false;
            next_track();
        }
    }
}

