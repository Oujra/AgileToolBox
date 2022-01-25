let intro = document.querySelector(".intro");
let logo = document.querySelector(".logo-header");
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', ()=>{

    setTimeout(()=>{
        logoSpan.forEach((span, idx)=>{
            setTimeout(()=>{
                span.classList.add('active');
            }, (idx + 1) * 400)
        });

        setTimeout(()=>{
            logoSpan.forEach((span, idx)=>{
                setTimeout(()=>{
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50)
            })
        }, 2000);

        setTimeout(()=>{
            intro.style.top = '-100vh';
        }, 2300)

    })
})

/* Karten Clone und Expand*/
const cards = document.querySelectorAll(".card");

const onCardClick = async (e) => {  
const card= e.currentTarget;
const cardClone = card.cloneNode(true);
const bild = cardClone.querySelector('.bild');

const {top, left, width, height} = card.getBoundingClientRect();

const fadeContent = (element, opacity, duration = 3000) => {
    return new Promise(res => {
        [...element.children].forEach((child) => {
            requestAnimationFrame(() => {
                child.style.transition = `opacity ${duration}ms linear`;
                child.style.opacity = opacity;
                
            });
        })
        setTimeout(res, duration);
    })
}


cardClone.style.position = 'fixed';
cardClone.style.top = '50%';
cardClone.style.left = '50%';
cardClone.style.transform = 'translate(-50%,-50%)';
cardClone.style.width = '1000px';
cardClone.style.height = '93vh';
cardClone.style.lineHeight = '4';
card.style.opacity = '0';
card.parentNode.appendChild(cardClone);
//cardClone.appendChild(bild);
bild.style.display = 'block';



requestAnimationFrame(() => {
    element.style.transition = `
        width .35s eas-in-out,
        height .35s eas-in-out,
        left .35s eas-in-out,
        top .35s eas-in-out
    `;
    
    element.style.top = '0';
    element.style.left = '0';
    element.style.width = '100vh';
    element.style.height = '100vh';
});
const closeButton = document.createElement('button');
// position the close button top corner
closeButton.style = `
    position: fixed;
    z-index: 1;
    top: 35px;
    right: 35px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px solid white;
    background: red;
    box-shadow: 0 0 20px -5px rgba(white, .5);
    hover{
        background: red;
    }
`;
cardClone.appendChild(closeButton);
closeButton.addEventListener('click', async () => {
// remove the button on close
closeButton.remove();
// remove the display style so the original content is displayed right
cardClone.style.removeProperty('display');
cardClone.style.removeProperty('padding');
card.style.removeProperty('opacity');
// remove the clone card
cardClone.remove();
bildClone.remove();
});
}
cards.forEach(card => card.addEventListener('click', onCardClick));




// /**ScrollBar */
// let progbar = document.getElementById('progressbar');
// let totHeight = document.body.scrollHeight - window.innerHeight;
// window.onscroll = function (){
//     let progressHeit = (window.pageYOffset / totHeight) * 100;
//     progbar.style.height = progressHeit + "%";
// }

/**ProgressBar****/
const progressBar = document.querySelector('#progress-bar');
const section = document.querySelector('section');

const animatePBar = () =>{
    let scrollDistance = -section.getBoundingClientRect().top;
    let progressWidth =  (scrollDistance / (section.getBoundingClientRect().height - document.documentElement.clientHeight)) * 100;
    let val = 1 + Math.floor(progressWidth);
    //console.log(val);
    progressBar.style.width = val + "%";
}
window.addEventListener('scroll', animatePBar);


/* QUIZ */ 

const start = document.querySelector(".start_btn button");
const quizRules = document.querySelector(".quiz_rules");
const verlassen = quizRules.querySelector(".buttons .quit");
const vortsetzen = document.querySelector(".buttons .restart");
const fragenBox = document.querySelector(".fragen-Box");
const wahl = document.querySelector(".antworten");
const zeit = fragenBox.querySelector(".timer_sek");
const ergbox = document.querySelector(".ergebnis");
const nochmalSpielen = ergbox.querySelector(".nochmal");
const spielVerlassen = ergbox.querySelector(".verlassen");

start.onclick = ()=>{
    quizRules.classList.add("activerules");
}
verlassen.onclick = ()=>{
    quizRules.classList.remove("activerules");
}
vortsetzen.onclick = ()=>{
    quizRules.classList.remove("activerules");
    fragenBox.classList.add("activefragen");
    zeigeFragen(0);
    countinfooter(1);
    zaehlerStarten(20);
}
spielVerlassen.onclick = ()=>{
    window.location.reload();
}

let fragen_count = 0;
let footerzaehler = 1;
let zaehler;
let maxZeit  = 20;
let score = 0;
const naechstefrage = fragenBox.querySelector(".next");

/* nochmalSpielen.onclick = ()=>{
    ergbox.classList.remove("activerg");
    fragenBox.classList.add("activefragen");
    let fragen_count = 0;
    let footerzaehler = 1;
    let maxZeit  = 20;
    let score = 0;
    zeigeFragen(fragen_count);
    countinfooter(footerzaehler);
    clearInterval(zaehler);
    zaehlerStarten(maxZeit);
    naechstefrage.style.display = "none";
}
 */

naechstefrage.onclick = ()=>{
    if(fragen_count < fragen.length - 1){
        fragen_count++;
        footerzaehler++;
        zeigeFragen(fragen_count);
        countinfooter(footerzaehler);
        clearInterval(zaehler);
        zaehlerStarten(maxZeit);
        naechstefrage.style.display = "none";
    }
    else {
        console.log("finito");
        zeigeErgebnis();
    }
    
}
function zeigeFragen(index){
    const frage_text = document.querySelector(".frage"); 
    
    let frage = '<span> '+  fragen[index].nummer + ". "+ fragen[index].frage +' </span>';
    let antwort_wahl = '<div class="antwort"><span>'+fragen[index].wahl[0]+'</span></div>'
                      +'<div class="antwort"><span>'+fragen[index].wahl[1]+'</span></div>'
                      +'<div class="antwort"><span>'+fragen[index].wahl[2]+'</span></div>'
                      +'<div class="antwort"><span>'+fragen[index].wahl[3]+'</span></div>';
    frage_text.innerHTML = frage;
    wahl.innerHTML = antwort_wahl;
    const option = wahl.querySelectorAll(".antwort");
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "gewaehlteAntwort(this)");
    }
    
}

let checkIcon = '<div class="icon check"> <i class="fas fa-check"></i> </div>';
let timesIcon = '<div class="icon times"> <i class="fas fa-times"></i> </div>';

function gewaehlteAntwort(antwort){
    let nutzerAntwort = antwort.textContent;
    let richtigeAn = fragen[fragen_count].richtig;
    let alleAntworten = wahl.children.length;
    console.log(nutzerAntwort);
    console.log(richtigeAn);
    console.log(alleAntworten);
    if(nutzerAntwort == richtigeAn){
        antwort.classList.add("richtig");
        antwort.insertAdjacentHTML("beforeend", checkIcon);
        score++;
    }
    else{
        antwort.classList.add("falsch");
        antwort.insertAdjacentHTML("beforeend", timesIcon);
        for (let i = 0; i < alleAntworten; i++){
            if( wahl.children[i].textContent == richtigeAn){
                wahl.children[i].setAttribute("class", "antwort richtig");
                wahl.children[i].insertAdjacentHTML("beforeend", checkIcon);
            }
        }
    }
    // kein Auswahl maehr nach dem Userwahl 
    for (let i=0; i< alleAntworten; i++){
        wahl.children[i].classList.add("disabled");
        clearTimeout(zaehler);
    }
    naechstefrage.style.display = "block";
}
function zaehlerStarten(time){
    zaehler = setInterval(timer, 1000);
    function timer(){
        zeit.textContent = time;
        if(time < 9){
            let zero = zeit.textContent;
            zeit.textContent = "0" + zero;
        }
        if(time == 0){
            clearTimeout(zaehler);
            let richtigeAn = fragen[fragen_count].richtig;
            let alleAntworten = wahl.children.length;
            for (let i = 0; i < alleAntworten; i++){
                if( wahl.children[i].textContent == richtigeAn){
                    wahl.children[i].setAttribute("class", "antwort richtig");
                    wahl.children[i].insertAdjacentHTML("beforeend", checkIcon);
                }
            }
            for (let i=0; i< alleAntworten; i++){
                wahl.children[i].classList.add("disabled");
            }
            naechstefrage.style.display = "block";
        }
        time--;
    }
}

function countinfooter(index){
    const footercounter = fragenBox.querySelector(".fragenummer");
    let footertotalfragen = '<span> <p>' +  index + '</p> von <p>' + fragen.length + ' </p>  Fragen </span>';
    footercounter.innerHTML = footertotalfragen;
}

function zeigeErgebnis(){
    quizRules.classList.remove("activerules");
    fragenBox.classList.remove("activefragen");
    ergbox.classList.add("activerg");
    const punktzahl = ergbox.querySelector(".punktstand");
    const ergicon = ergbox.querySelector(".ergicon");
    const gratuliere = ergbox.querySelector(".text");
    if(score >=8){
        let text = "Gluckwünsche! Sie haben es geschafft! <p>&#128515;</p> ";
        let gluckwunsche = '<span>Sie haben <p>'+ score +'</p> Punkte gesammelt </p></span>';
        let winnerbild = '<img src="https://img.icons8.com/dusk/100/000000/trophy.png"/>';
        gratuliere.innerHTML = text;
        ergicon.innerHTML = winnerbild;
        punktzahl.innerHTML = gluckwunsche;
    }
    else{
        let text = "Shade! Nächstes Mal vielleicht! <p>&#128553;</p> ";
        let gluckwunsche = '<span>Sie haben <p>'+ score +'</p> Punkt(e) gesammelt </p></span>';
        let looserbild = '<img src="https://img.icons8.com/external-filled-outline-geotatah/100/000000/external-defeated-moba-multiplayer-online-battle-arena-filled-outline-filled-outline-geotatah.png"/>';
        gratuliere.innerHTML = text;
        ergicon.innerHTML = looserbild;
        punktzahl.innerHTML = gluckwunsche;
    }
    
}