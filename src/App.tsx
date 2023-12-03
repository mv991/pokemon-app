import React,{useEffect,Suspense,lazy} from 'react';
import Navbar from './sections/Navbar';
import "./scss/index.scss"
import Footer from './sections/Footer';
import {Routes,Route,Navigate} from "react-router-dom"
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import {  useAppSelector } from "./app/hooks";
import { clearToasts, setUserStatus } from './app/slices/AppSlice';
import { useDispatch } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './utils/firebaseConfig';
import Loader from "./components/Loader";
const Search = lazy(() => import("./pages/Search"));
const MyList = lazy(() => import("./pages/MyList"));
const Compare = lazy(() => import("./pages/Compare"));
const Pokemon = lazy(() => import("./pages/Pokemon"));
function App() {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(firebaseAuth,(currentUser) => {
        if(currentUser) {
          dispatch(setUserStatus({email:currentUser.email}))
          console.log(currentUser)
        }
    })
  },[dispatch])
  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);
  return (
    <div className="main-container">
       <Suspense fallback={<Loader />}>
      <div className='app'>
      <Navbar/>
        <Routes>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/compare" element={<Compare/>}></Route>
          <Route path="/pokemon/:id" element={<Pokemon/>}></Route>
          <Route path="/list" element={<MyList/>}></Route>
           <Route path="*" element={<Navigate to="pokemon/1"/>}></Route> 
        </Routes>
        <Footer/>
        <ToastContainer />
      </div>
      </Suspense>
    
    </div>
  );
}

export default App;
