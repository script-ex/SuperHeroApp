import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useAnimation, useInView } from "framer-motion";
import { useEffect, useState } from "react";
import questions from "../utils/questions.json";
import { motion } from "framer-motion";
import Stepper from "./Stepper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import card1
import { useDispatch } from "react-redux";
import {
  calculateFinalCracteristics,
  setAnswers,
} from "../redux/slices/QuestionsSlice";

const cards = [
  { id: 1, color: "bg-surface-light" },
  { id: 2, color: "bg-surface-light" },
  { id: 3, color: "bg-surface-light" },
  { id: 4, color: "bg-surface-light" },
  { id: 5, color: "bg-surface-light" },
];

const images = [
  "src/assets/images/Card1.jpg",
  "src/assets/images/Card-2.jpg",
  "src/assets/images/Card-5.jpg",
  "src/assets/images/Card-3.jpg",
  "src/assets/images/Card-4.jpg",
];

interface SliderProps {
  refEle: React.RefObject<any>;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
  refCharecterElement: React.RefObject<any>;
}

const Slider: React.FC<SliderProps> = (props) => {
  const dispatch = useDispatch();
  const inView = useInView(props.refEle, { once: true });
  const mainAnimateControl = useAnimation();
  const [currentStep, setCurrentStep] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [check, setCheck] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (inView) {
      mainAnimateControl.start("visible");
    }

    return () => {
      setSelectedValue("");
    };
  }, [inView]);

  const handleStepClickIncrease = () => {
    setCurrentStep((pre) => pre + 1);
    setCurrentQuestionIndex((pre) => pre + 1);
  };

  const handleStepClickDecrease = () => {
    setCurrentStep((pre) => pre - 1);
    setCurrentQuestionIndex((pre) => pre - 1);
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
    setCheck(false);
    setSelectedValue("");
  };

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
    setCheck(true);
    setSelectedValue("");
  };

  const handleRadioChange = (event: React.BaseSyntheticEvent) => {
    setSelectedValue(event.target.value);

    dispatch(
      setAnswers({
        index: currentQuestion[currentCardIndex],
        answer: event.target.value,
      })
    );
  };

  const currentQuestion = Object.keys(questions);
  const index = currentQuestion[currentQuestionIndex];
  const { question, options } = questions[index as keyof typeof questions];

  const rows = [];
  for (let i = 0; i < options.length; i += 2) {
    const rowOptions = options.slice(i, i + 2);
    rows.push(rowOptions);
  }
  return (
    <motion.div
      ref={props.refEle}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainAnimateControl}
      transition={{ duration: 2, delay: 0.5 }}
      className="bg-transparent text-white "
    >
      <div className="flex flex-row justify-between items-center  rounded-2xl mt-4">
        <div className="container flex flex-col justify-center items-center m-5 ">
          <div className="m-5">
            <Stepper currentStep={currentStep} />
          </div>

          <motion.div
            key={cards[currentCardIndex].id}
            initial={
              check ? { opacity: 0, x: "-50%" } : { opacity: 0, x: "70%" }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", stiffness: 100, duration: 2 }}
            className="flex flex-row md:flex col justify-between rounded-xl bg-base-100 shadow-xl shadow-gray-800"
            style={{ height: "400px", width: "100%" }}
          >
            <div
              className="rounded-xl"
              style={{ height: "100%", width: "100%" }}
            >
              <img
                className="object-cover rounded-xl"
                style={{ height: "100%", width: "80%", objectFit: "fill" }}
                src={images[currentQuestionIndex]}
                alt="Movie"
              />
            </div>

            <div className="card-body p-4 flex flex-col items-start justify-center">
              <h2 className="card-title text-2xl">Q: {question}</h2>

              <div className="flex row items-startcard-actions justify-end mt-10">
                <FormControl component="fieldset">
                  {rows.map((row, rowIndex) => (
                    <RadioGroup
                      key={rowIndex}
                      value={selectedValue}
                      onChange={handleRadioChange}
                      className="flex flex-row"
                    >
                      {row.map((option) => (
                        <FormControlLabel
                          className="text-white mr-4 mb-2"
                          key={option.value}
                          value={option.value}
                          control={<Radio color="primary" />}
                          label={<Typography>{option.label}</Typography>}
                        />
                      ))}
                    </RadioGroup>
                  ))}
                </FormControl>
              </div>
            </div>
          </motion.div>

          {isLoading ? (
            // <h1>Loading</h1>
            <CircularProgress />
          ) : (
            <div className="flex flex-row p-4 m-8">
              {currentStep !== 0 && (
                <div>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "none",
                    }}
                    onClick={() => {
                      handleStepClickDecrease();
                      prevCard();
                    }}
                  >
                    <ArrowBackIosIcon />
                  </Button>
                </div>
              )}
              {currentStep === 0 && (
                <div>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "none",
                    }}
                    onClick={() => {
                      handleStepClickIncrease();
                      nextCard();
                    }}
                    disabled={selectedValue === ""}
                  >
                    <ArrowForwardIosIcon />
                  </Button>
                </div>
              )}
              {currentStep !== 0 && currentStep < 4 && (
                <div>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "none",
                    }}
                    onClick={() => {
                      nextCard();
                      handleStepClickIncrease();
                    }}
                    disabled={selectedValue === ""}
                  >
                    <ArrowForwardIosIcon />
                  </Button>
                </div>
              )}
              {currentStep === 4 && (
                <div>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "none",
                    }}
                    onClick={() => {
                      setLoading(true);
                      dispatch(calculateFinalCracteristics());

                      setTimeout(() => {
                        props.setShowConfetti(true);
                        props.refCharecterElement.current.scrollIntoView({
                          behavior: "smooth",
                        });
                        setLoading(false);
                      }, 1000);
                      setTimeout(() => {
                        props.setShowConfetti(false);
                      }, 5000);
                    }}
                    disabled={selectedValue === ""}
                  >
                    <ArrowForwardIosIcon />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Slider;
