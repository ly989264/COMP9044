/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.
import generate_basic_html from './generate_basic_html.js';
import {login, signup} from './login_register.js';
import {feed_generate, clear_feed} from './feed_generate.js';
import {modal_generate} from './modal_generate.js';
import { redirect_subseddit } from './subseddits.js';

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.
function initApp(apiUrl) {
  // your app initialisation goes here

  // Question: where to put the js and css files???

  // create new basic html
  generate_basic_html();
  
  // login
  login();

  // signup
  signup();

  // feed generate
  feed_generate(apiUrl+"/post/public", null);

  modal_generate();

  // show_profile_v2("2");

  // comment ordered??

  // potential bugs:
  //  after voting, show details cannot show the user

  // testing for subseddit
  // redirect_subseddit("hola");
}

export default initApp;
