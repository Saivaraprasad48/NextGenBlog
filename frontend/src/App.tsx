import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ReactNode } from"react"
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from "./pages/Blogs";
import { Publish } from './pages/Publish';


function App() {
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};
  
  interface ProtectedRouteProps {
  element: ReactNode;
  }
  
const ProtectedRoute = ({ element: Element, ...rest }: ProtectedRouteProps) => {
  return isAuthenticated() ? <Route {...rest} element={Element} /> : <Navigate to="/signin" />;
};

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Signin />} />
          <Route path="/blog/:id" element={<ProtectedRoute element={<Blog />} />} />
          <Route path="/blogs" element={<ProtectedRoute element={<Blogs />} />} />
          <Route path="/publish" element={<ProtectedRoute element={<Publish />} />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App