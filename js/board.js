document.querySelectorAll(".cards").forEach(lista=>{

    new Sortable(lista,{

        group:"kanban",

        animation:180,

        ghostClass:"sortable-ghost",

        chosenClass:"sortable-chosen",

        dragClass:"sortable-drag",

        onStart(evt){

            evt.to.parentElement.classList.add("drag-over");

        },

        onEnd(){

            document.querySelectorAll(".column").forEach(col=>{

                col.classList.remove("drag-over");

            });

        },

        onMove(evt){

            document.querySelectorAll(".column").forEach(col=>{

                col.classList.remove("drag-over");

            });

            evt.to.parentElement.classList.add("drag-over");

        }

    });

});
