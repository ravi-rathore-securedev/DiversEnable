import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import { Joblist } from './pages/Joblist';
import AddJob from './components/AddJob';
import AddScheme from './components/AddScheme';
import AddScholarship from './components/AddScholarship';
import { Schemelist } from './pages/SchemeList';
import { Scholarlist } from './pages/ScholarList';
import {JobId }from './components/JobId';
import { ScholarId } from './components/ScholarId';
import { SchemeId } from './components/SchemeId';
import { MoreDetails } from './components/MoreDetails';
import UpdateDetails from './components/UpdateDetails';
import { ViewDetails } from './components/ViewDetails';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route path='/projects' element={<Projects />} />
        
        <Route path='/joblist' element={<Joblist />} />
        <Route path='/job/:jobId' element={<JobId />} />
        
        <Route path='/schemelist' element={<Schemelist />} />
        <Route path='/govt/:govtId' element={<SchemeId />} />

        <Route path='/scholarlist' element={<Scholarlist />} />
        <Route path='/scholar/:scholarId' element={<ScholarId />} />

        <Route path='/moredetails' element={<MoreDetails />} />
        <Route path='/viewdetails/:userId' element={<ViewDetails />} />
     <Route path='/viewdetails/:userId/updateDetails/:userId' element={<UpdateDetails />} />

        <Route path='/addjob' element={<AddJob />} />
        <Route path='/addscheme' element={<AddScheme />} />
        <Route path='/addscholar' element={<AddScholarship />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
