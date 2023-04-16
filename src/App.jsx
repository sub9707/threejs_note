import { useRef, useEffect } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const feGaussianBlurRef = useRef(null);
  const feColorMatrixRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio;
    let canvasWidth;
    let canvasHeight;
    let particles;

    function init() {
      canvasWidth = innerWidth;
      canvasHeight = innerHeight;

      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";

      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;

      ctx.scale(dpr, dpr);
      particles = [];
      const TOTAL = canvas.width / 50;

      for (let i = 0; i < TOTAL; i++) {
        const x = randomNumBetween(0, canvasWidth);
        const y = randomNumBetween(0, canvasHeight);
        const radius = randomNumBetween(50, 100);
        const vy = randomNumBetween(1, 5);
        const particle = new Particle(x, y, radius, vy);
        particles.push(particle);
      }
    }

    const feGaussianBlur = feGaussianBlurRef.current;
    const feColorMatrix = feColorMatrixRef.current;

    const controls = new (function () {
      this.blurValue = 40;
      this.alphaChannel = 100;
      this.alphaOffset = -23;
    })();

    let gui = new dat.GUI();

    gui.add(controls, "blurValue", 0, 100).onChange((value) => {
      feGaussianBlur.setAttribute("stdDeviation", value);
    });
    gui.add(controls, "alphaChannel", 1, 200).onChange((value) => {
      feColorMatrix.setAttribute(
        "values",
        `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`
      );
    });
    gui.add(controls, "alphaOffset", -40, 40).onChange((value) => {
      feColorMatrix.setAttribute(
        "values",
        `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`
      );
    });

    class Particle {
      constructor(x, y, radius, vy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vy = vy;
        this.acc = 1.03;
      }

      update() {
        this.vy *= this.acc;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
      }
    }
    const randomNumBetween = (min, max) => {
      return Math.random() * (max - min + 1) + min;
    };

    let interval = 1000 / 60;
    let now, delta;
    let then = Date.now();

    function animate() {
      window.requestAnimationFrame(animate);
      now = Date.now();
      delta = now - then;

      if (delta < interval) return;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();

        if (particle.y - particle.radius > canvasHeight) {
          particle.y = -particle.radius;
          particle.x = randomNumBetween(0, canvasWidth);
          particle.radius = randomNumBetween(50, 100);
          particle.vy = randomNumBetween(1, 5);
        }
      });

      then = now - (delta % interval);
    }

    window.addEventListener("load", () => {
      init();
      animate();
    });

    window.addEventListener("resize", () => {
      init();
    });
  }, []);

  return (
    <div className="App">
      <canvas ref={canvasRef}>123</canvas>
      <svg>
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              stdDeviation="40"
              in="SourceGraphic"
              result="blur1"
              ref={feGaussianBlurRef}
            />
            <feColorMatrix
              in="blur1"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 100 -23"
              ref={feColorMatrixRef}
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default App;
