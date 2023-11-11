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
let correctCont = 0, questionsArray = [], randomAnswer


async function getQuestionsList(){
  await axios.get('https://opentdb.com/api.php?amount=10&type=multiple') //una vez tengamos el token, cambiar url por https://opentdb.com/api.php?amount=10&token=YOURTOKENHERE
  .then((resul)=>{
    questionsArray = resul.data.results
    console.log(questionsArray, resul.data.response_code);
  })
  .catch((error)=>{
    console.log(error.data.response_code)
    // si resul.data.response_code es 4 hay que resetear el token y volver a llamar a la función
    if(error.data.response_code === 4){
      axios.get('https://opentdb.com/api_token.php?command=reset&token=YOURTOKENHERE')
      getQuestionsList()
    }
  })
}
function eraseArray (randomAnswer, optionsArray) {
  optionsArray.splice(randomAnswer, 1)
}

function randomNumber (optionsArray) {
  randomAnswer = Math.floor(Math.random()*(optionsArray.length-1))
  return randomAnswer
}

function startQuiz () {
  let options = questionsArray[0].incorrect_answers
  options.push(questionsArray[0].correct_answer)
  randomAnswer = randomNumber(options)
  console.log(randomAnswer, 'hola')
  quizQuestionContainer.innerText = decodeURIComponent(questionsArray[0].question)
  btn1Container.innerText = decodeURIComponent(options[randomAnswer])
  eraseArray(randomAnswer, options)
  randomAnswer = randomNumber(options)
  btn2Container.innerText = decodeURIComponent(options[randomAnswer])
  eraseArray(randomAnswer, options)
  randomAnswer = randomNumber(options)
  btn3Container.innerText = decodeURIComponent(options[randomAnswer])
  eraseArray(randomAnswer, options)
  randomAnswer = randomNumber(options)
  btn4Container.innerText = decodeURIComponent(options[randomAnswer])
  eraseArray(randomAnswer, options)
  randomAnswer = randomNumber(options)
}

startBtn.addEventListener('click', ()=>{
  getQuestionsList()
  homeContainer.classList.add('hide')
  questionContainer.classList.remove('hide')
  setTimeout(startQuiz, 500)
})


function nextQuestion(){
  // questionCont++

}

nextBtnContainer.addEventListener('click', ()=>{
  if(questionCont < 9){
    nextQuestion()
  } else if (questionCont === 9) {
    questionContainer.classList.add('hide')
    resultsContainer.classList.remove('hide')
    btn1Container.classList.remove('correctColor')
    btn1Container.classList.remove('incorrectColor')
  }
})

resultBtnContainer.addEventListener('click', ()=>{
  resultsContainer.classList.add('hide')
  homeContainer.classList.remove('hide')
  // questionCont = 0 cuando esté construído el sistema de llamada a API descomentar para que se reinicie el contador de preguntas al iniciar nuevo juego
})

btn1Container.addEventListener('click', () => {
  if (questionsArray[0].correct_answer === btn1Container.textContent) {
    btn1Container.classList.add('correctColor')
  } else {
    btn1Container.classList.add('incorrectColor')
  }
})