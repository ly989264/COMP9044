import API_URL from './backend_url.js';
import { modal_generate, clear_modal} from "./modal_generate.js";
import { fill_feed_in_modal, automatically_fetch_more_in_modal} from "./feed_generate.js";


export function redirect_subseddit(subseddit) {
    if (document.getElementById("logged-in") === null) {
        alert("Please log in to access this functionality.");
        return;
    }
    // get the token from localstorage
    // check existence
    // check login state
    const token = localStorage.getItem("token");
    // maybe use modal
    clear_modal();
    modal_generate();
    document.getElementById("modal-p").innerText = "Subseddit posts:";
    document.getElementById("modal-id").style.display = "block";
    const modal_feed_ul = document.createElement("ol");
    modal_feed_ul.setAttribute("id", "modal-feed");
    document.getElementById("modal-content").appendChild(modal_feed_ul);
    // get the user feed
    const xhr_get = new XMLHttpRequest();
    xhr_get.open("GET", API_URL+"/user/feed?n=30", false);
    xhr_get.setRequestHeader("Authorization", "Token "+token);
    xhr_get.onload = () => {
        if (xhr_get.readyState === 4) {
            switch (xhr_get.status) {
                case 200:
                    console.log("Success");
                    // console.log(xhr_get.responseText);
                    let temp_list = JSON.parse(xhr_get.responseText)["posts"];
                    let fin_list = temp_list.filter(x => x["meta"]["subseddit"] === subseddit);
                    modal_feed_ul.setAttribute("next-to-fetch", temp_list.length);
                    let continue_trigger = true;
                    while (fin_list.length < 5 && continue_trigger) {
                        // fetch more
                        const xhr_fetch = new XMLHttpRequest();
                        xhr_fetch.open("GET", API_URL+"/user/feed?p="+parseInt(modal_feed_ul.getAttribute("next-to-fetch"))+"&n=10", false);
                        xhr_fetch.setRequestHeader("Authorization", "Token "+token);
                        xhr_fetch.onload = () => {
                            if (xhr_fetch.readyState === 4 && xhr_fetch.status === 200) {
                                const new_temp_list = JSON.parse(xhr_fetch.responseText)["posts"];
                                const new_num = parseInt(document.getElementById("modal-feed").getAttribute("next-to-fetch"))+new_temp_list.length;
                                modal_feed_ul.setAttribute("next-to-fetch", new_num);
                                for (const each of new_temp_list.filter(x => x["meta"]["subseddit"] === subseddit)) {
                                    if (fin_list.includes(each)) {
                                        continue;
                                    }
                                    fin_list.push(each);
                                    // console.log(fin_list);
                                }
                                if (new_temp_list.length < 10) {
                                    modal_feed_ul.setAttribute("fetching", "true");
                                    fill_feed_in_modal(fin_list, token);
                                    continue_trigger = false;
                                    return;
                                }
                            }
                        };
                        xhr_fetch.send(null);
                    }
                    if (continue_trigger === false) {
                        if (fin_list.length === 0) {
                            document.getElementById("modal-p").innerText = "No post in this subseddit!";
                        }
                        return;
                    }
                    fill_feed_in_modal(fin_list, token);
                    // fill_feed_in_modal(temp_list, token);
                    
                    if (temp_list.length < 30) {
                        // not enough posts there, stop infinitely scrolling
                        modal_feed_ul.setAttribute("fetching", "true");
                    } else {
                        // infinitely scrolling
                        const response_func = () => {
                            console.log(document.getElementById("modal-id").scrollTop+window.innerHeight);
                            console.log(document.getElementById("modal-id").scrollHeight);
                            if ((document.getElementById("modal-id").scrollTop + window.innerHeight) > document.getElementById("modal-id").scrollHeight * 0.85 && modal_feed_ul.getAttribute("fetching") !== "true") {
                                modal_feed_ul.setAttribute("fetching", "true");
                                automatically_fetch_more_in_modal(token, subseddit);
                            }
                        };
                        document.getElementById("modal-id").addEventListener("scroll", response_func);
                    }  
                    break;
                case 403:
                    alert("Invalid Auth Token");
                    break;
                default:
                    // need to consider other status codes
                    console.log("To be developed");
            }
        }
    };
    xhr_get.send(null);
}