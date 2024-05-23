import { MENU_ITEMS } from "@/constant";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { menuItemClick, actionItemClick } from "@/slice/menuSlice";

const Board = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const actionMenuItem = useSelector((state) => state.menu.actionMenuItem);
  const { size, color } = useSelector((state) => state.toolbox[activeMenuItem]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const ancor = document.createElement("a");
      ancor.href = URL;
      ancor.download = "sketch.jpg";
      ancor.click();
    }else if(actionMenuItem===MENU_ITEMS.UNDO || actionMenuItem===MENU_ITEMS.REDO){
      if(historyPointer.current>0 && actionMenuItem === MENU_ITEMS.UNDO){
        historyPointer.current-=1;
      }
      if(historyPointer.current<drawHistory.current.length-1 && actionMenuItem === MENU_ITEMS.REDO){
        historyPointer.current+=1;
      }
      const imageData = drawHistory.current[historyPointer.current];
      context.putImageData(imageData,0,0);
      

    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem]);

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
    const drawLine = (x, y) => {
      if (!shouldDraw.current) return;
      context.lineTo(x, y);
      context.stroke();
    };
    const handlemousemove = (e) => {
      drawLine(e.clientX, e.clientY);
    };
    const handlemouseup = (e) => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0,0,canvas.width,canvas.height);
      drawHistory.current.push(imageData);
      historyPointer.current = drawHistory.current.length-1;

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
