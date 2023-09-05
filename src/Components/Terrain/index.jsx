import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, Noise, EffectComposer, DepthOfField, DotScreen, Scanline, Pixelation } from '@react-three/postprocessing'
import { noise } from "./perlin";

const Terrain = () => {
  const meshRef = useRef(); // Create a ref to hold the mesh object

  useEffect(() => {
    const mesh = meshRef.current;

    noise.seed(Math.random());

    const pos = mesh.geometry.getAttribute("position");
    const pa = pos.array;

    const hVerts = mesh.geometry.parameters.heightSegments + 5;
    const wVerts = mesh.geometry.parameters.widthSegments + 5;

    for (let j = 0; j < hVerts; j++) {
      for (let i = 0; i < wVerts; i++) {
        const ex = 1.1;
        pa[3 * (j * wVerts + i) + 2] =
          (noise.simplex2(i / 10, j / 10) * Math.pow(ex, 1) + 
            noise.simplex2((i + 20) / 50, j / 50) * Math.pow(ex, 3) +
            noise.simplex2((i + 40) / 25, j / 25) * Math.pow(ex, 10) +
            noise.simplex2((i + 60) / 12.5, j / 12.5) * Math.pow(ex, 3) +
            noise.simplex2((i + 80) / 6.25, j / 6.25) * Math.pow(ex, 2)) /2;
      }
    }
    pos.needsUpdate = true;
  }, []);

  // useFrame(() => {
  //   meshRef.current.rotation.z += 0.001;
  // });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry attach="geometry" args={[100, 100, 100, 100]} />
      <meshPhongMaterial attach="material" color={"white"} specular={"white"} shininess={10} flatShading wireframe={false}/>
      <EffectComposer>
        <Bloom luminanceThreshold={0.001} luminanceSmoothing={0.5} intensity={1} />
        <Noise opacity={0.1} />
    </EffectComposer>
    </mesh>
  );
};

export default Terrain;
