import "./index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { baseUrl } from './shared';
import Users from "./pages/Users";
import Employees from "./pages/Employees";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Header from "./components/Header";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definitions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound_404";
// import SidebarWithContentSeparator from "../components/SideBar";
/* <SidebarWithContentSeparator /> */

export const LoginContext = createContext();

export default function App() {

  useEffect(() => {
    function refreshTokens() {
      if (localStorage.refresh) {
        const url = baseUrl + 'api/token/refresh/';
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh: localStorage.refresh
          })
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // console.log(data);
            // console.log('Token Refreshed');
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setLoggedIn(true);
          })

      }
    }

    const min = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, min * 3)
  }, []);

  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

  // function changeLoggedIn(params) {
  //   setLoggedIn(false);
  //   if (params === false) {
  //     localStorage.clear();
  //   }
  // }

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path='/employees' element={<Employees />}></Route>
            <Route path='/users' element={<Users />}></Route>
            <Route path='/dictionary' element={<Dictionary />}></Route>
            <Route path='/dictionary/:search' element={<Definition />}></Route>
            <Route path='/customers' element={<Customers />}></Route>
            <Route path='/customers/:id' element={<Customer />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/404' element={<NotFound />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  )
}
