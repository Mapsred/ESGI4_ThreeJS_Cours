// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';
import 'three/examples/js/controls/PointerLockControls';

let camera, scene, renderer, geometry, material, mesh, controls;

function init() {
    const element = document.body;
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);

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

    camera.position.z = 1000;

    geometry = new THREE.BoxGeometry(200, 200, 200);
    material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());

    // pointer lock
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

    const delta = clock.getDelta();

    // mesh.rotation.x += 0.5 * delta;
    // mesh.rotation.y += 0.7 * delta;

    document.onkeydown = function (e) {
        e = e || window.event;

        switch (e.keyCode) {
            case 32:
                // switchCamera();
                break;
            // left
            case 37:
                mesh.rotation.y -= 0.02;
                console.log(mesh.rotation.y);
                return;
            // right
            case 39:
                mesh.rotation.y += 0.02;
                return;
            // top
            case 38:
                mesh.rotation.x -= 0.02;
                return;
            // down
            case 40:
                mesh.rotation.x += 0.02;
                return;
        }
    };

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