
import './App.css'
import PlayerLayout from './layouts/PlayerLayout'
import {Routes, Route} from "react-router-dom";
import Home from './pages/home/Home';
import Search from './pages/search/Search';
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup';
import ProfileContainer from './components/organims/ProfileContainer';
import EmailVerification from './pages/auth/emailVerification/EmailVerification';
import ContactUs from './pages/Contact';
import AboutUs from './pages/About';
import Denied from './pages/Denied';
import NotFound from './pages/NotFound';
import RequireAuth from './pages/auth/requireAuth/RequireAuth';
import AdminPage from './pages/admin/Admin';
import AlbumPage from './pages/album/AlbumPage';



function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<PlayerLayout><Home/></PlayerLayout>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/verify-email' element={<EmailVerification/>}/>
        <Route path='/search' element={<PlayerLayout><Search/></PlayerLayout>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path='/denied' element={<Denied/>}/>
        <Route path='/album/:albumId' element={<PlayerLayout><AlbumPage/></PlayerLayout>}/>
        <Route path="*" element={<NotFound/>}/>


        
          <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
            <Route path='/admin' element={<AdminPage/>}/>
          </Route>


          
          <Route element={<RequireAuth allowedRoles={['ADMIN','USER']}/>}>
            <Route path='/profile' element={<PlayerLayout><ProfileContainer/></PlayerLayout>}/>
          
          
          </Route>



      
      </Routes>
    </>
  )
}

export default App
