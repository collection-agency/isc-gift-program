// Global
import "babel-polyfill";
import jquery from "jquery";
window.$ = window.jQuery = jquery;

// Style
import "../styles/index.scss";

// Modules
//import search from "./modules/search";
import ui from "./modules/ui";
import product from "./modules/product";
import mailchimp from "./modules/mailchimp";

$(function () {
  //search.init();
  ui.init();
  product.init();
  mailchimp.init();
});
