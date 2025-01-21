let tops = JSON.parse(localStorage.getItem("polish_tops")) || [];

function initList() {
  const list = document.querySelector(".next-list-items");
  if (list) {
    const sortable = list;
    const tops = JSON.parse(localStorage.getItem("polish_tops")) || {};
    const names = Object.keys(tops)
      .sort((a, b) => tops[a] - tops[b])
      .reverse();
    const childNodesArray = Array.from(list.childNodes);

    for (let name of names) {
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
        e.target.style.borderTop = "2px solid #0488de";
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
        sortable.insertBefore(draggedItem, e.target);
        saveList();
      }
    });
  }
}

function saveList() {
  const list = document.querySelector(".next-list-items");
  const items = list.querySelectorAll("[class^=dialog--itemName]");
  const names = Array.from(items).map((item) => item.innerText);
  const tops = {};
  names.forEach((name, index) => {
    tops[name] = index;
  });

  localStorage.setItem(
    "polish_tops",
    JSON.stringify(
      Object.assign(JSON.parse(localStorage.getItem("polish_tops")) || {}, tops)
    )
  );
}

const sprintObserver = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (const node of mutation.addedNodes) {
        if (node?.classList?.value.includes("dialog--itemList")) {
          initList();
        }
      }
    }
  }
});

sprintObserver.observe(document.body, { childList: true, subtree: true });
