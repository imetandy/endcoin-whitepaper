/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import * as THREE from "three";
import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from "three";

import { Reflector } from "three/examples/jsm/objects/Reflector";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import CoolImage from "./img/endcoin_whitepaper.png";
import DiscordImage from "./img/discord.png";
import BasicLights from "./objects/Lights.js";

const lights = new BasicLights();
const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
//const seedScene = new SeedScene();
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.maxPolarAngle = Math.PI / 2;
orbitControls.maxAzimuthAngle = Math.PI / 2.5;
orbitControls.minAzimuthAngle = -Math.PI / 2.5;
orbitControls.target.set(0, 0, 0);

const sceneMeshes = new THREE.Mesh();
let boxHelper = new THREE.BoxHelper();

const dragControls = new DragControls(sceneMeshes, camera, renderer.domElement);
dragControls.addEventListener("hoveron", function () {
  boxHelper.visible = true;
  orbitControls.enabled = false;
});
dragControls.addEventListener("hoveroff", function () {
  boxHelper.visible = false;
  orbitControls.enabled = true;
});
dragControls.addEventListener("drag", function (event) {
  event.object.position.y = 0;
});
dragControls.addEventListener("dragstart", function () {
  boxHelper.visible = true;
  orbitControls.enabled = false;
});
dragControls.addEventListener("dragend", function () {
  boxHelper.visible = false;
  orbitControls.enabled = true;
});

// scene
scene.add(lights);
const planeGeometry = new THREE.PlaneGeometry(25, 35.25);
const texture = new THREE.TextureLoader().load(CoolImage);
const plane = new THREE.Mesh(
  planeGeometry,
  new THREE.MeshStandardMaterial({ map: texture })
);

plane.receiveShadow = true;
scene.add(plane);

const geometry = new THREE.BoxGeometry(0.5, 35.25, 6.25);
const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
const cube = new THREE.Mesh(geometry, material);
cube.position.z = 3.125;
scene.add(cube);

const mirrorFront1 = new Reflector(new THREE.PlaneGeometry(12.5, 35.25), {
  color: new THREE.Color(0x7f7f7f),
  //clipBias: 0.003,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
});
mirrorFront1.position.x = 0.255;
mirrorFront1.rotateY(Math.PI / 2);
scene.add(mirrorFront1);

const mirrorFront2 = new Reflector(new THREE.PlaneGeometry(12.5, 35.25), {
  color: new THREE.Color(0x7f7f7f),
  //clipBias: 0.003,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
});

mirrorFront2.position.x = -0.255;

mirrorFront2.rotateY(-Math.PI / 2);
scene.add(mirrorFront2);

// camera
camera.position.set(0, 0, 35);
camera.lookAt(new Vector3(0, 0, 0));

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  orbitControls.update();
  renderer.render(scene, camera);
  //seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener("resize", windowResizeHanlder);

document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);

const DOM_img = document.createElement("img");
DOM_img.src = DiscordImage;
DOM_img.position = "absolute";
DOM_img.right = "0px";
DOM_img.bottom = "5px";
document.body.appendChild(DOM_img);
