import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

function generateCard(){
  let possibleSuits = ["spade","club","diamond","heart"];
  let possibleNumbers = ["A","2","3","4","5","6","7","8","9","10","J","K","Q","Jkr"];
  let selectedNumber = randomlyPick(possibleNumbers);
  let selectedSuit = (selectedNumber!=="Jkr") ? randomlyPick(possibleSuits): "Jkr";
  assembleCard("suit",selectedSuit);
  assembleCard("cardNum",selectedNumber);
  assembleCard("flipSuit",selectedSuit);
  moveBar();
}

function assembleCard(id,value){
  let selectedId = document.querySelector(`#${id}`);
  if("suit"===id || "flipSuit"===id){
    let suitStatus = (id === "flipSuit") ? ' id="upsideDown"': '';
    let suitColor = (value === "heart" || value === "diamond") ? "text-danger": "";
    selectedId.innerHTML = `<i class="bi bi-suit-${value}-fill fs-1 ${suitColor}"${suitStatus}></i>`;
  }else if("cardNum" === id){
    selectedId.innerHTML = value;
  }else{
    selectedId.innerHTML = "ERROR";
  }
  
}

function randomlyPick(array){
  return array[Math.floor(Math.random()*array.length)];
}

function setupRedraw(){
  let redrawButton = document.querySelector("#redraw");
  redrawButton.addEventListener('click',()=>{
    timerCheck++;
  });
}

// A global variable that tracks if extra timers triggerd by the button
var timerCheck = 0;

function moveBar(){
  let bar = document.querySelector("#refreshProgress");
  let width = 1;
  const track = function(){
    if(100 <= width || timerCheck !==0){
      timerCheck = 0;
      clearInterval(progress);
      generateCard();
    }else{
      width++;
      bar.style.width = width + "%";
      
    }
  }
  let progress = setInterval(track,100);
  
}

function setupResize(){
  let heightInput = document.querySelector("#height");
  let widthInput = document.querySelector("#width");
  let resizeButton = document.querySelector("#resize");
  let defaultButton = document.querySelector("#default");
  let card = document.querySelector("#card");
  const sizeAdjust = ()=>{
    card.style.width = (widthInput.value >=100) ? widthInput.value+"px":"100px";
    card.style.height = (heightInput.value >=300) ? heightInput.value+"px":"300px";
  }
  resizeButton.addEventListener('click',sizeAdjust);
  defaultButton.addEventListener('click',()=>{
    card.style.height = "25rem";
    card.style.width = "18rem";
  })
}

window.onload = function() {
  generateCard();
  setupRedraw();
  setupResize();

};

