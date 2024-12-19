import { UnknownAction } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setBestMatchClear,
  setInitialData,
} from "../../redux/slices/QuestionsSlice";
import Slider from "../../components/Slider";
import Character from "../../components/Character";
import Confetti from "../../components/Confetti";
import { RootState } from "../../redux/store";
import HomeContent from "../../components/HomeContent";
import { fetchSuperheroes } from "../../redux/slices/SuperHerosSlice";
import Loader from "../../components/Loader";

const HomePage = () => {
  const dispatch = useDispatch();
  const refEle = useRef(null);
  const refCharecterElement = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const status = useSelector(
    (state: RootState) => state.superHerosSlice.status
  );
  const initState = useSelector(
    (state: RootState) => state.superHerosSlice.superheroes
  );

  useEffect(() => {
    dispatch(setBestMatchClear());
    dispatch(fetchSuperheroes() as unknown as UnknownAction);
  }, []);

  useEffect(() => {
    if (initState.length !== 0) {
      dispatch(setInitialData(initState));
    }
  }, [initState]);

  if (status === "loading") {
    return (
      <div>
        <div className="flex space-x-2 justify-center items-center bg-black h-screen dark:invert">
          <span className="sr-only">Loading...</span>
          <Loader />
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col justify-center items-center bg-white h-screen dark:invert">
        <div className="h-40 w-40  rounded-full ">
          <img src="src/assets/images/9318694.jpg" alt="Error" />
        </div>
        <h1 className="text-black">
          Something went Wrong, Please reload the app
        </h1>
      </div>
    );
  }

  return (
    <>
      <div
        className=" bg-cover "
        style={{
          backgroundImage: `url('src/assets/images/BG.jpg')`,
        }}
      >
        <div className="bg-transparent text-white">
          <HomeContent refElement={refEle} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-screen ">
        <Slider
          refEle={refEle}
          refCharecterElement={refCharecterElement}
          setShowConfetti={setShowConfetti}
        />
      </div>
      <div>
        <Confetti showConfetti={showConfetti} />
        <Character refCharecterElement={refCharecterElement} />
      </div>
    </>
  );
};

export default HomePage;
