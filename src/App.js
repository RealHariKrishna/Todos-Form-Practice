import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Form from "./components/Form";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Form />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
