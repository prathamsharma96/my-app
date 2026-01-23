import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user.user);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful
                navigate("/");
            })
            .catch((error) => {
                // An error happened
                console.error("Error signing out:", error);
            });
    };

    return (
        <div className="absolute w-full px-8 py-4 bg-gradient-to-b from-black/80 to-transparent z-40 flex justify-between items-center">
            <div className="w-44">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    GPTFlix
                </h1>
            </div>
            {user && (
                <div className="flex items-center gap-4">
                    <div className="text-white">
                        <p className="text-sm text-gray-300">Welcome, {user.displayName || user.email}</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;