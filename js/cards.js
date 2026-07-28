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

    document
        .getElementById("ideias")
        .appendChild(card);

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

    card
        .querySelector(".btn-delete")
        .addEventListener("click", ()=>{

            if(confirm("Excluir esta tarefa?")){

                card.remove();

            }

        });

    card
        .querySelector(".btn-edit")
        .addEventListener("click", ()=>{

            alert("Editar virá na próxima etapa.");

        });

    card.addEventListener("dblclick",()=>{

        editarCard(card);
    
    });

}

function editarCard(card){

    alert("Editar cartão");

}

function limparFormulario(){

    titulo.value="";
    descricao.value="";
    responsavel.value="";
    prioridade.value="baixa";

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

}
