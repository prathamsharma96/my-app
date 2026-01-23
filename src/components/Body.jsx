import Login from "./Login";
import Browse from "./Browse";  
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Body = () => {
    // Listen to auth state changes
    useAuth();
    
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ]);
    return (
        <div>
            <RouterProvider router={appRouter} />
            
        </div>
    );
};

export default Body;    