import Quote from "../Components/Quote";
import AuthForm from "../Components/AuthForm";

function Signup(){

    const quote:string = `"Unleash your creativity and connect with others. 
    Join our blogging community and let your words inspire the world!"`;
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-grey-stone bg-cover bg-center">
            <div className="w-[80%] h-[80%] flex justify-between items-center">
                <AuthForm type="signup"/>
                <div className="w-full h-full hidden lg:block">
                    <Quote quote={quote}/>
                </div>
            </div>
        </div>
    )
}
export default Signup;