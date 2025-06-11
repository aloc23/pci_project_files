
function loadFiles() {
  const folder = document.getElementById("fileFolderSelect").value;
  const list = document.getElementById("fileList");
  const viewer = document.getElementById("fileViewer");
  list.innerHTML = "";
  viewer.hidden = true;
  if (!folder) return;

  fetch(`files/${folder}/`)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = Array.from(doc.links).filter(l => !l.href.endsWith('/'));
      links.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="viewFile('files/${folder}/${link.textContent}'); return false;">${link.textContent}</a>`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      list.innerHTML = "<li>Could not load files. Folder browsing may be restricted on your host.</li>";
    });
}

function viewFile(url) {
  const viewer = document.getElementById("fileViewer");
  viewer.src = url;
  viewer.hidden = false;
}
