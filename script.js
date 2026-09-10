document.addEventListener("DOMContentLoaded", () => {
  const dropzone = document.getElementById("dropzone");
  const browseBtn = document.getElementById("browseBtn");
  const fileInput = document.getElementById("fileInput");
  const fileLabel = document.getElementById("fileLabel");
  const linkForm = document.getElementById("linkForm");
  const linkInput = document.getElementById("linkInput");
  const feedback = document.getElementById("feedback");

  function showFeedback(text) {
    feedback.textContent = text;
    feedback.hidden = false;
  }

  function handleFile(file) {
    if (!file) return;
    fileLabel.textContent = file.name;
    showFeedback(`"${file.name}" selecionado — pronto para ser vinculado ao projeto.`);
  }

  browseBtn.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (e) => {
    handleFile(e.target.files[0]);
  });

  ["dragover", "dragenter"].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add("is-active");
    })
  );

  ["dragleave", "dragend"].forEach((evt) =>
    dropzone.addEventListener(evt, () => dropzone.classList.remove("is-active"))
  );

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("is-active");
    const file = e.dataTransfer.files[0];
    handleFile(file);
  });

  linkForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = linkInput.value.trim();
    if (!url) return;
    showFeedback(`Link vinculado: ${url}`);
    linkInput.value = "";
  });
});
