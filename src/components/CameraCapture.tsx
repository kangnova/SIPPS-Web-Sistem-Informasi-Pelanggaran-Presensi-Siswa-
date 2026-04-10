import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CameraCaptureProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => setImgSrc(null);

  const confirm = () => {
    if (imgSrc) {
      onCapture(imgSrc);
      onClose();
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment" // Use back camera on mobile
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-lg aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 shadow-2xl">
        <AnimatePresence mode="wait">
          {!imgSrc ? (
            <motion.div 
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full"
            >
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-white/20 pointer-events-none rounded-2xl m-8" />
            </motion.div>
          ) : (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <img src={imgSrc} alt="Capture" className="w-full h-full object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-6">
        {!imgSrc ? (
          <>
            <button 
              onClick={onClose}
              className="w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
            <button 
              onClick={capture}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-slate-300 active:scale-90 transition-transform"
            >
              <div className="w-16 h-16 bg-white border-2 border-slate-900 rounded-full" />
            </button>
            <div className="w-14 h-14" /> {/* Spacer */}
          </>
        ) : (
          <>
            <button 
              onClick={retake}
              className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            <button 
              onClick={confirm}
              className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-900/40 active:scale-95 transition-transform"
            >
              <Check className="w-10 h-10" />
            </button>
            <button 
              onClick={onClose}
              className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      
      <p className="mt-4 text-white/50 text-sm font-medium">
        {!imgSrc ? "Posisikan pelanggaran di dalam bingkai" : "Gunakan foto ini?"}
      </p>
    </div>
  );
};

export default CameraCapture;
