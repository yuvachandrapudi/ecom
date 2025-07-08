import { Navbar } from "../../Components/Navbar";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../Api/getProducts";
import { ProductCard } from "../../Components/Cards/ProductsCards";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../Slices/productsSlice";
import { getAllCategories } from "../../Api/getAllCategories";
import { getProductsByCategory } from "../../utilis/getProductsByCategories";

export const Home = () => {

    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0); // 0 for 'All' category

    useEffect(() => {
        (async () => {
            const data = await getAllProducts();
            const categories = await getAllCategories();
            const updatedCategories = [...categories, { id: 0, name: 'All' }]; // Adding 'All' category
            setCategories(updatedCategories);
            dispatch(setProducts(data));
        })();

    }, [])

    const products = useSelector(state => state.products.products);

    const onCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        window.scrollTo(0, 0); // Scroll to top when category is changed
    }

    const filteredByCategory = getProductsByCategory(products, selectedCategory);


    return (
        <>
            <Navbar />
            <main className="mt-20 p-4">
                <div className="flex gap-4 justify-center items-center flex-wrap mb-2  ">
                    {categories?.length > 0 ? (
                        categories.map(category => <div className="bg-gray-100  rounded-full font-semibold p-1 hover:cursor-pointer" onClick={() => onCategoryClick(category.id)} key={category.id}>{category.name}</div>)
                    ) : (<p>No categories found.</p>)
                    }
                </div>
                <div className="flex-wrap gap-8  justify-center items-center flex mt-2 pt-4">
                    {filteredByCategory && filteredByCategory.length > 0 ? (
                        filteredByCategory.map(product => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <p>No products found.</p>
                    )
                    }
                </div>

            </main>
        </>
    )
}