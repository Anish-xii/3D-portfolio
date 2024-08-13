

import React, { useRef } from 'react';
import skyScene from "../assets/3d/sky.glb";
import { useGLTF } from '@react-three/drei';
import { useFrame } from "@react-three/fiber";

const Sky = ({ isRotating }) => {
  const { scene } = useGLTF(skyScene);
  const skyRef = useRef();
  
  useFrame((_, delta) => {
    if (isRotating && skyRef.current) {
      skyRef.current.rotation.y += 0.25 * delta; // Adjust the rotation speed as needed
    }
  });
  
  return (
    <primitive 
      object={scene} 
      ref={skyRef} // Attach the ref here
    />
  );
}

export default Sky;
