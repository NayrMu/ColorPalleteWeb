let numColors = 0;


function randomButton() {
	
	palleteColors = document.querySelectorAll(".palleteColor");
	for (var i =0; i < palleteColors.length; i++) {
		color = randomColor();
		console.log("is this " + palleteColors[i].style.backgroundColor);
		palleteColors[i].style.backgroundColor = color;
		palleteColors[i].innerHTML = color;
	}
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

function addColor() {

	
	const colorCanvas = document.getElementById("colorCanvas");

	const template = document.getElementById("templateColor");

	const clone = template.content.cloneNode(true);

	const div = clone.querySelector("#palleteColor1")
	colorCanvas.appendChild(clone);
	numColors += 1;

	randomButton();
}

