import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

const Board = () => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { size, color } = useSelector((state) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const changeConfig = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    changeConfig();
  }, [size, color]);
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      shouldDraw.current = true;
      context.beginPath();
      context.moveTo(x, y);
    };
    const handlemousedown = (e) => {
      beginPath(e.clientX, e.clientY);
    };
    const drawLine = (x,y)=>{
      if (!shouldDraw.current) return;
      context.lineTo(x,y);
      context.stroke();

    }
    const handlemousemove = (e) => {
      drawLine(e.clientX, e.clientY);
    };
    const handlemouseup = (e) => {
      shouldDraw.current = false;
    };

    canvas.addEventListener("mousedown", handlemousedown);
    canvas.addEventListener("mousemove", handlemousemove);
    canvas.addEventListener("mouseup", handlemouseup);
    return () => {
      canvas.removeEventListener("mousedown", handlemousedown);
      canvas.removeEventListener("mousemove", handlemousemove);
      canvas.removeEventListener("mouseup", handlemouseup);
    };
  }, []);

  console.log(size, color);
  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
