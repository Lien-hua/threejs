import * as THREE from 'three';
// 导入轨道控制器
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
// 目标：js控制全屏 以及 dat控制界面
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
const box = new THREE.BoxBufferGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00
});
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(box, boxMaterial);

// 修改物体位置
// cube.position.set(0, 0, 10) // ==== cube.position.z = 50
scene.add(cube);

console.log(cube.material);

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
// 设置动画
var anite = gsap.to(cube.position, {
    x: 5,
    duration: 5,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true, // 往返运动
    delay: 2, // 延迟时间
    onComplete: () => {
        console.log('完成');
    },
    onStart: () => {
        console.log('开始');
    }
})
gsap.to(cube.rotation, {
    x: 2 * Math.PI,
    duration: 5,
    ease: "power1.inOut",
    // repeat: 2 // -1表示无限重复

})
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
// js控制全屏
window.addEventListener('dblclick', () => {
    // 双击进入或者退出全屏
    const fullScreen = document.fullscreenElement;
    if (fullScreen) {
        document.exitFullscreen() // 文档退出全屏
    } else {
        renderer.domElement.requestFullscreen() // 画布全屏
    }
})

// dat初始化
const gui = new dat.GUI();
gui
    .add(cube.position, "x")
    .min(0)
    .max(5)
    .step(0.01)
    .name('移动x坐标')
    .onChange((val) => {
        console.log('当前修改数值', val);
    })
    .onFinishChange(() => {
        console.log('停止');
    });
const params = {
    color: '#ffff00',
    fn: () => {
        // 物体运动
        gsap.to(cube.position, {
            x: 5,
            duration: 5,
            yoyo: true,
            repeat: -1
        })
    }
}
gui.addColor(params, "color").onChange((val) => {
    cube.material.color.set(val)
})
gui.add(cube, "visible").name('是否显示')
// 点击触发事件
gui.add(params, 'fn').name('物体运动')

// 设置文件夹
var folder = gui.addFolder('设置物体')
folder.add(cube.material, "wireframe")