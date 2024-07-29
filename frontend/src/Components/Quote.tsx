
interface quote{
    quote:string;
}

function Quote({quote}:quote){

    return (
        <div className="bg-slate-300 flex justify-center items-center h-full w-full p-10 font-">
            <div className="w-[70%] font-bold text-2xl">
                {quote}
                <div className="text-xl font-semibold mt-5 mb-0">
                {`- Saumay Aggarwal`}
                <div className="font-semibold text-slate-600 ml-3 text-sm">Admin, BlogBreeze Inc</div>
                </div>
            </div>
            
        </div>
    )
}

export default Quote
