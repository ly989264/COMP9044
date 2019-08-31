import API_URL from './backend_url.js';
export function get_notifications(token) {
    if (token === "" || token === null || token === undefined) {
        alert("You can only get notifications when logged in.");
        return;
    }
    setInterval(() => {
        // get the followed users
        fetch(API_URL+"/user", {
            method: "GET",
            headers: {
                "Authorization": "Token "+token
            }
        })
            .then(r => r.json())
            .then(r => {
                let fetches = [];
                const following_list = r["following"];
                for (const each_followed of following_list) {
                    // get the posts of this user
                    fetches.push(fetch(API_URL+"/user?id="+each_followed, {
                        method: "GET",
                        headers: {
                            "Authorization": "Token "+token
                        }
                    }).then(r => r.json()).then(r => {
                        const generated_post_list = r["posts"];
                        if (document.getElementById("gupi-"+each_followed) === null) {
                            // init
                            const user_info_div = document.createElement("div");
                            user_info_div.style.display = "none";
                            user_info_div.setAttribute("id", "gupi-"+each_followed);
                            document.getElementById("main").appendChild(user_info_div);
                            const new_post = document.createElement("p");
                            new_post.innerText = "";
                            for (const each_post of generated_post_list) {
                                new_post.innerText += ",";
                                new_post.innerText += each_post;
                            }
                            if (new_post.innerText !== "") {
                                new_post.innerText = new_post.innerText.substr(1);
                            }
                            user_info_div.appendChild(new_post);
                        } else {
                            const content = document.getElementById("gupi-"+each_followed).firstChild.innerText;
                            const content_list = content !== "" ? content.split(",").map(x => parseInt(x)) : [];
                            const new_posts_list = generated_post_list.filter(x => !content_list.includes(x));
                            // if there are elements in the new_posts_list, means new-posted post
                            // need to pop it up
                            for (const each_new_post of new_posts_list) {
                                // fetch the post
                                const xhr_post = new XMLHttpRequest();
                                xhr_post.open("GET", API_URL+"/post?id="+each_new_post, false);
                                xhr_post.setRequestHeader("Authorization", "Token "+token);
                                xhr_post.onload = () => {
                                    if (xhr_post.readyState === 4 && xhr_post.status === 200) {
                                        const new_post_obj = JSON.parse(xhr_post.responseText);
                                        const notification_message = `${new_post_obj["meta"]["author"]} just posted a new post "${new_post_obj["title"]}"` + ((new_post_obj["image"] === null || new_post_obj["image"] === "") ? " without an image" : " with an image");
                                        console.log(notification_message);
                                        // need to pop this message!
                                        Notification.requestPermission()
                                            .then((permission) => {
                                                if (permission === "granted") {
                                                    const notification = new Notification(notification_message);
                                                }
                                            });
                                        confirm(notification_message);
                                        // need to add this message
                                        if (document.getElementById("gupi-"+each_followed).firstChild.innerText === "") {
                                            document.getElementById("gupi-"+each_followed).firstChild.innerText = each_new_post;
                                        } else {
                                            document.getElementById("gupi-"+each_followed).firstChild.innerText += ",";
                                            document.getElementById("gupi-"+each_followed).firstChild.innerText += each_new_post;
                                        }
                                        
                                    }
                                };
                                xhr_post.send(null);
                            }
                        }
                    }));
                }
                return Promise.all(fetches);
            });
    }, 10000);
}