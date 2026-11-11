import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

loadHeaderFooter();

// Initialize and render the alert on the index page
const alert = new Alert();
alert.render();