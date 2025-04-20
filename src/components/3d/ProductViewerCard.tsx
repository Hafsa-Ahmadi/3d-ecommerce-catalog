import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stage } from '@react-three/drei';
import { Loader } from 'lucide-react';

interface ProductViewerCardProps {
  modelUrl: string;
}

const ModelLoader = ({ url }: { url: string }) => {
  // In a real implementation, this would load the actual GLB model
  // For this example, we'll show a placeholder cube
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4F46E5" />
    </mesh>
  );
};

const ProductViewerCard: React.FC<ProductViewerCardProps> = ({ modelUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading time
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <Loader className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : (
        <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
          <color attach="background" args={['#f8f9fa']} />
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Stage environment="city" intensity={0.6}>
              <ModelLoader url={modelUrl} />
            </Stage>
          </PresentationControls>
          <OrbitControls enableZoom={false} makeDefault />
        </Canvas>
      )}
    </div>
  );
};

export default ProductViewerCard;