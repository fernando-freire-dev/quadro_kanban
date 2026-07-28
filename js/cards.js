const btnSalvar = document.getElementById("btnSalvar");

btnSalvar.addEventListener("click", salvarCard);

function salvarCard() {

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const responsavel = document.getElementById("responsavel").value.trim();
    const prioridade = document.getElementById("prioridade").value;

    if (!titulo) {

        alert("Informe o título da tarefa.");
        return;

    }

    const card = montarCard(
        titulo,
        descricao,
        responsavel,
        prioridade
    );

    // Coluna onde a tarefa será criada
    const coluna = document.getElementById("afazer");

    // Remove o placeholder, se existir
    coluna.querySelector(".empty")?.remove();

    // Adiciona o cartão
    coluna.appendChild(card);

    // Animação de entrada
    card.animate(
        [
            {
                opacity: 0,
                transform: "translateY(-15px)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],
        {
            duration: 250,
            easing: "ease-out"
        }
    );

    limparFormulario();

    fecharModal();

}

function montarCard(titulo, descricao, responsavel, prioridade) {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `

        <div class="card-title">
            ${titulo}
        </div>

        <div class="card-description">
            ${descricao}
        </div>

        <div class="card-footer">

            <div class="card-user">

                👤 ${responsavel || "-"}

            </div>

            <div class="priority ${prioridade}">

                ${textoPrioridade(prioridade)}

            </div>

        </div>

        <div class="card-delete" title="Excluir tarefa">

            ✕
        
        </div>

    `;

    configurarEventos(card);

    return card;

}

function configurarEventos(card){

    // Excluir
    card
        .querySelector(".card-delete")
        .addEventListener("click",(e)=>{

            e.stopPropagation();

            if(confirm("Excluir esta tarefa?")){

                card.remove();

            }

        });

    // Editar
    card.addEventListener("dblclick",()=>{

        editarCard(card);

    });

}

function editarCard(card){

    alert("Editar cartão");

}

function limparFormulario(){

    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("responsavel").value = "";
    document.getElementById("prioridade").value = "baixa";

}

function textoPrioridade(prioridade){

    switch(prioridade){

        case "alta":
            return "ALTA";

        case "media":
            return "MÉDIA";

        default:
            return "BAIXA";

    }

}
