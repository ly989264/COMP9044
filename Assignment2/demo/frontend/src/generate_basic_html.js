
function generate_basic_html() {
    // assume the root div will be given
    // need to verify
    if (document.getElementById("root") === null) {
        const new_root = document.createElement("div");
        new_root.setAttribute("id", "root");
        const body_tag = document.getElementsByTagName("body")[0];
        body_tag.insertBefore(new_root, body_tag.getElementsByTagName("script")[0]);
    }
    const root_div = document.getElementById("root");

    // rm all children in the root
    while (root_div.childElementCount !== 0) {
        root_div.removeChild(root_div.firstElementChild);
    }

    // insert header inside
    const header = document.createElement("header");
    header.classList.add("banner");
    header.setAttribute("id", "nav");
    root_div.appendChild(header);
    const header_h1 = document.createElement("h1");
    header_h1.setAttribute("id", "logo");
    header_h1.classList.add("flex-center");
    header_h1.innerText = "Seddit";
    header.appendChild(header_h1);
    const header_ul = document.createElement("ul");
    header_ul.classList.add("nav");
    header.appendChild(header_ul);
    const header_search_li = document.createElement("li");
    header_search_li.classList.add("nav-item");
    const header_search_input = document.createElement("input");
    header_search_input.setAttribute("id", "search");
    header_search_input.setAttribute("data-id-search", "");
    header_search_input.setAttribute("placeholder", "Search Seddit");
    header_search_input.setAttribute("type", "search");
    header_search_li.appendChild(header_search_input);
    const header_search_button = document.createElement("button");
    header_search_button.innerText = "Search!";
    header_search_button.classList.add("button");
    header_search_button.setAttribute("id", "header-search-button");
    header_search_li.appendChild(header_search_button);
    header_ul.appendChild(header_search_li);
    const header_login_li = document.createElement("li");
    header_login_li.classList.add("nav-item");
    const header_login_button = document.createElement("button");
    header_login_button.setAttribute("data-id-login", "");
    header_login_button.setAttribute("id", "login-in-button");
    header_login_button.classList.add("button");
    header_login_button.classList.add("button-primary");
    header_login_button.innerText = "Log In";
    header_login_li.appendChild(header_login_button);
    header_ul.appendChild(header_login_li);
    const header_signup_li = document.createElement("li");
    header_signup_li.classList.add("nav-item");
    const header_signup_button = document.createElement("button");
    header_signup_button.setAttribute("data-id-signup", "");
    header_signup_button.setAttribute("id", "sign-up-button");
    header_signup_button.classList.add("button");
    header_signup_button.classList.add("button-secondary");
    header_signup_button.innerText = "Sign Up";
    header_signup_li.appendChild(header_signup_button);
    header_ul.appendChild(header_signup_li);

    // insert main inside
    const main = document.createElement("main");
    main.setAttribute("role", "main");
    main.setAttribute("id", "main");
    root_div.appendChild(main);
    const main_ul = document.createElement("ul");
    main_ul.setAttribute("id", "feed");
    main_ul.setAttribute("data-id-feed", "");
    main.appendChild(main_ul);
    const feedheader_div = document.createElement("div");
    feedheader_div.classList.add("feed-header");
    main_ul.appendChild(feedheader_div);
    const feedheader_h3 = document.createElement("h3");
    feedheader_h3.classList.add("feed-title");
    feedheader_h3.classList.add("alt-text");
    feedheader_h3.innerText = "Popular posts";
    feedheader_div.appendChild(feedheader_h3);
    const feedheader_button = document.createElement("button");
    feedheader_button.classList.add("button");
    feedheader_button.classList.add("button-secondary");
    feedheader_button.setAttribute("id", "post-button")
    feedheader_button.innerText = "Post";
    feedheader_button.addEventListener("click", () => {
        if (document.getElementById("logged-in") === null) {
            alert("Please log in or sign up to post");
        }
    });
    feedheader_div.appendChild(feedheader_button);

    // insert rooter inside
    const rooter = document.createElement("rooter");
    root_div.appendChild(rooter);
    const rooter_p = document.createElement("p");
    rooter_p.innerText = "Seddit, implemented by z5190675";
    rooter.appendChild(rooter_p);
}

export default generate_basic_html;