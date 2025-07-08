import axios from "axios";
const BaseUrl = 'https://api.escuelajs.co/api/v1';

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get(`${BaseUrl}/categories`);
    return data;
  } catch (err) {
    return [];
  }
};