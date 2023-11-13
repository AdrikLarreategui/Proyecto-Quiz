const apiUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
const questionElement = document.getElementById('questionStart');
const optionsElements = document.querySelectorAll('#options li');
const resultElement = document.getElementById('result');
const nextButton = document.getElementById('next-button');
const startBtn = document.getElementById('startButton')
const homeContainer = document.getElementById('home')
const questionContainer = document.querySelector('#question')
const resultsContainer = document.querySelector('#results')
const score = document.getElementById('textoPersonalizado')
const imageScore = document.querySelector('#notaFinal')
const tryAgainBtn = document.querySelector('#resultButton')
const statsPaint = document.querySelector('#paintStats')
const init = document.querySelector('#initCard')
const yourStats = document.querySelector('#stats')
const yourChart = document.getElementById('chart')

let currentQuestionIndex = 0;
let correctAnswers = 0;
let questions = [], stats = [], chart

// Cargar preguntas desde la API
async function loadQuestions() {
    try {
        const data = await axios.get(apiUrl);
        questions = data.data.results;
        displayQuestion(currentQuestionIndex);
    } catch (error) {
        console.error('Error al cargar preguntas desde la API:', error);
    }
}

async function statsFunction(){
  try {
    let request = '', statsArray = [], datesArray = []
    stats = JSON.parse(localStorage.getItem('yourStats'))
    for(let i = 0; i < stats.length; i++){
      request += `<span>Data: <span class="text-black-50"><b>${stats[i].answersData}</b></span>   //    
                  Correct answers: <span class="text-black-50"><b>${stats[i].correctAnswers}</b></span></span>`
    }

    statsPaint.innerHTML = request

    for(i = 0; i < stats.length; i++){
      if (statsArray.length === 0) {
        datesArray = [stats[i].answersData]
        statsArray = [stats[i].correctAnswers]
      } else {
        console.log(statsArray);
        datesArray.push(stats[i].answersData)
        statsArray.push(stats[i].correctAnswers)
      }
    }

    let options = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'quiz',
        data: statsArray
      }],
      xaxis: {
        categories: datesArray
      }
    }
    
    chart = new ApexCharts(document.querySelector("#chart"), options);
    
    chart.render();
    console.log(stats);
  } catch (error) {
    console.error(error.message);
  }
}

statsFunction()

// Mostrar una pregunta en la pantalla
function displayQuestion(index) {
    if (index < questions.length) {
        const question = questions[index];
        questionElement.innerHTML = `<p>${question.question}</p>`
        const options = question.incorrect_answers.slice();
        options.push(question.correct_answer);
        shuffleArray(options);
        optionsElements.forEach((option, i) => {
            option.innerHTML = `<span>${options[i]}</span>`
            option.addEventListener('click', checkAnswer);
        });
        resultElement.innerText = '';
    } else {
        // Fin del cuestionario
        imageScore.src = `images/${correctAnswers}-10.jpg`
        questionContainer.classList.add('hide')
        // resultsContainer.classList.remove('hide')
        score.innerText = `Respuestas correctas: ${correctAnswers} de 10`;
        nextButton.style.display = 'none';

        const date = new Date();
        // console.log(date.getMonth()); //comprobar valor devuelto, aparece un 10 cuando debe ser 11 
        const answersData = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        console.log(stats);
        if(stats != null){
          stats.push({
            answersData : answersData,
            correctAnswers : correctAnswers
          })
        } else {
          stats = [{
            answersData : answersData,
            correctAnswers : correctAnswers
          }]
        }
        console.log(stats);
        localStorage.setItem('yourStats', JSON.stringify(stats))
        currentQuestionIndex = 0
        correctAnswers = 0
        init.classList.add('hide')
        yourStats.classList.remove('hide')
        resultsContainer.classList.remove('hide')
        statsFunction()
    }
}

// Comprobar si la respuesta seleccionada es correcta
function checkAnswer(event) {
    const selectedOption = event.target.innerText;
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct_answer) {
        resultElement.classList.add('alert-success')
        resultElement.innerText = 'Respuesta correcta';
        correctAnswers++;
        resultElement.classList.remove('hide')
        setTimeout(() => {
            resultElement.classList.add('hide')
            resultElement.classList.remove('alert-success')
            resultElement.innerText = ''
            nextButton.classList.remove('disabled')
        }, 2000) 
    } else {
        resultElement.classList.add('alert-danger')
        resultElement.innerText = 'Respuesta incorrecta'; 
        resultElement.classList.remove('hide')
        setTimeout(() => {
            resultElement.classList.add('hide')
            resultElement.classList.remove('alert-danger')
            resultElement.innerText = ''
            nextButton.classList.remove('disabled')
        }, 1000) 
    }
    optionsElements.forEach((option) => option.removeEventListener('click', checkAnswer));
    nextButton.style.display = 'block';
    
}

// Barajar aleatoriamente un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Manejar el botón "Siguiente"
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextButton.classList.add('disabled')
    displayQuestion(currentQuestionIndex);
});

// Iniciar el cuestionario
startBtn.addEventListener('click', ()=>{
    loadQuestions()
    homeContainer.classList.add('hide')
    questionContainer.classList.remove('hide')
    yourStats.classList.add('hide')
  })

// reiniciar el juego
tryAgainBtn.addEventListener('click', ()=> {
  currentQuestionIndex = 0;
  correctAnswers = 0;
  questions = [];
  loadQuestions()
  resultsContainer.classList.add('hide')
  homeContainer.classList.remove('hide')
  init.classList.remove('hide')
  chart.remove()
})
