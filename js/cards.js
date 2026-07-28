const btnSalvar = document.getElementById("btnSalvar");

btnSalvar.addEventListener("click", criarCard);

function criarCard() {

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const responsavel = document.getElementById("responsavel").value.trim();
    const prioridade = document.getElementById("prioridade").value;

    if (titulo === "") {

        alert("Informe um título.");

        return;

    }

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
                👤 ${responsavel || "Não informado"}
            </div>

            <div class="priority ${prioridade}">
                ${textoPrioridade(prioridade)}
            </div>

        </div>

        <div class="card-actions">

            <button class="btn-edit">
                ✏️
            </button>

            <button class="btn-delete">
                🗑️
            </button>

        </div>

    `;

    document
        .getElementById("afazer")
        .appendChild(card);

    limparFormulario();

    fecharModal();

}

function textoPrioridade(p) {

    switch (p) {

        case "alta":
            return "🔴 Alta";

        case "media":
            return "🟡 Média";

        default:
            return "🟢 Baixa";

    }

}

function limparFormulario() {

    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("responsavel").value = "";
    document.getElementById("prioridade").value = "baixa";

}
