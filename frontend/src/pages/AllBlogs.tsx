import Appbar from "../Components/Appbar";
import {BlogCard} from "../Components/BlogCard";
import { useBlogs } from "../Hooks";
import { BlogSkeleton } from "../Components/BlogSkeleton";

function AllBlogs(){
    const {loading,blogs} = useBlogs();
    if(loading){
        return (
            <div className="bg-grey-stone bg-cover bg-center">
            <Appbar /> 
            <div  className="flex justify-center w-screen">
                <div className="w-[70%] flex flex-col items-center bg-white mt-10">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
        )
    }

    return(
        <div className="flex flex-col gap-5 justify-between bg-grey-stone bg-cover bg-center overflow-hidden">
            <Appbar/>
            <div className="w-screen flex justify-center items-center ml-10">
                <div className="flex justify-center items-center w-[80%] flex-col ml-10">
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
                </div>
            </div>
        </div>
    )
}
export default AllBlogs;
