// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';
import 'three/examples/js/controls/PointerLockControls';

let camera, scene, renderer, geometry, material, mesh, controls;

const keys = [];
document.onkeydown = function (e) {
    e = e || window.event;
    keys[e.keyCode] = true;
};

document.onkeyup = function (e) {
    e = e || window.event;
    keys[e.keyCode] = false;
};

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
const clock = new THREE.Clock();

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 - 1;
}

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 20;
    // camera.position.x = 20;

    // cubes floor
    for (let x = 0; x < 30; x++) {
        for (let y = 0; y < 30; y++) {
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            const material = new THREE.MeshBasicMaterial({
                color: Math.floor(Math.random() * 16777215)
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x -= x * 2;
            mesh.position.z -= y * 2;
            mesh.position.y = -2;

            scene.add(mesh);
        }
    }

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

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

    document.body.appendChild(renderer.domElement);
}

function animate() {
    window.addEventListener('mouseMove', onMouseMove, false);
    requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000);
    }

    let delta = clock.getDelta();
    const speed = 10;

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

// window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);


init();
animate();