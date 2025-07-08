import { setEmail, setPassword, setName } from "../../Slices/registerSlice"
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userRegister } from "../../Api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { startLoading, stopLoading } from "../../Slices/loadingSlice";
import { setToken } from "../../Slices/loginSlice";

export const AuthRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const { name, email, password, avatar } = useSelector(state => state.register);
    const { token } = useSelector(state => state.login);
    const { loading } = useSelector(state => state.loading);

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (password !== ConfirmPassword) {
            alert("Passwords do not match");
            return;
        }

        dispatch(startLoading());
        try {
            // Register the user
            const registerData = await userRegister(name, email, password, avatar);

            // Login using the same credentials
            const loginData = await userLogin(registerData.email, password);

            // Set token
            dispatch(setToken(loginData.access_token));

            // Navigate after setting token
            if (token) {
                navigate("/");
            }
            else {
                console.log("token failed");
            }
        } catch (error) {
            console.error("Error during registration/login:", error);
            alert("Something went wrong. Please try again.");
        } finally {
           dispatch(stopLoading()); // Stop loading state
        }
    };


    const onEmailChange = (e) => {
        dispatch(setEmail(e.target.value));
    }

    const onPasswordChange = (e) => {
        dispatch(setPassword(e.target.value));
    }
    const onNameChange = (e) => {
        dispatch(setName(e.target.value));
    }
    return (
        <>
            <main className="flex items-center justify-center h-screen bg-gray-100">
                <div className=" w-full max-w-md shadow-lg rounded-lg bg-[#DBA6F7] p-8">
                    <form onSubmit={onFormSubmit} className="flex flex-col items-center">
                        <h1 className="text-3xl font-bold mb-6">Login</h1>
                        <div className="flex flex-col w-full max-w-md">
                            <span>Name</span>
                            <input onChange={onNameChange} required type="text" placeholder="Name" className="mb-4 p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="flex flex-col w-full max-w-md">
                            <span>Email</span>
                            <input onChange={onEmailChange} required type="email" placeholder="Email" className="mb-4 p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="flex flex-col w-full max-w-md">
                            <span>Password</span>
                            <input onChange={onPasswordChange} required type="password" placeholder="Password" className="mb-4 p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="flex flex-col w-full max-w-md">
                            <span>Confirm Password</span>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} required type="password" placeholder="Confirm Password" className="mb-4 p-2 border border-gray-300 rounded" />
                        </div>
                        <div className="flex flex-col w-full max-w-md">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`p-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"}`}
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                            <p className="mt-4">
                                Already have an account?{" "}
                                <a href="/login" className="text-blue-500">Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </main>

        </>
    );
}