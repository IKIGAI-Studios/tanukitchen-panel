import express from "express";
import User from "../models/userModel.js";
import Kitchen from "../models/kichenModel.js";
import Recipe from "../models/recipeModel.js";
import Module from "../models/moduleModel.js";
import chat_gptAPI from "./functions/chat_gptAPI.js";

const routes = express.Router();

// *** RUTAS PARA USUARIOS *** GET
// Ruta para renderizar el login
routes.get("/login", (req, res) => {
	// Renderizar login y mandar obj con el mensaje de error
	res.render("login", { code: req.session.login });
	// Limpiar el mensaje de error
	req.session.login = { msj: false };
});

// Test MQTT
routes.get("/test_mqtt", (req, res) => {
	res.render("test_mqtt");
});

// Test
routes.get("/test", (req, res) => {
	res.locals.obj = req.session.user;
	res.render("test");
});

// API Chat GPT
routes.get("/chat-gpt/:msj", async (req, res) => {
	try {
		// Obtener respuesta de la API
		const response = await chat_gptAPI(req.params.msj);
		// Enviar respuesta como JSON
		res.json(response);
	} catch (error) {
		// Enviar error como JSON
		res.json(error);
	}
});

// Ruta para renderizar la seleccion de Usuario
routes.get("/userSelect/:user", async (req, res) => {
	try {
		// Buscar el usuario y la cocina
		let usr = await User.find({ user: req.params.user, active: true });
		// Buscar la cocina
		let kitchen = await Kitchen.find({
			_id: usr[0].kitchen.id,
			active: true,
		});
		// Guardar el usuario y la cocina en la sesion
		req.session.user = { user: usr[0], kitchen: kitchen[0] };
		// Redireccionar al control panel
		res.redirect("/control_panel");
	} catch (e) {
		req.session.login = { msj: `User Selection Error` };
		res.redirect("login");
	}
});

routes.get("/control_panel", (req, res) => {
	try {
		res.render("control_panel");
	} catch (e) {
		req.session.login = { msj: `Control PanelError` };
		res.redirect("login");
	}
});

routes.get("/recipes", (req, res) => {
	try {
		if (req.session && req.session.user) {
			res.locals.obj = req.session.user;
			res.render("recipes");
		} else res.redirect("/login");
	} catch (e) {
		req.session.login = { msj: `Recipes Error` };
		res.redirect("login");
	}
});

routes.get("/recipe/:id", async (req, res) => {
	try {
		if (req.session && req.session.user) {
			let rslt = await Recipe.find({ _id: req.params.id });
			let ses = req.session.user;
			let recipe = rslt[0];
			res.locals.obj = {
				user: ses.user,
				kitchen: ses.kitchen,
				recipe: recipe,
			};
			res.render("stepsRecipes");
		} else res.redirect("/login");
	} catch (e) {
		req.session.login = { msj: `Recipe Error` };
		res.redirect("login");
	}
});

routes.get("/profile", async (req, res) => {
	try {
		if (req.session && req.session.user) {
			let modules = await Module.find({
				id_kitchen: req.session.user.kitchen.name,
			});
			res.locals.obj = {
				user: req.session.user.user,
				kitchen: req.session.user.kitchen,
				modules: modules,
			};
			res.render("profile");
		} else {
			req.session.login = { msj: `You're not logged in` };
			res.redirect("login");
		}
	} catch (e) {
		req.session.login = { msj: `Profile Error` };
		res.redirect("login");
	}
});

// *** RUTAS PARA REGISTRO Y LOGIN *** POST

routes.post("/login", async (req, res) => {
	try {
		// Destructurar req.body
		const { username, password } = req.body;
		if (username == "" || password == "") {
			req.session.login = { msj: `Empty fields` };
			res.redirect("login");
			return;
		}
		// Obtener las cocinas con el usuario
		let kitchen = await Kitchen.find({ name: username, active: true });

		// Verificar que haya cocinas
		if (kitchen.length > 0) {
			// Validar la contraseña de la cocina
			if (kitchen[0]["password"] == password) {
				// Buscar los usuarios asignados a esa cocina
				let usr = await User.find({
					"kitchen.name": kitchen[0].name,
					active: true,
				});

				// Validar que haya usuarios asignados a esa cocina
				if (usr) {
					// Enviar obj con usuario y cocina al ejs
					res.render("selectUsr", {
						obj: { user: usr, kitchen: kitchen[0] },
					});
				} else {
					req.session.login = { msj: `No users assigned` };
					res.redirect("login");
				}
			} else {
				req.session.login = { msj: `Wrong password` };
				res.redirect("login");
			}
		} else {
			req.session.login = { msj: `User doestn exist` };
			res.redirect("login");
		}
	} catch (e) {
		req.session.login = { msj: `Login error` };
		res.redirect("login");
	}
});

routes.post("/register", async (req, res) => {
	try {
		req.body.active = true;
		const user = new User(req.body);
		await user.save();
		req.session.login = { msj: `User created` };
		res.redirect("login");
	} catch (e) {
		req.session.login = { msj: `Register Error` };
		res.redirect("login");
	}
});

export default routes;
