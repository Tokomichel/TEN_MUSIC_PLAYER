let current_music = document.createElement('audio'); //element qui se  charge de jouer la musique
let track_index = 0; // variable qui va contenir l'index du track que l'on veut lire

let is_playing = false; // bool: permet de savoir si la musique est en lecture(true) ou pas (false)
let is_paused = false; //bool: vois si on a mis pause
let auto_play = true; //Si l'auto play est active

let track_duration = document.querySelector('.elapsed');
let volume = document.querySelector('.le-volume');

let total = document.getElementById('.elapsed_time');
let title = document.querySelector('.track-title');
let author = document.querySelector('.track-author');
let vibration = document.getElementsByClassName('vibration');
let button_auto = document.querySelector('.auto-play');
let container = document.querySelector(".container");
let image = document.querySelector(".track-img");

let body = document.body;
let button_mode = document.getElementById('mode');
let is_day = true;

let timer;

let picture = document.querySelector(".mod");

let mp = document.getElementsByClassName('t');
let colorPicker = document.getElementById("colorPicker");
let box = document.getElementById("box");
let scroll = document.querySelector(".scroll");
let triangles = document.querySelectorAll(".triangle");
let trian = document.querySelector(".trian");
let traits = document.querySelectorAll(".trait");
let traits1 = document.querySelectorAll(".trait1");

let output;

let pp = document.querySelector(".pp");

let musics_list = 
[
    {
        source: "musics/Mayole.mp3",
        auteur: "Kareyce Fotso",
        image: "images/Mayole.jpg",
        titre: "Mayole"
    },
    {
        source: "musics/Lydol - Mal être, ma lettre.mp4",
        auteur: "Lydol",
        image: "images/lydol.png",
        titre: "Mal être, ma lettre"
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


set_color(colorPicker.value);

colorPicker.addEventListener("input", function(event) {
    // box.style.borderColor = event.target.value;
    container.style.borderColor = event.target.value;
    track_duration.style.backgroundColor = event.target.value;
    track_duration.style.borderColor = event.target.value;
    volume.style.backgroundColor = event.target.value;
    volume.style.borderColor = event.target.value;
    scroll.style.webkitScrollbarThumb = event.target.value;
    // triangle.style.borderLeft = "27px solid" + event.target.value;
    trian.style.borderRight = "27px solid" + event.target.value;
    // trait.style.backgroundColor = event.target.value;


    for (let index = 0; index < mp.length; index++) {
        mp[index].style.color = event.target.value;
        
    }
    for (let index = 0; index < triangles.length; index++) {
        triangles[index].style.borderLeft = "27px solid" + event.target.value;
        
    }
    for (let index = 0; index < traits.length; index++) {
        traits[index].style.backgroundColor = event.target.value;
        
    }
    for (let i = 0; i < traits1.length; i++) {
        traits1[i].style.backgroundColor = event.target.value;
        console.log(traits1[i].style.backgroundColor);
         
     }
    // mp.style.backgroundColor = event.target.value;

}, false);

colorPicker.addEventListener("change", function(event) {
}, false);

//checker le cote ftp



remove_vibrations();
autoPlay();
mode();

function change_appearence()
{
    let pause = "<div class=\"pause\" onclick=\"play_music()\"><div class=\"trait1\"></div><div class=\"trait1\"></div></div>";
    let play = "<div class=\"cercle\" onclick=\"play_music()\"><div class=\"triangle\"></div></div>";

    if(is_playing)
    {
        pp.innerHTML = play;
        triangles = document.querySelectorAll(".triangle");
        traits = document.querySelectorAll(".trait");
        

        
    }
        
    else
    {
        pp.innerHTML = pause;   
        traits1 = document.querySelectorAll(".trait1");
    }

    set_color(colorPicker.value);
}

function set_color(value)
{
    // let table = [
    //     container.style,
    //     track_duration.style,
    //     volume
    // ]

    for (let index = 0; index < mp.length; index++) {
        mp[index].style.color = value;
        
    }
    for (let index = 0; index < triangles.length; index++) {
        triangles[index].style.borderLeft = "27px solid" + value;
        
    }
    for (let index = 0; index < traits.length; index++) {
        traits[index].style.backgroundColor = value;
        
    }
    for (let i = 0; i < traits1.length; i++) {
       traits1[i].style.backgroundColor = value;
        
    }

    container.style.borderColor = value;
    track_duration.style.backgroundColor = value;
    track_duration.style.borderColor = value;
    volume.style.borderColor = value;
    volume.style.backgroundColor = value;
    scroll.style.webkitScrollbarThumb = value;
    // triangle.style.borderLeft = "27px solid" + value;
    trian.style.borderRight = "27px solid" + value;
    // trait.style.backgroundColor = "27 solid" + value;
    


}

function mode()
{
    if(is_day)
    {
        body.style.backgroundColor = "rgb(26, 47, 69)";
        is_day = false;
        picture.src = "sun_30px.png"; 
        

    }
    else
    {
        body.style.backgroundColor = "rgb(191, 194, 197)";
        is_day = true;
        picture.src = "crescent_moon_50px.png";
        console.log(picture);
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

    is_playing = false;
    is_paused = false;
    play_music();
}

function preview_track() //permet de passer a la piste precedente
{
    if( track_index == 0)
    {
        track_index = musics_list.length - 1;
    }
    else
        track_index --;
    
    is_playing = false;
    is_paused = false;
    play_music();
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
    change_appearence();
    timer = setInterval(update_slider, 300);
    is_playing = true;
    is_paused = false;
}

function play_music()
{    
    change_appearence();
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
        timer = setInterval(update_slider, 300);
        //console.log(timer);

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

