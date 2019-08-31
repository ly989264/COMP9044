
import {fill_feed, clear_feed, automatically_fetch_more, feed_append} from './feed_generate.js';
import {modal_generate, clear_modal} from './modal_generate.js';
import {post_posts} from './posts.js';
import {enable_votes} from './votes.js';
import { enable_searches } from './searches.js';
import { get_notifications } from './notifications.js';
import {redirect_subseddit} from './subseddits.js';
import { generate_random_posts } from './interesting_users.js';
import API_URL from './backend_url.js';


// return an object of the target user info
function user_info(token, user_id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", API_URL+"/user?id="+user_id, false);
    xhr.setRequestHeader("Authorization", "Token "+token);
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 200:
                    callback(JSON.parse(xhr.responseText));
                    break;
                case 400:
                    console.log("400");
                    callback(null);
                    break;
                default:
                    console.log("user_info, undiscovered status code");
                    callback(null);
            }
        }
    };
    xhr.send(null);
}

// return an object of the target post
function post_info(token, post_id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", API_URL+"/post?id="+post_id, false);
    xhr.setRequestHeader("Authorization", "Token "+token);
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 200:
                    callback(JSON.parse(xhr.responseText));
                    break;
                case 400:
                    console.log("400");
                    break;
                default:
                    console.log("post_info , undiscovered status code");
            }
        }
    };
    xhr.send(null);
}


// show the profile page after clicking the profile button
// potential improvement: for each following and post, can add click event and open that
// in this function, all the following are triggered only after the success of the first GET fetch
// fetch -> fetch
export function show_profile(token) {
    fetch(API_URL+"/user", {
        method: "GET",
        headers: {
            "Authorization": "Token "+token
        }
    }).then(r => r.json()).then(profile_json => {
        console.log("GET /user/ Success");
        modal_generate();
        // fill modal content
        const modal_p = document.getElementById("modal-p");
        modal_p.innerText = "The user profile is:";
        const modal_ul = document.createElement("ul");
        document.getElementById("modal-content").appendChild(modal_ul);
        // id
        const user_id = document.createElement("li");
        user_id.innerText = "id: "+profile_json["id"];
        modal_ul.appendChild(user_id);
        // username
        const user_username = document.createElement("li");
        user_username.innerText = "username: "+profile_json["username"];
        modal_ul.appendChild(user_username);
        // email
        const user_email = document.createElement("li");
        user_email.innerText = "email: "+profile_json["email"];
        modal_ul.appendChild(user_email);
        // name
        const user_name = document.createElement("li");
        user_name.innerText = "name: "+profile_json["name"];
        modal_ul.appendChild(user_name);
        // posts following followed_num should be added here
        // following
        const user_following_lio = document.createElement("li");
        modal_ul.appendChild(user_following_lio); 
        const user_following = document.createElement("p");
        user_following_lio.appendChild(user_following);
        if (profile_json["following"].length === 0) {
            user_following.innerText = "User following: No following users";
        } else {
            user_following.innerText = "User following: Following "+profile_json["following"].length+" users:";
            const user_following_ul = document.createElement("ul");
            user_following_lio.appendChild(user_following_ul);
            for (const each_following of profile_json["following"]) {
                const user_following_li = document.createElement("li");
                let user_info_j;
                user_info(token, each_following, (x) => {
                    // console.log(x);
                    user_info_j = x;
                });
                if (user_info_j !== null) {
                    user_following_li.innerText = user_info_j["name"];
                    // click to jump to other's user page
                    user_following_li.classList.add("clickable-post-title");
                    user_following_li.addEventListener("click", () => {
                        clear_modal();
                        show_profile_with_username(token, user_info_j["name"]);
                    });
                }
                user_following_ul.appendChild(user_following_li);
            }
            
        }
            
        // followed_num
        const user_followed_num = document.createElement("li");
        user_followed_num.innerText = "#followers: "+profile_json["followed_num"];
        modal_ul.appendChild(user_followed_num);
        // posts
        const posts_lio = document.createElement("li");
        modal_ul.appendChild(posts_lio);
        const votes_num_lio = document.createElement("li");
        votes_num_lio.setAttribute("current_num", 0);
        votes_num_lio.innerText = "The overall upvote num of all your posts is: 0";
        modal_ul.appendChild(votes_num_lio);
        const comments_num_lio = document.createElement("li");
        comments_num_lio.setAttribute("current_num", 0);
        comments_num_lio.innerText = "The overall comment num of all your posts is: 0";
        modal_ul.appendChild(comments_num_lio);
        const posts_p = document.createElement("p");
        posts_lio.appendChild(posts_p);
        if (profile_json["posts"].length === 0) {
            posts_p.innerText = "Posts: No posts";
        } else {
            posts_p.innerText = "Posts: Having "+profile_json["posts"].length+" posts:";
            const posts_ul = document.createElement("ul");
            posts_lio.appendChild(posts_ul);
            for (const each_post of profile_json["posts"]) {
                console.log("EACH_POST "+each_post);
                const posts_li = document.createElement("li");
                const posts_li_div = document.createElement("div");
                const posts_li_title = document.createElement("p");
                posts_li_title.classList.add("posts-li-title");
                const posts_li_numvote = document.createElement("p");
                posts_li_numvote.classList.add("smaller-p");
                const posts_li_numcomment = document.createElement("p");
                posts_li_numcomment.classList.add("smaller-p");
                const posts_li_deletebutton = document.createElement("button");
                posts_li_deletebutton.classList.add("button");
                posts_li_deletebutton.innerText = "Delete";
                const posts_li_modifybutton = document.createElement("button");
                posts_li_modifybutton.classList.add("button");
                posts_li_modifybutton.innerText = "Modify";
                posts_li_div.appendChild(posts_li_title);
                posts_li_div.appendChild(posts_li_numvote);
                posts_li_div.appendChild(posts_li_numcomment);
                posts_li_div.appendChild(posts_li_deletebutton);
                posts_li_div.appendChild(posts_li_modifybutton);
                posts_li.appendChild(posts_li_div);
                let post_info_j;
                post_info(token, each_post, (x) => {
                    // console.log(x);
                    post_info_j = x;
                });
                if (post_info_j !== null) {
                    posts_li_title.innerText = post_info_j["title"];
                    posts_li_title.classList.add("clickable-post-title");
                    // console.log(post_info_j);
                    posts_li_numvote.innerText = post_info_j["meta"]["upvotes"].length + " upvotes";
                    posts_li_numcomment.innerText = post_info_j["comments"].length + " comments";
                    const temp1 = parseInt(votes_num_lio.getAttribute("current_num")) + post_info_j["meta"]["upvotes"].length;
                    const temp2 = parseInt(comments_num_lio.getAttribute("current_num")) + post_info_j["comments"].length;
                    votes_num_lio.innerText = "The overall upvote num of all your posts is: " + temp1;
                    comments_num_lio.innerText = "The overall comment num of all your posts is: " + temp2;
                    votes_num_lio.setAttribute("current_num", temp1);
                    comments_num_lio.setAttribute("current_num", temp2);
                    // also add the click event of the title, to see the whole post
                    posts_li_title.addEventListener("click", () => {
                        clear_modal();
                        modal_generate();
                        const feed_div = document.createElement("div");
                        feed_div.classList.add("post");
                        document.getElementById("modal-content").appendChild(feed_div);
                        feed_append(post_info_j, token, feed_div, "false");
                        document.getElementById("modal-id").style.display = "block";
                        document.getElementById("modal-id").style.display = "block";
                        
                    });
                    // here change to div and app delete modify button
                    posts_li_deletebutton.addEventListener("click", () => {
                        // delete the post
                        const xhr_delete_post = new XMLHttpRequest();
                        xhr_delete_post.open("DELETE", API_URL+"/post?id="+each_post, false);
                        xhr_delete_post.setRequestHeader("Authorization", "Token "+token);
                        xhr_delete_post.onload = (event) => {
                            if (xhr_delete_post.readyState === 4) {
                                switch (xhr_delete_post.status) {
                                    case 200:
                                        console.log("delete post success");
                                        alert("Delete successfully");
                                        // remove this div
                                        posts_ul.removeChild(posts_li);
                                        posts_p.innerText = "Posts: Having "+(parseInt(profile_json["posts"].length)-1)+" posts:"
                                        break;
                                    case 400:
                                        console.log("delete post 400");
                                        alert("Delete failed with status 400, try again later?");
                                        break;
                                    case 403:
                                        console.log("delete post 403");
                                        alert("Delete failed with status 403, try login again");
                                        break;
                                    default:
                                        console.log("delete post unexplored status code");
                                }
                            }
                        };
                        xhr_delete_post.send(null);
                    });
                    posts_li_modifybutton.addEventListener("click", () => {
                        // generate a modal to update the post
                        clear_modal();
                        modal_generate();
                        const modal_content = document.getElementById("modal-content");
                        const modal_p = document.getElementById("modal-p");
                        modal_p.innerText = "Modify your post here";
                        const modal_post_div = document.createElement("div");
                        modal_post_div.classList.add("post_div");
                        modal_content.appendChild(modal_post_div);
                        const modal_post_title_div = document.createElement("div");
                        const modal_post_title_p = document.createElement("p");
                        modal_post_title_p.innerText = "The title of the post:";
                        modal_post_title_div.appendChild(modal_post_title_p);
                        const modal_post_title = document.createElement("input");
                        modal_post_title.setAttribute("type", "text");
                        modal_post_title.setAttribute("placeholder", "Enter the title here");
                        modal_post_title_div.appendChild(modal_post_title);
                        modal_post_div.appendChild(modal_post_title_div);
                        const modal_post_text_div = document.createElement("div");
                        const modal_post_text_p = document.createElement("p");
                        modal_post_text_p.innerText = "The text of the post:";
                        modal_post_text_div.appendChild(modal_post_text_p);
                        const modal_post_text = document.createElement("input");
                        modal_post_text.setAttribute("type", "text");
                        modal_post_text.setAttribute("placeholder", "Enter the text here");
                        modal_post_text_div.appendChild(modal_post_text);
                        modal_post_div.appendChild(modal_post_text_div);
                        const modal_post_image_div = document.createElement("div");
                        const modal_post_image_p = document.createElement("p");
                        modal_post_image_p.innerText = "Choose an image of the post (optional):";
                        modal_post_image_div.appendChild(modal_post_image_p);
                        const modal_post_image = document.createElement("input");
                        modal_post_image.setAttribute("type", "file");
                        modal_post_image_div.append(modal_post_image);
                        modal_post_div.appendChild(modal_post_image_div);
                        const modal_post_submit = document.createElement("input");
                        modal_post_submit.setAttribute("type", "submit");
                        modal_post_submit.addEventListener("click", (event) => {
                            const post_title = modal_post_title.value;
                            const post_text = modal_post_text.value;
                            // console.log(post_title);
                            // console.log(modal_post_image.value);
                            if (post_title === '' && post_text === '' && modal_post_image.value === '') {
                                alert("Invalid post format!");
                                return;
                            }
                            let new_obj = new Object();
                            if (post_title !== '') {
                                new_obj["title"] = post_title;
                            }
                            if (post_text !== '') {
                                new_obj["text"] = post_text;
                            }
                            if (modal_post_image.value === '') {
                                // new_obj["image"] = null;  // do not include this field if there is no image
                                // post here
                                const xhr_post = new XMLHttpRequest();
                                xhr_post.open("PUT", API_URL+"/post?id="+each_post, false);
                                xhr_post.setRequestHeader("Authorization", "Token "+token);
                                xhr_post.setRequestHeader("Content-type", "application/json");
                                xhr_post.onload = () => {
                                    if (xhr_post.readyState === 4) {
                                        switch (xhr_post.status) {
                                            case 200:
                                                console.log("PUT /post/ success");
                                                confirm("Modify successfully!");
                                                break;
                                            case 400:
                                                console.log("PUT /post/ 400");
                                                alert("Malformed Request / Image could not be processed");
                                                break;
                                            case 403:
                                                console.log("PUT /post/ 403");
                                                alert("Invalid Auth Token");
                                                break;
                                            default:
                                                console.log("PUT /post/ unexplored status code");
                                                break;
                                        }
                                        document.getElementById("modal-id").style.display = "none";
                                        clear_modal();
                                    }
                                };
                                xhr_post.send(JSON.stringify(new_obj));
                    
                            } else {
                                const reader = new FileReader();
                                reader.onload = (file) => {
                                    const binaryData = file.target.result;
                                    const base64string = window.btoa(binaryData);
                                    new_obj["image"] = base64string;
                                    // post here
                                    // console.log(JSON.stringify(new_obj));
                                    const xhr_post = new XMLHttpRequest();
                                    xhr_post.open("PUT", API_URL+"/post?id="+each_post, false);
                                    xhr_post.setRequestHeader("Authorization", "Token "+token);
                                    xhr_post.setRequestHeader("content-type", "application/json");
                                    xhr_post.onload = () => {
                                        if (xhr_post.readyState === 4) {
                                            switch (xhr_post.status) {
                                                case 200:
                                                    console.log("PUT /post/ success");
                                                    confirm("Modify successfully!");
                                                    break;
                                                case 400:
                                                    console.log("PUT /post/ 400");
                                                    alert("Malformed Request / Image could not be processed");
                                                    break;
                                                case 403:
                                                    console.log("PUT /post/ 403");
                                                    alert("Invalid Auth Token");
                                                    break;
                                                default:
                                                    console.log("PUT /post/ unexplored status code");
                                                    break;
                                            }
                                            document.getElementById("modal-id").style.display = "none";
                                            clear_modal();
                                        }
                                    };
                                    xhr_post.send(JSON.stringify(new_obj));
                                };
                                reader.readAsBinaryString(modal_post_image.files[0]);
                            }
                            
                        });
                    
                        modal_content.appendChild(modal_post_submit);
                    
                    
                        document.getElementById("modal-id").style.display = "block";
                    });
                }
                posts_ul.appendChild(posts_li);
            }
            
        }
        document.getElementById("modal-id").style.display = "block";
    });
}

// show the profile page after clicking the profile button
// potential improvement: for each following and post, can add click event and open that
// show profile with certain username, can be used to get the profile of others
export function show_profile_with_username(token, username) {
    // ensure token is valid
    if (token === null || token === undefined || token === "") {
        return;
    }
    const xhr_profile = new XMLHttpRequest();
    xhr_profile.open("GET", API_URL+"/user?username="+username, false);
    xhr_profile.setRequestHeader("Authorization", "Token "+token);
    xhr_profile.onload = () => {
        if (xhr_profile.readyState === 4) {
            switch (xhr_profile.status) {
                case 200:
                    console.log("GET /user/ Success");
                    // console.log(xhr_profile.responseText);
                    const profile_json = JSON.parse(xhr_profile.responseText);
                    clear_modal();
                    modal_generate();
                    // fill modal content
                    const modal_p = document.getElementById("modal-p");
                    modal_p.innerText = "The user page is:";
                    // follow button
                    const current_logged_userid = document.getElementById("logged-in").getAttribute("user-id-is");
                    console.log("olaolaola "+current_logged_userid+","+profile_json["id"]);
                    if (current_logged_userid+"" !== profile_json["id"]+"") {
                        console.log("Visit other's page");
                        const xhr_my_user = new XMLHttpRequest();
                        xhr_my_user.open("GET", API_URL+"/user", false);
                        xhr_my_user.setRequestHeader("Authorization", "Token "+token);
                        xhr_my_user.onload = () => {
                            if (xhr_my_user.readyState === 4) {
                                switch (xhr_my_user.status) {
                                    case 200:
                                        console.log("Get user inside follow success");
                                        const my_profile = JSON.parse(xhr_my_user.responseText);
                                        const modal_follow_button = document.createElement("button");
                                        modal_follow_button.classList.add("button");
                                        document.getElementById("modal-content").appendChild(modal_follow_button);
                                        console.log(my_profile["following"]);
                                        if (my_profile["following"].includes(parseInt(profile_json["id"]))) {
                                            // followed
                                            modal_follow_button.setAttribute("followed", "true");
                                            modal_follow_button.innerText = "Unfollow";
                                        } else {
                                            modal_follow_button.setAttribute("followed", "false");
                                            modal_follow_button.innerText = "Follow";
                                        }
                                        modal_follow_button.addEventListener("click", () => {
                                            if (modal_follow_button.getAttribute("followed") === "true") {
                                                // unfollow and modify button text and attribute
                                                const unfollow_xhr = new XMLHttpRequest();
                                                unfollow_xhr.open("PUT", API_URL+"/user/unfollow?username="+username, false);
                                                unfollow_xhr.setRequestHeader("Authorization", "Token "+token);
                                                unfollow_xhr.onload = () => {
                                                    if (unfollow_xhr.readyState === 4) {
                                                        switch (unfollow_xhr.status) {
                                                            case 200:
                                                                console.log("Unfollow success");
                                                                confirm("Unfollow successfully");
                                                                modal_follow_button.setAttribute("followed", "false");
                                                                modal_follow_button.innerText = "Follow";
                                                                break;
                                                            case 400:
                                                                alert("Oops, unfollow error: Malformed Request");
                                                                break;
                                                            case 403:
                                                                alert("Oops, unfollow error: Invalid Auth Token");
                                                                break;
                                                            default:
                                                                alert("Oops, unfollow error: unexplored status code");
                                                        }
                                                    }
                                                };
                                                unfollow_xhr.send(null);
                                            } else {
                                                // follow and modify button text and attribute
                                                const follow_xhr = new XMLHttpRequest();
                                                follow_xhr.open("PUT", API_URL+"/user/follow?username="+username, false);
                                                follow_xhr.setRequestHeader("Authorization", "Token "+token);
                                                follow_xhr.onload = () => {
                                                    if (follow_xhr.readyState === 4) {
                                                        switch (follow_xhr.status) {
                                                            case 200:
                                                                console.log("Follow success");
                                                                confirm("Follow successfully");
                                                                modal_follow_button.setAttribute("followed", "true");
                                                                modal_follow_button.innerText = "Unfollow";
                                                                break;
                                                            case 400:
                                                                alert("Oops, follow error: Malformed Request");
                                                                break;
                                                            case 403:
                                                                alert("Oops, follow error: Invalid Auth Token");
                                                                break;
                                                            default:
                                                                alert("Oops, follow error: unexplored status code");
                                                        }
                                                    }
                                                };
                                                follow_xhr.send(null);
                                            }
                                        });
                                        break;
                                    case 400:
                                        console.log("Get user inside follow 400");
                                        break;
                                    case 403:
                                        console.log("Get user inside follow 403");
                                        break;
                                    default:
                                        console.log("Get user inside follow unexplored status code");
                                }
                            }
                        };
                        xhr_my_user.send(null);
                        
                    }
                    

                    const modal_ul = document.createElement("ul");
                    document.getElementById("modal-content").appendChild(modal_ul);
                    // id
                    const user_id = document.createElement("li");
                    user_id.innerText = "id: "+profile_json["id"];
                    modal_ul.appendChild(user_id);
                    // username
                    const user_username = document.createElement("li");
                    user_username.innerText = "username: "+profile_json["username"];
                    modal_ul.appendChild(user_username);
                    // email
                    const user_email = document.createElement("li");
                    user_email.innerText = "email: "+profile_json["email"];
                    modal_ul.appendChild(user_email);
                    // name
                    const user_name = document.createElement("li");
                    user_name.innerText = "name: "+profile_json["name"];
                    modal_ul.appendChild(user_name);
                    // posts following followed_num should be added here
                    // following
                    const user_following_lio = document.createElement("li");
                    modal_ul.appendChild(user_following_lio); 
                    const user_following = document.createElement("p");
                    user_following_lio.appendChild(user_following);
                    if (profile_json["following"].length === 0) {
                        user_following.innerText = "User following: No following users";
                    } else {
                        user_following.innerText = "User following: Following "+profile_json["following"].length+" users:";
                        const user_following_ul = document.createElement("ul");
                        user_following_lio.appendChild(user_following_ul);
                        for (const each_following of profile_json["following"]) {
                            const user_following_li = document.createElement("li");
                            let user_info_j;
                            user_info(token, each_following, (x) => {
                                // console.log(x);
                                user_info_j = x;
                            });
                            if (user_info_j !== null) {
                                user_following_li.innerText = user_info_j["name"];
                                // click the username to jump to another user page
                                user_following_li.classList.add("clickable-post-title");
                                user_following_li.addEventListener("click", () => {
                                    clear_modal();
                                    show_profile_with_username(token, user_info_j["name"]);
                                });
                            }
                            user_following_ul.appendChild(user_following_li);
                        }
                        
                    }
                        
                    // followed_num
                    const user_followed_num = document.createElement("li");
                    user_followed_num.innerText = "#followers: "+profile_json["followed_num"];
                    modal_ul.appendChild(user_followed_num);
                    // posts
                    const posts_lio = document.createElement("li");
                    modal_ul.appendChild(posts_lio); 
                    const posts_p = document.createElement("p");
                    posts_lio.appendChild(posts_p);
                    if (profile_json["posts"].length === 0) {
                        posts_p.innerText = "Posts: No posts";
                    } else {
                        posts_p.innerText = "Posts: Having "+profile_json["posts"].length+" posts:";
                        const posts_ul = document.createElement("ul");
                        posts_lio.appendChild(posts_ul);
                        for (const each_post of profile_json["posts"]) {
                            const posts_li = document.createElement("li");
                            let post_info_j;
                            post_info(token, each_post, (x) => {
                                // console.log(x);
                                post_info_j = x;
                            });
                            if (post_info_j !== null) {
                                posts_li.innerText = post_info_j["title"];
                                posts_li.classList.add("clickable-post-title");
                                posts_li.addEventListener("click", () => {
                                    clear_modal();
                                    modal_generate();
                                    const feed_div = document.createElement("div");
                                    feed_div.classList.add("post");
                                    document.getElementById("modal-content").appendChild(feed_div);
                                    feed_append(post_info_j, token, feed_div, "false");
                                    document.getElementById("modal-id").style.display = "block";
                                    document.getElementById("modal-id").style.display = "block";
                                    
                                });
                            }
                            posts_ul.appendChild(posts_li);
                        }
                        
                    }
                    document.getElementById("modal-id").style.display = "block";
                    break;
                case 400:
                    alert("Please check whether the username is valid.");
                    break;
                case 403:
                    alert("Please check the log-in state.");
                    break;
                default:
                    console.log("Unexplored Behavior.");
            }
        }
    };
    xhr_profile.send(null);
}


function update_profile(token) {
    modal_generate();
    const modal = document.getElementById("modal-id");
    const modal_content = document.getElementById("modal-content");
    document.getElementById("modal-p").innerText = "Edit the profile:";
    const modal_content_div = document.createElement("div");
    modal_content_div.classList.add("signup_div");
    modal_content.appendChild(modal_content_div);
    // email
    const profile_email_div = document.createElement("div");
    const profile_email_p = document.createElement("p");
    profile_email_p.innerText = "Email Address:";
    profile_email_div.appendChild(profile_email_p);
    const profile_email = document.createElement("input");
    profile_email.setAttribute("type", "text");
    profile_email_div.appendChild(profile_email);
    modal_content_div.appendChild(profile_email_div);
    // name
    const profile_name_div = document.createElement("div");
    const profile_name_p = document.createElement("p");
    profile_name_p.innerText = "Name:";
    profile_name_div.appendChild(profile_name_p);
    const profile_name = document.createElement("input");
    profile_name.setAttribute("type", "text");
    profile_name_div.appendChild(profile_name);
    modal_content_div.appendChild(profile_name_div);
    // password
    const profile_passwd_v1_div = document.createElement("div");
    const profile_passwd_v1_p = document.createElement("p");
    profile_passwd_v1_p.innerText = "Password:";
    profile_passwd_v1_div.appendChild(profile_passwd_v1_p);
    const profile_passwd_v1 = document.createElement("input");
    profile_passwd_v1.setAttribute("type", "password");
    profile_passwd_v1_div.appendChild(profile_passwd_v1);
    modal_content_div.appendChild(profile_passwd_v1_div);
    // password again
    const profile_passwd_v2_div = document.createElement("div");
    const profile_passwd_v2_p = document.createElement("p");
    profile_passwd_v2_p.innerText = "Password again:";
    profile_passwd_v2_div.appendChild(profile_passwd_v2_p);
    const profile_passwd_v2 = document.createElement("input");
    profile_passwd_v2.setAttribute("type", "password");
    profile_passwd_v2_div.appendChild(profile_passwd_v2);
    modal_content_div.appendChild(profile_passwd_v2_div);
    // submit
    const submit_button = document.createElement("input");
    submit_button.setAttribute("type", "submit");
    submit_button.addEventListener("click", () => {
        const new_email = profile_email.value;
        const new_name = profile_name.value;
        const new_password = profile_passwd_v1.value;
        const new_password_v2 = profile_passwd_v2.value;
        if (new_email === "" && new_name === "" && new_password === "" && new_password_v2 === "") {
            alert("Fields all empty? Try again!");
            return;
        }
        if (new_password != new_password_v2) {
            alert("Two passwords not match!");
            return;
        }
        const post_obj = {};
        if (new_email !== "") {
            post_obj["email"] = new_email;
        }
        if (new_name !== "") {
            post_obj["name"] = new_name;
        }
        if (new_password !== "") {
            post_obj["password"] = new_password;
        }
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", API_URL+"/user", false);
        xhr.setRequestHeader("Authorization", "Token "+token);
        xhr.setRequestHeader("Content-type", "Application/json");
        xhr.onload = () => {
            if (xhr.readyState === 4) {
                switch (xhr.status) {
                    case 200:
                        console.log("Update profile success");
                        confirm("Update successfully");
                        clear_modal();
                        break;
                    case 400:
                        clear_modal();
                        alert("Malformed user object");
                        break;
                    case 403:
                        clear_modal();
                        alert("Invalid Authorization Token");
                        break;
                    default:
                        console.log("Update profile unexplored status code");
                        alert("Unexplored status code");
                }
            }
        };
        xhr.send(JSON.stringify(post_obj));
    });
    modal_content.appendChild(submit_button);
    const modal_noti = document.createElement("p");
    modal_noti.innerText = "for the item not gonna to be changed, just leave it empty";
    modal_content.appendChild(modal_noti);
    modal.style.display = "block";
}


export function refresh_login_page(token) {
    document.getElementById("feed").getElementsByTagName("h3")[0].innerText = "Home page";
    // get the user feed
    const xhr_get = new XMLHttpRequest();
    xhr_get.open("GET", API_URL+"/user/feed", false);
    xhr_get.setRequestHeader("Authorization", "Token "+token);
    xhr_get.onload = () => {
        if (xhr_get.readyState === 4) {
            switch (xhr_get.status) {
                case 200:
                    console.log("Success");
                    console.log(xhr_get.responseText);
                    clear_feed();
                    document.getElementById("feed").setAttribute("fetching", "false");
                    const temp_list = JSON.parse(xhr_get.responseText)["posts"];
                    fill_feed(temp_list, token);
                    document.getElementById("feed").setAttribute("next-to-fetch", temp_list.length);
                    if (temp_list.length < 10) {
                        // not enough posts there, stop infinitely scrolling
                        document.getElementById("feed").setAttribute("fetching", "true");
                    } else {
                        // infinitely scrolling
                        const response_func = () => {
                            if ((window.scrollY+window.innerHeight) > document.getElementById("feed").scrollHeight * 0.85 && document.getElementById("feed").getAttribute("fetching") !== "true") {
                                document.getElementById("feed").setAttribute("fetching", "true");
                                automatically_fetch_more(token);
                            }
                        };
                        window.addEventListener("scroll", response_func);
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

// update the page after logging in or signing up
export function update_login_page(token) {
    document.getElementById("feed").getElementsByTagName("h3")[0].innerText = "Home page";
    // get the user info and change the login button
    const xhr_user = new XMLHttpRequest();
    xhr_user.open("GET", API_URL+"/user/", false);
    xhr_user.setRequestHeader("Authorization", "Token "+token);
    xhr_user.onload = () => {
        if (xhr_user.readyState === 4) {
            switch (xhr_user.status) {
                case 200:
                    const profile_obj = JSON.parse(xhr_user.responseText);
                    console.log("Success");
                    console.log(xhr_user.responseText);
                    let nav_ul;
                    if (document.getElementById("login-in-button") !== null) {
                        nav_ul = document.getElementById("login-in-button").parentNode.parentNode;
                        nav_ul.removeChild(document.getElementById("login-in-button").parentNode);
                        nav_ul.removeChild(document.getElementById("sign-up-button").parentNode);
                    } else {
                        nav_ul = document.querySelectorAll(".banner > .nav")[0];
                    }
                    const login_info = document.createElement("p");
                    login_info.setAttribute("id", "logged-in");
                    login_info.setAttribute("user-id-is", profile_obj["id"]);
                    login_info.setAttribute("username-is", profile_obj["username"]);
                    login_info.innerText = "Logged as " + profile_obj["username"];
                    nav_ul.appendChild(login_info);
                    const logout_button = document.createElement("button");
                    logout_button.classList.add("button");
                    logout_button.innerText = "Log out";
                    logout_button.addEventListener("click", () => {
                        document.location.reload();
                    });
                    nav_ul.appendChild(logout_button);
                    const user_page_button = document.createElement("button");
                    user_page_button.innerText = "My user page";
                    user_page_button.setAttribute("id", "userpage-button");
                    user_page_button.classList.add("button");
                    user_page_button.addEventListener("click", () => {
                        show_profile_with_username(token, profile_obj["username"]);
                    });
                    nav_ul.appendChild(user_page_button);
                    const profile_button = document.createElement("button");
                    profile_button.innerText = "Profile";
                    profile_button.setAttribute("id", "profile-button");
                    profile_button.classList.add("button");
                    profile_button.addEventListener("click", () => {
                        show_profile(token);
                    });
                    const update_profile_button = document.createElement("button");
                    update_profile_button.innerText = "Update Profile";
                    update_profile_button.setAttribute("id", "update-profile-button");
                    update_profile_button.classList.add("button");
                    update_profile_button.addEventListener("click", () => {
                        // update profile
                        update_profile(token);
                    });
                    nav_ul.appendChild(profile_button);
                    nav_ul.appendChild(update_profile_button);
                    break;
                case 400:
                    alert("Malformed Request");
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
    xhr_user.send(null);
    // get the user feed
    const xhr_get = new XMLHttpRequest();
    xhr_get.open("GET", API_URL+"/user/feed", false);
    xhr_get.setRequestHeader("Authorization", "Token "+token);
    xhr_get.onload = () => {
        if (xhr_get.readyState === 4) {
            switch (xhr_get.status) {
                case 200:
                    console.log("Success");
                    console.log(xhr_get.responseText);
                    clear_feed();
                    const temp_list = JSON.parse(xhr_get.responseText)["posts"];
                    fill_feed(temp_list, token);
                    document.getElementById("feed").setAttribute("next-to-fetch", temp_list.length);
                    if (temp_list.length < 10) {
                        // not enough posts there, stop infinitely scrolling
                        document.getElementById("feed").setAttribute("fetching", "true");
                    } else {
                        // infinitely scrolling
                        const response_func = () => {
                            if ((window.scrollY+window.innerHeight) > document.getElementById("feed").scrollHeight * 0.85 && document.getElementById("feed").getAttribute("fetching") !== "true") {
                                document.getElementById("feed").setAttribute("fetching", "true");
                                automatically_fetch_more(token);
                            }
                        };
                        window.addEventListener("scroll", response_func);
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
    // change the event of the post button
    document.getElementById("post-button").addEventListener("click", () => {
        post_posts(token);
    });
    // add a scroll-back button
    const scroll_back_button = document.createElement("button");
    scroll_back_button.classList.add("button");
    scroll_back_button.classList.add("scroll-back-button");
    scroll_back_button.innerText = "Top";
    scroll_back_button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    })
    if (document.getElementsByTagName("main").length > 0) {
        document.getElementsByTagName("main")[0].appendChild(scroll_back_button);
    }
    // enable votes
    enable_votes(token);
    // enable searches
    enable_searches(token);
    // enable notification
    get_notifications(token);
    // enable random posts
    const random_generator = document.createElement("button");
    random_generator.classList.add("button");
    random_generator.innerText = "Random!";
    document.getElementById("main").insertBefore(random_generator, document.querySelectorAll("#main > .scroll-back-button")[0]);
    random_generator.addEventListener("click", () => {
        generate_random_posts(token);
    })
}


// level 0 used
// export function login() {
//     // get the objects from the HTML file
//     const root_div = document.getElementById("root");

//     // click the login button
//     // TODO: ui design
//     const primary_button = document.getElementById("login-in-button");
//     primary_button.addEventListener("click", () => {
//         if (document.getElementsByClassName("login_div").length > 0) {
//             return;
//         }
//         // create new div
//         const login_div = document.createElement("div");
//         login_div.classList.add("login_div");
//         login_div.setAttribute("style", "float: right");
//         root_div.insertBefore(login_div, document.getElementsByTagName("main")[0]);
//         const login_user = document.createElement("input");
//         login_user.setAttribute("type", "text");
//         login_user.setAttribute("placeholder", "Enter the username here");
//         login_div.appendChild(login_user);
//         const login_passwd = document.createElement("input");
//         login_passwd.setAttribute("type", "password");
//         login_div.appendChild(login_passwd);
//         const login_button = document.createElement("input");
//         login_div.appendChild(login_button);
//         login_button.setAttribute("type", "submit");
//         login_button.addEventListener("click", () => {
//         // check whether empty
//         if (login_user.value === '' || login_passwd.value === '') {
//             alert("Invalid username or password format");
//             return;
//         }
//         alert("Oops, authentication has failed...");
//         // remove the div from DOM
//         root_div.removeChild(login_div);
//         });
//     });
// }

// level 1 used
// also update the posts
export function login() {
    // get the objects from the HTML file
    const root_div = document.getElementById("root");

    // click the login button
    // TODO: ui design
    const primary_button = document.getElementById("login-in-button");
    let token = null;
    primary_button.addEventListener("click", () => {
        // check for localstorage
        if (localStorage.getItem("token") !== null) {
            const confirm_m = confirm("Do you want to use the default user account?");
            if (confirm_m === true) {
                token = localStorage.getItem("token");
                update_login_page(token);
                if (! document.getElementById("logo").classList.contains("clickable-post-title")) {
                    document.getElementById("logo").classList.add("clickable-post-title");
                }
                document.getElementById("logo").addEventListener("click", () => {
                    refresh_login_page(token);
                });
                return;
            }
        }
        // login
        modal_generate();
        document.getElementById("modal-p").innerText = "Log In";
        document.getElementById("modal-id").style.display = "block";
        const modal_content = document.getElementById("modal-content");
        const login_div = document.createElement("div");
        login_div.classList.add("login_div");
        modal_content.appendChild(login_div);
        const login_user_div = document.createElement("div");
        const login_user_p = document.createElement("p");
        login_user_p.innerText = "Username:";
        login_user_div.appendChild(login_user_p);
        const login_user = document.createElement("input");
        login_user.setAttribute("type", "text");
        login_user.setAttribute("placeholder", "Enter the username here");
        login_user_div.appendChild(login_user);
        login_div.append(login_user_div);
        const login_passwd_div = document.createElement("div");
        const login_passwd_p = document.createElement("p");
        login_passwd_p.innerText = "Password: "
        login_passwd_div.appendChild(login_passwd_p);
        const login_passwd = document.createElement("input");
        login_passwd.setAttribute("type", "password");
        login_passwd_div.appendChild(login_passwd);
        login_div.append(login_passwd_div);
        const login_button = document.createElement("input");
        login_div.appendChild(login_button);
        login_button.setAttribute("type", "submit");
        login_button.addEventListener("click", () => {
            // check whether empty
            if (login_user.value === '' || login_passwd.value === '') {
                alert("Invalid username or password format");
                return;
            }
            const login_payload = {
                "username": login_user.value,
                "password": login_passwd.value
            };
            const xhr = new XMLHttpRequest();
            xhr.open("POST", API_URL+"/auth/login", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = () => {
                if (xhr.readyState === 4) {
                    switch (xhr.status) {
                        case 200:
                            console.log("Success");
                            console.log(xhr.responseText);
                            token = JSON.parse(xhr.responseText)["token"];
                            // get the user info and change the login button
                            update_login_page(token);
                            const store_confirm = confirm("Do you want to set this as the default account?");
                            if (store_confirm === true) {
                                localStorage.setItem("token", token);
                            }
                            if (! document.getElementById("logo").classList.contains("clickable-post-title")) {
                                document.getElementById("logo").classList.add("clickable-post-title");
                            }
                            document.getElementById("logo").addEventListener("click", () => {
                                refresh_login_page(token);
                            });
                            clear_modal();
                            break;
                        case 400:
                            clear_modal();
                            alert("400, missing username/password");
                            break;
                        case 403:
                            clear_modal();
                            alert("Invalid username/password");
                            break;
                        default:
                            // need to consider other status codes
                            clear_modal();
                            console.log("To be developed");
                    }
                }
            };
            xhr.send(JSON.stringify(login_payload));
        });

        // if (document.getElementsByClassName("login_div").length > 0) {
        //     return;
        // }
        // // create new div
        // const login_div = document.createElement("div");
        // login_div.classList.add("login_div");
        // // login_div.setAttribute("style", "float: right");
        // root_div.insertBefore(login_div, document.getElementsByTagName("main")[0]);
        
    });
}

// level 0 used
// export function signup() {
//     // click the signup button
//     // TODO: UI design, and other validations
//     const secondary_button = document.getElementById("sign-up-button");
//     secondary_button.addEventListener("click", () => {
//         if (document.getElementsByClassName("signup_div").length > 0) {
//         return;
//         }
//         // create new div
//         const signup_div = document.createElement("div");
//         signup_div.classList.add("signup_div");
//         root.insertBefore(signup_div, document.getElementsByTagName("main")[0]);
//         const signup_user = document.createElement("input");
//         signup_user.setAttribute("type", "text");
//         signup_user.setAttribute("placeholder", "Enter the username here");
//         signup_div.appendChild(signup_user);
//         const signup_passwd_v1 = document.createElement("input");
//         signup_passwd_v1.setAttribute("type", "password");
//         signup_div.appendChild(signup_passwd_v1);
//         const signup_passwd_v2 = document.createElement("input");
//         signup_passwd_v2.setAttribute("type", "password");
//         signup_div.appendChild(signup_passwd_v2);
//         const signup_button = document.createElement("input");
//         signup_button.setAttribute("type", "submit");
//         signup_div.appendChild(signup_button);
//         signup_button.addEventListener("click", () => {
//         if (signup_user.value === '' || signup_passwd_v1.value === '' || signup_passwd_v2.value === '') {
//             alert("Invalid username or password format");
//             return;
//         }
//         if (signup_passwd_v1.value !== signup_passwd_v2.value) {
//             alert("Two passwords do not match");
//             return;
//         }
//         alert("Oops, fail to create new account");
//         root.removeChild(signup_div);
//         })
//     });
// }

export function signup() {
    // click the signup button
    // TODO: UI design, and other validations
    const secondary_button = document.getElementById("sign-up-button");
    secondary_button.addEventListener("click", () => {
        // signup, using modal
        modal_generate();
        document.getElementById("modal-id").style.display = "block";
        document.getElementById("modal-p").innerText = "Sign Up";
        const signup_div = document.createElement("div");
        signup_div.classList.add("signup_div");
        document.getElementById("modal-content").appendChild(signup_div);
        const signup_user_div = document.createElement("div");
        const signup_user_p = document.createElement("p");
        signup_user_p.innerText = "Username:";
        signup_user_div.appendChild(signup_user_p);
        const signup_user = document.createElement("input");
        signup_user.setAttribute("type", "text");
        signup_user.setAttribute("placeholder", "Enter the username here");
        signup_user_div.appendChild(signup_user);
        signup_div.appendChild(signup_user_div);
        const signup_passwd_v1_div = document.createElement("div");
        const signup_passwd_v1_p = document.createElement("p");
        signup_passwd_v1_p.innerText = "Password:"
        signup_passwd_v1_div.appendChild(signup_passwd_v1_p);
        const signup_passwd_v1 = document.createElement("input");
        signup_passwd_v1.setAttribute("type", "password");
        signup_passwd_v1.setAttribute("placeholder", "Enter the password here");
        signup_passwd_v1_div.appendChild(signup_passwd_v1);
        signup_div.appendChild(signup_passwd_v1_div);
        const signup_passwd_v2_div = document.createElement("div");
        const signup_passwd_v2_p = document.createElement("p");
        signup_passwd_v2_p.innerText = "Password again:";
        signup_passwd_v2_div.appendChild(signup_passwd_v2_p);
        const signup_passwd_v2 = document.createElement("input");
        signup_passwd_v2.setAttribute("type", "password");
        signup_passwd_v2.setAttribute("placeholder", "Re-enter the password here");
        signup_passwd_v2_div.appendChild(signup_passwd_v2);
        signup_div.appendChild(signup_passwd_v2_div);
        const signup_email_div = document.createElement("div");
        const signup_email_p = document.createElement("p");
        signup_email_p.innerText = "Email Address:";
        signup_email_div.appendChild(signup_email_p);
        const signup_email = document.createElement("input");
        signup_email.setAttribute("type", "email");
        signup_email.setAttribute("placeholder", "Enter the email address here");
        signup_email_div.appendChild(signup_email);
        signup_div.appendChild(signup_email_div);
        const signup_name_div = document.createElement("div");
        const signup_name_p = document.createElement("p");
        signup_name_p.innerText = "Name:";
        signup_name_div.appendChild(signup_name_p);
        const signup_name = document.createElement("input");
        signup_name.setAttribute("type", "text");
        signup_name.setAttribute("placeholder", "Enter your name here");
        signup_name_div.appendChild(signup_name);
        signup_div.appendChild(signup_name_div);
        const signup_button = document.createElement("input");
        signup_button.setAttribute("type", "submit");
        signup_div.appendChild(signup_button);
        signup_button.addEventListener("click", () => {
            if (signup_user.value === '' || signup_passwd_v1.value === '' || signup_passwd_v2.value === ''
                    || signup_email === '' || signup_name === '') {
                alert("Invalid username or password format");
                return;
            }
            if (signup_passwd_v1.value !== signup_passwd_v2.value) {
                alert("Two passwords do not match");
                return;
            }
            const signup_payload = {
                "username": signup_user.value,
                "password": signup_passwd_v1.value,
                "email": signup_email.value,
                "name": signup_name.value
            };
            const xhr = new XMLHttpRequest();
            xhr.open("POST", API_URL+"/auth/signup", false);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = () => {
                if (xhr.readyState == 4) {
                    switch (xhr.status) {
                        case 200:
                            console.log("Success");
                            const token = JSON.parse(xhr.responseText)["token"];
                            // follow_interesting_users(token);
                            // alert("Automatically get some friends for you!");
                            // console.log("hola");
                            update_login_page(token);
                            const store_confirm = confirm("Do you want to store it as the default account?");
                            if (store_confirm === true) {
                                localStorage.setItem("token", token);
                            }
                            if (! document.getElementById("logo").classList.contains("clickable-post-title")) {
                                document.getElementById("logo").classList.add("clickable-post-title");
                            }
                            document.getElementById("logo").addEventListener("click", () => {
                                refresh_login_page(token);
                            });
                            clear_modal();
                            break;
                        case 400:
                            clear_modal();
                            alert("Malformed Request");
                            break;
                        case 409:
                            clear_modal();
                            alert("Username has been taken");
                            break;
                        default:
                            // consider more status codes
                            console.log("To be developed");
                            clear_modal();
                    }
                }
            };
            xhr.send(JSON.stringify(signup_payload));
            // root.removeChild(signup_div);
        });
    });
}
