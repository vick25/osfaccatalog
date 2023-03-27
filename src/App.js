import React, { useReducer, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "./components/test/Test.css";

// Components
import Header from './components/Header/Header';
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Footer from './components/Footer/Footer';
import Register from "./components/Register/Register";
import CreateProject from "./pages/Projects/CreateProject";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import Listings from "./pages/Listings/Listings";
import Test from "./components/test/Test";

//Contexts
import DispatchContext from "./contexts/DispatchContext";
import StateContext from "./contexts/StateContext";
// import { useState } from "react";
// import axios from 'axios';

// const client = axios.create({
//   baseURL: 'http://127.0.0.1:8000'
// })

const App = () => {
  const initialState = {
    userFirstName: '',
    userLastName: '',
    userUsername: localStorage.getItem('theUserUsername'),
    userEmail: localStorage.getItem('theUserEmail'),
    userId: localStorage.getItem('theUserId'),
    userToken: localStorage.getItem('theUserToken'),
    userIsLoggedIn: localStorage.getItem('theUserUsername') ? true : false
  }

  // const [myInitValues, setMyInitValues] = useState(initialState);

  function reducer(state, action) {
    switch (action.type) {
      case 'CATCH_TOKEN':
        return {
          ...state,
          userToken: action.userTokenValue
        }
      case 'USER_SIGNS_IN':
        return {
          ...state,
          userUsername: action.usernameInfo,
          userEmail: action.emailInfo,
          userId: action.IdInfo,
          userIsLoggedIn: true
        }
      case 'USER_LOGOUT':
        return {
          ...state,
          userIsLoggedIn: false
        }

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.userIsLoggedIn) {
      localStorage.setItem('theUserUsername', state.userUsername);
      localStorage.setItem('theUserEmail', state.userEmail);
      localStorage.setItem('theUserId', state.userId);
      localStorage.setItem('theUserToken', state.userToken);
    } else {
      localStorage.removeItem('theUserUsername');
      localStorage.removeItem('theUserEmail');
      localStorage.removeItem('theUserId');
      localStorage.removeItem('theUserToken');
    }
  }, [state.userIsLoggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/listings' element={<Listings />} />
            <Route path="/CreateProject" element={<CreateProject />} />
            <Route path="/ProjectDetail" element={<ProjectDetail />} />
            <Route path="/test" element={<Test />} />
          </Routes>
          <Footer />
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
