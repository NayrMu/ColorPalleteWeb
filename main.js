let numColors = 0;
const maxColors = 6;

function randomButton() {
	
	palleteColors = document.querySelectorAll(".palleteColor");
	palleteColors.forEach((palleteColor) => {

		const isLocked = palleteColor.dataset.isLocked;
		console.log(isLocked)
		if (isLocked === "false") {
			color = randomColor();
			p = palleteColor.querySelector("p");
			palleteColor.style.backgroundColor = color;
			p.innerHTML = color;
		}
	});
}

function randomColor() {
	const colorArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += colorArr[Math.floor(Math.random() * 15)];
	} 
	return color;
}

function addColor() {

	if (numColors < maxColors) {
		const colorCanvas = document.querySelector(".colorCanvas");

		const template = document.getElementById("templateColor");

		const clone = template.content.cloneNode(true);

		const div = clone.querySelector("#palleteColor")
		colorCanvas.appendChild(clone);
		numColors += 1;

		locks = div.querySelectorAll("i");


		div.dataset.isLocked = "false";

		locks.forEach((lock) => {
			lock.addEventListener("click", () => lockFunc(lock, div));
		});
		
		

		randomButton();
	}
}

function subtractColor() {
	const colorCanvas = document.querySelector(".colorCanvas")
	const palleteColors = document.querySelectorAll(".palleteColor")
	for (const palleteColor of palleteColors) {
		if (palleteColor.dataset.isLocked == "false") {
			colorCanvas.removeChild(palleteColor);
			break;
		}
	}
	
	numColors -= 1;
}

function lockFunc(lock, div) {

		if (lock.classList.contains("fa-lock-open")) {
			lock.classList.remove("fa-lock-open");
			lock.classList.add("fa-lock");

		} else { 
			lock.classList.add("fa-lock-open");
			lock.classList.remove("fa-lock");
		}
		if (div.dataset.isLocked === "false") {
			div.dataset.isLocked = "true";
			console.log(div.dataset.isLocked)
		} else { div.dataset.isLocked = "false"}

}
