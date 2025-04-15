document.addEventListener("DOMContentLoaded", () => {
	// Check if we're on the form page by looking for the form element.
	const form = document.getElementById("portfolioForm");
	
	if (form) {
	  // If the form exists, listen for submission.
	  form.addEventListener("submit", (e) => {
		e.preventDefault();
		
		// Gather form data into an object.
		const formData = new FormData(form);
		const userData = {};
		formData.forEach((value, key) => {
		  userData[key] = value;
		});
		
		// Save the data in localStorage.
		localStorage.setItem("portfolioData", JSON.stringify(userData));
		
		// Redirect to the preview page.
		window.location.href = "preview.html";
	  });
	}
  
	// Check if we're on the preview page by looking for the portfolio container.
	const portfolio = document.getElementById("portfolio");
	if (portfolio) {
	  const data = JSON.parse(localStorage.getItem("portfolioData"));
	  if (data) {
		// Set the text content for each field.
		document.getElementById("name").textContent = data.name || "";
		document.getElementById("school").textContent = data.school || "";
		document.getElementById("city").textContent = data.city || "";
		document.getElementById("state").textContent = data.state || "";
		document.getElementById("email").textContent = data.email || "";
		document.getElementById("phone").textContent = data.phone || "";
		document.getElementById("achievements").textContent = data.achievements || "";
		document.getElementById("skills").textContent = data.skills || "";
  
		// Populate the Education list.
		const educationList = document.getElementById("education");
		["edu1", "edu2", "edu3"].forEach((field) => {
		  if (data[field]) {
			const li = document.createElement("li");
			li.textContent = data[field];
			educationList.appendChild(li);
		  }
		});
	  }
	}
  });
  