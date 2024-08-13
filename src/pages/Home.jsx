import { useEffect, useRef, useState ,Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/island'; 
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import { Plane } from '@react-three/drei';
import Homeinfo from '../components/Homeinfo';
import sakura from "../assets/sakura.mp3";
import { soundoff, soundon } from '../assets/icons';

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);
  

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.45, 0.45, 0.45];
      screenPosition = [0, -112.5, -150]; // Increase the distance for smaller screens
    } else {
      screenScale = [0.57, 0.57, 0.57];
      screenPosition = [0, -88.5, -150]; // Increase the distance for larger screens
    }
    return [screenScale, screenPosition, rotation];
  }
  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
      {currentStage && <Homeinfo currentStage={currentStage} />}
      </div>
      <Canvas 
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ background: '#E4F298' }} 
        camera={{ 
          near: 0.5, 
          far: 10000, 
          position: [0, 0, 699], // Increase camera distance
          fov: 45 // Adjust the field of view
        }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[10,1,1]} intensity={2} />
          <ambientLight intensity={0.7} />
          <pointLight/>
          <spotLight/>
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>
          <Bird/>
          
          <Island
            position={islandPosition} 
            scale={islandScale} // Use adjusted scale
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage} 
          />
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain'
        />
      </div>

    </section>
  )
}

export default Home;


