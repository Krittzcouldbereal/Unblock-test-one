const htmlInput = document.getElementById("htmlInput");
const openBtn = document.getElementById("openBtn");
const saveBtn = document.getElementById("saveBtn");
const savedList = document.getElementById("savedList");
const fileInput = document.getElementById("fileInput");

function openHTML(content) {
  const win = window.open();

  if (!win) {
    alert("Popups are blocked.");
    return;
  }

  win.document.open();
  win.document.write(content);
  win.document.close();
}

openBtn.onclick = () => {
  const content = htmlInput.value;

  if (!content.trim()) {
    alert("Enter HTML first.");
    return;
  }

  openHTML(content);
};

saveBtn.onclick = () => {
  const saved = JSON.parse(localStorage.getItem("savedPages") || "[]");

  saved.push({
    name: "Saved Page",
    content: htmlInput.value
  });

  localStorage.setItem("savedPages", JSON.stringify(saved));

  loadSaved();
};

function loadSaved() {
  const saved = JSON.parse(localStorage.getItem("savedPages") || "[]");

  savedList.innerHTML = "";

  saved.forEach((page, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div style="margin-bottom:10px;">
        <button onclick="launchSaved(${index})">
          Open Saved ${index + 1}
        </button>
      </div>
    `;

    savedList.appendChild(div);
  });
}

window.launchSaved = (index) => {
  const saved = JSON.parse(localStorage.getItem("savedPages") || "[]");

  if (saved[index]) {
    openHTML(saved[index].content);
  }
};

fileInput.onchange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const text = await file.text();

  htmlInput.value = text;
};

loadSaved();
