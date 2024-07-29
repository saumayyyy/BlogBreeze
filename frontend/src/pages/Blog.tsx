import { useParams } from "react-router-dom";
import Appbar from "../Components/Appbar";
import { Spinner } from "../Components/Spinner";
import { useBlog } from "../Hooks"
import { FullBlog } from "../Components/FullBlog";

function Blog(){

    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div className="w-screen h-screen bg-grey-stone bg-cover bg-center flex flex-col relative">
            <div className="absolute top-0 w-screen">
                <Appbar/>
            </div>
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner/>
                </div>
            </div>
        </div>
    }

    return (
        <div className="w-screen h-fit bg-grey-stone bg-cover bg-center flex flex-col relative">
            <div className="absolute top-0 w-screen">
                <Appbar/>
            </div>
            <div className="w-[80%] h-fit bg-white mb-10 mx-auto mt-20">
                <FullBlog blog={blog} />
            </div>
             
        </div>
    )

}
export default Blog