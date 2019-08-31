import API_URL from './backend_url.js';

export function enable_votes(token) {
    const up_votes = document.getElementsByClassName("up-votes");
    // const down_votes = document.getElementsByClassName("down-votes");
    for (const each of up_votes) {
        if (each.getAttribute("trigger-set") === "true") {
            continue;
        }
        each.setAttribute("trigger-set", "true");
        each.addEventListener("click", (event) => {
            event.target.setAttribute("modified", "true");
            const post_id = event.target.parentNode.nextSibling.getAttribute("postid");
            const vote_num = parseInt(event.target.parentNode.getElementsByClassName("vote-num")[0].innerText);

            if (event.target.getAttribute("already_voted") === "true") {
                // should un-vote this one
                const xhr = new XMLHttpRequest();
                xhr.open("DELETE", API_URL+"/post/vote?id="+post_id, false);
                xhr.setRequestHeader("Authorization", "Token "+token);
                xhr.onload = () => {
                    if (xhr.readyState === 4) {
                        switch (xhr.status) {
                            case 200:
                                console.log("Unvote /post/vote success");
                                confirm("Unvote successfully");
                                break;
                            case 400:
                                alert("Vote: Malformed Request");
                                break;
                            case 403:
                                alert("Vote: Invalid Auth Token");
                                break;
                            default:
                                alert("Vote: Oops, unexplored status code");
                        }
                    }
                    event.target.parentNode.getElementsByClassName("vote-num")[0].innerText = vote_num-1;
                };
                xhr.send(null);
                event.target.style.color = "black";
                event.target.style.fontWeight = "normal";
                event.target.setAttribute("already_voted", "false");
            } else {
                const xhr = new XMLHttpRequest();
                xhr.open("PUT", API_URL+"/post/vote?id="+post_id, false);
                xhr.setRequestHeader("Authorization", "Token "+token);
                xhr.onload = () => {
                    if (xhr.readyState === 4) {
                        switch (xhr.status) {
                            case 200:
                                console.log("Vote /post/vote success");
                                confirm("Vote successfully");
                                break;
                            case 400:
                                alert("Vote: Malformed Request");
                                break;
                            case 403:
                                alert("Vote: Invalid Auth Token");
                                break;
                            default:
                                alert("Vote: Oops, unexplored status code");
                        }
                    }
                    event.target.parentNode.getElementsByClassName("vote-num")[0].innerText = vote_num+1;
                };
                xhr.send(null);
                event.target.style.color = "tomato";
                event.target.style.fontWeight = "bold";
                event.target.setAttribute("already_voted", "true");
            }
        });
    }
}