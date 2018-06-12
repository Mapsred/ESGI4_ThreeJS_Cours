/**************************************************/
/* exo déplacement FPS                            */
/**************************************************/
console.log('exo FPS');


// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';
import 'three/examples/js/controls/PointerLockControls';

const sunTexture = require('../img/sun_texture.jpg');
const earthTexture = require('../img/earth_texture.jpg');
const moonTexture = require('../img/moon_texture.jpg');


let camera, scene, renderer, geometry, material, mesh;
let controls;


const keys = [];
document.onkeydown = function (e) {
    e = e || window.event;
    keys[e.keyCode] = true;
};

document.onkeyup = function (e) {
    e = e || window.event;
    keys[e.keyCode] = false;
};


const sunPivot = new THREE.Object3D();
const earthPivot = new THREE.Object3D();
const moonPivot = new THREE.Object3D();

function init() {
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // cubes floor
    // for (let x = 0; x < 30; x++) {
    //     for (let y = 0; y < 30; y++) {
    //         const geometry = new THREE.BoxGeometry(2, 2, 2);
    //         const material = new THREE.MeshBasicMaterial({
    //             color: Math.floor(Math.random() * 16777215)
    //         });
    //         const mesh = new THREE.Mesh(geometry, material);
    //         mesh.position.x -= x * 2;
    //         mesh.position.z -= y * 2;
    //         mesh.position.y = -2;
    //
    //         scene.add(mesh);
    //     }
    // }

    const light = new THREE.AmbientLight(0x888888);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xfdfcf0, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    scene.add(sunPivot);

    /* START MESH */

    /* SUN */

    const sun = new THREE.Mesh(new THREE.SphereGeometry(32, 32, 32), new THREE.MeshPhongMaterial({
        map: new THREE.ImageUtils.loadTexture(sunTexture),
        color: 0xf2e8b7,
        emissive: 0x91917b,
        specular: 0x777d4a,
        shininess: 62,
        envMaps: "refraction"
    }));

    sunPivot.add(earthPivot);
    sunPivot.add(sun);

    /* EARTH */

    const earth = new THREE.Mesh(new THREE.SphereGeometry(16, 32, 32), new THREE.MeshPhongMaterial({
        map: new THREE.ImageUtils.loadTexture(earthTexture),
        color: 0xaaaaaa,
        specular: 0x333333,
        shininess: 25
    }));

    earth.position.y = 100;

    earthPivot.add(earth);
    earth.add(moonPivot);

    /* MOON */

    const moon = new THREE.Mesh(new THREE.SphereGeometry(8, 32, 32), new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture(moonTexture)
    }));

    moon.position.y = 30;
    moonPivot.add(moon);

    /* END MESH */

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // mouse view controls
    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());

    // pointer lock
    const element = document.body;

    const pointerlockchange = function (event) {
        controls.enabled = document.pointerLockElement === element;
    };
    const pointerlockerror = function (event) {
    };

    // hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('pointerlockerror', pointerlockerror, false);

    element.addEventListener('click', function () {
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();
    }, false);
}

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    let delta = clock.getDelta();
    const speed = 10;
    earthPivot.rotation.z += 0.01;
    moonPivot.rotation.z += 0.01;

    // up
    if (keys[38]) {
        controls.getObject().translateZ(-delta * speed);
    }
    // down
    if (keys[40]) {
        controls.getObject().translateZ(delta * speed);
    }
    // left
    if (keys[37]) {
        controls.getObject().translateX(-delta * speed);
    }
    // right
    if (keys[39]) {
        controls.getObject().translateX(delta * speed);
    }


    renderer.render(scene, camera);
}

init();
animate();