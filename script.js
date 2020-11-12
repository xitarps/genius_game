let order = [];
let clickedOrder = [];
let score = 0;
let lvl = 0

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

//documentquerySelector
const $ = (element) => document.querySelector(element)

const blue = $('.blue');
const red = $('.red');
const green = $('.green');
const yellow = $('.yellow');

//Game itself
window.onload = () => {
  AddNewElementtoArray();
  showArray();
}

//generate random color
const genereteRandomColor = () => Math.floor(Math.random() * 4);

//"push" new color to game array
let AddNewElementtoArray = () => order[lvl] = genereteRandomColor();

//get input and check if it's ok
let checkAndSaveInput = () => {
  if (JSON.stringify(order) === JSON.stringify(clickedOrder)) return(true);
  return false
}

//get input and check if it's ok
let checkInput = () => {
  let orderTmp = order.slice(0, clickedOrder.length);
  if (JSON.stringify(orderTmp) === JSON.stringify(clickedOrder)) return(true);
  return false
}

//light pressed button
let lightButton = (btn) =>{
  switch (btn) {
    case 0:
      green.classList.add('selected')
      break;
    case 1:
      red.classList.add('selected')
      break;
    case 2:
      yellow.classList.add('selected')
      break;
    case 3:
      blue.classList.add('selected')
      break;
  }
  setTimeout(() => {
    lightsOff();
  }, 1000);
}

//switch all lights off
let lightsOff = () =>{
  green.classList.remove('selected');
  red.classList.remove('selected');
  yellow.classList.remove('selected');
  blue.classList.remove('selected');
}

//show game order to player(promises)
let showArray = () => {
  const promisesArr = []

  //generate array of promises
  order.forEach(element => {

    let tmp_promisse = () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(lightButton(element)), 1800);
      })
    };

    promisesArr.push(tmp_promisse)
  });

  //execute chained promises(from array)
  (async function() {
    const asyncFunctions = promisesArr;
    await asyncFunctions.reduce(async (previousPromise, nextAsyncFunction) => {
      await previousPromise;
      const result = await nextAsyncFunction();
      //prevent cheating/following along
      clearUserArray()
    }, Promise.resolve());
  })();
  
  
}

//clears user array for the round
let clearUserArray = ()=> clickedOrder = [];

//user move
let makeUserMove = (val) => {
  clickedOrder.push(val);
  lightButton(val);
  if(checkInput()){
    if(order.length == clickedOrder.length){
      nextLevel();
    }
  }else{
    restartGame();
  }
}

//increase level
let nextLevel = () => {
  alert('Boa! vamos um passo adiante...')
  lvl++;
  score++;
  AddNewElementtoArray()
  showArray()
}

//reset all data and restart game
let restartGame = () => {
  alert(`Oops, você errou(ou foi apressado XD!) :(\nSua Pontuação é: ${score}\nVamos começar novamente :)!`)
  order = [];
  clickedOrder = [];
  score = 0;
  lvl = 0
  AddNewElementtoArray()
  showArray()
}

//set listener
green.onclick = () => makeUserMove(0)
red.onclick = () => makeUserMove(1)
yellow.onclick = () => makeUserMove(2)
blue.onclick = () => makeUserMove(3)
