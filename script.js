const htmlInput = document.getElementById("htmlInput");

  if (!content) {
    alert("Nothing to save.");
    return;
  }

  const name = prompt("Enter a name for this page:");

  if (!name) return;

  const saved = JSON.parse(localStorage.getItem("savedPages") || "[]");

  saved.push({
    name,
    content,
  });

  localStorage.setItem("savedPages", JSON.stringify(saved));

  loadSaved();
});

function loadSaved() {
  const saved = JSON.parse(localStorage.getItem("savedPages") || "[]");

  savedList.innerHTML = "";

  saved.forEach((page, index) => {
    const div = document.createElement("div");
    div.className = "saved-item";

    div.innerHTML = `
      <span>${page.name}</span>
      <div>
        <button onclick="launchSaved(${index})">Open</button>
        <button onclick="deleteSaved(${index})">Delete</button>
      </div>
    `;

    savedList.appendChild(div);
  });
}

window.launchSaved = function(index) {
  const saved = JSON.parse(localStorage.getItem("savedPages") || "[]");

  if (!saved[index]) return;

  openHTML(saved[index].content);
};

window.deleteSaved = function(index) {
  const saved = JSON.parse(localStorage.getItem("savedPages") || "[]");

  saved.splice(index, 1);

  localStorage.setItem("savedPages", JSON.stringify(saved));

  loadSaved();
};

fileInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const text = await file.text();
  htmlInput.value = text;
});

loadSaved();
