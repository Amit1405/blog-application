import {Navigate,Route,Routes} from 'react-router-dom';
import './App.css';
import AddBlog from './Components/AddBlog/Write';
import Home from './Components/Home/Home';
import Blogs from './Components/MyBlogs/Blogs';
import Navbar from './Components/Navigation/Navigation';
import Footer from './Components/Footer/Footer';
import NotFound from './Components/NotFound/404';
import ViewBlog from './Components/ViewBlog/ViewBlog';
import Login from './Components/Login/Login';
import Logout from './Components/Login/Logout';
import Register from './Components/Register/Register';
import {useState} from 'react';
import {AuthProvider, useAuth} from './utills/AuthContext';

const PrivateRoute=({children}) => {
  const { isLoggedIn } = useAuth();
  const isAuthenticated=isLoggedIn
  return isAuthenticated? children:<Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
          />
          <Route
            exact
            path="/login"
            element={<Login />}
          />
          <Route
            exact
            path="/logout"
            element={<Logout />}
          />
          <Route
            exact
            path="/register"
            element={<Register />}
          />
          <Route
            exact
            path="*"
            element={<NotFound />}
          />
          <Route
            exact
            path="/my-blogs"
            element={<PrivateRoute><Blogs /></PrivateRoute>}
          />
          <Route
            exact
            path="/blog/:id"
            element={<ViewBlog />}
          />
          <Route
            exact
            path="/write"
            element={<PrivateRoute><AddBlog /></PrivateRoute>}
          />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
