import API_URL from './backend_url.js';
import {modal_generate, clear_modal} from './modal_generate.js';
import {feed_generate, feed_append} from './feed_generate.js';
import { redirect_subseddit } from './subseddits.js';
import { show_profile_with_username } from './login_register.js';

export function enable_searches(token) {
    const header_search_button = document.getElementById("header-search-button");
    header_search_button.addEventListener("click", () => {
        if (token === null || token === "") {
            alert("Please log in or sign up.");
            return;
        }
        const search_content = document.getElementById("search");
        if (search_content.value === "") {
            alert("The search box is empty!");
            return;
        }
        if (search_content.value.startsWith("#")) {
            // search subseddit
            redirect_subseddit(search_content.value.slice(1));
        } else if (search_content.value.startsWith("@")) {
            // search username
            console.log(search_content.value.slice(1));
            show_profile_with_username(token, search_content.value.slice(1));
        } 
        else {
            // search post title
            modal_generate();
            const modal_posts_ul = document.createElement("ul");
            document.getElementById("modal-content").appendChild(modal_posts_ul);
            document.getElementById("modal-id").style.display = "block";
            const search_content_value = search_content.value;
            console.log("The content searching is: "+search_content_value);
            // get the following people
            fetch(API_URL+"/user", {
                method: "GET",
                headers: {
                    "Authorization": "Token "+token
                }
            }).then(r => r.json()).then(r => {
                const following_list = r["following"];
                if (following_list.length === 0) {
                    alert("Oops, seems that you did not follow anyone.");
                    return;
                }
                let fetches = [];
                for (const each_userid of following_list) {
                    fetches.push(fetch(API_URL+"/user?id="+each_userid, {
                        method: "GET",
                        headers: {
                            "Authorization": "Token "+token
                        }
                    }).then(r => r.json()).then(r => {
                        const posts_list = r["posts"];
                        let sub_fetches = [];
                        for (const each_postid of posts_list) {
                            sub_fetches.push(fetch(API_URL+"/post?id="+each_postid, {
                                method: "GET",
                                headers: {
                                    "Authorization": "Token: "+token
                                }
                            }).then(r => r.json()).then(post_obj => {
                                if (post_obj["title"].includes(search_content_value)) {
                                    const modal_posts_li = document.createElement("li");
                                    modal_posts_ul.appendChild(modal_posts_li);
                                    // add user info here
                                    const modal_posts_li_title = document.createElement("h3");
                                    modal_posts_li_title.innerText = post_obj["title"];
                                    modal_posts_li_title.classList.add("clickable-post-title");
                                    modal_posts_li.appendChild(modal_posts_li_title);
                                    modal_posts_li_title.addEventListener("click", () => {
                                        // click event, generate the detail page
                                        // see the detail of the post
                                        clear_modal();
                                        modal_generate();
                                        const feed_div = document.createElement("div");
                                        feed_div.classList.add("post");
                                        document.getElementById("modal-content").appendChild(feed_div);
                                        feed_append(post_obj, token, feed_div, "false");
                                        document.getElementById("modal-id").style.display = "block";
                            
                                        
                                    });
                                    const modal_posts_li_user = document.createElement("p");
                                    // modal_posts_li_user.classList.add("clickable-post-title");
                                    modal_posts_li_user.innerText = "Posted by "+post_obj["meta"]["author"];
                                    modal_posts_li.appendChild(modal_posts_li_user);
                                }
                            }));
                        }
                        return Promise.all(sub_fetches);
                    }));
                }
                return Promise.all(fetches);
            })
        }
    });
}