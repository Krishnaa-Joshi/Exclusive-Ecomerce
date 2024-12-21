import Button from "@/component/Button/Button";

function Session(){
    return(
        <div className="bg-[#50514F] h-52 absolute z-50 flex justify-center flex-col rounded-md w-96 items-center left-[40%] top-1/2">
            <h1 className="text-xl p-5 font-semibold ">Your Session has been Expire</h1>
            <div className="w-full flex justify-center">
                <Button title="Sign Up" width="w-28" rounded="rounded-sm"/>
            </div>
        </div>
    )
}

export default Session;