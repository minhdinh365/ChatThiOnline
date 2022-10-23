import HomePage from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/chat" element={<HomePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
