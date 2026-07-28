const btnExportar = document.getElementById("btnExportar");

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
        "KANBAN LITE",
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
