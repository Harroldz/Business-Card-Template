const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

const fontSize = 16;
const chars = "アイウエオカキクケコサシスセソQWERTYUIOPLKJHGFDSAZXCVBNM0123456789";
let drops;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops = Array(Math.floor(canvas.width / fontSize)).fill(1);
}
resize();
window.addEventListener("resize", resize);

function draw() {
  // fade the previous frame instead of clearing it -> trails
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // read the theme color from CSS so the rain always matches
  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent").trim();
  ctx.fillStyle = accent;
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, y * fontSize);

    // once a drop passes the bottom, randomly restart it at the top
    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}

setInterval(draw, 50);
