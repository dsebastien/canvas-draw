import React,{useRef, useEffect, useState} from 'react';
import './App.css';

function App() {

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasReady = false;

  useEffect(() => {
    if(canvasReady) {
      return;
    }

    const canvas = canvasRef.current;

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d");
    ctx.scale(2,2);
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    contextRef.current = ctx;
  }, []);

  const startDrawing = ({nativeEvent}) => {
    const { offsetX, offsetY} = nativeEvent;

    contextRef.current.beginPath(); // commence le dessin
    contextRef.current.moveTo(offsetX, offsetY); // on déplace vers la position de la souris
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    contextRef.current.closePath(); // on arrête le dessin
    setIsDrawing(false);
  };

  const draw = ({nativeEvent}) => {
    if(!isDrawing) {
      return;
    }

    const { offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY); // on va dessiner une ligne jusqu'à la position actuelle de la souris
    contextRef.current.stroke(); // on dessine
  };

  return (
    <canvas
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        ref={canvasRef}
    ></canvas>
  );
}

export default App;
