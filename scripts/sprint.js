let tops = JSON.parse(localStorage.getItem("polish_tops")) || [];

const interval = setInterval(() => {
  const list = document.querySelector(".next-list-items");
  if (list) {
    clearInterval(interval);
    console.log("polish", list.children);
    console.log("polish", list.childNodes);
    for (const item of list.children) {
      item.setAttribute("draggable", "true");
      const div = document.createElement("div");
      div.className = "draggable-mask";
      div.setAttribute("draggable", "true");
      item.appendChild(div);
    }

    const sortable = list;
    let draggedItem = null;
    sortable.addEventListener("dragstart", (e) => {
      draggedItem = e.target;
      e.target.style.opacity = "0.5";
    });

    sortable.addEventListener("dragend", (e) => {
      e.target.style.opacity = "1";
      draggedItem = null;
    });

    sortable.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    sortable.addEventListener(
      "dragenter",
      (e) => {
        if (e.target.getAttribute("draggable") === "true") {
          e.target.style.border = "2px dashed #000";
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true
    );

    sortable.addEventListener("dragleave", (e) => {
      if (e.target.getAttribute("draggable") === "true") {
        e.target.style.border = "";
      }
    });

    sortable.addEventListener("drop", (e) => {
      e.preventDefault();
      if (e.target.getAttribute("draggable") === "true") {
        e.target.style.border = "";
        sortable.insertBefore(draggedItem, e.target.nextSibling);
      }
    });
  }
}, 1000);
