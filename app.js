let current_music = document.createElement('audio');

function load_music()
{
    current_music.src = "musics/Mayole.mp3";
    console.log(current_music.src);
    current_music.load();
    current_music.play();
}

function hee_vampire()
{
    console.log("La fonction s'est finale;ent lancee");
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;
    console.log("La fonction a ete lancee");

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