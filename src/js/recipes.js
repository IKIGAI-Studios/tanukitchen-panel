import RecipeCard from "./components/recipeCard.js";
// Seleccionar el elemento del menu de navegacion
var items = document.querySelectorAll(".nav-item a");
items[1].setAttribute("aria-current", "page");

const recipeCard = new RecipeCard('');

// CREAR UNA FUNCION AUTOINVOCADA PARA QUE SE EJECUTE AL CARGAR LA PAGINA
(() => {
	fetch("/api/modules/getRecipes")
		.then((response) => response.json())
		.then((json) => {
			json.map((recipe, i) => {
				recipeCard.buildCard(recipe, i);
                recipeCard.render();
			});
			if (json.length % 2 == 1)
				$("#container").append('<div class="col-sm mx-2">');
		});
})();
