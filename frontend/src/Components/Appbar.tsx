import { Avatar } from "./BlogCard"
import blogbreeze from "../Assets/blogbreeze-high-resolution-logo.png"
import { Link, useNavigate } from "react-router-dom"

function Appbar(){
    
    const navigate = useNavigate();

    return (
        <div className="border-b-2 border-purple-700 flex justify-between px-20 items-center bg-white">
            <Link to={"/blogs"}>
                <img src={`${blogbreeze}`} alt="BlogBreeze" className="h-[50px] w-[100px] m-1"/>
            </Link>
            <div className="text-2xl font-bold font-serif uppercase text-purple-600 border-l border-r mr-10 px-5">
                {"Dive into a World of Words."}
            </div>
            
            <div className="flex items-center justify-center gap-10 w-[20%] h-full">
                <div>
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800
                    focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg py-1 px-4
                     me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-600
                    dark:focus:ring-green-800 mt-2 ml-10 mr-10" onClick={()=>navigate("/publish")}>New</button>
                </div>
                <div>
                    <Avatar authorName="Saumay"/>
                </div>
            </div>

        </div>
    )

}
export default Appbar