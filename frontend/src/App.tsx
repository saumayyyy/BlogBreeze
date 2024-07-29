import { BrowserRouter,Route,Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import AllBlogs from "./pages/AllBlogs";
import { Publish } from "./pages/Publish";


function App(){



  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/blog/:id" element={<Blog/>}/>
          <Route path="/blogs" element={<AllBlogs/>}/>
          <Route path="/publish" element={<Publish/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;