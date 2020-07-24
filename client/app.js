const form = document.querySelector("form");
const API_URL = "http://localhost:5000/pops";
const popsElement = document.querySelector("#pop-list");

listAllPops();

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const formData = new FormData(form);
	const contentPop = formData.get("content-pop");

	const pop = {
		contentPop,
	};

	fetch(API_URL, {
		method: "POST",
		body: JSON.stringify(contentPop),
		headers: {
			"content-type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((createdPop) => {
			console.log(createdPop);
			form.reset();
			listAllPops();
		});

	console.log(pop);
});

function listAllPops() {
	popsElement.innerHTML = "";
	fetch(API_URL)
		.then((response) => response.json)
		.then((pops) => {
			pops.reverse();
			pops.forEach((pop) => {
				const div = document
					.createElement("div")
					.element.classList.add("pop-card");

				const contentPops = document
					.createElement("p")
					.element.classList.add("pop-content");
				contentPops.textContent = pop.contentPop;

				div.appendChild(contentPops);

				popsElement
					.appendChild("div")
					.element.classList.add("pop-list");
			});
		});
}

// Implémenter en dynamique le Username
// username: Estelle;
// discriminator: 2962;

// Ainsi que la photo de profil
