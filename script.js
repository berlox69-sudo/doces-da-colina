const produtos = [
    {
        nome: "Bolo de Chocolate" ,
        categoria: "Bolos",
        descrição: "Bolo de chocolate húmido e intenso, perfeito para os amantes de cacau.",
        tamanhos: {
            "24 cm": 16,
            "26 cm": 18
        }
    },

    {
        nome: "Bolo de Limão" ,
        categoria: "Bolos",
        descrição: "Bolo leve e aromático, com o equilibrio perfeito entre doce e cítrico.",
        tamanhos: {
            "24 cm": 14,
            "26 cm": 16
        }
    },

    {
        nome: "Red Velvet" ,
        categoria: "Bolos",
        descrição: "Clássico bolo vermelho de textura suave, coberto com delicioso creme de queijo.",
        tamanhos: {
            "24 cm": 22,
            "26 cm": 25
        }
    },

    {
        nome: "Bolo Mármore" ,
        categoria: "Bolos",
        descrição: "Combinação tradicional de massa de baunilha e chocolate num só bolo.",
        tamanhos: {
            "24 cm": 12,
            "26 cm": 14
        }
    },

    {
        nome: "Bolo de Bolacha" ,
        categoria: "Bolos",
        descrição: "Bolo delicioso feito com bolachas crocantes, perfeito para os amantes de sabores clássicos.",
        tamanhos: {
            "Natas": 15,
            "Manteiga": 15
        }
    },

    {
        nome: "Cheescake Frutos Vermelhos" ,
        categoria: "Cheesecakes e semifrios",
        descrição: "Cheesecake cremoso com uma base crocante e cobertura de frutos vermelhos frescos.",
        tamanhos: {
            "20 cm": 18,
            "30 cm": 26
        }
    },

    {
        nome: "Cheescake de Limão" ,
        categoria: "Cheesecakes e semifrios",
        descrição: "Cheesecake refrescante com sabor de limão, perfeita para os amantes de cítricos.",
        tamanhos: {
            "20 cm": 17,
            "30 cm": 24
        }
    },

    {
        nome: "Semifrio de Café" ,
        categoria: "Cheesecakes e semifrios",
        descrição: "Semifrio fresco e cremoso com o sabor intenso de café.",
        tamanhos: {
            "20 cm": 14,
            "30 cm": 20
        }
    },

    {
        nome: "Tarte de Amêndoa Tradicional" ,
        categoria: "Tartes",
        descrição: "Tarte crocante coberta com amêndoa caramelizada, um clássico irresistível.",
        tamanhos: {
            "20 cm": 14,
            "30 cm": 20
        }
    },

    {
        nome: "Tarte de Amêndoa com Caramelo Salgado" ,
        categoria: "Tartes",
        descrição: "A combinação perfeita entre amêndoa crocante e caramelo salgado.",
        tamanhos: {
            "20 cm": 16,
            "30 cm": 24
        }
    },

    {
        nome: "Mousse de Chocolate" ,
        categoria: "Sobremesas",
        descrição: "Mousse leve e aveludada com sabor intenso a chocolate.",
        tamanhos: {
            "Dose": 8
        }
    },

    {
        nome: "Mousse de Manga" ,
        categoria: "Sobremesas",
        descrição: "Mousse fresca e tropical, preparada com manga de sabor suave.",
        tamanhos: {
            "Dose": 8
        }
    },

    {
        nome: "Mousse de Maracujá" ,
        categoria: "Sobremesas",
        descrição: "Mousse cremosa com o toque exótico e refrescante do maracujá.",
        tamanhos: {
            "Dose": 8
        }
    },

    {
        nome: "Baba de Camelo" ,
        categoria: "Sobremesas",
        descrição: "Sobremesa tradicional, cremosa e rica em sabor.",
        tamanhos: {
            "Dose": 10
        }
    },
    
    {
        nome: "Pudim de Ovos" ,
        categoria: "Sobremesas",
        descrição: "Pudim caseiro de textura suave e cobertura de caramelo.",
        tamanhos: {
            "Dose": 12
        }
    }
];

let carrinho = [];

const produtosDiv =
document.getElementById("produtos");
const listaCarrinho =
document.getElementById("listaCarrinho");
const totalSpan =
document.getElementById("total");
const contadorSpan =
document.getElementById("contador");
const categorias = [...new Set(produtos.map(produto => produto.categoria))];

categorias.forEach(categoria => {

    const titulo =
    document.createElement("h2");
    titulo.textContent = categoria;
    produtosDiv.appendChild(titulo);

    const secaoCategoria =
    document.createElement("div");
    secaoCategoria.classList.add("produtos");
    produtosDiv.appendChild(secaoCategoria);

    produtos.filter(produto => produto.categoria === categoria)
    .forEach((produto, index) => {

    const card =
    document.createElement("div");
    card.classList.add("produto");

    let opcoes = "";

    for(const tamanho in produto.tamanhos)
    {
        opcoes += `<option value="${tamanho}">${tamanho} - ${produto.tamanhos[tamanho]}€</option>`;
    }

    card.innerHTML = `
    
    <h3>${produto.nome}</h3>
    <p>${produto.descrição}</p>
    
    <select id="tamanho-${index}">${opcoes}
    </select>
    
    <input
    type="number"
    id="quantidade-${index}"
    min="1"
    value="1"
    >
    
    <button
    onclick="adicionarCarrinho(${index})">
    Adicionar ao Carrinho
    </button>
    `;

    secaoCategoria.appendChild(card);
});

});

function adicionarCarrinho(index){

    const produto = produtos[index];

    const tamanhoSelecionado =
    document.getElementById(`tamanho-${index}`).value;

    const quantidade =
    parseInt(

        document.getElementById(`quantidade-${index}`).value
    );

    const preco =
    produto.tamanhos[tamanhoSelecionado];

    const itemExistente =
    carrinho.find(item =>
        item.nome === produto.nome &&
        item.tamanho ===
        tamanhoSelecionado
    );

    if(itemExistente){
        itemExistente.quantidade += quantidade;

    }else{
        carrinho.push({
            nome: produto.nome,
            tamanho: tamanhoSelecionado,
            preco: preco,
            quantidade: quantidade
        });
    }
    atualizarCarrinho();
}

function atualizarCarrinho(){
    listaCarrinho.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(item => {
        const li =
        document.createElement("li");

        li.textContent =
        `${item.nome} (${item.tamanho}) x${item.quantidade} - ${(item.preco *
        item.quantidade).toFixed(2)}€`;

        listaCarrinho.appendChild(li);

        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade;

    });

    totalSpan.textContent =
    total.toFixed(2) + "€";
    contadorSpan.textContent = quantidadeTotal;
}

const btnCarrinho =
document.getElementById("btnCarrinho");
const carrinhoDiv =
document.getElementById("carrinho");
const fecharCarrinho =
document.getElementById("fecharCarrinho");

btnCarrinho.addEventListener("click", () => {

    carrinhoDiv.classList.remove("carrinho-fechado");
});

fecharCarrinho.addEventListener("click",
    () => {
        carrinhoDiv.classList.add("carrinho-fechado");
    });

const btnFinalizar = 
document.getElementById("finalizarEncomenda");

const formulario =
document.getElementById("formularioEncomenda");

btnFinalizar.addEventListener("click", () => {
    if(carrinho.length === 0){
        alert("O carrinho está vazio.");
        return;
    }

    formulario.style.display = "block";

    carrinhoDiv.classList.add("carrinho-fechado");

    formulario.scrollIntoView({behavior: "smooth"});
});

document.getElementById("enviarEncomenda").addEventListener("click", () => {

    const nome =

    document.getElementById("nomeCliente").value.trim();

    const telefone =
    document.getElementById("telefoneCliente").value.trim();

    const email =
    document.getElementById("emailCliente").value.trim();

    const morada =
    document.getElementById("moradaCliente").value.trim();

    const observacoes =
    document.getElementById("observacoes").value.trim();


    if(!nome || !telefone || !email || !morada){alert("Preencha todos os campos obrigatórios.");
        return;
    }

    let produtosTexto = "";

    carrinho.forEach(item => {
        produtosTexto += `- ${item.nome} (${item.tamanho}) x${item.quantidade}\n`;
    })

    const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

    const mensagem = `Nova Encomenda - Doces da Colina

    Nome: ${nome}
    Telefone: ${telefone}
    Morada: ${morada}
    
    Produtos:
    ${produtosTexto}

    Total: ${total.toFixed(2)}€;

    Observações: ${observacoes || "Nenhuma"}`;

    const numeroWhatsApp = "351924735493";

    const urlWhatsApp = `https://wa.me/${351924735493}?text=${encodeURIComponent(mensagem)}`;

    window.open(urlWhatsApp, "_blank");

    
});
