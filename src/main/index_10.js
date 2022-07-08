import * as THREE from 'three';
// 导入轨道控制器
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
// 目标：使用bufferGeometry创建图形
import * as dat from 'dat.gui';
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
for (let i = 0; i < 50; i++) {
    const geo = new THREE.BufferGeometry(),
        positionArr = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
        positionArr[j] = Math.random() * 10 - 5
    }
    let color = new THREE.Color(Math.random(), Math.random(), Math.random())
    geo.setAttribute("position", new THREE.BufferAttribute(positionArr, 3));
    const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: .5
    })
    const mesh = new THREE.Mesh(geo, material);
    scene.add(mesh)
}

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webgl渲染的canvas添加到body上
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 設置控制器阻尼 
controls.enableDamping = true; // 必須在動畫循環調用update

// 创建坐标轴
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper) // 红x  绿y  蓝z
// 设置时钟
const clock = new THREE.Clock();

// 设置渲染函数
function animate() {
    controls.update()
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// 监听画面变化
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight; // 宽高比
    camera.updateProjectionMatrix(); // 更新矩阵
    renderer.setSize(window.innerWidth, window.innerHeight); // 更新渲染器大小
    renderer.setPixelRatio(window.devicePixelRatio)
})