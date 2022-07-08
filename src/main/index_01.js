import * as THREE from 'three';

// 目标：了解基本内容
const scene = new THREE.Scene(); // 创建场景
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
); // 创建相机
camera.position.set(0, 0, 10) // 相机位置
scene.add(camera);

// 创建物体
const box = new THREE.BoxBufferGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00
});
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(box, boxMaterial);
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webgl渲染的canvas添加到body上
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera)