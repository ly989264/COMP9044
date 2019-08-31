export default function runApp() {
	const output_div = document.getElementById("output");
	let users_obj_list = [];
	let posts_obj_list = [];
	const fetches = [
		fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()).then(r => { users_obj_list = r}),
		fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()).then(r => { posts_obj_list = r})
	];
	Promise.all(fetches)
		.then(r => {
			for (const each_user of users_obj_list) {
				const user_div = document.createElement("div");
				user_div.classList.add("user");
				output_div.appendChild(user_div);
				const user_name = document.createElement("h2");
				user_name.innerText = each_user["name"];
				user_div.appendChild(user_name);
				const user_p = document.createElement("p");
				user_p.innerText = each_user["company"]["catchPhrase"];
				user_div.appendChild(user_p);
				const posts_ul = document.createElement("ul");
				posts_ul.classList.add("posts");
				user_div.appendChild(posts_ul);
				for (const each_post of posts_obj_list) {
					if (each_post["userId"] === each_user["id"]) {
						const post_li = document.createElement("li");
						post_li.classList.add("post");
						post_li.innerText = each_post["title"];
						user_div.appendChild(post_li);
					}
				}
			}		
		});
}
