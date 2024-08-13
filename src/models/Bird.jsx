





import React, { useRef, useEffect } from 'react';
import birdScene from "../assets/3d/bird.glb";
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from "@react-three/fiber";

const Bird = () => {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef();
  const { actions } = useAnimations(animations, birdRef);
  
  useEffect(() => {
    actions["Take 001"]?.play(); // Safeguard in case animation name is incorrect
  }, [actions]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const radius = -478; // Radius of the circular path
    const centerX = 0; // X coordinate of the circle's center
    const centerZ = 0; // Z coordinate of the circle's center
    const speed = 0.3; // Speed of movement

    if (birdRef.current) {
      // Calculate the position on the circular path
      birdRef.current.position.x = centerX + radius * Math.cos(elapsedTime * speed);
      birdRef.current.position.z = centerZ + radius * Math.sin(elapsedTime * speed);

      // Sine wave movement for the vertical axis
      const amplitude = 7; // Amplitude for vertical movement
      birdRef.current.position.y = Math.sin(elapsedTime * 2) * amplitude + 90;

      // Calculate the direction the bird is facing based on its movement
      const angle = elapsedTime * speed;
      birdRef.current.rotation.y = -angle + Math.PI / 2; // Align the bird’s orientation to face the direction of movement
    }
  });

  return (
    <mesh ref={birdRef} position={[0, 90, 1]} scale={[0.17, 0.17, 0.17]}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Bird;

