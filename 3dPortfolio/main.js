import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  BoxBufferGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000 );

const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg'),
})



renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
// camera.position.setX(-3);
// camera.position.setY(-6);// 

renderer.render(scene,camera);

window.addEventListener('resize', function ()
{
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
});

const turusTexture = new THREE.TextureLoader().load('earth.jpeg');

const torus = new THREE.Mesh(
 new THREE.SphereGeometry(8,32,32),
 new THREE.MeshStandardMaterial({
   map: turusTexture,
 })
);


torus.position.x = 17;

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);



const controls = new OrbitControls(camera,renderer.domElement);

const starTexture = new THREE.TextureLoader().load('star.jpeg');

function addStar() {
  const geometry = new THREE.TetrahedronGeometry(0.4,2);
  const material = new THREE.MeshStandardMaterial({
    map: starTexture,
  })
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
 
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar
const avatarTexture = new THREE.TextureLoader().load('ProfilePicture.png');

const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: avatarTexture})
);

avatar.position.y = 2;
avatar.position.x = 3;
scene.add(avatar);

// Moon 
const moonTexture = new THREE.TextureLoader().load('moon.jpg');

const moon  = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    
  })
);
moon.position.z = 20;
moon.position.setX(-10);

scene.add(moon);

let rocket;
function load() {
const loader = new GLTFLoader();
loader.load('scene.gltf', function (gltf) {
  rocket = gltf.scene;
  rocket.position.x = 8;
  rocket.position.y = 160;
  rocket.position.z = 350;

  //rocket.rotation.x = MathUtils.degToRad(-60);
  // rocket.rotation.y = MathUtils.degToRad(-45);
  // rocket.rotation.z = MathUtils.degToRad(60);
  
  scene.add(rocket);
})
}

load();

function moveCamera() {
  
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.05;
  
  avatar.rotation.y += 0.01;
  //avatar.rotation.z += 0.01;
  //avatar.position.x += -0.1;
  

  //rocket.rotation.z += 0.0001;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  
  
  
}

document.body.onscroll = moveCamera;
moveCamera();






function animate() {
  
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  
  

  controls.update();

  renderer.render(scene, camera);
}

animate();