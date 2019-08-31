import API_URL from './backend_url.js';
import {modal_generate, clear_modal} from './modal_generate.js';

export function post_posts(token) {
    modal_generate();
    const modal_content = document.getElementById("modal-content");
    const modal_p = document.getElementById("modal-p");
    modal_p.innerText = "Edit your post here";
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
    const modal_post_subseddit_div = document.createElement("div");
    const modal_post_subseddit_p = document.createElement("p");
    modal_post_subseddit_p.innerText = "The subseddit of the post:";
    modal_post_subseddit_div.appendChild(modal_post_subseddit_p);
    const modal_post_subseddit = document.createElement("input");
    modal_post_subseddit.setAttribute("type", "text");
    modal_post_subseddit.setAttribute("placeholder", "Enter the subseddit here");
    modal_post_subseddit_div.appendChild(modal_post_subseddit);
    modal_post_div.appendChild(modal_post_subseddit_div);
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
        const post_subseddit = modal_post_subseddit.value;
        // console.log(post_title);
        // console.log(modal_post_image.value);
        if (post_title === '' || post_text === '') {
            alert("Invalid post format!");
            return;
        }
        let new_obj = new Object();
        new_obj["title"] = post_title;
        new_obj["text"] = post_text;
        new_obj["subseddit"] = post_subseddit;
        if (modal_post_image.value === '') {
            // new_obj["image"] = null;  // do not include this field if there is no image
            // post here
            const xhr_post = new XMLHttpRequest();
            xhr_post.open("POST", API_URL+"/post/", false);
            xhr_post.setRequestHeader("Authorization", "Token "+token);
            xhr_post.setRequestHeader("Content-type", "application/json");
            xhr_post.onload = () => {
                if (xhr_post.readyState === 4) {
                    switch (xhr_post.status) {
                        case 200:
                            console.log("POST /post/ success");
                            const response_json = JSON.parse(xhr_post.responseText);
                            console.log("The post ID is: "+response_json["post_id"]);
                            confirm("Post successfully!");
                            break;
                        case 400:
                            console.log("POST /post/ 400");
                            alert("Malformed Request / Image could not be processed");
                            break;
                        case 403:
                            console.log("POST /post/ 403");
                            alert("Invalid Auth Token");
                            break;
                        default:
                            console.log("POST /post/ unexplored status code");
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
                xhr_post.open("POST", API_URL+"/post/", false);
                xhr_post.setRequestHeader("Authorization", "Token "+token);
                xhr_post.setRequestHeader("content-type", "application/json");
                xhr_post.onload = () => {
                    if (xhr_post.readyState === 4) {
                        switch (xhr_post.status) {
                            case 200:
                                console.log("POST /post/ success");
                                const response_json = JSON.parse(xhr_post.responseText);
                                console.log("The post ID is: "+response_json["post_id"]);
                                confirm("Post successfully!");
                                break;
                            case 400:
                                console.log("POST /post/ 400");
                                alert("Malformed Request / Image could not be processed");
                                break;
                            case 403:
                                console.log("POST /post/ 403");
                                alert("Invalid Auth Token");
                                break;
                            default:
                                console.log("POST /post/ unexplored status code");
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
}