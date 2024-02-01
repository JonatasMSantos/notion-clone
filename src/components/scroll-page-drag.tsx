"use client";

import React, { useRef, useState } from "react";

type DivElement = Element & {
  offsetLeft: number;
  offsetTop: number;
};

type ExtendedEHTMLDivElement = HTMLDivElement & { children: DivElement[] };

export const ScrollPageOnDrag = ({
  children,
  innerRef,
}: {
  innerRef: any;
  children: React.ReactNode;
}) => {
  const ourRef = useRef<ExtendedEHTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const [isScrolling, setIsScrolling] = useState(false);
  const handleDragStart = async (e: any) => {
    if (!ourRef.current) return;
    const slider = ourRef.current.children[0];

    const startX = e.pageX - slider.offsetLeft;
    const startY = e.pageY - slider.offsetTop;
    const scrollLeft = slider.scrollLeft;
    const scrollTop = slider.scrollTop;
    mouseCoords.current = { startX, startY, scrollLeft, scrollTop };
    setIsMouseDown(true);
    document.body.style.cursor = "grabbing";
  };
  const handleDragEnd = () => {
    setIsMouseDown(false);
    if (!ourRef.current) return;
    document.body.style.cursor = "default";
  };
  const handleDrag = (e: any) => {
    if (!isMouseDown || !ourRef.current) return;
    e.preventDefault();
    const slider = ourRef.current.children[0];
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY - slider.offsetTop;
    const walkX = (x - mouseCoords.current.startX) * 1.5;
    const walkY = (y - mouseCoords.current.startY) * 1.5;
    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    slider.scrollTop = mouseCoords.current.scrollTop - walkY;
  };

  return (
    <div
      ref={ourRef}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseMove={handleDrag}
      className={"flex gap-x-3 h-full overflow-x-hidden overflow-y-hidden"}
    >
      {children}
    </div>
  );
};
