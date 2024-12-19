import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home";
import BestMatch from "./pages/BestMatch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/best-match" element={<BestMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
