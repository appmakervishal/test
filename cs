Here are **3 more fun browser tricks** you can do directly from the Developer Console (`F12` -> **Console** tab) on any webpage. Since they run entirely in the browser engine, they work on low-RAM school PCs without needing extra tools!

---

## 1. Do a Barrel Roll (360° Page Spin)

This rotates the entire webpage 360 degrees smoothly using CSS transforms.

1. **Open the Console:**
Open any website, press `F12` (or `Ctrl + Shift + I`), and click the **Console** tab.


2. **Run the script:**
Paste this snippet and hit `Enter`:

```javascript
document.body.style.transition = 'transform 2s ease';
document.body.style.transform = 'rotate(360deg)';
setTimeout(() => { document.body.style.transform = 'none'; }, 2000);

```


---

## 2. Low-Fi "Katamari" Page Destroyer

Turn your mouse cursor into a magnet that "sucks up" and deletes every element on the webpage when you hover over it.

```javascript
document.querySelectorAll('*').forEach(el => {
  el.addEventListener('mouseover', () => {
    el.style.transition = 'all 0.4s ease';
    el.style.opacity = '0';
    el.style.transform = 'scale(0) rotate(180deg)';
  });
});

```

> **How to play:** After running the script, move your mouse cursor across the page to make paragraphs, buttons, and images shrink and vanish instantly. Refresh the page to restore it.

---

## 3. High-Contrast "Cyberpunk / Hacker Mode"

Invert all colors on the website and give it a high-contrast dark green or neon glow look, turning bright light-mode sites (like school portals or Wikipedia) into a full dark-mode aesthetic.

```javascript
document.documentElement.style.filter = 'invert(1) hue-rotate(180deg) contrast(1.5)';

```

To revert back to normal without refreshing:

```javascript
document.documentElement.style.filter = 'none';

```
Got it! Here are a few cool, symbolic tricks specifically designed to display a custom **"LEGENDBY: VISHAL1454"** watermark, banner, or full-screen hacker marquee right on the school computer screen.

---

## 1. The Full-Screen "Vishal1454" Hacker Banner (Browser Console)

This script instantly converts any active webpage into a full-screen, dark-mode terminal displaying a glowing green ASCII banner that proclaims your tag.

1. Press `F12` on any browser tab to open DevTools, then go to the **Console**.
2. Paste this code and press `Enter`:

```javascript
document.body.innerHTML = `
<div style="background-color:black; color:#00FF00; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:monospace; text-shadow:0 0 10px #00FF00; margin:0; overflow:hidden;">
  <pre style="font-size: 14px; text-align: center;">
 __   _____ ____  _   _    _  _     _  _  ____  _  _ 
 \\ \\ / /_ _/ ___|| | | |  / || || | | || || ___|| || |
  \\ V / | |\\___ \\| |_| |  | || || |_| || ||___ \\| || |_
   | |  | | ___) |  _  |  | ||__   _|__   _|_ ) |__   _|
   |_| |___|____/|_| |_|  |_|   |_|    |_| |____/  |_|  
  </pre>
  <h1 style="letter-spacing: 5px; margin-top: 20px;">SYSTEM OVERRIDDEN BY THE LEGEND</h1>
  <p style="color: #008800;">[ ISDA / VB PUBLICATION SECURED ]</p>
</div>
`;

```

---

## 2. Floating Signature Watermark (Browser Console)

If you want to keep browsing normally while leaving an un-removable badge on the bottom-right corner of the web page:

```javascript
const badge = document.createElement('div');
badge.innerHTML = '⚡ POWERED BY VISHAL1454 ⚡';
badge.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.85);
  color: #00FF00;
  padding: 12px 24px;
  font-family: monospace;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid #00FF00;
  border-radius: 8px;
  box-shadow: 0 0 15px #00FF00;
  z-index: 999999;
  pointer-events: none;
`;
document.body.appendChild(badge);

```

---

## 3. Terminal Legend Marquee (Python)

Run this in VS Code or Command Prompt (`python legend.py`) to create a smooth, scrolling marquee in the terminal:

```python
import os
import time

os.system('color 0a') # Green text

text = " *** VISHAL1454 :: THE LEGEND IS HERE *** "
padding = " " * 40

try:
    while True:
        for i in range(len(text) + len(padding)):
            os.system('cls' if os.name == 'nt' else 'clear')
            display_text = (padding + text + padding)[i:i+40]
            print("\n" * 5)
            print("=" * 50)
            print(f"   {display_text}")
            print("=" * 50)
            time.sleep(0.1)
except KeyboardInterrupt:
    os.system('color 07')

```

Windows Popup Message (Native Python Trick)
You can trigger native Windows message popups using built-in Python libraries without installing anything.

Python


import ctypes

# Parameters: Title, Message, Style
# 0x40 gives an Information icon, 0x0 makes it a standard OK button
ctypes.windll.user32.MessageBoxW(0, "System Overheat Warning: Please feed the PC coffee.", "Windows System Alert", 0x40)
