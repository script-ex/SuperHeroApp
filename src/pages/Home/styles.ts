import { makeStyles } from "@mui/material/styles";

const useCommonStyles = makeStyles(() => ({
  t1: {
    position: "absolute",
    top: "30%",
    left: "30%",
    transform: "translate(-50%, -50%)",
  },
  t2: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  container: {
    margin: "0 auto",
    padding: "1rem",
    maxWidth: "1200px",
  },
  // Add more common styles as needed
}));

export default useCommonStyles;
