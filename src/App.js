import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Header from "./components/Header";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definitions";
import NotFound from "./pages/NotFound_404";
// import SidebarWithContentSeparator from "../components/SideBar";
{/* <SidebarWithContentSeparator /> */ }

export default function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/employees' element={<Employees />}></Route>
          <Route path='/dictionary' element={<Dictionary />}></Route>
          <Route path='/dictionary/:search' element={<Definition />}></Route>
          <Route path='/customers' element={<Customers />}></Route>
          <Route path='/404' element={<NotFound />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Header>
    </BrowserRouter>
  )
}
