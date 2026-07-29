const btnExportar = document.getElementById("btnExportar");

const LAYOUT = {
    margem: 15,
    topo: 45,
    alturaColuna: 145,
    espacoCard: 26
};

btnExportar.addEventListener("click", exportarPDF);

function exportarPDF() {

    const { jsPDF } = window.jspdf;

    // A4 horizontal
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    });

    desenharCabecalho(pdf);
    desenharQuadro(pdf);

    pdf.save("Kanban.pdf");

}

function desenharCabecalho(pdf){

    const largura = pdf.internal.pageSize.getWidth();

    // Fundo do cabeçalho
    pdf.setFillColor(37,99,235);
    pdf.rect(0,0,largura,22,"F");

    // Título
    pdf.setTextColor(255,255,255);
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(20);

    pdf.text(
        "KANBAN - PROJETO MULTIDISCIPLINAR",
        largura/2,
        10,
        {align:"center"}
    );

    // Volta para texto preto
    pdf.setTextColor(0,0,0);

    pdf.setFontSize(11);
    pdf.setFont("helvetica","normal");

    const projeto =
        document.getElementById("nomeProjeto").value || "Sem nome";

    const data = new Date().toLocaleDateString("pt-BR");

    pdf.text(`Projeto: ${projeto}`,15,32);

    pdf.text(
        `Data: ${data}`,
        largura-15,
        32,
        {align:"right"}
    );

    // Linha separadora
    pdf.setDrawColor(200);

    pdf.line(
        15,
        36,
        largura-15,
        36
    );

}

function desenharQuadro(pdf) {

    const largura = pdf.internal.pageSize.getWidth();

    const margem = 15;
    const topo = 45;

    const larguraQuadro = largura - (margem * 2);

    const larguraColuna = larguraQuadro / 4;

    const altura = 145;

    const colunas = [

        {
            id: "ideias",
            titulo: "Ideias",
            cor: [59,130,246]
        },
        {
            id: "afazer",
            titulo: "A Fazer",
            cor: [245,158,11]
        },
        {
            id: "fazendo",
            titulo: "Em andamento",
            cor: [147,51,234]
        },
        {
            id: "concluido",
            titulo: "Concluído",
            cor: [34,197,94]
        }
    
    ];

    colunas.forEach((coluna, indice) => {

    const x = margem + (indice * larguraColuna);

    // Corpo da coluna
    pdf.setFillColor(255,255,255);
    pdf.setDrawColor(210);
    pdf.roundedRect(
        x,
        topo,
        larguraColuna,
        altura,
        2,
        2,
        "FD"
    );

    // Cabeçalho
    pdf.setFillColor(...coluna.cor);
    pdf.rect(
        x,
        topo,
        larguraColuna,
        12,
        "F"
    );

    pdf.setTextColor(255);
    pdf.setFont("helvetica","bold");
    pdf.setFontSize(11);

    pdf.text(
        coluna.titulo,
        x + larguraColuna / 2,
        topo + 8,
        { align: "center" }
    );

    pdf.setTextColor(0);

    desenharCards(pdf, x, topo, larguraColuna, coluna.id);

});

};

function desenharCards(pdf, x, topo, larguraColuna, idColuna) {

    const cards = document.querySelectorAll(`#${idColuna} .card`);

    let y = topo + 18;

    cards.forEach(card => {

        // Fundo do cartão
        pdf.setFillColor(250,250,250);
        pdf.setDrawColor(215);

        pdf.roundedRect(
            x + 4,
            y,
            larguraColuna - 8,
            30,
            2,
            2,
            "FD"
        );

        const titulo =
            card.querySelector(".card-title").innerText;

        const descricao =
            card.querySelector(".card-description").innerText;

        const usuario = card
            .querySelector(".card-user")
            .innerText
            .replace(/[^\x00-\x7F]/g, "")
            .trim();

        const prioridadeEl = card.querySelector(".priority");

        const prioridade = prioridadeEl.innerText;
        
        let corPrioridade = [34,197,94]; // verde
        
        if (prioridadeEl.classList.contains("media")) {
            corPrioridade = [245,158,11];
        }
        
        if (prioridadeEl.classList.contains("alta")) {
            corPrioridade = [239,68,68];
        }
        pdf.setFillColor(...corPrioridade);

        pdf.roundedRect(
            x + larguraColuna - 24,
            y + 23,
            16,
            5,
            2,
            2,
            "F"
        );
        
        pdf.setTextColor(255);
        pdf.setFontSize(6);
        
        pdf.text(
            prioridade,
            x + larguraColuna - 16,
            y + 26.5,
            { align: "center" }
        );
        
        pdf.setTextColor(0);

        // Título
        pdf.setFont("helvetica","bold");
        pdf.setFontSize(10);

        pdf.text(
            titulo,
            x + 7,
            y + 6
        );

        // Descrição
        pdf.setFont("helvetica","normal");
        pdf.setFontSize(8);

        const linhas =
            pdf.splitTextToSize(
                descricao,
                larguraColuna - 14
            );

        pdf.text(
            linhas,
            x + 7,
            y + 12
        );

        // Linha separadora
        pdf.setDrawColor(230);

        pdf.line(
            x + 6,
            y + 22,
            x + larguraColuna - 6,
            y + 22
        );

        // Responsável
        pdf.setFontSize(7);

        pdf.text(
            usuario,
            x + 7,
            y + 27
        );

        // Prioridade
        pdf.text(
            prioridade,
            x + larguraColuna - 10,
            y + 27,
            {align:"right"}
        );

        y += 34;

    });

}
