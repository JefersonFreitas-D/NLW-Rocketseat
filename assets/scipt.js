const form = document.getElementById('form')
const api = document.getElementById('senha')
const jogo = document.getElementById('jogo')
const quest = document.getElementById('ex')
const button = document.getElementById('perguntar')
const res = document.getElementById('response')

const enviar = (event) => {
    event.preventDefault()
console.log(event)
}

form.addEventListener('submit', enviar)