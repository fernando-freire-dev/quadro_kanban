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
        14,
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

        pdf.setFillColor(248,249,250);
        pdf.setDrawColor(220);

        pdf.roundedRect(
            x + 4,
            y,
            larguraColuna - 8,
            22,
            2,
            2,
            "FD"
        );

        const titulo = card
            .querySelector(".card-title")
            .innerText;

        pdf.setFontSize(10);
        pdf.setFont("helvetica","bold");

        pdf.text(
            titulo,
            x + 7,
            y + 7
        );

        y += 26;

    });

}
