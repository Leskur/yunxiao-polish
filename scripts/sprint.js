let tops = JSON.parse(localStorage.getItem("polish_tops")) || [];

const interval = setInterval(() => {
  const sprintListLeftAreaContentDom = document.querySelector(
    "#sprintListLeftAreaContentDom"
  );
  if (!sprintListLeftAreaContentDom) return;
  if (sprintListLeftAreaContentDom.querySelector(".next-list-items")) {
    initList();
  }
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log(mutation);
      if (mutation.type === "childList") {
        for (let node of mutation.addedNodes) {
          if (node.className.includes("dialog--itemList")) {
            initList();
          }
        }
      }
    });
  });

  observer.observe(sprintListLeftAreaContentDom, {
    childList: true,
  });

  clearInterval(interval);
}, 1000);

function initList() {
  const list = document.querySelector(".next-list-items");
  if (list) {
    const sortable = list;
    const tops = Object.keys(
      JSON.parse(localStorage.getItem("polish_tops")) || {}
    ).reverse();
    const childNodesArray = Array.from(list.childNodes);

    for (let name of tops) {
      const item = childNodesArray.find((node) => {
        return (
          node.querySelector("[class^=dialog--itemName]").innerText === name
        );
      });
      if (item) {
        list.insertBefore(item, list.firstChild);
      }
    }

    list.childNodes.forEach((childNode) => {
      childNode.setAttribute("draggable", true);
      childNode.style.marginBottom = "8px";
    });

    let draggedItem = null;
    sortable.addEventListener("dragstart", (e) => {
      draggedItem = e.target;
      e.target.style.opacity = "0.5";
      list.classList.add("dragging");
    });

    sortable.addEventListener("dragend", (e) => {
      e.target.style.opacity = "1";
      draggedItem = null;
    });

    sortable.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    sortable.addEventListener("dragenter", (e) => {
      if (e.target.getAttribute("draggable") === "true") {
        e.target.style.borderBottom = "2px dashed #000";
      }
    });
    sortable.addEventListener("dragleave", (e) => {
      if (e.target.getAttribute("draggable") === "true") {
        e.target.style.border = "";
      }
    });
    sortable.addEventListener("drop", (e) => {
      list.classList.remove("dragging");
      e.preventDefault();
      if (e.target.getAttribute("draggable") === "true") {
        e.target.style.border = "";
        sortable.insertBefore(draggedItem, e.target.nextSibling);
        saveList();
      }
    });
  }
}

function saveList() {
  const list = document.querySelector(".next-list-items");
  const items = list.querySelectorAll("[class^=dialog--itemName]");
  console.log(items);
  const names = Array.from(items).map((item) => item.innerText);
  const tops = {};
  names.forEach((name, index) => {
    tops[name] = index;
  });

  localStorage.setItem("polish_tops", JSON.stringify(tops));
}
