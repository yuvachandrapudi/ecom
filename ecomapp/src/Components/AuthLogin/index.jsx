import { setEmail, setPassword } from "../../Slices/loginSlice"
import { useDispatch,useSelector } from "react-redux";
import { userLogin } from "../../Api/auth";
import { setToken } from "../../Slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { startLoading,stopLoading } from "../../Slices/loadingSlice";

export const AuthLogin = () => {
    const dispatch = useDispatch();
    const { email, password, token } = useSelector(state => state.login);
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.loading);

    const onFormSubmit = (e) => {
        console.log("email:", email, "password:", password);
        e.preventDefault();
        // Handle login logic here

        dispatch(startLoading()); // Start loading state
        userLogin(email, password)
            .then((data) => {
                // Handle successful login
                dispatch(setToken(data.access_token));
                localStorage.setItem("token", data.access_token); // Store token in local storage
            })
            .finally(() => {
                dispatch(stopLoading()); // Stop loading state
            })
            .catch((error) => {
                // Handle login error
                console.error("Login failed:", error);
            }); 

        if(token) {
            navigate("/"); // Redirect to home page on successful login
        }   
        else {
            alert("Login failed");
        }
    };

    const onEmailChange = (e) => {
        dispatch(setEmail(e.target.value));
    }

    const onPasswordChange = (e) => {
        dispatch(setPassword(e.target.value));
    }

    return (
        <>
            <main className="flex items-center justify-center h-screen bg-gray-100">
                <div className=" w-full max-w-md shadow-lg rounded-lg bg-[#DBA6F7] p-8">
                    <form onSubmit={onFormSubmit} className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold mb-6">Login</h1>
                        <div className="flex flex-col w-full max-w-md">
                            <span>Email</span>
                            <input onChange={onEmailChange} required type="email" placeholder="Email" className="mb-4 p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="flex flex-col w-full max-w-md">
                            <span>Password</span>
                            <input onChange={onPasswordChange} required type="password" placeholder="Password" className="mb-4 p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="flex flex-col max-w-md">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`p-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                            <p className="mt-4">
                                Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                            </p>
                        </div>
                    </form>
                </div>
            </main>

        </>
    );
}