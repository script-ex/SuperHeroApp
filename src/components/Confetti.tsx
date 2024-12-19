import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetti = (props: { showConfetti: boolean }) => {
  const [windowsDimentions, setWindowsWidth] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectResize = () => {
    setWindowsWidth({ width: window.innerWidth, height: window.innerHeight });
  };
  useEffect(() => {
    window.addEventListener("resize", detectResize);
    return () => {
      window.removeEventListener("resize", detectResize);
    };
  }, [windowsDimentions]);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      {props.showConfetti && (
        <ReactConfetti
          width={windowsDimentions.width}
          height={windowsDimentions.height}
          tweenDuration={1000}
          recycle={false}
        />
      )}
    </div>
  );
};

export default Confetti;
