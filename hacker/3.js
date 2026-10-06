(function () {
  if (document.getElementById("hacker-terminal")) return;

  // 1. Full-screen Glitch & Matrix CRT CSS Overlays
  const style = document.createElement("style");
  style.textContent = `
    @keyframes crt-flicker {
      0% { opacity: 0.97; }
      50% { opacity: 1; }
      100% { opacity: 0.98; }
    }
    @keyframes screen-glitch-shake {
      0% { transform: translate(0); }
      10% { transform: translate(-4px, 2px) skewX(1deg); filter: hue-rotate(90deg) invert(0.1); }
      20% { transform: translate(4px, -2px) skewX(-2deg); }
      30% { transform: translate(-2px, -4px); filter: saturate(3); }
      40% { transform: translate(2px, 4px) skewX(2deg); }
      50% { transform: translate(0); filter: none; }
      100% { transform: translate(0); }
    }
    @keyframes warning-flash {
      0%, 100% { opacity: 1; border-color: #ef4444; }
      50% { opacity: 0.3; border-color: #f59e0b; }
    }
    .full-glitch { animation: screen-glitch-shake 0.2s cubic-bezier(.25, .46, .45, .94) infinite !important; }
    .alert-flash { animation: warning-flash 0.5s infinite !important; }
    .crt-overlay {
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.35) 50%),
                  linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
      background-size: 100% 3px, 3px 100%;
      animation: crt-flicker 0.15s infinite;
    }
  `;
  document.head.appendChild(style);

  // 2. Synthesized Audio Beep System (Web Audio API)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playCyberSound(freq = 800, type = "sine", duration = 0.08) {
    try {
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playAlertAlarm() {
    playCyberSound(1200, "sawtooth", 0.15);
    setTimeout(() => playCyberSound(900, "sawtooth", 0.15), 100);
    setTimeout(() => playCyberSound(1400, "sawtooth", 0.2), 200);
  }

  // 3. Cyber Terminal Window Setup
  const term = document.createElement("div");
  term.id = "hacker-terminal";
  term.className = "crt-overlay";
  term.style.cssText = `
    position: fixed; top: 20px; right: 20px; width: 520px;
    background: #020617; color: #22c55e; border: 2px solid #22c55e;
    border-radius: 4px; font-family: 'Courier New', Courier, monospace;
    font-size: 12px; box-shadow: 0 0 35px rgba(34, 197, 94, 0.35);
    z-index: 9999999; overflow: hidden; user-select: none;
  `;

  // 4. Header with Status Alerts & Direct Edit Mode Button
  const header = document.createElement("div");
  header.style.cssText = `
    background: #0f172a; padding: 10px 12px; border-bottom: 2px solid #22c55e;
    display: flex; justify-content: space-between; align-items: center; cursor: move;
  `;

  const title = document.createElement("span");
  title.style.cssText = "font-weight: bold; color: #ef4444; letter-spacing: 1px; text-shadow: 0 0 8px #ef4444;";
  title.textContent = "☠ SYSTEM_OVERRIDE_V5 :: KERNEL_EXPLOIT";

  const actions = document.createElement("div");
  actions.style.cssText = "display: flex; gap: 8px; align-items: center;";

  const editBtn = document.createElement("button");
  editBtn.textContent = "[EDIT_MODE: OFF]";
  editBtn.style.cssText = `
    background: #15803d; color: #ffffff; border: 1px solid #22c55e; padding: 3px 8px;
    font-family: inherit; font-size: 10px; font-weight: bold; cursor: pointer;
    box-shadow: 0 0 8px rgba(34,197,94,0.5);
  `;

  const closeBtn = document.createElement("span");
  closeBtn.textContent = "[X]";
  closeBtn.style.cssText = "cursor: pointer; color: #ef4444; font-weight: bold;";
  closeBtn.onclick = () => {
    document.designMode = "off";
    term.remove();
  };

  actions.appendChild(editBtn);
  actions.appendChild(closeBtn);
  header.appendChild(title);
  header.appendChild(actions);
  term.appendChild(header);

  // 5. Terminal Console Body
  const body = document.createElement("div");
  body.style.cssText = "padding: 12px; height: 240px; overflow-y: auto; background: #020617;";
  term.appendChild(body);

  // 6. Interactive Command Prompt
  const inputRow = document.createElement("div");
  inputRow.style.cssText = `
    display: flex; align-items: center; background: #0f172a;
    padding: 8px 12px; border-top: 2px solid #22c55e;
  `;

  const promptSpan = document.createElement("span");
  promptSpan.textContent = "root@blind_injector:~# ";
  promptSpan.style.cssText = "color: #ef4444; font-weight: bold; margin-right: 6px; text-shadow: 0 0 5px #ef4444;";

  const cmdInput = document.createElement("input");
  cmdInput.type = "text";
  cmdInput.placeholder = "type 'blind <actual_mark> <new_mark>' or 'help'...";
  cmdInput.style.cssText = `
    flex: 1; background: transparent; border: none; outline: none;
    color: #22c55e; font-family: 'Courier New', Courier, monospace; font-size: 12px;
  `;

  inputRow.appendChild(promptSpan);
  inputRow.appendChild(cmdInput);
  term.appendChild(inputRow);
  document.body.appendChild(term);

  setTimeout(() => cmdInput.focus(), 100);

  // Safe Output Logger with Audio Synth Beeps
  function log(text, color = "#22c55e", beepFreq = 600) {
    playCyberSound(beepFreq);
    const line = document.createElement("div");
    line.style.color = color;
    line.style.margin = "2px 0";
    line.textContent = `> ${text}`;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  // Visual Screen Glitch & Alert Trigger
  function triggerGlitchEffect() {
    playAlertAlarm();
    term.classList.add("full-glitch");
    document.body.classList.add("full-glitch");
    setTimeout(() => {
      term.classList.remove("full-glitch");
      document.body.classList.remove("full-glitch");
    }, 350);
  }

  // Toggle Screen Edit Mode
  function toggleDesignMode() {
    triggerGlitchEffect();
    if (document.designMode === "on") {
      document.designMode = "off";
      editBtn.textContent = "[EDIT_MODE: OFF]";
      editBtn.style.background = "#15803d";
      editBtn.classList.remove("alert-flash");
      log("⚠ ALERT: MANUAL SCREEN EDIT MODE DEACTIVATED.", "#f59e0b", 400);
    } else {
      document.designMode = "on";
      editBtn.textContent = "[EDIT_MODE: ACTIVE]";
      editBtn.style.background = "#b91c1c";
      editBtn.classList.add("alert-flash");
      log("⚡ WARNING: FULL SCREEN EDITABLE. CLICK ANYWHERE ON SCREEN TO OVERWRITE SCORE DIRECTLY.", "#ef4444", 900);
    }
  }

  editBtn.onclick = toggleDesignMode;

  // 7. BLIND SWEEP ENGINE (Replaces scores blindly across ALL DOM nodes & attributes)
  let activeObserver = null;
  function blindOverwriteAll(targetVal, newVal) {
    triggerGlitchEffect();
    let totalMatches = 0;

    // A. Direct Text Node Sweep
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.includes(targetVal)) {
        node.nodeValue = node.nodeValue.replaceAll(targetVal, newVal);
        totalMatches++;
      }
    }

    // B. Element Container & Attribute Sweep
    const allElements = document.querySelectorAll("*");
    allElements.forEach((el) => {
      if (el.children.length === 0 && el.textContent.includes(targetVal)) {
        el.textContent = el.textContent.replaceAll(targetVal, newVal);
        totalMatches++;
      }
      if (el.value && String(el.value).includes(targetVal)) {
        el.value = String(el.value).replaceAll(targetVal, newVal);
        totalMatches++;
      }
      ["aria-label", "title", "value", "data-score"].forEach((attr) => {
        if (el.hasAttribute(attr) && el.getAttribute(attr).includes(targetVal)) {
          el.setAttribute(attr, el.getAttribute(attr).replaceAll(targetVal, newVal));
          totalMatches++;
        }
      });
    });

    // C. Dynamic Persistent Observer Lock
    if (activeObserver) activeObserver.disconnect();
    activeObserver = new MutationObserver(() => {
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = w.nextNode())) {
        if (n.nodeValue.includes(targetVal)) {
          n.nodeValue = n.nodeValue.replaceAll(targetVal, newVal);
        }
      }
    });
    activeObserver.observe(document.body, { childList: true, subtree: true });

    return totalMatches;
  }

  // 8. Draggable Terminal Header Logic
  let isDragging = false, offset = [0, 0];
  header.onmousedown = (e) => {
    if (e.target === editBtn || e.target === closeBtn) return;
    isDragging = true;
    offset = [term.offsetLeft - e.clientX, term.offsetTop - e.clientY];
  };
  document.onmousemove = (e) => {
    if (isDragging) {
      term.style.left = (e.clientX + offset[0]) + "px";
      term.style.top = (e.clientY + offset[1]) + "px";
      term.style.right = "auto";
    }
  };
  document.onmouseup = () => isDragging = false;

  // 9. Interactive Command Parser
  function handleCommand(cmd) {
    const raw = cmd.trim();
    if (!raw) return;

    log(`root@blind_injector:~# ${raw}`, "#38bdf8", 700);
    const parts = raw.split(" ");
    const action = parts[0].toLowerCase();

    switch (action) {
      case "help":
        log("AVAILABLE COMMANDS:", "#f59e0b", 500);
        log("  blind <actual> <new> : Replace <actual> score blindly everywhere", "#f59e0b", 500);
        log("  edit                 : Toggle full-screen manual editor", "#f59e0b", 500);
        log("  glitch               : Trigger visual distortion test", "#f59e0b", 500);
        log("  clear                : Clear terminal logs", "#f59e0b", 500);
        log("  exit                 : Terminate framework", "#f59e0b", 500);
        break;

      case "glitch":
        triggerGlitchEffect();
        log("⚠ SYSTEM VISUAL DISTORTION TEST EXECUTED.", "#ef4444", 1000);
        break;

      case "edit":
        toggleDesignMode();
        break;

      case "clear":
        body.textContent = "";
        break;

      case "exit":
        document.designMode = "off";
        term.remove();
        break;

      case "blind":
        if (parts.length < 3) {
          triggerGlitchEffect();
          log("⚡ ERROR: ARGUMENTS MISSING!", "#ef4444", 300);
          log("USAGE: blind <actual_mark> <new_mark>", "#f59e0b", 500);
          log("EXAMPLE: blind 12/50 49/50", "#94a3b8", 500);
        } else {
          const actualVal = parts[1];
          const targetVal = parts[2];
          log(`[!] EXECUTING BLIND SEARCH FOR: '${actualVal}'...`, "#f59e0b", 700);

          setTimeout(() => {
            const count = blindOverwriteAll(actualVal, targetVal);
            if (count > 0) {
              log(`[✔] SUCCESS: Replaced ${count} instance(s) blindly with '${targetVal}'.`, "#22c55e", 1000);
              log("[✔] MutationObserver active.", "#38bdf8", 800);
            } else {
              triggerGlitchEffect();
              log(`[⚠] WARNING: Value '${actualVal}' was not found in raw DOM text.`, "#ef4444", 300);
              log("--> Click '[EDIT_MODE]' at top-right to edit text on screen directly!", "#f59e0b", 600);
            }
          }, 300);
        }
        break;

      default:
        triggerGlitchEffect();
        log(`UNKNOWN COMMAND: '${action}'. Type 'help' for options.`, "#ef4444", 300);
        break;
    }
  }

  cmdInput.onkeydown = (e) => {
    if (e.key === "Enter") {
      const val = cmdInput.value;
      cmdInput.value = "";
      handleCommand(val);
    }
  };

  // Boot Sequence
  playAlertAlarm();
  log("⚡ KERNEL_OVERRIDE_V5 LOADED", "#ef4444", 800);
  log("⚠ CSP & TRUSTED TYPES BYPASSED", "#22c55e", 600);
  log("Type 'blind <actual_mark> <new_mark>' or click [EDIT_MODE] above.", "#f59e0b", 500);
})();
