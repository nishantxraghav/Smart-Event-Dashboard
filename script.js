const form = document.getElementById("eventForm")
const container = document.getElementById("events")
const counter = document.getElementById("counter")

let events = JSON.parse(localStorage.getItem("events")) || []

function updateCounter(){
  counter.innerText = container.querySelectorAll(".card").length
}

function save(){
  localStorage.setItem("events",JSON.stringify(events))
}

function checkEmpty(){
  if(events.length === 0){
    container.innerHTML = `<div class="empty">No events yet 🚀</div>`
  }
}

function createCard(eventObj){

  const card = document.createElement("div")
  card.className = "card glass"

  const title = document.createElement("h3")
  title.innerText = eventObj.title

  const date = document.createElement("div")
  date.className="date"
  date.innerHTML = `<strong>${eventObj.date}</strong>`

  const desc = document.createElement("p")
  desc.textContent = eventObj.desc

  const actions = document.createElement("div")
  actions.className="actions"

  actions.innerHTML = `
    <button class="complete">✔</button>
    <button class="delete">🗑</button>
  `

  card.appendChild(title)
  card.appendChild(date)
  card.appendChild(desc)
  card.appendChild(actions)

  container.appendChild(card)
}

function render(){
  container.innerHTML=""
  events.forEach(createCard)
  updateCounter()
  checkEmpty()
}

render()

form.addEventListener("submit",function(e){
  e.preventDefault()

  const eventObj={
    title:title.value,
    date:date.value,
    desc:desc.value
  }

  events.push(eventObj)
  save()
  render()
  form.reset()
})

container.addEventListener("click",function(e){

  const card = e.target.closest(".card")
  const index = [...container.children].indexOf(card)

  if(e.target.classList.contains("delete")){
    events.splice(index,1)
    save()
    render()
  }

  if(e.target.classList.contains("complete")){
    card.classList.toggle("completed")
  }

})
