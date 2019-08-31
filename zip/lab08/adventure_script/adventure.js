(function() {
	'use strict';
	// code here
	const player = document.getElementById("player");
	const fast_speed = 10;
	const low_speed = 5;
	let speed;
	let is_fast = false;
	const init_styles = window.getComputedStyle(player, null);
	player.style.left = init_styles.getPropertyValue("left");
	player.style.top = init_styles.getPropertyValue("top");
	const fireball = document.createElement("img");
	document.getElementsByTagName("body")[0].appendChild(fireball);
	fireball.setAttribute("src", "./imgs/fireball.png");
	fireball.setAttribute("hidden", true);
	let fireball_m = null;
	window.addEventListener("keydown", (event) => {
		console.log(player.style.left);
		if (is_fast) {
			speed = fast_speed;
		} else {
			speed = low_speed;
		}
		switch (event.key) {
			case "ArrowLeft":
				player.style.left = (parseInt(player.style.left) - speed) > 0 ? (parseInt(player.style.left) - speed)+"px" : 0;
				break;
			case "ArrowRight":
				player.style.left = (parseInt(player.style.left) + speed) < window.innerWidth ? (parseInt(player.style.left) + speed)+"px" : window.innerWidth+"px";
				break;
			case "z":
				is_fast = ! is_fast;
				break;
			case "x":
				if (fireball.getAttribute("hidden") === "true") {
					fireball.removeAttribute("hidden");
				}
				if (fireball_m !== null) {
					clearInterval(fireball_m);
				}
				fireball.style.position = "absolute";
				fireball.style.left = parseInt(player.style.left)+64+"px";
				fireball.style.top = parseInt(player.style.top)-40+"px";
				fireball.style.animation = "moving 2s";
				const fireball_move = () => {
					fireball.style.left = (parseInt(fireball.style.left) + 60) < (window.innerWidth - 30)  ? (parseInt(fireball.style.left) + 60)+"px" : (window.innerWidth - 30)+"px";
					if (parseInt(fireball.style.left) === window.innerWidth - 30) {
						fireball.setAttribute("hidden", true);
					}
				}
				fireball_m = setInterval(fireball_move, 50);
				break;
		}
	});
}());
