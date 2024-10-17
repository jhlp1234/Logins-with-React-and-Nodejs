import { Routes, Route} from "react-router-dom";
import Roots from "./routes/Roots.js";
import Regist from "./routes/Regist.js";
import Login from "./routes/Login.js";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Roots></Roots>}></Route>
      <Route path="/regist" element={<Regist></Regist>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
    </Routes>
  );
}

export default App;
