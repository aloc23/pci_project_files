function loadFiles() {
  const folder = document.getElementById("folderSelect").value;
  const list = document.getElementById("fileList");
  const viewer = document.getElementById("fileViewer");
  list.innerHTML = "";
  viewer.hidden = true;
  if (!folder) return;

  fetch(folder).then(response => {
    if (response.ok) {
      return response.text();
    }
    throw new Error("Network response was not ok.");
  }).then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const links = Array.from(doc.links).filter(link => !link.href.endsWith("/"));
    links.forEach(link => {
      const li = document.createElement("li");
      li.innerHTML = '<a href="' + link.href + '" target="_blank" onclick="event.preventDefault(); viewFile(\'' + link.href + '\')">' + link.textContent + '</a>';
      list.appendChild(li);
    });
  }).catch(err => {
    console.error("Failed to load files:", err);
    list.innerHTML = "<li>Error loading files. Make sure you are running this on a server.</li>";
  });
}

function viewFile(url) {
  const viewer = document.getElementById("fileViewer");
  viewer.src = url;
  viewer.hidden = false;
}
