(function () {
  if (document.getElementById("hacker-terminal")) return;

  // 1. Upgrade CSS Aesthetics: Metallic, Holographic, and Dangerous
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

    #hacker-terminal * { font-family: 'Share Tech Mono', monospace !important; text-transform: uppercase; }

    /* VOLATILE SCREEN GLITCH */
    @keyframes tactical-glitch {
      0% { transform: translate(0) scale(1); filter: contrast(1) saturate(1); }
      5% { transform: translate(-7px, 5px) skewX(2deg); filter: contrast(2) hue-rotate(90deg) invert(1); }
      10% { transform: translate(7px, -5px) skewX(-3deg); filter: contrast(1.5) saturate(4); }
      15% { transform: translate(0) scale(1.02); filter: none; }
      100% { transform: translate(0) scale(1); }
    }

    /* BACKGROUND HOLOGRAPHIC SCANLINE */
    @keyframes scan-beam {
      0% { background-position: 0 -100vh; }
      100% { background-position: 0 100vh; }
    }

    /* STATUS ALERT PULSE */
    @keyframes alert-pulse {
      0%, 100% { border-color: #ff0000; box-shadow: 0 0 10px #ff0000, inset 0 0 5px #ff0000; }
      50% { border-color: #550000; box-shadow: 0 0 20px #ff0000, inset 0 0 15px #ff0000; }
    }

    .volatile-glitch { animation: tactical-glitch 0.3s cubic-bezier(0.1, 0.9, 0.2, 1) !important; }
    .status-alert { animation: alert-pulse 0.4s infinite !important; }

    /* CRT, SCANLINES & HOLOGRAPHIC DEPTH */
    .prop-ui-fx {
      position: relative;
      overflow: hidden;
    }
    .prop-ui-fx::before { /* Scanlines */
      content: " "; display: block; position: absolute; top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%);
      background-size: 100% 4px; z-index: 10; pointer-events: none; opacity: 0.6;
    }
    .prop-ui-fx::after { /* Holographic Beam Sweep */
      content: " "; display: block; position: absolute; top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(0deg, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.08) 50%, rgba(0, 255, 255, 0) 100%);
      background-size: 100% 200vh; animation: scan-beam 6s linear infinite;
      z-index: 11; pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  // 2. Synthesized Audio (Unchanged Mechanics, but louder frequencies)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playCyberSound(freq = 800, type = "sine", duration = 0.08, vol = 0.08) {
    try {
      if (audioCtx.state === "suspended") audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  function playAlertAlarm() {
    playCyberSound(1400, "sawtooth", 0.2, 0.12);
    setTimeout(() => playCyberSound(600, "sawtooth", 0.2, 0.12), 100);
  }

  // 3. Main Prop-Style Window Setup
  const term = document.createElement("div");
  term.id = "hacker-terminal";
  term.className = "prop-ui-fx";
  // Aesthetics: Metallic background, sharp beveled edges, deep red glow
  term.style.cssText = `
    position: fixed; top: 30px; right: 30px; width: 550px;
    background: #0a0e14; /* Deep Charcoal */
    background-image: 
      linear-gradient(135deg, #1a1f29 25%, transparent 25%), 
      linear-gradient(225deg, #1a1f29 25%, transparent 25%),
      linear-gradient(45deg, #1a1f29 25%, transparent 25%),
      linear-gradient(315deg, #1a1f29 25%, transparent 25%);
    background-size: 10px 10px; background-position: 5px 0, 5px 0, 0 0, 0 0;
    
    color: #00ff41; /* Classic Matrix Green */
    border: 3px solid #1e293b; /* Metallic Dark Gray Border */
    border-right: 6px solid #1e293b; border-bottom: 6px solid #1e293b; /* Pseudo-3D Depth */
    border-radius: 2px;
    font-size: 13px;
    /* Massive, ominous outer glow */
    box-shadow: 
      0 0 40px rgba(255, 0, 0, 0.4), 
      inset 0 0 15px rgba(0, 0, 0, 0.8),
      /* Pseudo-screws in corners */
      calc(100% - 10px) 10px 0 -6px #64748b, 10px 10px 0 -6px #64748b, 
      10px calc(100% - 10px) 0 -6px #64748b, calc(100% - 10px) calc(100% - 10px) 0 -6px #64748b;
    z-index: 9999999; overflow: hidden; user-select: none;
    transition: box-shadow 0.2s;
  `;

  // 4. Header: Tactical & Industrial
  const header = document.createElement("div");
  header.style.cssText = `
    background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    padding: 12px 15px; border-bottom: 3px solid #ff0000; /* Red "Danger" line */
    display: flex; justify-content: space-between; align-items: center; cursor: move;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
  `;

  const title = document.createElement("span");
  title.style.cssText = `
    font-weight: bold; color: #ff0000; letter-spacing: 2px;
    text-shadow: 0 0 10px #ff0000, 0 0 2px #ffffff;
    display: flex; align-items: center; gap: 8px;
  `;
  // Add an icon and prefix
  title.innerHTML = `<span style="color:#64748b">▼</span> [TACTICAL_OVERRIDE_UNIT]`;

  const actions = document.createElement("div");
  actions.style.cssText = "display: flex; gap: 10px; align-items: center;";

  const editBtn = document.createElement("button");
  editBtn.textContent = "DIRECT_EDIT: LOCKED";
  editBtn.style.cssText = `
    background: #0f172a; color: #64748b; border: 2px solid #64748b; 
    padding: 4px 10px; font-size: 10px; font-weight: bold; cursor: pointer;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.5); transition: 0.1s;
  `;

  const closeBtn = document.createElement("span");
  closeBtn.textContent = "[×]";
  closeBtn.style.cssText = "cursor: pointer; color: #ff0000; font-weight: bold; font-size: 16px; text-shadow: 0 0 5px #ff0000;";
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
  // Aesthetics: Deeper black, stronger glow on text
  body.style.cssText = `
    padding: 15px; height: 260px; overflow-y: auto; background: #000000;
    text-shadow: 0 0 5px #00ff41;
  `;
  term.appendChild(body);

  // 6. Interactive Command Prompt
  const inputRow = document.createElement("div");
  inputRow.style.cssText = `
    display: flex; align-items: center; background: #0f172a;
    padding: 10px 15px; border-top: 3px solid #1e293b;
    box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
  `;

  const promptSpan = document.createElement("span");
  promptSpan.textContent = "OP@UNIT_01:~/ ";
  promptSpan.style.cssText = "color: #ff0000; font-weight: bold; margin-right: 8px; text-shadow: 0 0 8px #ff0000;";

  const cmdInput = document.createElement("input");
  cmdInput.type = "text";
  cmdInput.placeholder = "AWAITING_DIRECTIVE...";
  cmdInput.style.cssText = `
    flex: 1; background: transparent; border: none; outline: none;
    color: #00ff41; font-size: 13px; text-shadow: 0 0 5px #00ff41;
  `;

  inputRow.appendChild(promptSpan);
  inputRow.appendChild(cmdInput);
  term.appendChild(inputRow);
  document.body.appendChild(term);

  setTimeout(() => cmdInput.focus(), 100);

  // Helper: Visual Feedback on manipulation
  function triggerVolatileGlitch() {
    playAlertAlarm();
    term.classList.add("volatile-glitch");
    term.style.boxShadow = "0 0 60px #ff0000, inset 0 0 20px #ff0000";
    setTimeout(() => {
      term.classList.remove("volatile-glitch");
      term.style.boxShadow = "0 0 40px rgba(255, 0, 0, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.8)";
    }, 300);
  }

  // Safe Output Logger (Add timestamp for realism)
  function log(text, color = "#00ff41", beepFreq = 600) {
    playCyberSound(beepFreq, "sine", 0.06);
    const line = document.createElement("div");
    line.style.color = color;
    line.style.margin = "3px 0";
    line.style.borderLeft = `2px solid ${color === "#00ff41" ? "transparent" : color}`;
    line.style.paddingLeft = "5px";
    
    const time = new Date().toISOString().slice(11, 19);
    line.innerHTML = `<span style="color:#64748b">[${time}]</span> > ${text}`;
    
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  // Toggle Screen Edit Mode
  function toggleDesignMode() {
    triggerVolatileGlitch();
    if (document.designMode === "on") {
      document.designMode = "off";
      editBtn.textContent = "DIRECT_EDIT: LOCKED";
      editBtn.style.cssText = "background: #0f172a; color: #64748b; border: 2px solid #64748b; padding: 4px 10px; font-size: 10px; font-weight: bold; cursor: pointer;";
      editBtn.classList.remove("status-alert");
      log("■ DIRECT_EDIT MODE TERMINATED.", "#ff9900", 400);
    } else {
      document.designMode = "on";
      editBtn.textContent = "DIRECT_EDIT: ACTIVE";
      editBtn.style.cssText = "background: #b91c1c; color: #ffffff; border: 2px solid #ff0000; padding: 4px 10px; font-size: 10px; font-weight: bold; cursor: pointer; text-shadow: 0 0 5px #fff;";
      editBtn.classList.add("status-alert");
      log("▲ WARNING: UI LAYER WRITABLE. CLICK ANYWHERE TO INJECT DATA.", "#ff0000", 900);
    }
  }

  editBtn.onclick = toggleDesignMode;

  // 7. BLIND SWEEP ENGINE (Mechanics Unchanged)
  let activeObserver = null;
  function blindOverwriteAll(targetVal, newVal) {
    triggerVolatileGlitch();
    let totalMatches = 0;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue.includes(targetVal)) {
        node.nodeValue = node.nodeValue.replaceAll(targetVal, newVal);
        totalMatches++;
      }
    }

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

  // 8. Draggable Logic
  let isDragging = false, offset = [0, 0];
  header.onmousedown = (e) => {
    if (e.target === editBtn || e.target === closeBtn) return;
    isDragging = true;
    offset = [term.offsetLeft - e.clientX, term.offsetTop - e.clientY];
    term.style.boxShadow = "0 0 60px rgba(255, 0, 0, 0.6)";
  };
  document.onmousemove = (e) => {
    if (isDragging) {
      term.style.left = (e.clientX + offset[0]) + "px";
      term.style.top = (e.clientY + offset[1]) + "px";
      term.style.right = "auto";
    }
  };
  document.onmouseup = () => {
    isDragging = false;
    term.style.boxShadow = "0 0 40px rgba(255, 0, 0, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.8)";
  };

  // 9. Command Parser
  function handleCommand(cmd) {
    const raw = cmd.trim();
    if (!raw) return;

    log(`CMD: ${raw}`, "#38bdf8", 700);
    const parts = raw.split(" ");
    const action = parts[0].toLowerCase();

    switch (action) {
      case "help":
        log("AUTHORIZED DIRECTIVES:", "#ff9900");
        log("  inject <curr> <new> : Inject new data layer blindly", "#ff9900");
        log("  edit                : Toggle UI writable state", "#ff9900");
        log("  glitch              : Test visual integrity", "#ff9900");
        log("  clear               : Purge logs", "#ff9900");
        log("  terminate           : Shudown unit", "#ff9900");
        break;

      case "glitch":
        triggerVolatileGlitch();
        log("▲ VOLATILITY TEST EXECUTED.", "#ff0000", 1000);
        break;

      case "edit":
        toggleDesignMode();
        break;

      case "clear":
        body.textContent = "";
        break;

      case "terminate":
        document.designMode = "off";
        term.remove();
        break;

      case "blind": case "inject": // Accepted both
        if (parts.length < 3) {
          triggerVolatileGlitch();
          log("■ ERROR: PARAMETERS MISSING.", "#ff0000", 300);
          log("USAGE: inject <curr_data> <new_data>", "#ff9900");
        } else {
          const actualVal = parts[1];
          const targetVal = parts[2];
          log(`▼ INITIATING SCANNERS FOR: '${actualVal}'...`, "#ff9900", 700);

          setTimeout(() => {
            const count = blindOverwriteAll(actualVal, targetVal);
            if (count > 0) {
              log(`▲ SUCCESS: ${count} LAYERS OVERWRITTEN WITH '${targetVal}'.`, "#00ff41", 1000);
              log("■ PERSISTENT_OBSERVER: ACTIVE.", "#38bdf8", 800);
            } else {
              triggerVolatileGlitch();
              log(`■ WARNING: DATA '${actualVal}' NOT DETECTED IN ACTIVE DOM.`, "#ff0000", 300);
              log("--> USE 'edit' FOR MANUAL INJECTION.", "#ff9900", 600);
            }
          }, 600); // Longer delay for dramatic effect
        }
        break;

      default:
        triggerVolatileGlitch();
        log(`UNKNOWN DIRECTIVE: '${action}'. TYPE 'help'.`, "#ff0000", 300);
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
  log("▲ TACTICAL_OVERRIDE FRAMEWORK LOADED", "#ff0000", 800);
  log("■ SECURITY_PROTOCOLS: BYPASSED", "#00ff41", 600);
  log("READY for injection or direct_edit.", "#ff9900", 500);
})();
