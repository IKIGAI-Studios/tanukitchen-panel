/**
 * @fileoverview  recipeCard.js
 * @description Archivo encargado de renderizar las tarjetas de las recetas
 */
export default class RecipeCard {
	/**
	 * @constructor
	 * @description Constructor de la clase
     * @param {String} htmlTags String que contiene el html de las tarjetas de las recetas
	 * @returns {void}
	 **/
	constructor(htmlTags) {
        this.htmlTags = htmlTags;
    }

	/**
	 * @method
	 * @param {Object} recipe Objeto que contiene la informacion de la receta
	 * @param {Number} i Indice de la receta
	 * @returns {void}
	 */
	buildCard(recipe, i) {
		this.htmlTags +=
			'<div class="col-sm mx-2" onclick="window.location.replace(\'/recipe/' +
			recipe._id +
			"')\">" +
			'<div class="d-flex justify-content-center">' +
			'<div class="tk-recipes-label">' +
			recipe.name +
			"</div>" +
			"</div>" +
			'<div class="row justify-content-center">' +
			'<div class="col-sm-4">' +
			'<img src="/img/icons/' +
			recipe.type +
			'.png" class="tk-recipe-type"></img>' +
			"</div>" +
			'<div class="col-sm-8  align-self-center">' +
			'<p class="tk-text">' +
			recipe.description +
			"</p>" +
			"</div>" +
			'<hr class="tk-divider">' +
			"</div>" +
			'<div class="row mb-5">' +
			'<div class="col">' +
			'<img src="/img/icons/kcal.png" class="tk-recipe-img"></img>' +
			"</div>" +
			'<div class="col">' +
			'<img src="/img/icons/carbs.png" class="tk-recipe-img"></img>' +
			"</div>" +
			'<div class="col">' +
			'<img src="/img/icons/protein.png" class="tk-recipe-img"></img>' +
			"</div>" +
			'<div class="col">' +
			'<img src="/img/icons/people.png" class="tk-recipe-img"></img>' +
			"</div>" +
			'<div class="w-100"></div>' +
			'<div class="col">' +
			'<div class="tk-panel-data">' +
			recipe.kcal +
			" KCAL</div>" +
			"</div>" +
			'<div class="col">' +
			'<div class="tk-panel-data">' +
			recipe.carbs +
			" gr</div>" +
			"</div>" +
			'<div class="col">' +
			'<div class="tk-panel-data">' +
			recipe.protein +
			" gr</div>" +
			"</div>" +
			'<div class="col">' +
			'<div class="tk-panel-data">' +
			recipe.people +
			" portions</div>" +
			"</div>" +
			"</div>" +
			"</div>";

		i % 2 == 1 ? (this.htmlTags += '</div><div class="w-100"></div>') : "";
	}

	/**
	 * @method
	 * @description Metodo encargado de renderizar las tarjetas de las recetas
	 * @returns {void}
	 */
	render(idContainer) {
		$(`#${idContainer}`).html(this.htmlTags);
	}
}
