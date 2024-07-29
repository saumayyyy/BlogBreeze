import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


interface BlogCardInput{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    id:number;
}


export function BlogCard({authorName,title,content,publishedDate,id}:BlogCardInput){


    return(
        <Link to={`/blog/${id}`}>
            <div className="flex flex-col gap-2 w-[90%] bg-white p-5">
                <div className="flex items-center mt-2 ml-2">
                    <Avatar authorName={authorName}/>
                    <div className="text-lg font-semibold ml-2">{authorName}</div>
                    <span className="text-slate-400 ml-2 mr-1">{"|"}</span>
                    <div className="text-sm mt-1  text-gray-500">{publishedDate}</div>
                </div>
                <div className="text-2xl font-bold ">
                    {title}
                </div>
                <div className="text-sm text-slate-700">
                    {content.slice(0,200)}
                    {content.length >200 ? "...":""}
                </div>

                <div className="text-slate-400 text-xs">
                    {Math.ceil(content.length/100) + " minute(s) read"} 
                </div>

                <div className="h-[1px] w-full bg-slate-300"></div>
                
            </div>
        </Link>
        
    )

}



interface avatarName{
    authorName:string;
}

 export function Avatar({authorName}:avatarName){
    const bg_color = ["bg-purple-200","bg-pink-300","bg-red-200","bg-orange-300","bg-blue-200","bg-green-300"];
    const [color,setColor] = useState<string>("bg-gray-200");
    useEffect(()=>{
        const num = Math.floor(Math.random() * bg_color.length);
        setColor(bg_color[num]);
    },[])

    return (
        <div className={`relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full ${color}`}>
            <span className="font-medium text-gray-800">{authorName.trim()[0]}</span>
        </div>
    )
} 