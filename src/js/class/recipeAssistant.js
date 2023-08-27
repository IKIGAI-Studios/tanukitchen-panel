import bsAlert from "../components/bsAlert.js";

/**
 * Clase para asistente de recetas.
 * @class recipeAssistant
 */
export class recipeAssistant {
    /**
     * Constructor de la clase
     * @param {*} recipeId 
     * @param {*} idSwitchStove 
     * @param {*} idSwitchScale 
     * @param {*} idSwitchSmoke 
     * @param {*} idScaleGoalInput 
     * @param {*} idStoveGoalInput 
     * @param {*} idInstReadyBtn 
     * @param {*} socketModule 
     * @param {*} socket 
     */
    constructor(
		recipeId,
		idSwitchStove,
		idSwitchScale,
		idSwitchSmoke,
		idScaleGoalInput,
		idStoveGoalInput,
		idInstReadyBtn,
		socketModule,
		socket
	) {
		this.recipeId = recipeId;
		this.idSwitchStove = idSwitchStove;
		this.idSwitchScale = idSwitchScale;
		this.idSwitchSmoke = idSwitchSmoke;
		this.idScaleGoalInput = idScaleGoalInput;
		this.idStoveGoalInput = idStoveGoalInput;
		this.idInstReadyBtn = idInstReadyBtn;
		this.socketModule = socketModule;
		this.socket = socket;
		this.recipe = {};
		this.scale_goal_exist = false;
		this.stove_goal_exist = false;
		this.stepNum = 0;
		this.instNum = 1;
		this.finished = false;
		this.peso_correcto = false;
        this.temp_correcta = false;
		this.values = {
			scale_weight: 0,
			stove_temp: 0,
			smoke: 0,
		};
		this.marginError = 10; // Margen de error para el peso y la temperatura
	}

    /**
     * Función para inicializar el asistente
     */
	async init() {
		try {
			this.recipe = await this.fetchRecipe();
			this.setGoals();
			this.setSteps();
			this.evaluateGoals();
            document.getElementById('recipe_name').innerHTML = this.recipe.name
            document.getElementById('total_steps').innerHTML = this.recipe.steps.length
		} catch (error) {
			console.error("Error:", error);
			bsAlert(
				"Error initializing assistant, please reload the page",
				"danger"
			);
		}
	}

    /**
     * Función para obtener la receta
     * @returns recipe
     */
	async fetchRecipe() {
		const response = await fetch(
			`/api/modules/getRecipe/${this.recipeId}`
		).catch((error) => {
			console.error("Error:", error);
			bsAlert("Error fetching recipe, please reload the page", "danger");
		});
		const data = await response.json();
		return data[0];
	}

    /**
     * Función para establecer las metas
     */
	setGoals() {
		document.getElementById(this.idScaleGoalInput).innerHTML = "";
		document.getElementById(this.idStoveGoalInput).innerHTML = "";
		(this.scale_goal_exist = false), (this.stove_goal_exist = false);
		// Verificar el modulo que se va a utilizar en esa isntruccion
		// Example return: recipe.steps[0].instructions[0].module = "scale"
		switch (
			this.recipe.steps[this.stepNum].instructions[this.instNum - 1]
				.module
		) {
			case "scale":
				if (!document.getElementById(this.idSwitchScale).checked)
					bsAlert(
						`Make sure you <strong>Turn On</strong> the scale`,
						"info"
					);
				document.getElementById(this.idScaleGoalInput).innerHTML =
					"Goal: " +
					this.recipe.steps[this.stepNum].instructions[
						this.instNum - 1
					].goal +
					" g";
				(this.scale_goal_exist = true), (this.peso_correcto = false);
				document.getElementById(this.idInstReadyBtn).disabled = true;
				break;
			case "stove":
				if (!document.getElementById(this.idSwitchStove).checked)
					bsAlert(
						`Make sure you <strong>Turn On</strong> the stove`,
						"info"
					);
				document.getElementById(this.idStoveGoalInput).innerHTML =
					"Goal: " +
					this.recipe.steps[this.stepNum].instructions[
						this.instNum - 1
					].goal +
					" C°";
				this.socketModule.setTemperatureStove(
					this.recipe.steps[this.stepNum].instructions[
						this.instNum - 1
					].goal
				);
				(this.stove_goal_exist = true), (this.temp_correcta = false);
				document.getElementById(this.idInstReadyBtn).disabled = true;
				break;
		}
	}

    /**
     * Función para establecer los pasos
     */
	setSteps() {
		// Vaciar lista de instrucciones
		document.getElementById("instructions_list").innerHTML = "";
		document.getElementById("instructions_list").innerHTML = "";
		// Ocultar modulos anteriores
		document.getElementById("div_stove").style.display = "none";
		document.getElementById("div_fire").style.display = "none";
		document.getElementById("div_extractor").style.display = "none";
		document.getElementById("div_scale").style.display = "none";
		// Insertar paso actual
		document.getElementById("current_step").innerHTML =
			this.stepNum + 1 + " /";
		document.getElementById("verb_step").innerHTML =
			this.recipe.steps[this.stepNum].verb + ":";

		let listTag = "", // Lista de instrucciones
			ingTag = ""; // Lista de ingredientes

		// Recorrer las instrucciones del paso actual e insertarlo en la lista con el id inst_(#num de la instruccion)
		this.recipe.steps[this.stepNum].instructions.map((instruc, i) => {
			listTag += '<li id="inst_' + (i + 1) + '">' + instruc.do + "</li>";
		});

		// Recorrer las instrucciones del paso actual e insertarlo en la lista con el id inst_(#num de la instruccion)
		this.recipe.steps[this.stepNum].ingredients.map((ing) => {
			let j = 0;
			while (ing != this.recipe.ingredients[j].id_ingr) j++;
			ingTag +=
				'<li id="ing_' +
				(j + 1) +
				'">' +
				this.recipe.ingredients[j].name +
				"</li>";
		});

		// Se agrega al html sin remplazar
		document.getElementById("instructions_list").innerHTML += listTag;
		document.getElementById("ingredients_list").innerHTML += ingTag;

		// Mostrar solo los modulos que se ocupan
		this.recipe.steps[this.stepNum].module.map((module) => {
			switch (module) {
				case "scale":
					document.getElementById("div_scale").style.display =
						"block";
					break;
				case "stove":
					document.getElementById("div_stove").style.display =
						"block";
					document.getElementById("div_fire").style.display = "block";
					document.getElementById("div_extractor").style.display =
						"block";
					break;
			}
		});
	}

	/**
	 * Función para enlazar los controladores de eventos
	 */
	bindEventListeners() {
		/**
		 * Establece los controladores de eventos para enviar acciones de MQTT para un módulo específico a través de socket.io.
		 * @param {string} action - La action a emitir.
		 * @param {string} module - El nombre del módulo.
		 */
		document
			.getElementById(this.idSwitchStove)
			.addEventListener("change", () =>
				this.socketModule.triggerModule(
					document.getElementById(this.idSwitchStove).checked
						? "on"
						: "off",
					"stove"
				)
			);
		document
			.getElementById(this.idSwitchScale)
			.addEventListener("change", () =>
				this.socketModule.triggerModule(
					document.getElementById(this.idSwitchScale).checked
						? "on"
						: "off",
					"weight"
				)
			);
		document
			.getElementById(this.idSwitchSmoke)
			.addEventListener("change", () =>
				this.socketModule.triggerModule(
					document.getElementById(this.idSwitchSmoke).checked
						? "on"
						: "off",
					"extractor"
				)
			);
		document
			.getElementById(this.idInstReadyBtn)
			.addEventListener("click", () => {
				// Si se acabo la receta se redirecciona
				if (this.finished) window.location.replace("/recipes");
				else {
					// Verificar que el numero de instruccion actual sea diferente del total de instrucciones
					if (
						this.instNum !=
						this.recipe.steps[this.stepNum].instructions.length
					) {
						// Tachar la instruccion realizada
						document.getElementById(
							"inst_" + this.instNum
						).innerHTML =
							"<strike>" +
							document.getElementById("inst_" + this.instNum)
								.innerHTML +
							"</strike>";
						this.instNum++;
						// Cambiar texto btn
						document.getElementById(
							this.idInstReadyBtn
						).innerHTML = `Instruction ${this.instNum} Ready`;
					} else {
						// Tachar ultima instruccion
						document.getElementById(
							"inst_" + this.instNum
						).innerHTML =
							"<strike>" +
							document.getElementById("inst_" + this.instNum)
								.innerHTML +
							"</strike>";
						// Verificar que el numero de pasos actual sea diferente del total de pasos
						if (this.stepNum + 1 != this.recipe.steps.length) {
							this.stepNum++, (this.instNum = 1);
							// Obtener instrucciones y insertar los valores
							this.setSteps();
							// Cambiar texto btn
							document.getElementById(
								this.idInstReadyBtn
							).innerHTML = `Instruction ${this.instNum} Ready`;
						} else {
							// Indicar que se acabo la receta
							bsAlert(
								`You have <strong>finished</strong> the recipe`,
								"success"
							);
							// Actualizar el conteo de bd
							fetch(
								"/api/modules/updateRecipesCount/" +
									this.recipe.name
							);
							// Cambiar texto boton para ir a inicio
							document.getElementById(
								this.idInstReadyBtn
							).innerHTML = "Go to home"
                            .disabled = false;
							// Cambiar status de receta
							this.finished = true;
						}
					}
					this.setGoals();
				}
			});
		// Obtener el valor de MQTT para el la estufa, el peso y el humo
		this.socket.on(`server:mqtt:stove:value`, ({ message }) => {
			this.values.stove_temp = message;
			this.evaluateGoals();
		});
		this.socket.on(`server:mqtt:smoke:value`, ({ message }) => {
			this.values.smoke = message;
			this.evaluateGoals();
		});
		this.socket.on(`server:mqtt:weight:value`, ({ message }) => {
			this.values.scale_weight = message;
			this.evaluateGoals();
		});
	}

    /**
     * Función para evaluar las metas
     */
	evaluateGoals() {
		if (!this.peso_correcto) {
			if (this.scale_goal_exist) {
				// Verificar con un margen de error de 10 gr
				if (
					this.values.scale_weight >=
						this.recipe.steps[this.stepNum].instructions[
							this.instNum - 1
						].goal -
							this.marginError &&
					this.values.scale_weight <=
						this.recipe.steps[this.stepNum].instructions[
							this.instNum - 1
						].goal +
							this.marginError
				) {
					bsAlert(`<strong>Correct</strong> weight`, "primary");
					this.peso_correcto = true;
					document.getElementById(
						this.idInstReadyBtn
					).disabled = false;
				}
			}
		} 
        if (!this.temp_correcta) {
			if (this.stove_goal_exist) {
				// Verificar con un margen de error de 10°
				if (
					this.values.stove_temp >=
						this.recipe.steps[this.stepNum].instructions[
							this.instNum - 1
						].goal -
							this.marginError &&
					this.values.stove_temp <=
						this.recipe.steps[this.stepNum].instructions[
							this.instNum - 1
						].goal +
							this.marginError
				) {
					bsAlert(`<strong>Correct</strong> temperature`, "primary");
					this.temp_correcta = true;
					document.getElementById(
						this.idInstReadyBtn
					).disabled = false;
				}
			}
		}
	}
}
