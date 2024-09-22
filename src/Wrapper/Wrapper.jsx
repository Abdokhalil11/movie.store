import { useEffect, useRef, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import "./Wrapper.css";
function Wrapper({ children, controll, autoSlider }) {
  const carsouel = useRef();
  const [endSlide, setEndSlide] = useState(false);
  const [startSlide, setStartSlide] = useState(true);
  let start = 0;
  let isDragging = false,
    prevPageX,
    prevSrollLeft;

  // useEffect(() => {
  //   if (autoSlider) {
  //     setInterval(autoSlide, 200);
  //   }
  // }, []);

  const autoSlide = () => {
    // const step = carsouel.current.children[0].clientWidth + 14;
    const total = carsouel.current.scrollWidth - carsouel.current.clientWidth;
    carsouel.current.scrollLeft = start;
    if (start >= total) {
      start = -start;
    }
    start += 12;
  };
  const dragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const positionDiff = e.pageX - prevPageX;
    carsouel.current.scrollLeft = prevSrollLeft - positionDiff;
    checkSlide();
  };

  const startDragging = (e) => {
    isDragging = true;
    prevPageX = e.pageX;
    prevSrollLeft = carsouel.current.scrollLeft;
  };

  const EndDragging = () => {
    isDragging = false;
  };

  const moveRight = () => {
    const step = carsouel.current.children[0];
    carsouel.current.scrollLeft += step.clientWidth * 2 + 15;
    checkSlide();
  };

  const moveLeft = () => {
    const step = carsouel.current.children[0];
    carsouel.current.scrollLeft -= step.clientWidth * 2 + 15;
    checkSlide();
  };

  const checkSlide = () => {
    const width = carsouel.current.scrollWidth - carsouel.current.clientWidth;
    const left = carsouel.current.scrollLeft;
    width === left ? setEndSlide(true) : setEndSlide(false);
    left === 0 ? setStartSlide(true) : setStartSlide(false);
  };

  return (
    <>
      <div className="wrapper">
        {controll && (
          <RiArrowLeftSLine
            className="arrow left"
            size={30}
            onClick={moveLeft}
            style={{ display: startSlide ? "none" : "block" }}
          />
        )}
        <div
          className="carsouel"
          ref={carsouel}
          onMouseMove={dragging}
          onMouseDown={startDragging}
          onMouseUp={EndDragging}
          style={{ justifyContent: children?.length <= 3 && "center" }}
        >
          {children}
        </div>
        {controll && (
          <RiArrowRightSLine
            className="arrow right"
            size={30}
            onClick={moveRight}
            style={{ display: endSlide ? "none" : "block" }}
          />
        )}
      </div>
    </>
  );
}

export default Wrapper;
