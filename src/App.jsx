import { Quiz } from "./components/Quiz";
import { Statistic } from "./components/Statistic";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Quiz />} />
      <Route path="/stats" element={<Statistic />} />
    </Routes>
  );
};

export default App;