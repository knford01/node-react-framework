import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Header from "./components/Header";
// import SidebarWithContentSeparator from "../components/SideBar";

export default function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/employees' element={<Employees />}></Route>
          <Route path='/customers' element={<Customers />}></Route>
        </Routes>
      </Header>
    </BrowserRouter>
  )
}
