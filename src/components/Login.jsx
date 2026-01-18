import Header from "./Header";
import { useState } from "react";


const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

  return (
    <div>
        <Header />
 
         <div className="bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/797df41b-1129-4496-beb3-6fc2f29c59d3/web/IN-en-20260112-TRIFECTA-perspective_004732f9-7464-4a7c-940b-4a51c4f0f73f_small.jpg')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen w-full flex justify-center items-center">
         
            <form className="bg-black/75 p-16 rounded-lg flex flex-col gap-5 min-w-[300px]">
            <h1 className="text-white text-2xl font-bold">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                
                {!isSignInForm && (
                    <input 
                        type="text" 
                        placeholder="Name" 
                        className="p-3 rounded border-none bg-[#333] text-white text-base" 
                    />
                )}
                
                <input 
                    type="text" 
                    placeholder="Email or phone number" 
                    className="p-3 rounded border-none bg-[#333] text-white text-base" 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="p-3 rounded border-none bg-[#333] text-white text-base" 
                />
                <button 
                    type="submit" 
                    className="p-3 rounded border-none bg-[#e50914] text-white text-base font-bold cursor-pointer"
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="text-sm text-gray-500">
                    {isSignInForm ? (
                        <>New to Netflix? <span className="text-white cursor-pointer hover:underline" onClick={toggleSignInForm}>Sign Up</span></>
                    ) : (
                        <>Already have an account? <span className="text-white cursor-pointer hover:underline" onClick={toggleSignInForm}>Sign In</span></>
                    )}
                </p>
            </form>
        </div>
        
    </div>
  );
};

export default Login;