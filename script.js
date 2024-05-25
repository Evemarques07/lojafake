const formulario_loja = document.querySelector("#formulario_loja")
const formulario_cadastro = document.querySelector("#formulario_cadastro")
const produto = document.querySelector("#produto")
const titulo = document.querySelector("#titulo")
const descricao = document.querySelector("#descricao")
const preco = document.querySelector("#preco")
const imagem = document.querySelector("#imagem")
const categoria = document.querySelector("#categoria")
const cardsSection = document.querySelector("#cards")
let listaProdutos = []

async function cadastrandoProduto(novoProduto) {
    const resposta = await fetch("https://fakestoreapi.com/products/", {
        method: "POST",
        body: JSON.stringify(novoProduto)
    })
    const dados = await resposta.json()
    console.log(dados);
}

document.addEventListener("DOMContentLoaded", () => {
    const listaProdutosString = localStorage.getItem("listaProdutos")
    if (listaProdutosString) {
        listaProdutos = JSON.parse(listaProdutosString)
        renderizarLista()
    }
})

async function criarCatalogo() {
    const resposta = await fetch("https://fakestoreapi.com/products")
    const dados = await resposta.json()
    listaProdutos = dados
    localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos))
    renderizarLista()
}

formulario_loja.addEventListener("submit", (e) => {
    e.preventDefault()
    const termoBusca = produto.value.toLowerCase()
    const produtosFiltrados = listaProdutos.filter(produto => produto.title.toLowerCase().includes(termoBusca))
    renderizarLista(produtosFiltrados)
})

formulario_cadastro.addEventListener("submit", async (e) => {
    e.preventDefault()
    const novoProduto = {
        title: titulo.value,
        description: descricao.value,
        image: imagem.value,
        price: parseFloat(preco.value)
    }
    await cadastrandoProduto(novoProduto)
    listaProdutos.push(novoProduto)
    localStorage.setItem("listaProdutos", JSON.stringify(listaProdutos))
    renderizarLista()
    formulario_cadastro.reset()
})

function renderizarLista(produtos = listaProdutos) {
    cardsSection.innerHTML = ""
    produtos.forEach(produto => {
        const card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <h2>${produto.title}</h2>
            <img src="${produto.image}" alt="${produto.title}">
            <p>${produto.price}</p>
        `
        cardsSection.appendChild(card)
    })
}

criarCatalogo()
