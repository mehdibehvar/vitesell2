import 'dotenv/config';// Load .env BEFORE anything else

import express from "express";
import registerRoutes from "./src/startup/register-routes.js";
import initDatabase from "./src/startup/init-database.js";
import initLogger from "./src/startup/init-logger.js";
import setTemplateEngine from "./src/startup/set-template-engine.js";
import initConfig from "./src/startup/init-config.js";
import winston from "winston";

///This is an instance of an Express application. It's created by calling express(), and it's the main object through which you define routes, middleware, and other configurations.
const app = express();
const port = process.env.PORT || 3000;

initLogger(app);
registerRoutes(app);
initDatabase();
setTemplateEngine(app);
initConfig();
///middlewares
//express.static: This is a built-in middleware function in Express that serves static files. Static files can include HTML files, CSS stylesheets, JavaScript files, images, fonts, etc. The express.static middleware takes a directory path as an argument and serves the files located in that directory.
app.use(express.static("public"));

app.listen(port, () => {
 winston.info(`Server running on port  ${port}`);
});
