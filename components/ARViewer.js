import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ARViewer() {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [annotations, setAnnotations] = useState([
    { id: 1, position: new THREE.Vector3(0, 1, 0), text: "Bagian Nozzle" },
    { id: 2, position: new THREE.Vector3(1, 0.5, 0), text: "Sensor Tekanan" },
  ]);
  const [selectedAnno, setSelectedAnno] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(3, 3, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Model (simple mock geometry mesin injection plastik)
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x2194ce });
    const baseGeometry = new THREE.BoxGeometry(2, 0.5, 1);
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    scene.add(baseMesh);

    // Nozzle - silinder dengan animasi goyang ringan
    const nozzleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6, 32);
    const nozzleMaterial = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    const nozzle = new THREE.Mesh(nozzleGeometry, nozzleMaterial);
    nozzle.position.set(0, 0.8, 0);
    scene.add(nozzle);

    // Pressure Sensor - sphere kecil
    const sensorGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const sensorMaterial = new THREE.MeshStandardMaterial({ color: 0x27ae60 });
    const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
    sensor.position.set(0.9, 0.25, 0);
    scene.add(sensor);

    // Annotation Labels
    const annotationElements = [];
    annotations.forEach((anno) => {
      const div = document.createElement("div");
      div.className = "annotation";
      div.textContent = anno.text;
      div.style.position = "absolute";
      div.style.background = "rgba(0,0,0,0.6)";
      div.style.color = "white";
      div.style.padding = "4px 8px";
      div.style.borderRadius = "4px";
      div.style.pointerEvents = "auto";
      div.style.cursor = "pointer";
      div.onclick = () => setSelectedAnno(anno.id);
      mount.appendChild(div);
      annotationElements.push({ elem: div, position: anno.position });
    });

    function updateAnnotations() {
      annotationElements.forEach(({ elem, position }) => {
        const screenPos = position.clone();
        screenPos.project(camera);
        const x = (screenPos.x * 0.5 + 0.5) * mount.clientWidth;
            const y = (-screenPos.y * 0.5 + 0.5) * mount.clientHeight;
    elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    elem.style.display = screenPos.z < 1 ? "block" : "none";
  });
}

// Animate
let frameId;
let nozzleAngle = 0;
const animate = () => {
  nozzleAngle += 0.01;
  nozzle.position.x = Math.sin(nozzleAngle) * 0.05;
  controls.update();
  updateAnnotations();
  renderer.render(scene, camera);
  frameId = requestAnimationFrame(animate);
};

animate();
setLoading(false);

// Cleanup
return () => {
  cancelAnimationFrame(frameId);
  annotationElements.forEach(({ elem }) => mount.removeChild(elem));
  mount.removeChild(renderer.domElement);
  controls.dispose();
  scene.clear();
};
};
}, [annotations]);

const handleAnnotationChange = (e) => {
const updatedAnnotations = annotations.map((anno) =>
anno.id === selectedAnno ? { ...anno, text: e.target.value } : anno
);
setAnnotations(updatedAnnotations);
};

return (
<div
ref={mountRef}
style={{
position: "relative",
width: "100%",
height: "500px",
border: "1px solid #ddd",
borderRadius: "12px",
overflow: "hidden",
userSelect: "none",
}}
>
{loading && (
<div
style={{
position: "absolute",
top: "45%",
left: "50%",
transform: "translate(-50%, -50%)",
fontSize: 18,
color: "#666",
}}
>
Loading AR Viewer...
</div>
)}
  {selectedAnno && (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "10px 15px",
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: 10,
        maxWidth: 350,
      }}
    >
      <input
        type="text"
        value={
          annotations.find((anno) => anno.id === selectedAnno)?.text || ""
        }
        onChange={handleAnnotationChange}
        style={{
          flexGrow: 1,
          fontSize: 16,
          padding: 6,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
        autoFocus
      />
      <button
        onClick={() => setSelectedAnno(null)}
        style={{
          backgroundColor: "#e74c3c",
          border: "none",
          borderRadius: 6,
          color: "white",
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        ✖
      </button>
    </div>
  )}
</div>
