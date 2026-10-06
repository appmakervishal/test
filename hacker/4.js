(function () {
  // 1. Blind Overwrite Function (Searches ALL nodes & attributes blindly)
  window.blindReplace = function (actualMark, newMark) {
    let count = 0;
    const fromStr = String(actualMark);
    const toStr = String(newMark);

    // A. Sweep all text nodes across the entire page
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.includes(fromStr)) {
        node.nodeValue = node.nodeValue.replaceAll(fromStr, toStr);
        count++;
      }
    }

    // B. Sweep input fields, attributes, and ARIA labels
    document.querySelectorAll("*").forEach((el) => {
      if (el.children.length === 0 && el.textContent.includes(fromStr)) {
        el.textContent = el.textContent.replaceAll(fromStr, toStr);
        count++;
      }
      if (el.value && String(el.value).includes(fromStr)) {
        el.value = String(el.value).replaceAll(fromStr, toStr);
        count++;
      }
      ["aria-label", "title", "value", "data-score"].forEach((attr) => {
        if (el.hasAttribute(attr) && el.getAttribute(attr).includes(fromStr)) {
          el.setAttribute(attr, el.getAttribute(attr).replaceAll(fromStr, toStr));
          count++;
        }
      });
    });

    // C. Lock changes in place against dynamic page re-renders
    if (window._scoreObserver) window._scoreObserver.disconnect();
    window._scoreObserver = new MutationObserver(() => {
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = w.nextNode())) {
        if (n.nodeValue.includes(fromStr)) {
          n.nodeValue = n.nodeValue.replaceAll(fromStr, toStr);
        }
      }
    });
    window._scoreObserver.observe(document.body, { childList: true, subtree: true });

    console.log(`%c[Done] Replaced ${count} instance(s) of "${fromStr}" with "${toStr}".`, "color: #22c55e; font-weight: bold;");
  };

  // 2. Silent Screen Edit Toggle Function
  window.toggleEdit = function () {
    if (document.designMode === "on") {
      document.designMode = "off";
      console.log("%c[Locked] Screen editing disabled.", "color: #ef4444; font-weight: bold;");
    } else {
      document.designMode = "on";
      console.log("%c[Editable] Click anywhere on screen to edit text manually.", "color: #22c55e; font-weight: bold;");
    }
  };

  console.log("%cReady! Use 'blindReplace(actual, target)' or 'toggleEdit()'.", "color: #38bdf8; font-weight: bold;");
})();
