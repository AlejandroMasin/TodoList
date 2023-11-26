let inputBx = document.querySelector('#inputBx');
let list = document.querySelector('#list');

// Cargar los elementos desde localStorage si existen
function loadItemsFromStorage() {
    const items = JSON.parse(localStorage.getItem('todoItems')) || [];
    items.forEach(itemText => addItem(itemText));
}

// Guardar los elementos en localStorage
function saveItemsToStorage() {
    const items = Array.from(list.children).map(item => item.textContent);
    localStorage.setItem('todoItems', JSON.stringify(items));
}

// Evento al cargar la página para cargar elementos almacenados
window.addEventListener('DOMContentLoaded', () => {
    loadItemsFromStorage();
});

inputBx.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && this.value.trim() !== "") {
        addItem(this.value);
        this.value = "";
        saveItemsToStorage(); // Guardar elementos en localStorage después de añadir
    }
});

let addItem = (inputText) => {
    let listItem = document.createElement("li");
    listItem.textContent = inputText;
    listItem.innerHTML += '<i></i>';

    listItem.addEventListener("click", function () {
        this.classList.toggle('done');
        saveItemsToStorage(); // Guardar elementos en localStorage después de marcar como completado
    });

    listItem.querySelector("i").addEventListener("click", function (event) {
        event.stopPropagation(); // Detener la propagación para evitar que el elemento padre sea clicado
        listItem.remove();
        saveItemsToStorage(); // Guardar elementos en localStorage después de eliminar
    });

    list.appendChild(listItem);
};
