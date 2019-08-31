export function sub_clear_modal() {
    const modal_content = document.getElementById("modal-content");
    try {
        // remove the ul tags that are direct children of modal-content
        while (modal_content.querySelectorAll("#modal-content > ul").length !== 0) {
            modal_content.removeChild(modal_content.querySelectorAll("#modal-content > ul")[0]);
        }
        // remove the h3 tags that are direct children of modal-content
        while (modal_content.querySelectorAll("#modal-content > h3").length !== 0) {
            modal_content.removeChild(modal_content.querySelectorAll("#modal-content > h3")[0]);
        }
        console.log(modal_content.getElementsByTagName("ol").length);
        if (modal_content.querySelectorAll("#modal-content > ol").length > 0) {
            const ol_a = modal_content.querySelectorAll("#modal-content > ol")[0];
            while (ol_a.getElementsByTagName("ul").length !== 0) {
                ol_a.removeChild(ol_a.getElementsByTagName("ul")[0]);
            }
            while (ol_a.getElementsByClassName("comment_div").length != 0) {
                ol_a.removeChild(ol_a.getElementsByClassName("comment_div")[0]);
            }
        }
        // while (modal_content.getElementsByTagName("input").length !== 0) {
        //     modal_content.removeChild(modal_content.getElementsByTagName("input")[0]);
        // }
        // while (modal_content.getElementsByClassName("post")[0].nextSibling !== null) {
        //     modal_content.removeChild(modal_content.getElementsByClassName("post")[0].nextSibling);
        // }
        while (modal_content.querySelectorAll("#modal-content > .comment_div").length != 0) {
            modal_content.removeChild(modal_content.querySelectorAll("#modal-content > .comment_div")[0]);
        }
    } catch (error) {
        console.log(error);
    }
    
}

export function clear_modal() {
    const modal = document.getElementById("modal-id");
    if (modal !== null) {
        modal.parentNode.removeChild(modal);
    }
}

export function modal_generate() {
    if (document.getElementById("modal-id") !== null) {
        console.log("Modal is already generated");
        return;
    }
    clear_modal();
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal-id");
    modal.classList.add("modal");
    const modal_div = document.createElement("div");
    modal_div.setAttribute("id", "modal-content");
    modal_div.classList.add("modal-content");
    modal.appendChild(modal_div);
    const modal_span = document.createElement("span");
    modal_span.setAttribute("id", "modal-span");
    modal_span.classList.add("close");
    modal_span.innerText = "close";
    modal_div.appendChild(modal_span);
    const modal_p = document.createElement("p");
    modal_p.setAttribute("id", "modal-p");
    // modal_p.innerText = "Some text in the modal";
    modal_div.appendChild(modal_p);
    document.getElementsByTagName("body")[0].insertBefore(modal, document.getElementsByTagName("body")[0].firstChild);

    modal_span.addEventListener("click", () => {
        modal.style.display = "none";
        clear_modal();
    });

    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
            clear_modal();
        }
    });
}

export function modal_fill_content() {

}