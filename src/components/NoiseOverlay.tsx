import { useEffect, useRef } from 'react';
import './NoiseOverlay.css';

function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Define tile size. 128x128 or 256x256 is enough for random noise.
    const size = 128;
    canvas.width = size;
    canvas.height = size;

    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    // Generate clean grayscale noise
    for (let i = 0; i < data.length; i += 4) {
      // Create a value between 0 and 255
      const val = Math.floor(Math.random() * 255);
      
      data[i] = val;     // R
      data[i + 1] = val; // G
      data[i + 2] = val; // B
      // Set alpha to a very low value so it's subtle but visible
      // 4 out of 255 is ~1.5% opacity. 
      data[i + 3] = 4; 
    }

    ctx.putImageData(imgData, 0, 0);

    const dataUrl = canvas.toDataURL('image/png');
    
    const overlay = document.getElementById('noise-overlay');
    if (overlay) {
      overlay.style.backgroundImage = `url(${dataUrl})`;
    }
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div id="noise-overlay" className="noise-overlay" aria-hidden="true" />
    </>
  );
}

export default NoiseOverlay;
