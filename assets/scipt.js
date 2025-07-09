const form = document.getElementById('form')
const api = document.getElementById('senha')
const jogo = document.getElementById('jogo')
const quest = document.getElementById('ex')
const button = document.getElementById('perguntar')

const showdownJS = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}
const res = document.getElementById('res')

const askGemini = async (question, game, key) => {
 const modelo = "gemini-2.5-flash"
 const URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${key}`
 const pergunta = `
 ## Especialidade
 Você é um especialista assistente de meta para o jogo ${game}

 ## Tarefa
 Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, builds e dicas

 ## Regras
 - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.

 - Se a pergunta não está relacionada com o jogo, responda com 'Essa pergunta não está relacionada com o jogo'

 - Considere a data atual ${new Date().toLocaleDateString()}

 - Faça pesquisas atualiadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.

 - Nunca responda itens de que você não tenha certeza de que existe no patch atual.

 ## Resposta

  - Economize na resposta, seja direto e responda no máxmo 500 caracteres. 
  
  - Responda em markdown

  - Não precisa de saudação ou despedida, apenas ao que o usuário está querendo.

  ## Exemplo de resposta
  Pergunta do usuário: Melhor build rengar jungle
  Resposta: A build mais atual é: \n\n **Itens:**\n\n coloque os itens aqui. \n\n**Runas:\n\nexemplo de runas\n\n

  ---
  Aqui está a pergunta do usuário: ${question}


 `
 const contents = [{
    role:"user",
    parts:[{
        text : pergunta
    }]

    
 }]

 const tools = [{
 google_search: {}

}]

 const response = await fetch(URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        contents,
        tools
    })
 })


const data = await response.json()
console.log({data})
return data.candidates[0].content.parts[0].text

}

/*AIzaSyBeiGt9XIQ6J7i4p7f7teraN4BfAQ-zOys*/

const enviar = async (event) => {
    event.preventDefault()
  const key = api.value
  const game = jogo.value
  const question = quest.value

  if(key == '' || game == '' || question == '') {

    alert('Por favor preencha todos os campos')
    return
 
    
  } 
    button.disabled = true
    button.textContent = 'Buscando informação...'
    button.classList.add('load')

  try {
  const text = await askGemini (question, game, key)

  res.querySelector('.response').innerHTML = showdownJS (text)
  res.classList.remove('hidden')
  } catch(error) {
    console.log('Erro: ', error)
  } finally {
    button.disabled = false
    button.textContent = ('Perguntar')
    button.classList.remove('load')
  }
}


form.addEventListener('submit', enviar)