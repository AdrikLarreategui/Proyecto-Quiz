const startBtn = document.querySelector('#startButton')
const homeContainer = document.querySelector('#home')
const questionContainer = document.querySelector('#question')
const quizQuestionContainer = document.querySelector('#quizQuestion')
const btn1Container = document.querySelector('#btn1')
const btn2Container = document.querySelector('#btn2')
const btn3Container = document.querySelector('#btn3')
const btn4Container = document.querySelector('#btn4')
const nextBtnContainer = document.querySelector('#nextBtn')
const resultsContainer = document.querySelector('#results')
const resultBtnContainer = document.querySelector('#resultButton')

let questionCont = 9 //cuando esté construído el sistema de llamada a API iniciar a 0
let correctCont = 0

startBtn.addEventListener('click', ()=>{
  homeContainer.classList.add('hide')
  questionContainer.classList.remove('hide')
})

function nextQuestion(){

}

nextBtnContainer.addEventListener('click', ()=>{
  if(cont < 9){
    nextQuestion()
  } else if (cont === 9) {
    questionContainer.classList.add('hide')
    resultsContainer.classList.remove('hide')
  }
})

resultBtnContainer.addEventListener('click', ()=>{
  resultsContainer.classList.add('hide')
  homeContainer.classList.remove('hide')
  // questionCont = 0 cuando esté construído el sistema de llamada a API descomentar para que se reinicie el contador de preguntas al iniciar nuevo juego
})