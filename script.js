const quizData = [
    {
        question: "Which wallet does OV recommend you start with?",
        a: "Metamask",
        b: "Uniswap",
        c: "Argent",
        d: "Luno",
        correct: "a",
    },
    {
        question: "Where did we mention is the safest crypto storage?",
        a: "C:Hardrive",
        b: "Wallet",
        c: "Exchange",
        d: "Ledger",
        correct: "d",
    },
    {
        question: "What will happen once you pass Atlas?",
        a: "Join Ascent",
        b: "Start Base Camp",
        c: "Get funding valuation",
        d: "Conduct product presentation",
        correct: "b",
    },
];
const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')
let currentQuiz = 0
let score = 0
loadQuiz()
function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}
function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       }
       currentQuiz++
       if(currentQuiz < quizData.length) {
           loadQuiz()
       } else {
        quiz.innerHTML = `
        <h2>🚨  You answered ${score}/${quizData.length} questions correctly  🚨</h2> 
        <a class="twitter-share-button" href="https://twitter.com/intent/tweet?text=I got "+score+" correct out of "+quizData.length+" questions on the 🤖 Atlas Quiz by Outlier Ventures today!" id="twitter-button">Share results on Twitter</a>
        `
        document.getElementById("twitter-button").setAttribute("href", "https://twitter.com/intent/tweet?text=I got "+score+" correct out of "+currentQuiz+" on the 🤖 Atlas Quiz by Outlier Ventures today!");
       }
    }
})


/* Metamask button */
window.userWalletAddress = null
const loginButton = document.getElementById('loginButton')
const userWallet = document.getElementById('userWallet')
const examLink =document.getElementById('examLink')

function toggleButton() {
  if (!window.ethereum) {
    loginButton.innerText = '🤔 MetaMask is not installed'
    return false
  }

  loginButton.addEventListener('click', loginWithMetaMask)
}

async function loginWithMetaMask() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((e) => {
      console.error(e.message)
      return
    })
  if (!accounts) { return }

  window.userWalletAddress = accounts[0]
  userWallet.innerText = window.userWalletAddress
  loginButton.innerText = '🔓 Sign out of MetaMask'
  examLink.innerText = 'Start the Atlas Exam now'

  loginButton.removeEventListener('click', loginWithMetaMask)
  setTimeout(() => {
    loginButton.addEventListener('click', signOutOfMetaMask)
  }, 200)
}

function signOutOfMetaMask() {
  window.userWalletAddress = null
  userWallet.innerText = ''
  loginButton.innerText = '🔒 Sign in with MetaMask'
  examLink.innerText = ''

  loginButton.removeEventListener('click', signOutOfMetaMask)
  setTimeout(() => {
    loginButton.addEventListener('click', loginWithMetaMask)
  }, 200)
}

window.addEventListener('DOMContentLoaded', () => {
  toggleButton()
});