const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (const node of mutation.addedNodes) {
        if (
          node.classList &&
          node.classList.contains("global-search-overlay-no-mask-wrapper")
        ) {
          console.log(
            "New global-search-overlay-no-mask-wrapper element added:",
            node
          );
          // Add your custom logic here
          setTimeout(() => {
            document.querySelector("#yxGlobalSearchInput").value = "XYQV-";
          }, 500);
        }
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
