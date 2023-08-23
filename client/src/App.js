
import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import About from "./views/About";
import Home from "./views/Home";
import Leanding from "./views/Leanding";
import PageNotFound from "./views/PageNotFound";
import Tasks from "./views/Tasks";
import ConfirmedUser from './components/ConfirmedUser';
import Nav from "./components/Nav";
import ForgetPasswordOne from './components/ForgetPasswordOne';
import ResetPasswordTwo from "./components/ResetPasswordTwo";
import { saveUser } from './redux/actions';
import axios from "axios";

const desarrolloApp = "http://localhost:3001";
axios.defaults.baseURL = desarrolloApp;


function App() {

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    if (user) {
      const userParseado = JSON.parse(user);
      if (userParseado.length != 0) {
        dispatch(saveUser(userParseado));
      }
    }
  }, []);

  const ViewMenu = () => {
    switch (pathname) {
      case "/": return true;
      case "/login": return false;
      case "/about": return true;
      case "/task": return true;
      case '/user/confirmar/:token': return false;
      case "/reset_password_one": return false
      case "/reset_password_two/:token": return false
      case "*": return false;
      default: return false;
    }
  }
  return (
    <div className="App">
      {ViewMenu() && <Nav />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Leanding />} />
        <Route path='/about' element={<About />} />
        <Route path='/task' element={<Tasks />} />
        <Route path='/user/confirmar/:token' element={<ConfirmedUser />} />
        <Route path='/reset_password_one' element={<ForgetPasswordOne />} />
        <Route path='/reset_password_two/:token' element={<ResetPasswordTwo />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </div>
  );
}

export default App;
