
const fileMap = {
  "quotes": ["quotes_example.pdf", "quote_email.msg"],
  "drawings": ["design1.pdf", "planA.pdf", "planB.pdf", "layout_sketch.pdf", "technical_diagram.pdf", "elevation.pdf", "section_cut.pdf"],
  "folios": ["land_registry.pdf", "folio_map.pdf", "property_details.pdf"],
  "renders": ["render1.png", "render2.png", "visual_01.png", "visual_02.png"],
  "draft_contracts": ["draft_agreement.pdf", "legal_outline.pdf"],
  "contracts": []
};

function loadFiles() {
  const folder = document.getElementById("fileFolderSelect").value;
  const list = document.getElementById("fileList");
  const viewer = document.getElementById("fileViewer");
  list.innerHTML = "";
  viewer.hidden = true;
  if (!folder || !fileMap[folder]) return;

  fileMap[folder].forEach(filename => {
    const url = `files/${folder}/${filename}`;
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="viewFile('${url}'); return false;">${filename}</a>`;
    list.appendChild(li);
  });
}

function viewFile(url) {
  const viewer = document.getElementById("fileViewer");
  viewer.src = url;
  viewer.hidden = false;
}
