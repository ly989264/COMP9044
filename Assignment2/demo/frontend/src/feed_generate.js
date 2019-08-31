import {modal_generate, clear_modal, sub_clear_modal} from './modal_generate.js';
import {enable_votes} from './votes.js';
import {show_profile_with_username} from './login_register.js';
import { redirect_subseddit } from './subseddits.js';
import API_URL from './backend_url.js';

export function feed_append(eachpost, token, parentnode, isNewModal) {
    
    if (document.getElementById("modal-p") !== null) {
        document.getElementById("modal-p").innerText = "Post detail:";
    }

    const vote_div = document.createElement("div");
    vote_div.classList.add("vote");
    vote_div.setAttribute("data-id-upvotes", '');
    const up_vote = document.createElement("p");
    up_vote.innerText = " ^ ";
    up_vote.classList.add("up-votes");
    vote_div.appendChild(up_vote);

    // show different color if upvoted
    if (document.getElementById("logged-in") !== null) {
        const post_id = eachpost["id"];
        fetch(API_URL+"/post?id="+post_id, {
            method: 'GET',
            headers: {
                'Authorization': 'Token '+token,
            },
        })
            .then(r => r.json())
            .then(r => {
                const user_id = document.getElementById("logged-in").getAttribute("user-id-is");
                if (r["meta"]["upvotes"].includes(parseInt(user_id))) {
                    up_vote.style.color = "tomato";
                    up_vote.style.fontWeight = "bold";
                    up_vote.setAttribute("already_voted", "true");
                } 
            });
    }
    

    const vote_num_p = document.createElement("p");
    vote_num_p.classList.add("vote-num");
    vote_num_p.innerText = eachpost["meta"]["upvotes"].length;
    vote_div.appendChild(vote_num_p);
    const vote_button = document.createElement("button");
    vote_button.innerText = "Details";
    vote_button.setAttribute("is_button_opened", "false");
    vote_button.addEventListener("click", () => {
        if (document.getElementById("logged-in") === null) {
            alert("Please log in or sign up!");
            return;
        }
        let modal_p;
        let modal_parent;
        if (isNewModal === "true") {
            modal_generate();
            document.getElementById("modal-id").style.display = "block";
            modal_p = document.getElementById("modal-p");
            modal_parent = document.getElementById("modal-content");
        } else {
            if (vote_button.getAttribute("is_button_opened") === "true") {
                vote_button.setAttribute("is_button_opened", "false");
                sub_clear_modal();
                document.getElementById("modal-p").innerText = "Post detail:";
                return;
            }
            vote_button.setAttribute("is_button_opened", "true");
            sub_clear_modal();
            modal_p = document.createElement("h3");
            document.getElementById("modal-content").appendChild(modal_p);
            modal_parent = document.getElementById("modal-content");
        }
        // fill modal content
        if (up_vote.getAttribute("modified") === "true") {
            fetch(API_URL+"/post?id="+eachpost["id"], {
                method: "GET",
                headers: {
                    "Authorization": "Token "+token,
                },
            }).then(r => r.json()).then(new_obj => {
                if (new_obj["meta"]["upvotes"].length === 0) {
                    modal_p.innerText = "No upvotes";
                } else {
                    // modal_p.innerText = "The upvotes are:";
                    const modal_ul = document.createElement("ul");
                    // modified
                    if (isNewModal === "true") {
                        modal_parent.appendChild(modal_ul);
                    } else {
                        console.log(vote_button.parentNode.parentNode);
                        if (vote_button.parentNode.parentNode.nextSibling !== null) {
                            vote_button.parentNode.parentNode.parentNode.insertBefore(modal_ul, vote_button.parentNode.parentNode.nextSibling);
                            console.log(document.getElementById("modal-feed"));
                        } else {
                            vote_button.parentNode.parentNode.parentNode.appendChild(modal_ul);
                        }
                    }
                    
                    

                    let new_fetches = [];
                    for (const each_upvote of new_obj["meta"]["upvotes"]) {
                        if (each_upvote === "0" || each_upvote === 0) {
                            continue;
                        }
                        new_fetches.push(fetch(API_URL+"/user?id="+each_upvote, {
                            method: "GET",
                            headers: {
                                "Authorization": "Token "+token,
                            },
                        }).then(r => r.json()).then(r => {
                            const temp_li = document.createElement("li");
                            temp_li.innerText = r["name"];
                            modal_ul.appendChild(temp_li);
                        }));
                    }
                    return Promise.all(new_fetches);
                }
            });
        } else {
            if (eachpost["meta"]["upvotes"].length === 0) {
                modal_p.innerText = "No upvotes";
            } else {
                // modal_p.innerText = "The upvotes are:";
                const modal_ul = document.createElement("ul");
                // modified
                if (isNewModal === "true") {
                    modal_parent.appendChild(modal_ul);
                } else {
                    console.log(vote_button.parentNode.parentNode);
                    if (vote_button.parentNode.parentNode.nextSibling !== null) {
                        vote_button.parentNode.parentNode.parentNode.insertBefore(modal_ul, vote_button.parentNode.parentNode.nextSibling);
                        console.log(document.getElementById("modal-feed"));
                    } else {
                        vote_button.parentNode.parentNode.parentNode.appendChild(modal_ul);
                    }
                }

                let new_fetches = [];
                for (const each_upvote of eachpost["meta"]["upvotes"]) {
                    if (each_upvote === "0" || each_upvote === 0) {
                        continue;
                    }
                    new_fetches.push(fetch(API_URL+"/user?id="+each_upvote, {
                        method: "GET",
                        headers: {
                            "Authorization": "Token "+token,
                        },
                    }).then(r => r.json()).then(r => {
                        const temp_li = document.createElement("li");
                        temp_li.innerText = r["name"];
                        modal_ul.appendChild(temp_li);
                    }));
                }
                return Promise.all(new_fetches);
            }
        }
    });
    vote_div.appendChild(vote_button);

    // content div, with title, text, author, time, subseddit, comment inside
    const content_div = document.createElement("div");
    content_div.setAttribute("postid", eachpost["id"]);
    content_div.classList.add("content");
    // images (thumbnail + image)
    if (eachpost["thumbnail"] !== null && eachpost["thumbnail"] !== "") {
    const img_div = document.createElement("div");
    content_div.appendChild(img_div);
    const img_thum = document.createElement("img");
    img_thum.setAttribute("src", "data:image/png;base64, "+eachpost["thumbnail"]);
    if (document.getElementById("logged-in") !== null) {
        img_thum.classList.add("clickable-post-title");
        img_thum.addEventListener("click", () => {
            show_profile_with_username(token, eachpost["meta"]["author"]);
        });
    }
    img_div.appendChild(img_thum);
    if (eachpost["image"] !== null && eachpost["image"] !== "") {
        const big_img_button = document.createElement("button");
        big_img_button.setAttribute("img_opened", "false");
        big_img_button.classList.add("button");
        big_img_button.innerText = "Show image";
        big_img_button.addEventListener("click", () => {
        if (big_img_button.getAttribute("img_opened") === "false") {
            img_thum.setAttribute("src", "data:image/png;base64, "+eachpost["image"]);
            big_img_button.innerText = "Show thumbnail";
            big_img_button.setAttribute("img_opened", "true");
        } else {
            img_thum.setAttribute("src", "data:image/png;base64, "+eachpost["thumbnail"]);
            big_img_button.innerText = "Show image";
            big_img_button.setAttribute("img_opened", "false");
        }
        });
        img_div.appendChild(big_img_button);
    }
    }
    // title
    const content_title = document.createElement("h4");
    content_title.setAttribute("data-id-title", '');
    content_title.classList.add("post-title");
    content_title.classList.add("alt-text");
    content_title.innerText = eachpost["title"];
    content_div.appendChild(content_title);
    // text
    const content_text = document.createElement("p");
    content_text.innerText = eachpost["text"];
    content_div.appendChild(content_text);
    // subseddit
    const content_subseddit = document.createElement("p");
    content_subseddit.classList.add("content-subseddit");
    content_subseddit.innerText = "#"+eachpost["meta"]["subseddit"];
    content_subseddit.addEventListener("click", () => {
        console.log("Trigger subseddit");
        redirect_subseddit(eachpost["meta"]["subseddit"]);
    });
    content_div.appendChild(content_subseddit);
    // author
    const content_author = document.createElement("p");
    content_author.classList.add("post-author");
    content_author.setAttribute("data-id-author", '');
    const pub_date = new Date(parseInt(eachpost["meta"]["published"]) * 1000);
    content_author.innerText = `Posted by ${eachpost["meta"]["author"]} at ${pub_date.getDate()}/${pub_date.getMonth()}/${pub_date.getFullYear()} ${pub_date.getHours()}:${pub_date.getMinutes()}:${pub_date.getSeconds()}`;
    content_author.addEventListener("click", () => {
        if (token !== null && token !== undefined && token !== "") {
            show_profile_with_username(token, eachpost["meta"]["author"]);
        } else {
            alert("Please log in or sign up to view user pages");
        }
    });
    content_div.appendChild(content_author);
    // comments
    const comment_div = document.createElement("div");
    comment_div.classList.add("comments");
    content_div.appendChild(comment_div);
    // comment number
    const comment_num = document.createElement("p");
    comment_num.innerText = eachpost["comments"].length+" comments";
    comment_div.appendChild(comment_num);
    // comment collapse and expand button
    const comment_showbutton = document.createElement("button");
    comment_div.append(comment_showbutton);
    comment_showbutton.innerText = "Show details";
    comment_showbutton.classList.add("button");
    comment_showbutton.setAttribute("is_button_opened", "false");
    comment_showbutton.addEventListener("click", () => {
        if (document.getElementById("logged-in") === null) {
            alert("Please log in or sign up!");
            return;
        }
        let modal_p;
        let modal_parent;
        if (isNewModal === "true") {
            modal_generate();
            document.getElementById("modal-id").style.display = "block";
            modal_p = document.createElement("h3");
            document.getElementById("modal-content").appendChild(modal_p);
            modal_parent = document.getElementById("modal-content");
        } else {
            if (comment_showbutton.getAttribute("is_button_opened") === "true") {
                comment_showbutton.setAttribute("is_button_opened", "false");
                comment_showbutton.innerText = "SHOW DETAILS";
                sub_clear_modal();
                document.getElementById("modal-p").innerText = "Post detail:";
                return;
            }
            comment_showbutton.setAttribute("is_button_opened", "true");
            comment_showbutton.innerText = "HIDE DETAILS";
            sub_clear_modal();
            modal_p = document.createElement("h3");
            document.getElementById("modal-content").appendChild(modal_p);
            modal_parent = document.getElementById("modal-content");
        }
        fetch(API_URL+"/post?id="+eachpost["id"], {
            method: "GET",
            headers: {
                "Authorization": "Token "+token,
            },
        }).then(r => r.json()).then(new_post => {
            if (new_post["comments"].length === 0) {
                modal_p.innerText = "No comments";
            } else {
                // modal_p.innerText = "The comments are:";
                const modal_ul = document.createElement("ul");

                // modified
                if (isNewModal === "true") {
                    modal_parent.appendChild(modal_ul);
                    // console.log("aaa");
                } else {
                    // console.log("bbb");
                    console.log(comment_showbutton.parentNode.parentNode);
                    if (comment_showbutton.parentNode.parentNode.parentNode.nextSibling !== null) {
                        comment_showbutton.parentNode.parentNode.parentNode.parentNode.insertBefore(modal_ul, comment_showbutton.parentNode.parentNode.parentNode.nextSibling);
                        // console.log(document.getElementById("modal-feed"));
                    } else {
                        comment_showbutton.parentNode.parentNode.parentNode.parentNode.appendChild(modal_ul);
                    }
                }
                for (const eachcomment of new_post["comments"]) {
                    // note: inconsistency of the json from API and feed.json, fix this later
                    const comment_detail_li = document.createElement("li");
                    const comment_detail_content = document.createElement("p");
                    comment_detail_content.classList.add("comment-detail-content");
                    comment_detail_content.innerText = eachcomment["comment"];
                    comment_detail_li.appendChild(comment_detail_content);
                    const comment_detail_author = document.createElement("p");
                    comment_detail_author.classList.add("comment-detail-author");
                    const cur_date = new Date(parseInt(eachcomment["published"]) * 1000);
                    comment_detail_author.innerText = `By ${eachcomment["author"]} at ${cur_date.getDate()}/${cur_date.getMonth()}/${cur_date.getFullYear()} ${cur_date.getHours()}:${cur_date.getMinutes()}:${cur_date.getSeconds()}`;
                    comment_detail_author.addEventListener("click", () => {
                        if (token !== null && token !== undefined && token !== "") {
                            clear_modal();
                            show_profile_with_username(token, eachcomment["author"]);
                        } else {
                            alert("Please log in or sign up to view user pages");
                        }
                    });
                    comment_detail_li.appendChild(comment_detail_author);
                    modal_ul.appendChild(comment_detail_li);
                }
            }
        });
        
    });
    
    // add comment, if logged in (token is not null)
    if (token !== null && token !== undefined && token !== "") {
        const comment_add = document.createElement("button");
        comment_add.innerText = "Add Comment";
        comment_add.classList.add("button");
        // a user can add comments on a post for multiple times
        comment_add.addEventListener("click", () => {

            let modal_p;
            let modal_parent;
            if (isNewModal === "true") {
                modal_generate();
                document.getElementById("modal-id").style.display = "block";
                modal_p = document.createElement("h3");
                document.getElementById("modal-content").appendChild(modal_p);
                modal_parent = document.getElementById("modal-content");
            } else {
                sub_clear_modal();
                modal_p = document.createElement("h3");
                document.getElementById("modal-content").appendChild(modal_p);
                modal_parent = document.getElementById("modal-content");
            }

            
            const comment_div = document.createElement("div");
            comment_div.classList.add("comment_div");
            if (isNewModal === "true") {
                modal_parent.appendChild(comment_div);
            } else {
                console.log(comment_add.parentNode.parentNode);
                if (comment_add.parentNode.parentNode.parentNode.nextSibling !== null) {
                    comment_add.parentNode.parentNode.parentNode.parentNode.insertBefore(comment_div, comment_add.parentNode.parentNode.parentNode.nextSibling);
                } else {
                    comment_add.parentNode.parentNode.parentNode.parentNode.appendChild(comment_div);
                }
            }
            const comment_p = document.createElement("p");
            comment_p.innerText = "Comment:";
            comment_div.appendChild(comment_p);
            const comment_content = document.createElement("input");
            comment_content.setAttribute("type", "input");
            comment_div.appendChild(comment_content);
            const comment_submit = document.createElement("input");
            comment_submit.setAttribute("type", "submit");
            comment_submit.addEventListener("click", () => {
                if (comment_content.value === "") {
                    alert("The comment cannot be empty!");
                    return;
                }
                const curr_post_id = eachpost["id"];
                fetch(API_URL+"/post/comment?id="+curr_post_id, {
                    method: "PUT",
                    headers: {
                        "Authorization": "Token "+token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({"comment": comment_content.value})
                }).then(r => {
                    console.log("Add comment success");
                        confirm("Comment successfully");
                        if (isNewModal === "true") {
                            clear_modal();
                        } else {
                            sub_clear_modal();
                            document.getElementById("modal-p").innerText = "Post detail:";
                        }
                        comment_num.innerText = (parseInt(comment_num.innerText)+1)+" comments";
                })
            });
            comment_div.appendChild(comment_submit);
        });
        comment_div.append(comment_add);
    }
    parentnode.appendChild(vote_div);
    parentnode.appendChild(content_div);
    // enable vote
    if (document.getElementById("logged-in") !== null) {
        enable_votes(token);
    }
}

// write the feed, as a list, to DOM
export function fill_feed(posts_list, token) {
    const feed_div = document.getElementById("feed");
    // order the posts
    posts_list.sort((a, b) => {
        return parseInt(b["meta"]["published"]) - parseInt(a["meta"]["published"]);
    });
    // for each post, dynamically generate the page
    for (const eachpost of posts_list) {
        const post_li = document.createElement("li");
        post_li.classList.add("post");
        post_li.setAttribute("data-id-post", '');
        feed_div.appendChild(post_li);
        feed_append(eachpost, token, post_li, "true");
    }
}

// write the feed, as a list, to DOM
// need to consider more
export function fill_feed_in_modal(posts_list, token) {
    const feed_div = document.getElementById("modal-feed");
    // order the posts
    posts_list.sort((a, b) => {
        return parseInt(b["meta"]["published"]) - parseInt(a["meta"]["published"]);
    });
    // for each post, dynamically generate the page
    for (const eachpost of posts_list) {
        const post_li = document.createElement("li");
        post_li.classList.add("post");
        post_li.setAttribute("data-id-post", '');
        feed_div.appendChild(post_li);
        feed_append(eachpost, token, post_li, "false");
    }
}

// clear all feed previously in the page
export function clear_feed() {
    const feed_ul = document.getElementById("feed");
    const lis = feed_ul.getElementsByTagName("li");
    while (lis.length > 0) {
        feed_ul.removeChild(lis[0]);
    }
}

// parse feed from url 
export function feed_generate(url) {
    // feed interface
    fetch(url)
        .then(r => r.json())
        .then(r => {
            const posts_list = r["posts"];
            // check null
            if (posts_list === null) {
                console.log("feed_generate function, null");
            } else {
                fill_feed(posts_list);
            }
        });
}

// used as trigger for infinitely looping
export function automatically_fetch_more(token) {
    // parentNode: with id feed
    // only used to fetch /user/feed, because /post/public can only get 20 posts
    // I want to use this function in the event listener, so I will store the next-to-fetch post id in
    // the data-attribute of feed ul
    // by default the num should be 10
    console.log("triggered");
    const xhr = new XMLHttpRequest();
    const start = document.getElementById("feed").getAttribute("next-to-fetch");
    const num = 10;
    xhr.open("GET", API_URL+"/user/feed?p="+start+"&n="+num, false);
    xhr.setRequestHeader("Authorization", "Token "+token);
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 200:
                    console.log("Automatically append success");
                    const temp_list = JSON.parse(xhr.responseText)["posts"];
                    fill_feed(temp_list, token);
                    document.getElementById("feed").setAttribute("next-to-fetch", parseInt(start)+num);
                    enable_votes(token);
                    // document.getElementById("feed").setAttribute("fetching", "false");
                    if (temp_list.length < num) {
                        // not enough posts there, stop infinitely scrolling
                        document.getElementById("feed").setAttribute("fetching", "true");
                    } else {
                        // infinitely scrolling
                        document.getElementById("feed").setAttribute("fetching", "false");
                    }
                    break;
                case 403:
                    alert("Invalid Auth token");
                    break;
                default:
                    console.log("Automatically append unexplored status code");
            }
        }
    };
    xhr.send(null);
}

// used as trigger for infinitely looping
export function automatically_fetch_more_in_modal(token, subseddit) {
    // parentNode: with id feed
    // only used to fetch /user/feed, because /post/public can only get 20 posts
    // I want to use this function in the event listener, so I will store the next-to-fetch post id in
    // the data-attribute of feed ul
    // by default the num should be 10
    console.log("triggered");
    const xhr = new XMLHttpRequest();
    const start = document.getElementById("modal-feed").getAttribute("next-to-fetch");
    const num = 10;
    xhr.open("GET", API_URL+"/user/feed?p="+start+"&n="+num, false);
    xhr.setRequestHeader("Authorization", "Token "+token);
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            switch (xhr.status) {
                case 200:
                    console.log("Automatically append success");
                    const temp_list = JSON.parse(xhr.responseText)["posts"];
                    fill_feed_in_modal(temp_list.filter(x => x["meta"]["subseddit"] === subseddit), token);
                    document.getElementById("modal-feed").setAttribute("next-to-fetch", parseInt(start)+num);
                    enable_votes(token);
                    if (temp_list.length < num) {
                        // not enough posts there, stop infinitely scrolling
                        document.getElementById("modal-feed").setAttribute("fetching", "true");
                    } else {
                        // infinitely scrolling
                        document.getElementById("modal-feed").setAttribute("fetching", "false");
                    }
                    break;
                case 403:
                    alert("Invalid Auth token");
                    break;
                default:
                    console.log("Automatically append unexplored status code");
            }
        }
    };
    xhr.send(null);
}
