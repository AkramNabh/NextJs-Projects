import { MENU_ITEMS } from "@/constants/Contstants";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { menuItemClick, actionMenuClick } from "@/slice/menuSlice";
import { current } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const Board = () => {
  const canvasRef = useRef(null);
  const shouldDraw = useRef(false);
  const dispatch = useDispatch();
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
  const drawHis = useRef([]);
  const pointer = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const changeconfig = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };

    changeconfig();
  }, [color, size]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem == MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.png";
      anchor.click();
    } else if (
      actionMenuItem == MENU_ITEMS.UNDO ||
      actionMenuItem == MENU_ITEMS.REDO
    ) {
      if (drawHis.current.length != 0) {
        if (pointer.current > 0 && actionMenuItem == MENU_ITEMS.UNDO) {
          pointer.current -= 1;
        }
        if (
          pointer.current < drawHis.current.length - 1 &&
          actionMenuItem == MENU_ITEMS.REDO
        ) {
          pointer.current += 1;
        }
        const imageData = drawHis.current[pointer.current];
        context.putImageData(imageData, 0, 0);
      } else {
        toast.error("something wrong happened !");
      }
    }
    dispatch(actionMenuClick(null));
  }, [actionMenuItem, dispatch]);
  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //when mounting
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginThePath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };

    const drawTheLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseDown = (e) => {
      shouldDraw.current = true;
      beginThePath(e.clientX, e.clientY);
    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;
      drawTheLine(e.clientX, e.clientY);
    };
    const handleMouseUp = (e) => {
      shouldDraw.current = false;
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHis.current.push(imageData);
      pointer.current = drawHis.current.length - 1;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return <canvas ref={canvasRef}></canvas>;
};

export default Board;
