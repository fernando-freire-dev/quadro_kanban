const listas = document.querySelectorAll(".cards");

listas.forEach(lista => {

    new Sortable(lista, {

        group: "kanban",

        animation:200,

        ghostClass:"sortable-ghost",

        chosenClass:"sortable-chosen",

        dragClass:"sortable-drag"

    });

});
