import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import './index.css'

const scene = new THREE.Scene();
//Sizer
const sizes = {
    width : window.innerWidth,
    height : window.innerWidth
}

// our mesh model
const loader = new GLTFLoader();

// Load the GLB model
loader.load(
  'planet_earth.glb', // Replace with the path to your GLB file
  function (gltf) {
    // Add the loaded model to the scene
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error('An error occurred while loading the model:', error);
  }
);

// Light
const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(0, 10, 10);
light.intensity = 125
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 4


const loop = ()=>
{

    controls.update();
    renderer.render(scene, camera)
    window.requestAnimationFrame(loop)
}

loop()