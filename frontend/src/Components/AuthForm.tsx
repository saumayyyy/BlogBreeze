import { signUpValidation } from "@2781xsaumayy/blog-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";

interface formType{
    type:string;
}

function AuthForm({type}:formType){
    console.log("Control reaches here");
    const navigate = useNavigate();
    const [postInput,setPostInput] = useState<signUpValidation>({
        name:"",
        email:"",
        password:""
    })

    console.log("Validation done");
    
    async function sendRequest(){
        try{
            console.log("sending request");
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInput);
            const jwt = response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        }
        catch(e){
            console.log("some error while sending request or in request")
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center bg-white">
            <div className="flex flex-col w-[70%] items-center">
                <div className="text-3xl font-bold">Create an account</div>
                <div className="text-slate-400">{type==="signup"?"Already have an account? ": "Don't have a account? "}
                    <Link to={type==="signup"?"/signin": "/signup"} className="text-blue-500 font-semibold underline transition-all
                     ">{type==="signup"?"Log In": "Sign Up"}</Link>
                </div>
                <div className="w-[70%]">
                    <div className={type==="signup"?"block":"hidden"}>
                        <LabelInput label="Name" placeholder="Enter Your Name" type = {"text"} onChange={(e)=>{
                            setPostInput({
                                ...postInput,
                                name:e.target.value
                            });
                        }}/>
                    </div>
                    
                    <LabelInput label="Email" placeholder="saumay1234@gmail.com" type = {"text"} onChange={(e)=>{
                        setPostInput({
                            ...postInput,
                            email:e.target.value
                        });
                    }}/>
                    <LabelInput label="Password" placeholder="" type = {"password"} onChange={(e)=>{
                        setPostInput({
                            ...postInput,
                            password:e.target.value
                        });
                    }}/>
                </div>
                <div className="lg:w-[70%] md:w-[60%] sm:w-[50%]">
                <button onClick={sendRequest} className="relative h-[40px] lg:h-[50px] inline-flex items-center justify-center w-full mt-7 mb-2 me-2 overflow-hidden 
                text-xl font-bold rounded-lg group bg-gradient-to-br
                 from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500
                  hover:text-white dark:text-white focus:ring-4 focus:outline-none
                   focus:ring-purple-200 dark:focus:ring-purple-800 hover:scale-105">
                    {type==="signup"?"Sign Up": "Log In"}
                </button>
                </div>
            </div>

        </div>
    )
}
export default AuthForm;

interface inputType {
    label:string;
    placeholder:string;
    onChange:(e : ChangeEvent<HTMLInputElement>)=>void;
    type:string;
}

function LabelInput({label,placeholder,onChange,type}:inputType){
    return (
        <div className="mt-5">
            <label className="block mb-2 text-md font-medium text-gray-500">{label}</label>
            <input onChange={onChange} type={type} className="bg-gray-50 border border-gray-300 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-100 dark:border-gray-600
             dark:placeholder-gray-400 text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
             placeholder={placeholder} required/>
        </div>
    )
}
