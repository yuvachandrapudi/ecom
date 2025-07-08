import axios from "axios";
const BaseUrl = 'https://api.escuelajs.co/api/v1';

export const getAllProducts = async () => {
  try {
    const { data } = await axios.get(`${BaseUrl}/products`);
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};


