import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Stage, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';
import { RotateCcw, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

interface ProductViewerProps {
  modelUrl: string;
}

const Loader = () => {
  const { progress } = useProgress();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">{progress.toFixed(0)}% loaded</p>
    </div>
  );
};

const ModelLoader = ({ url }: { url: string }) => {
  // In a real implementation, this would load the actual GLB model
  // For this example, we'll show a placeholder object
  const mesh = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#4F46E5" />
    </mesh>
  );
};

const ProductViewer: React.FC<ProductViewerProps> = ({ modelUrl }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-lg overflow-hidden border border-gray-200 ${
        isFullscreen ? 'w-screen h-screen' : 'w-full aspect-square'
      }`}
    >
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}
      >
        <color attach="background" args={['#f8f9fa']} />
        <PresentationControls
          global
          zoom={zoom}
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

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white bg-opacity-80 rounded-full px-4 py-2 shadow-md">
        <button
          onClick={handleResetView}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Reset view"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut size={16} />
        </button>
        <div className="w-20 h-1 bg-gray-300 rounded-full">
          <div 
            className="h-full bg-primary-500 rounded-full"
            style={{ width: `${((zoom - 0.5) / 1.5) * 100}%` }}
          />
        </div>
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={handleFullscreen}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </div>
  );
};

export default ProductViewer;