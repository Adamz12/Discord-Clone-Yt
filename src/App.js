import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hero from "./Components/Hero";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Header />
                <Hero />
              </>
            }
          ></Route>
          <Route
            path="/channels"
            exact
            element={
              <>
                <Home />
              </>
            }
          ></Route>
          <Route
            path="/channels/:id"
            exact
            element={
              <>
                <Home />
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
