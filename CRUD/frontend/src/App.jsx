import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import CreateCar from "./pages/CreateCar/CreateCar";


function MyComponent() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCar />} />
      </Routes>
    </>
  );
}

export default MyComponent;
