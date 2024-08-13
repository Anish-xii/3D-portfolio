import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import islandScene from '../assets/3d/island.glb';
import { a } from '@react-spring/three';

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  // Handlers for pointer events
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handlers for keyboard events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.0425;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.0425;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  // Handlers for touch events
  const handleTouchStart = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    const clientX = event.touches[0].clientX;
    lastX.current = clientX;
  };

  const handleTouchEnd = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handleTouchMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX = event.touches[0].clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0.001;
      }
      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Debug logs for rotation values
      console.log("Normalized Rotation:", normalizedRotation);

      // Adjust stage ranges as necessary
      // Adjust stage ranges to show popups in 4 stages, each 90 degrees apart
      if (normalizedRotation >= 0 && normalizedRotation < 1.570) {
        setCurrentStage(1); // Popup for 0 to 90 degrees
      } else if (normalizedRotation >= 1.570 && normalizedRotation < 3.142) {
        setCurrentStage(2); // Popup for 90 to 180 degrees
      } else if (normalizedRotation >= 3.142 && normalizedRotation < 4.712) {
        setCurrentStage(3); // Popup for 180 to 270 degrees
      } else if (normalizedRotation >= 4.712 && normalizedRotation < 6.283) {
        setCurrentStage(4); // Popup for 270 to 360 degrees
      } else {
        setCurrentStage(null); // Default case if out of expected range
      }


    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    // Add event listeners
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      // Clean up event listeners
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove, handleKeyDown, handleKeyUp, handleTouchStart, handleTouchEnd, handleTouchMove]);

  return (
    <a.group ref={islandRef} {...props}>
      <group position={[-217.84, 69.884, 370.645]} rotation={[-1.52, -0.065, 0.019]} scale={18.518}>
        <mesh
          geometry={nodes.tree_Material013_0.geometry}
          material={materials['Material.013']}
        />
        <mesh
          geometry={nodes.tree_Material015_0.geometry}
          material={materials['Material.015']}
        />
      </group>
      <group position={[18.326, 200.902, -31.902]} rotation={[-Math.PI / 2, 0, 0.981]} scale={5.79}>
        <group position={[0.698, -0.479, -6.719]}>
          <group position={[0.001, -4.891, -7.029]}>
            <mesh
              geometry={nodes.Chest_Bottom_Wood_Metal_Iron_0.geometry}
              material={materials.Metal_Iron}
            />
            <mesh
              geometry={nodes.Chest_Bottom_Wood_Material005_0.geometry}
              material={materials['Material.005']}
            />
            <mesh
              geometry={nodes.Chest_Bottom_Wood_Gem_Green_0.geometry}
              material={materials.Gem_Green}
            />
          </group>
        </group>
      </group>
      <mesh
        geometry={nodes.earth_Cube013_rock_base_0.geometry}
        material={materials.rock_base}
        scale={36.358}
      />
      <mesh
        geometry={nodes.Icosphere000_Material014_0.geometry}
        material={materials['Material.014']}
        position={[-297.998, 187.313, -11.502]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={41.452}
      />
      <mesh
        geometry={nodes.kiogame3_Material_0.geometry}
        material={materials.Material}
        position={[25.663, 69.823, -31.365]}
        rotation={[0, -0.392, 0]}
        scale={113.592}
      />
      <mesh
        geometry={nodes.Circle_Material018_0.geometry}
        material={materials['Material.018']}
        position={[-424.496, 191.695, 215.471]}
        rotation={[-Math.PI / 2, 0, -1.349]}
        scale={[47.111, 47.111, 70.976]}
      />
      <mesh
        geometry={nodes.earth_Cube001_rock_base_0.geometry}
        material={materials.rock_base}
        scale={36.358}
      />
      <mesh
        geometry={nodes.earth_Cube002_Material003_0.geometry}
        material={materials['Material.003']}
        scale={36.358}
      />
      <mesh
        geometry={nodes.earth_Cube003_Material004_0.geometry}
        material={materials['Material.004']}
        scale={36.358}
      />
      <mesh
        geometry={nodes.earth_Cube004_rock_base_0.geometry}
        material={materials.rock_base}
        scale={36.358}
      />
    </a.group>
  );
};

export default Island;




