import RecipeCard from "./components/recipeCard.js";
// Seleccionar el elemento del menu de navegacion
var items = document.querySelectorAll(".nav-item a");
items[1].setAttribute("aria-current", "page");
var container = document.getElementById("container");

const recipeCard = new RecipeCard("");

fetch("/api/modules/getRecipes")
	.then((response) => response.json())
	.then((json) => {
		json.map((recipe, i) => {
			// Crear una tarjeta de receta por cada receta
			recipeCard.buildCard(recipe, i);
			// Limpiar el contenedor de las tarjetas de recetas
			container.innerHTML = "";
			// Renderizar las tarjetas de recetas
			recipeCard.render("container");
		});
		// Si el numero de recetas es impar, crear una columna vacia
		if (json.length % 2 == 1)
			// jquery old - $("#container").append('<div class="col-sm mx-2">');
			document.getElementById("container").innerHTML +=
				'<div class="col-sm mx-2">';
	})
	.catch((error) => console.error(error))
	.catch((error) => console.error(error));
