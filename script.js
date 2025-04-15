document.addEventListener("DOMContentLoaded", () => {
	const isPreviewPage = window.location.pathname.includes("preview.html");
	const isFormPage = document.querySelector("form");
  
	if (isPreviewPage) {
	  const resumeData = loadResumeData();
	  if (resumeData) {
		populateResume(resumeData);
	  } else {
		console.warn("No resume data found in localStorage.");
	  }
  
	  const downloadBtn = document.getElementById("downloadBtn");
	  if (downloadBtn) {
		downloadBtn.addEventListener("click", downloadPDF);
	  }
	}
  
	if (isFormPage) {
	  const form = document.querySelector("form");
	  form.addEventListener("submit", (e) => {
		e.preventDefault();
  
		const formData = new FormData(form);
		const resumeData = {};
  
		formData.forEach((value, key) => {
		  if (key === "education") {
			resumeData.education = value; // Save as newline-separated string
		  } else {
			resumeData[key] = value.trim();
		  }
		});
  
		localStorage.setItem("resumeData", JSON.stringify(resumeData));
		window.location.href = "preview.html";
	  });
	}
  });
  
  function loadResumeData() {
	try {
	  const data = localStorage.getItem("resumeData");
	  return data ? JSON.parse(data) : null;
	} catch (error) {
	  console.error("Error parsing resume data from localStorage:", error);
	  return null;
	}
  }
  
  function populateResume(data) {
	const getOrDefault = (value, fallback = "(Not Provided)") =>
	  value?.trim() ? value : fallback;
  
	// Basic fields
	document.getElementById("name").textContent = getOrDefault(data.name);
	document.getElementById("school").textContent = getOrDefault(data.school);
	document.getElementById("city").textContent = getOrDefault(data.city);
	document.getElementById("state").textContent = getOrDefault(data.state);
	document.getElementById("email").textContent = getOrDefault(data.email);
	document.getElementById("phone").textContent = getOrDefault(data.phone);
  
	// Education (multi-line input turned into <li>)
	const educationList = document.getElementById("education");
	educationList.innerHTML = "";
	const educationItems = data.education?.split("\n") || [];
	educationItems.forEach(item => {
	  if (item.trim()) {
		const li = document.createElement("li");
		li.textContent = item.trim();
		educationList.appendChild(li);
	  }
	});
  
	// Major Achievements and Skills
	document.getElementById("achievements").textContent = getOrDefault(data.achievements);
	document.getElementById("skills").textContent = getOrDefault(data.skills);
  }
  
  function downloadPDF() {
	const element = document.getElementById("portfolio");
	const options = {
	  margin: 0,
	  filename: "resume.pdf",
	  image: { type: "jpeg", quality: 0.98 },
	  html2canvas: {
		scale: 2,
		useCORS: true,
	  },
	  jsPDF: {
		unit: "mm",
		format: "a4",
		orientation: "portrait",
	  },
	};
  
	html2pdf().from(element).set(options).save();
  }
  