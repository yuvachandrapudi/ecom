import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "../../Slices/loginSlice";

export const Navbar = () => {
    const navigate = useNavigate();
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const { token } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    const onLoginClick = () => {
        if(!token) {
            navigate("/login");
        } else {
            dispatch(setToken(null));
            navigate("/login");
        }
    }

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex bg-[#DBA6F7] py-4 px-8 text-slate-50 shadow-md">
            <div>
                <h1 onClick={() => navigate("/")} className="text-5xl">Shop It</h1>
            </div>
            <nav className="ml-auto flex gap-8 items-center">
                <span onClick={() => navigate("/wishlist")} className="material-icons-outlined text-3xl hover:cursor-pointer">
                    favorite
                </span>
                <span onClick={() => navigate("/cart")} className="material-icons-outlined text-3xl hover:cursor-pointer">
                    shopping_cart
                </span>
                <div>
                    <span onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)} className="material-icons-outlined text-3xl hover:cursor-pointer">
                        account_circle
                    </span>
                    {
                        isAccountMenuOpen && <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-200" onClick={onLoginClick}>
                                {token ? "Logout" : "Login"}
                            </button>
                        </div>
                    }
                    
                </div>
            </nav>
        </header>
    );
};
