import { Button } from "@mui/material";
import { useAnimation, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RootState } from "../redux/store";
import Loader from "./Loader";

const Character = ({
  refCharecterElement,
}: {
  refCharecterElement: React.RefObject<any>;
}) => {
  const bestmatch = useSelector(
    (state: RootState) => state.questionsSlice.bestMatch
  );
  const inView = useInView(refCharecterElement, { once: true });
  const mainAnimateControl = useAnimation();
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      mainAnimateControl.start("visible");
    }
  }, [inView, mainAnimateControl]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: "-100%" }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ type: "spring", stiffness: 150, duration: 2 }}
      ref={refCharecterElement}
      className="md:w-1/2 mx-auto flex bg-cover flex-row justify-center items-center rounded-xl mt-4 my-20"
    >
      {bestmatch && (
        <div className="flex flex-col items-center p-4 m-7 rounded-xl shadow-lg">
          {imageLoading && (
            <div className="flex items-center justify-center w-full h-full">
              <Loader />
            </div>
          )}
          <img
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? "none" : "block" }}
            src={bestmatch.image.url}
            alt={bestmatch.name}
            className="rounded-sm w-100 h-100 mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">{bestmatch.name}</h1>
          <div className="flex flex-col items-center"></div>
          <Button
            onClick={() => {
              navigate("/best-match");
            }}
          >
            {" "}
            See full profile
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default Character;
