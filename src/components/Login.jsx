import Header from "./Header";
import { useState } from "react";
import { checkValidation } from "../utils/validate";
import { useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Name validation for Sign Up form
        if (!isSignInForm) {
            const name = nameRef.current.value;
            if (!name.trim()) {
                setError("Name is required");
                return;
            }
        }

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const validationError = checkValidation(email, password);

        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            if (isSignInForm) {
                // Sign In
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                
                // Extract user data
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                };
                
                // Dispatch to Redux store
                dispatch(addUser(userData));
                
                // Navigate to browse page
                navigate("/browse");
            } else {
                // Sign Up
                const name = nameRef.current.value;
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                
                // Update the user's display name
                await updateProfile(userCredential.user, {
                    displayName: name
                });
                
                const user = userCredential.user;
                
                // Extract user data
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                };
                
                // Dispatch to Redux store
                dispatch(addUser(userData));
                
                // Navigate to browse page
                navigate("/browse");
            }
        } catch (error) {
            // Handle Firebase errors
            let errorMessage = "An error occurred. Please try again.";
            
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "This email is already registered. Please sign in instead.";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email address.";
                    break;
                case "auth/operation-not-allowed":
                    errorMessage = "Email/password accounts are not enabled.";
                    break;
                case "auth/weak-password":
                    errorMessage = "Password should be at least 6 characters.";
                    break;
                case "auth/user-disabled":
                    errorMessage = "This account has been disabled.";
                    break;
                case "auth/user-not-found":
                    errorMessage = "No account found with this email.";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Incorrect password.";
                    break;
                case "auth/too-many-requests":
                    errorMessage = "Too many failed attempts. Please try again later.";
                    break;
                default:
                    errorMessage = error.message || errorMessage;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };


  return (
    <div className="min-h-screen">
        <Header />
        
        {/* Educational Banner */}
        <div className="fixed top-16 left-0 right-0 bg-yellow-500/95 text-black text-center py-2 text-xs font-medium z-50 backdrop-blur-sm">
            <p>⚠️ Educational Demo - GPTFlix is a demo project for educational purposes only.</p>
        </div>
 
        {/* Custom Background with gradient and pattern */}
        <div className="bg-gradient-to-br from-purple-950 via-black to-indigo-950 min-h-screen w-full flex justify-center items-center relative overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
         
            <form onSubmit={handleSubmit} className="bg-black/80 backdrop-blur-md p-12 rounded-2xl flex flex-col gap-6 min-w-[420px] border border-purple-500/20 shadow-2xl shadow-purple-900/30 relative z-10">
                <div className="text-center mb-2">
                    <h1 className="text-white text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        {isSignInForm ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-gray-400 text-sm">Sign in to GPTFlix</p>
                </div>
                
                {!isSignInForm && (
                    <input 
                        ref={nameRef}
                        type="text" 
                        placeholder="Full Name" 
                        className="p-4 rounded-lg border border-gray-700 bg-gray-900/50 text-white text-base placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all" 
                    />
                )}
                
                <input 
                    ref={emailRef}
                    type="text" 
                    placeholder="Email or phone number" 
                    className="p-4 rounded-lg border border-gray-700 bg-gray-900/50 text-white text-base placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all" 
                />
                <input 
                    ref={passwordRef}
                    type="password" 
                    placeholder="Password" 
                    className="p-4 rounded-lg border border-gray-700 bg-gray-900/50 text-white text-base placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all" 
                />
                {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="p-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-base font-bold cursor-pointer transition-all shadow-lg shadow-purple-900/50 hover:shadow-purple-900/70 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? "Processing..." : isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="text-sm text-gray-400 text-center">
                    {isSignInForm ? (
                        <>New to GPTFlix? <span className="text-purple-400 cursor-pointer hover:text-purple-300 hover:underline font-medium" onClick={toggleSignInForm}>Sign Up</span></>
                    ) : (
                        <>Already have an account? <span className="text-purple-400 cursor-pointer hover:text-purple-300 hover:underline font-medium" onClick={toggleSignInForm}>Sign In</span></>
                    )}
                </p>
            </form>
        </div>
    </div>
  );
};

export default Login;