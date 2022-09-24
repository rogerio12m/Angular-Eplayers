$(document).ready(function () {
    
    $(".btn-primary").click(function () {
        alert("Este produto não está disponível");
    });

})


function abreFechaMenu() {
    let navbar = document.querySelector(".menu");
    navbar.classList.toggle("mostraEscondeMenu");
}