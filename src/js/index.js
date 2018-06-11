import * as THREE from 'three';

/* CAMERA */

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 0;

/* RESIZE*/

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / window.innerHeight);
}, false);

/* MESH */

let geometry = new THREE.BoxGeometry(200, 200, 200);
let material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
let mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 400;

/* Child */

let child = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial({color: 0x00ff00}));
child.position.x = 0;

/* Créer la SCENE */
let scene = new THREE.Scene();
scene.add(mesh);
mesh.add(child);

/* RENDER */
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


/* Afficher la SCENE et animer le cube */
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            mesh.rotation.x += 0.3;
            break;
        case 'ArrowDown':
            mesh.rotation.x -= 0.3;
            break;
        case 'ArrowLeft':
            mesh.rotation.y -= 0.3;
            break;
        case 'ArrowRight':
            mesh.rotation.y += 0.3;
    }
};
//Mouse orientation
let fpsObject = new THREE.Object3D();
scene.add(fpsObject);
let pitchObject = new THREE.Object3D();
pitchObject.add(camera);

let yawObject = new THREE.Object3D();
//yawObject.position.y = 10;
yawObject.add(pitchObject);
fpsObject.add(yawObject);

document.addEventListener('mousemove', function (event) {
    const movementX = event.movementX;
    const movementY = event.movementY;

    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;

    pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchObject.rotation.x));
}, false);

/*
let mouseEnabled = false;
document.body.onmousedown = () => {
    mouseEnabled = true;
};

document.body.onmouseup = () => {
    mouseEnabled = false;
};

document.body.onmousemove = (event) => {
    if (!mouseEnabled) {
        camera.rotation.y +=  event.movementX / 1000;
        camera.rotation.x +=event.movementY / 1000;
    }
    return false;
};
*/
animate();

