let current_music = document.createElement('audio'); //element qui se  charge de jouer la musique
let track_index = 0; // variable qui va contenir l'index du track que l'on veut lire
let list_idx = 0; //index de la liste de lecture

let is_playing = false; // bool: permet de savoir si la musique est en lecture(true) ou pas (false)
let is_paused = false; //bool: vois si on a mis pause
let auto_play = true; //Si l'auto play est active
let is_random = false;

let track_duration = document.querySelector('.elapsed');
let volume = document.querySelector('.le-volume');

let total = document.getElementById('.elapsed_time');
let title = document.querySelector('.track-title');
let author = document.querySelector('.track-author');
let vibration = document.getElementsByClassName('vibration');
let button_auto = document.querySelector('.auto-play');
let button_random = document.querySelector('.random-play');
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
let section2 = document.querySelector(".section2");
let tracks = document.querySelectorAll(".track");
let triangles = document.querySelectorAll(".triangle");
let trian = document.querySelector(".trian");
let traits = document.querySelectorAll(".trait");
let traits1 = document.querySelectorAll(".trait1");
let rand_button = document.querySelector(".random-play");
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
    },
    {
        source: "musics/Kalimba.mp3",
        auteur: "Dj scruff",
        image: "",
        titre: "Kalimba"
    },
    {
        source: "musics/La Medicina - Zouk La Se Sel Medikaman Nou Ni.mp3",
        auteur: "Medicina",
        image: "",
        titre: "La medicina"
    },
    {
        source: "musics/ma diretion.mp3",
        auteur: "Sexion d'assaut",
        image: "",
        titre: "Ma direction"
    },
    {
        source: "musics/Madcon - Beggin .mp3",
        auteur: "Madcon",
        image: "",
        titre: "Beggin"
    },
    {
        source: "musics/Maître Gims - La chute (Audio).mp3",
        auteur: "Maitre Gims",
        image: "",
        titre: "La chute"
    },
    {
        source: "musics/Patience Dabany - L'amour d'une mère.mp3",
        auteur: "Patience Dabany",
        image: "",
        titre: "L'amour d'une mere"
    },
    {
        source: "musics/Song of freedom.mp3",
        auteur: "Bob Marley",
        image: "",
        titre: "Song of freedom"
    },
    {
        source: "musics/Stromae - L’enfer (Official Music Video).mp3",
        auteur: "Stromae Romae",
        image: "",
        titre: "L'enfer"
    },
    {
        source: "musics/Stromae - La solassitude (Official Audio).mp3",
        auteur: "Stromae Romae",
        image: "",
        titre: "La solassitude"
    },
    {
        source: "musics/Charlotte Dipanda - Kénè So (Aller de l avant)mp3",
        auteur: "Charlotte Dipanda",
        image: "",
        titre: "Kene So"
    },
    {
        source: "musics/Black M - La nuit porte conseil (Clip officiel).mp3",
        auteur: "Black M",
        image: "",
        titre: "La nuit porte conseil"
    }, 
    {
        source: "musics/Bakermat - Baianá (Official Video).mp3",
        auteur: "Bakermat",
        image: "",
        titre: "Baianá"
    },
    {
        source: "musics/Asa Jailer with.mp3",
        auteur: "Asa",
        image: "",
        titre: "Jailer"
    },   
];

let gospel = [
    {
        source: "gospel/001 Divin amour.mp3",
        auteur: "Gaël",
        image: "",
        titre: "Divin Amour"
    },
    {
        source: "gospel/ABRAHAM - On Dit Que Partir C est Mourir un Peu.mp3",
        auteur: "Noël Colombier",
        image: "",
        titre: "Partir c'est mourir un peur"
    },
    {
        source: "gospel/Eternel écoute ma prière.mp3",
        auteur: "Aimé Nkanu",
        image: "",
        titre: "Eternel écoute ma prière"
    },
    {
        source: "gospel/Purifie nos coeurs Louange + Paroles.mp3",
        auteur: "Gaël",
        image: "",
        titre: "Purifie nos coeurs"
    },
    {
        source: "gospel/Je dois partir I AIME NKANU.mp3",
        auteur: "Aimé Nkanu",
        image: "",
        titre: "Je dois partir"
    }
]

let listes_lecture = [musics_list, gospel];
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

load_list();
remove_vibrations();
autoPlay();
mode(true);

function load_liste(index)
{
    list_idx = index;
    load_list();
    mode(false);
}

function play_on_click(index)
{
    track_index = index;
    clearInterval(timer);
    load_track();
    current_music.play();
    animate();
    is_playing = true;
    is_paused = false;
    change_appearence(false);
    timer = setInterval(update_slider, 800);
}

function change_appearence(playing)
{
    let pause = "<div class=\"pause\" onclick=\"play_music()\"><div class=\"trait1\"></div><div class=\"trait1\"></div></div>";
    let play = "<div class=\"cercle\" onclick=\"play_music()\"><div class=\"triangle\"></div></div>";

    if(playing)
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

function mode(day)
{
    if(day)
    {
        if(is_day)
     {
           body.style.backgroundColor = "rgb(35, 41, 47)";
           body.style.color = "rgb(150, 151, 152)";
           body.style.transition = "all 0.2s ease-in-out";
           section2.style.backgroundColor = "rgb(41, 46, 52)";
           section2.style.transition = "all 0.2s ease-in-out";
           picture.src = "sun_30px.png"; 
           is_day = false;
           for(let i = 0; i < tracks['length']; i++)
           {
               tracks[i].style.backgroundColor = "rgb(35, 41, 47)";
               tracks[i].style.transition = "all 0.2s ease-in-out";
           }

     }
        else
        {
           
           body.style.backgroundColor = "rgb(191, 194, 197)";
           body.style.color = "rgb(51, 53, 55)";
           section2.style.backgroundColor = "rgb(178, 178, 178)";
           is_day = true;
           picture.src = "crescent_moon_50px.png";
   
           for(let i = 0; i < tracks['length']; i++)
           {
               tracks[i].style.backgroundColor = "rgb(191, 194, 197)";
           }
        }
    }
    else
    {
        if(is_day)
        {
            for(let i = 0; i < tracks['length']; i++)
            {
                tracks[i].style.backgroundColor = "rgb(191, 194, 197)";
            }
        }
        else
        {
            for(let i = 0; i < tracks['length']; i++)
           {
            tracks[i].style.backgroundColor = "rgb(35, 41, 47)";
           }
        }
    }
}

function load_list()
{
    scroll.innerHTML = "";
    for (let i = 0; i < listes_lecture[list_idx].length; i++) {
        if(!(i % 2 == 0))
        {
            scroll.innerHTML += "<div class=\"track1\" onclick=\"play_on_click(" + i + ")\">" + listes_lecture[list_idx][i].auteur + " - " + listes_lecture[list_idx][i].titre + "</div>";
        }
        else
        scroll.innerHTML += "<div class=\"track\" onclick=\"play_on_click(" + i + ")\">" + listes_lecture[list_idx][i].auteur + " - " + listes_lecture[list_idx][i].titre + "</div>";
        
    }
    tracks = document.querySelectorAll(".track");
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
    if(track_index == listes_lecture[list_idx].length - 1)
       track_index = 0;
    else
       track_index ++;

    is_playing = false;
    is_paused = false;
    play_music();
}

function next_track_random()
{
    let len = listes_lecture[list_idx].length;
    track_index = Math.round(Math.random() * len);
    load_track();
    is_playing = false;
    is_paused = false;
    play_music();
}

function preview_track() //permet de passer a la piste precedente
{
    if( track_index == 0)
    {
        track_index = listes_lecture[list_idx].length - 1;
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

function random_play()
{
    auto_play = false;
    if(!is_random)
    {
        console.log(is_random);
        next_track_random();
        is_random = true;
        rand_button.style.backgroundColor = "rgb(54,217,86)";
    }
    else
    {
        console.log(is_random);
        is_random = false;
        rand_button.style.backgroundColor = "rgb(217,54,111)";
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
    clearInterval(timer);
    track_duration.value = 0;
    // current_music.volume = volume.value;
    current_music.src = listes_lecture[list_idx][track_index].source;
    title.innerHTML = listes_lecture[list_idx][track_index].titre;
    author.innerHTML = listes_lecture[list_idx][track_index].auteur;

    if(listes_lecture[list_idx][track_index].image == "")
    {
        image.src = "images/null.jpg";
    }
    else
    {
        image.src = listes_lecture[list_idx][track_index].image;

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
    change_appearence(is_playing);
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
        timer = setInterval(update_slider, 800);

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
    clearInterval(timer);
    let ici = current_music.duration * (track_duration.value / 100);
    current_music.currentTime = ici;
    timer = setInterval(update_slider, 800);
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
            if(is_random)
            {
                is_playing = false;
                is_paused = false;
                next_track_random();
            }
            else
            {
                is_playing = false;
                is_paused = false;
                next_track();
            }
            
        }
    }
}


