(function () {
  // 1. Enable inline editing without triggering innerHTML CSP errors
  document.designMode = "on";

  // 2. Create UI container panel safely
  const panel = document.createElement("div");
  panel.id = "editor-panel";
  panel.style.cssText = `
    position: fixed; top: 12px; right: 12px;
    background: #111827; color: #ffffff; padding: 10px 14px;
    font-family: system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 600;
    border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.3);
    z-index: 9999999; display: flex; gap: 10px; align-items: center;
  `;

  // 3. Create status label using textContent (Trusted Types safe)
  const statusSpan = document.createElement("span");
  statusSpan.textContent = "✎ Mode: Editable";

  // 4. Create Lock & Save button
  const lockBtn = document.createElement("button");
  lockBtn.textContent = "Lock & Save Screen";
  lockBtn.style.cssText = `
    background: #16a34a; color: #ffffff; border: none;
    padding: 6px 12px; border-radius: 4px; font-weight: bold;
    cursor: pointer; font-size: 12px;
  `;

  // 5. Append elements safely to avoid innerHTML injection sink restrictions
  panel.appendChild(statusSpan);
  panel.appendChild(lockBtn);
  document.body.appendChild(panel);

  // 6. Lock functionality
  lockBtn.onclick = function () {
    document.designMode = "off";
    panel.style.background = "#16a34a";
    panel.textContent = ""; // Safe clear
    const savedSpan = document.createElement("span");
    savedSpan.textContent = "✓ Changes Locked";
    panel.appendChild(savedSpan);

    setTimeout(() => {
      panel.remove();
    }, 2000);
  };
})();
