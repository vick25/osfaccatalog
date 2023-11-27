import React, { useReducer, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "./components/test/Test.css";
import Spinner from "./components/Spinner/Spinner";

// Components
import Header from './components/Header/Header';
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Footer from './components/Footer/Footer';
import Register from "./components/Register/Register";
import ManageProject from "./pages/Projects/ManageProject";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import FileExplorer from "./pages/FileExplorer/FileExplorer";
import CategorieList from "./pages/Category/CategorieList";
import InstitutionList from "./pages/Institution/InstitutionList";
import ThematicList from "./pages/Thematic/ThematicList";
import ExecutantList from "./pages/Executant/ExecutantList";
import Test from "./components/test/Test";
import Test1 from "./components/test/Test1";
// import DateDifference from "./components/test/DateDifference";
import CardList from "./components/test/CardList";
//Contexts
import DispatchContext from "./contexts/DispatchContext";
import StateContext from "./contexts/StateContext";
import LoadingContext from "./contexts/LoadingContext";

import Files from "./components/test/Files";
import Files1 from "./components/test/Files1";
import Files2 from "./components/test/Files2";
import Files3 from "./components/test/Files3";
// import Files1 from "./components/test/Files1";

const App = () => {
  const [loading, setLoading] = useState(false);

  //All initial state variables
  const initialState = {
    userFirstName: '',
    userLastName: '',
    userUsername: localStorage.getItem('theUserUsername'),
    userEmail: localStorage.getItem('theUserEmail'),
    userId: localStorage.getItem('theUserId'),
    userToken: localStorage.getItem('theUserToken'),
    userIsLoggedIn: localStorage.getItem('theUserUsername') ? true : false,
    projectMoreDetails: {},
    selectedThematics: [],
    isSelectedThematics: false,
    sort: "",
    searchQuery: ""
  }

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
      case 'PROJECT_MORE_DETAILS':
        return {
          ...state,
          projectMoreDetails: action.projectMoreDetails
        }
      case 'THEMATIC_PROJECTS':
        return {
          ...state,
          selectedThematics: action.selectedThematics,
          isSelectedThematics: action.isSelectedThematics
        }
      case 'NO_THEMATIC_PROJECTS':
        return {
          ...state,
          isSelectedThematics: false
        }
      case "SORT_BY_NAME":
        return {
          ...state,
          sort: action.payload
        };
      case "SEARCH":
        return {
          ...state,
          searchQuery: action.payload
        };
      case "CLEAR_FILTERS":
        return {
          ...state,
          sort: "",
          searchQuery: ""
        }
      // case 'NO_THEMATIC_PROJECTS':
      //   return {
      //     ...state,
      //     selectedThematics: [],
      //     isSelectedThematics: action.isSelectedThematics
      //   }

      default:
        return state;
    }
  }

  // Global state and dispatch variables
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
  }, [state.userIsLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

  /* TODO: Global state contexts}
     TODO: Global useReducer contexts} */
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Router>
          <Header />
          {loading && <Spinner />}
          <LoadingContext.Provider value={[loading, setLoading]}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/fileexplorer' element={<FileExplorer />} />
              <Route path="/manageproject" element={<ManageProject />} />
              <Route path="/projectdetail" element={<ProjectDetail />} />
              <Route path="/categories" element={<CategorieList />} />
              <Route path="/institutions" element={<InstitutionList />} />
              <Route path="/thematics" element={<ThematicList />} />
              <Route path="/executants" element={<ExecutantList />} />
              <Route path="/test" element={<Test />} />
              <Route path="/test1" element={<Test1 />} />
              {/* <Route path="/dd" element={<DateDifference />} /> */}
              <Route path="/cardlist" element={<CardList />} />
              <Route path="/files" element={<Files />} />
              <Route path="/files1" element={<Files1 />} />
              <Route path="/files2" element={<Files2 />} />
              <Route path="/files3" element={<Files3 />} />
              {/* <Route path="*" component={Error404/>}/> */}
            </Routes>
            <Footer />
          </LoadingContext.Provider>
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;