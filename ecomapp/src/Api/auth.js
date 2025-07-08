import axios from "axios";
export const userLogin = async (email, password) => {
    try {
        const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
            email,
            password
        });

        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const userRegister = async (name,email, password,avatar) => {
    try {
        const response = await axios.post("https://api.escuelajs.co/api/v1/users/", {
            name,
            email,
            password,
            avatar
        });
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};
