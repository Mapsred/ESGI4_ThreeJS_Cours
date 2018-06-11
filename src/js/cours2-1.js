import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 1000;

let scene = new THREE.Scene();

let parent = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial({color: 0xFF0000}));
let child = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial({color: 0x0000FF}));
let child2 = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), new THREE.MeshBasicMaterial({color: 0x00FF00}));


child.position.x = 300;
child2.position.x = -300;

scene.add(parent);
parent.add(child);
parent.add(child2);


let ground = new THREE.GridHelper(2000, 400, 0x0000ff, 0x808080);
ground.position.y = -150;
ground.position.x = 150;
scene.add(ground);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();


document.body.onkeydown = (event) => {
    const speed = 16;

    switch (event.keyCode) {
        case 37:
            parent.rotation.y += Math.PI / speed;
            parent.scale.y += 0.02;
            break;
        case 38:
            parent.rotation.x -= Math.PI / speed;
            break;
        case 39:
            parent.rotation.y -= Math.PI / speed;
            parent.scale.y += 0.02;
            break;
        case 40:
            parent.rotation.x += Math.PI / speed;
            break;
    }
};

document.body.onkeyup = (event) => {
    if (event.keyCode === 37 || event.keyCode === 39) {
        parent.scale.y = 1;
    }
};


let mouseEnabled = false;
document.body.onmousedown = () => {
    mouseEnabled = true;
};

document.body.onmouseup = () => {
    mouseEnabled = false;
};

document.body.onmousemove = (event) => {
    if (!mouseEnabled) {
        return false;
    }

    parent.rotation.y += event.movementX / 100;
    parent.rotation.x += event.movementY / 100;
};


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

