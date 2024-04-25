document.addEventListener("DOMContentLoaded", function() {
    let cat1Select = document.getElementById("cat1");
    let cat2Select = document.getElementById("cat2");

    fetchCategorias(cat1Select);

    cat1Select.addEventListener("change", function() {
        let catID = this.value;

        if (catID) {
            fetchSubcategorias(catID,cat2Select);
        } else {
            clearSubcategorias();
        }
    });
});

function fetchCategorias(cat1Select) {
    fetch("index.php")
    .then(response => response.json())
    .then(data => {
        clearSelect(cat1Select);

        data.forEach(categoria => {
            let option = document.createElement("option");
            option.value = categoria.id;
            option.textContent = categoria.nomcategoria;
            cat1Select.appendChild(option);
        });
    })
    .catch(error => console.error("Error al cargar las categorías:", error));
}

function fetchSubcategorias(catID,cat2Select) {
    let formData = new FormData();
    formData.append("cat1", catID);
    fetch("index.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        clearSelect(cat2Select);

        data.forEach(subcategoria => {
            var option = document.createElement("option");
            option.value = subcategoria.id;
            option.textContent = subcategoria.nomsubcategoria;
            cat2Select.appendChild(option);
        });
    })
    .catch(error => console.error("Error al cargar las subcategorías:", error));
}

function clearSelect(select) {
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
}
