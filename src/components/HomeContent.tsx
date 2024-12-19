import { Typography } from "@mui/material";
import { RefObject } from "react";

import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { motion } from "framer-motion";

const HomeContent = (props: { refElement: RefObject<HTMLDivElement> }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen  text-white">
      <div className="md:h-1/2 text-center mt-48">
        <Typography variant="h1" sx={{ fontSize: "5rem" }}>
          Welcome
        </Typography>
        <Typography variant="h3" sx={{ fontSize: "2rem" }}>
          Lets see which hero your are, or are you a villain?
        </Typography>
      </div>
      <div className=" md:h-1/2 flex flex-col justify-center items-center   text-white">
        <motion.button
          initial={{ y: 0 }}
          animate={{
            y: [-10, 10, -10],
            transition: { duration: 2, repeat: Infinity },
          }}
          onClick={() => {
            props.refElement.current!.scrollIntoView({
              behavior: "smooth",
            });
          }}
          // size="large"
          color="secondary"
          className=" flex flex-col justify-center items-center h-18 w-18"
        >
          <ArrowCircleDownIcon
            sx={{
              color: "white",
              backgroundColor: "none",
              height: "6rem",
              width: "6rem",
            }}
          />
          Let's Start
        </motion.button>
      </div>
    </div>
  );
};

export default HomeContent;
