function randomButton(id) {
	color = randomColor();
	document.getElementById("palleteColor1").style.backgroundColor = color;
	document.getElementById("palleteColor1Text").innerHTML = color;
}

function randomColor() {
	const colorArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += colorArr[Math.floor(Math.random() * 15)];
		console.log(color);
	}
	console.log(color);
	return color;
}

