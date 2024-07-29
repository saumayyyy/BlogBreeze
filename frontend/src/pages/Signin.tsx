import Quote from "../Components/Quote";
import AuthForm from "../Components/AuthForm";

function Signin(){

    const quote:string = `"Every story begins with a single thought. Sign in to share your voice,
     inspire others, and explore a world of ideas. Your journey of expression starts here."`;
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-grey-stone bg-cover bg-center">
            <div className="w-[80%] h-[80%] flex justify-between items-center">
                <div className="w-full h-full hidden lg:block">
                    <Quote quote={quote}/>
                </div>
                <AuthForm type="signin"/>
            </div>
        </div>
        
    )
}
export default Signin;