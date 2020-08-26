function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( res => res.json())
  .then( states => {

    for(const state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}

populateUFs()

function getCities(event) {
  const citiesSelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`

  citiesSelect.innerHTML = "<option value>Selecione a Cidade</option>s"
  citiesSelect.disabled = true

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  fetch(url)
  .then( res => res.json())
  .then( cities => {
    for(const city of cities) {
      citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
  })
  citiesSelect.disabled = false

}

document.querySelector("select[name=uf]")
  .addEventListener("change", getCities)

// Itens de coleta
const itensToSelect = document.querySelectorAll(".itens-grid li")

for (const item of itensToSelect) {
  item.addEventListener("click", handleSelectedItem)
}

let selectItens = []

function handleSelectedItem(event) {
  const inputLi = document.querySelector("input[name=item]")
  const itemLi = event.target
  // adicionar ou remover classe 
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id

  // verificar se existem itens selecionados, se sim
  // pegar os itens selecionados

  const alreadySelected = selectItens.findIndex( item => item === itemId)

  // Se já tiver selecionado, tirar da seleção
  if(alreadySelected >= 0) {
    const filteredItens = selectItens.filter( item => item !== itemId)
    selectItens = filteredItens  
  } 
  // Se não tiver selecionado, colocar na seleção
  else {
    selectItens.push(itemId)
  }
  inputLi.value = selectItens

  
  
}