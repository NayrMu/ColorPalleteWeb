let numColors = 0;
const maxColors = 6;

function randomButton() {
	palleteColors = document.querySelectorAll(".palleteColor");
	for (const palleteColor of palleteColors) {
		const isLocked = palleteColor.dataset.isLocked;
		if (isLocked === "false") {
			p = palleteColor.querySelector("p");
			
			color = randomColor();
			palleteColor.style.backgroundColor = color;
			p.innerHTML = color;
		}
	}
}

function generateFromRestrict() {
	const restriction = document.querySelector(".dashboard .row .pRestrictions")

	if (restriction.value === "Complementary") {
		palleteColors = document.querySelectorAll(".palleteColor");
		palleteColors[0].dataset.isLocked = "true"
		addColor();
		palleteColors[0].dataset.isLocked = "false"
		palleteColors = document.querySelectorAll(".palleteColor");

		p = palleteColors[1].querySelector("p");

		const rgbValues = palleteColors[0].style.backgroundColor
			.slice(4, -1)
			.split(",")
			.map(value => parseInt(value.trim(), 10));

		let color = complementary(ToHSL(normalizeVals(rgbValues)));
		color = "rgb(" + ToRGB(color) + ")";
		palleteColors[1].style.backgroundColor = color;
		p.innerHTML = color;

	}	else if (restriction.value === "Split-Complementary") {
		palleteColors = document.querySelectorAll(".palleteColor");
		palleteColors[0].dataset.isLocked = "true"
		addColor();
		addColor();
		palleteColors[0].dataset.isLocked = "false"
		palleteColors = document.querySelectorAll(".palleteColor");

		p1 = palleteColors[1].querySelector("p");
		p2 = palleteColors[2].querySelector("p");

		const rgbValues = palleteColors[0].style.backgroundColor
			.slice(4, -1)
			.split(",")
			.map(value => parseInt(value.trim(), 10));

		colors = SplitComplementary(ToHSL(normalizeVals(rgbValues)))
		colors[0] = "rgb(" + ToRGB(colors[0]) + ")";
		colors[1] = "rgb(" + ToRGB(colors[1]) + ")";
		
		palleteColors[1].style.backgroundColor = colors[0];
		palleteColors[2].style.backgroundColor = colors[1];
		
		p1.innerHTML = colors[0];
		p2.innerHTML = colors[1];
	}


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


// Color Conversions

function HexToDig(hexVal) {
	hexVal = hexVal.toLowerCase();
	let conversionString = "123456789abcdef";
	let decVal = 0;

	for (i = 0; i < hexVal.length; i++) {
		let dig = hexVal[i];

		if (conversionString.includes(hexVal[i])) {
			decVal = (decVal * 16) + conversionString.indexOf(dig);
		} else { return "bad string" }
	}
	return decVal;
}

function HexToRGB(hexVal) {
	let itr = 0;
	let newString = [];
	let returnString = [];

	for (let i = 0; i < hexVal.length; i++) {
		if (((itr + 1) % 2) == 0) {
			newString.push(hexVal[itr - 1] + hexVal[itr]);
			console.log(newString)
		}
		itr ++;
	}
	for (let i = 0; i < newString.length; i++) {
		let dig = HexToDig(newString[i]);
		returnString.push(dig);
	}
	
	return returnString;
}

function normalizeVals(vals) {
	let newVals = [];
	vals.forEach((val) => {
		val = parseFloat(val / 255);
		newVals.push(val);
	})
	return newVals
}


function ToHSL(rgb) {
	let R = rgb[0];
	let G = rgb[1];
	let B = rgb[2];
	let max = Math.max(R, G, B);
	let min = Math.min(R, G, B);

	delta = max - min;

	let L;
	L = ((max + min) / 2);

	let S;
	if (delta == 0) {
		S = 0;
	} else { S = delta / (1 - Math.abs((2 * L )- 1)); }

let H;
if (max === R) {
    H = ((G - B) / (max - min)) % 6;
} else if (max === G) {
    H = (2 + (B - R) / (max - min)) % 6;
} else {
    H = (4 + (R - G) / (max - min)) % 6;
}

H *= 60;
if (H < 0) {
	H += 360;
}

return [H, S, L];
}


function complementary(hslVal) {

	console.log("Incoming H is: " + hslVal[0])

	let matchingColor = []

	matchingColor.push(hslVal[0] + 180) % 360;
	matchingColor.push(hslVal[1]);
	matchingColor.push(hslVal[2]);

	console.log("here I am: " + matchingColor[0]);

	if (matchingColor[0] > 360) {
		console.log("now H value: " + matchingColor)
		matchingColor[0] -= 360;
		console.log("then H value " + matchingColor)
	} else if ( matchingColor[0] < 0) {
		matchingColor[0] += 360;
	}

	return matchingColor;
}

function SplitComplementary(hslVal) {

	console.log("Incoming H is: " + hslVal[0])

	let matchingColors = []

	let matchingColor = []

	matchingColor.push(hslVal[0] + 180) % 360;
	matchingColor.push(hslVal[1]);
	matchingColor.push(hslVal[2]);

	console.log("here I am: " + matchingColor[0]);


	matchingColor[0] -= 30;
	console.log("split 1: " + matchingColor)
	
	if (matchingColor[0] > 360) {
		console.log("now H value: " + matchingColor)
		matchingColor[0] -= 360;
		console.log("then H value " + matchingColor)
	} else if ( matchingColor[0] < 0) {
		matchingColor[0] += 360;
	}

	matchingColors.push(matchingColor.slice());
	console.log("colors 1: " + matchingColors)

	matchingColor[0] += 60;
	console.log("split 2: "+ matchingColor)
	
	if (matchingColor[0] > 360) {
		console.log("now H value: " + matchingColor)
		matchingColor[0] -= 360;
		console.log("then H value " + matchingColor)
	} else if ( matchingColor[0] < 0) {
		matchingColor[0] += 360;
	}

	matchingColors.push(matchingColor.slice())
	console.log("colors 2: " + matchingColors)

	console.log("Colors are: " + matchingColors)
	return matchingColors;
}

function ToRGB(hslVal) {
	let H = hslVal[0];
	let S = hslVal[1];
	let L = hslVal[2];

	console.log(H, S, L)

	let C = (1 - Math.abs((2 * L) - 1)) * S;
	let X = C * (1 - Math.abs(((H / 60) % 2) - 1));
	let m = L - (C / 2);

	console.log(C, X, m)


	let R;
	let G;
	let B;

	console.log(H)

	console.log(R, G, B)

	if (H >= 0) {
		if (H < 60) {
			console.log("stop 1")
			R = C;
			G = X;
			B = 0;
		}
		if (H < 120 && H >= 60) {
			console.log("stop 2")
			R = X;
			G = C;
			B = 0;
		}
		if (H < 180 && H >= 120) {
			console.log("stop 3")
			R = 0;
			G = C;
			B = X;
		}
		if (H < 240 && H >= 180) {
			console.log("stop 4")
			R = 0;
			G = X;
			B = C;
		}
		if (H < 300 && H >= 240) {
			console.log("stop 5")
			R = X;
			G = 0;
			B = C;
		}
		if (H < 360 && H >= 300) {
			console.log("stop 6")
			R = C;
			G = 0;
			B = X;
		}
	}

	console.log("1: " + R, G, B);

	R = (R + m) * 255;
	G = (G + m) * 255;
	B = (B + m) * 255;

	console.log("2: " + R, G, B);

	R = Math.round(R);
	G = Math.round(G);
	B = Math.round(B);

	return [R, G, B];
}