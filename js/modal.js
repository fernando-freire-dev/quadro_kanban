const modal = document.getElementById("modalNovaTarefa");

const btnNovaTarefa = document.getElementById("btnNovaTarefa");
const btnCancelar = document.getElementById("btnCancelar");

btnNovaTarefa.addEventListener("click", abrirModal);
btnCancelar.addEventListener("click", fecharModal);

// Fecha clicando fora do modal
modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        fecharModal();

    }

});

function abrirModal() {

    modal.classList.remove("hidden");

    document.getElementById("titulo").focus();

}

function fecharModal() {

    modal.classList.add("hidden");

}
