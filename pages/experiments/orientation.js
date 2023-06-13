import { useEffect, useRef } from "react";
import * as THREE from "three";

const CubeRotationPage = () => {
  const canvasRef = useRef(null);
  const orientationRef = useRef({ alpha: 0, beta: 0, gamma: 0 });

  const handleOrientation = (event) => {
    const { alpha, beta, gamma } = event.rotationRate;
    orientationRef.current.alpha = alpha || 0;
    orientationRef.current.beta = beta || 0;
    orientationRef.current.gamma = gamma || 0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const initScene = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas });

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const light = new THREE.DirectionalLight(0xffffff);
      light.position.set(1, 1, 1).normalize();
      scene.add(light);

      camera.position.z = 5;

      const debugTexts = document.createElement("div");
      debugTexts.style.position = "fixed";
      debugTexts.style.top = "10px";
      debugTexts.style.left = "10px";
      debugTexts.style.color = "white";
      debugTexts.style.fontFamily = "Arial";
      document.body.appendChild(debugTexts);

      const animate = () => {
        requestAnimationFrame(animate);

        const { alpha, beta, gamma } = orientationRef.current;
        cube.rotation.x = (beta * Math.PI) / 180;
        cube.rotation.y = (gamma * Math.PI) / 180;
        cube.rotation.z = (alpha * Math.PI) / 180;

        renderer.render(scene, camera);

        debugTexts.innerHTML = `
          alpha: ${alpha.toFixed(2)}<br>
          beta: ${beta.toFixed(2)}<br>
          gamma: ${gamma.toFixed(2)}
        `;
      };

      animate();
    };

    if (canvas) {
      initScene();
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />
    </>
  );
};

export default CubeRotationPage;
