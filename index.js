//imports
const express = require("express");
const app = express();
const port = 80;
const hbs = require("express-handlebars");
const fs = require("fs");
const server = require("http").Server(app);
const { Signale } = require("signale");

const signaleOptions = {
	stream: process.stdout,
	types: {
		general: {
			label: "General",
			color: "white",
			logLevel: "info",
		},
		get: {
			label: "GET",
			color: "yellow",
			logLevel: "info",
		},
		startup: {
			label: "Startup",
			color: "cyan",
			logLevel: "info",
		},
	},
};

const log = new Signale(signaleOptions);

log.config({
	displayScope: true,
	displayTimestamp: true,
	underlineLabel: true,
	uppercaseLabel: true,
	displayFilename: true,
});

//public folder
app.use(express.static("public"));

app.set("view engine", "hbs");

app.engine(
	"hbs",
	hbs({
		extname: "hbs",
		defaultview: "main",
		layoutsDir: __dirname + "/views/layouts/",
		partialsDir: __dirname + "/views/partials/",
	})
);

app.get("/", (req, res) => {
	res.render("index", {
		title: "Home",
	});
	res.status(200);
	log.get('"/", Render "/", Status 200');
});

app.get("*", (req, res) => {
	res.render("error", {
		title: "Error",
		code: "404",
		desc: "Not Found",
		redirect: true,
	});
	res.status(404);
	log.get('*Error*, Render "/error", Status 404');
});

server.listen(port, () => log.startup(`Listening on port ${port}!`));
