import React, { useEffect, useRef, memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import huracanModel from '../../models3d/huracan/scene.glb';

const HuracanModel = memo(({ canvasContainerRef, carChanges }) => {
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  let theModel = useRef(null);

  useEffect(() => {
    const BACKGROUND_COLOR = 0xffffff;
    const canvasContainer = canvasContainerRef.current;
    const canvas = document.querySelector('#c');
    let cameraFar = isDesktop ? 24 : (isLaptop ? 30 : 48);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BACKGROUND_COLOR);
    scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 10);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    canvasContainer.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);

    const camera = new THREE.PerspectiveCamera(10, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 1, 5000);
    camera.position.z = cameraFar;
    camera.position.x = 0;

    const paintMtlInitial = new THREE.MeshStandardMaterial({ color: 0x1B1B1B, roughness: 0.25, metalness: 1, });
    const chassisMtlInitial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.25, metalness: 1, });
    const glassMtlInitial = new THREE.MeshStandardMaterial({ color: 0x1A1C25, roughness: 0.25, metalness: 1 });
    const rimsMtlInitial = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.25, metalness: 1, });
    const lightsMtlInitial = new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.5, metalness: 1, });


    const loader = new GLTFLoader();
    loader.load(huracanModel, (gltf) => {
      theModel.current = gltf.scene;
      theModel.current.traverse((object) => {
        if (object.isMesh) {
          if (object.material.name === 'Body_D_23') {
            object.material = paintMtlInitial;
            object.material.name = 'paint';
          }
          if (object.material.name === 'Matte_D_23') {
            object.material = chassisMtlInitial;
          }
          if (object.material.name === 'Glass_D_23') {
            object.material = glassMtlInitial;
            object.material.transparent = true;
            object.material.opacity = 0.8;
          }
          if (object.material.name === 'Wheel_D_23') {
            object.material = rimsMtlInitial;
            object.material.name = 'rims';
          }
          if (object.material.name === 'Lights_17_24') {
            object.material = lightsMtlInitial;
          }
        }
      });
      theModel.current.scale.set(1, 1, 1);
      theModel.current.rotation.y = 1.75 * Math.PI;
      theModel.current.rotation.x = Math.PI / 36;
      theModel.current.rotation.z = Math.PI / 36;
      theModel.current.position.y = -0.5;
      theModel.current.position.x = -0.1;
      scene.add(theModel.current);
    }, undefined, (error) => {
      console.log(error);
    })

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 15);
    dirLight.position.set(-4, 5, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(dirLight);
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 4);
    dirLight2.position.set(16, 2.5, 8);
    dirLight2.castShadow = true;
    dirLight2.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(dirLight2);
    const dirLight3 = new THREE.DirectionalLight(0xffffff, 15);
    dirLight3.position.set(0, 100, 4);
    dirLight3.castShadow = true;
    dirLight3.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(dirLight3);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2.5;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.dampingFactor = 0.1;
    controls.autoRotateSpeed = 2;

    const resizeRendererToDisplaySize = (renderer) => {
      const canvas = renderer.domElement;
      const width = canvasContainer.offsetWidth;
      const height = canvasContainer.offsetHeight;
      const canvasPixelWidth = canvas.width / window.devicePixelRatio;
      const canvasPixelHeight = canvas.height / window.devicePixelRatio;

      const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
      if (needResize) {

        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      controls.update();
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
    }

    animate();
  }, [canvasContainerRef, isLaptop, isDesktop])

  useEffect(() => {
    if (carChanges.value === null) return;
    const color = +`0x${carChanges.value.slice(1)}`;
    const newCarMaterial = new THREE.MeshStandardMaterial({ color: color, roughness: 0.25, metalness: 1, });
    theModel.current.traverse((object) => {
      if (object.isMesh) {
        if (object.material.name === carChanges.parameter) {
          object.material = newCarMaterial;
          object.material.name = carChanges.parameter;
        }
      }
    })
  }, [carChanges])

  return (
    <canvas id="c"></canvas>
  );
});

export default HuracanModel;