import { useParams } from "react-router-dom";
import { Navbar } from "../../Components/Navbar";
import { FiHeart } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";

export const ProductDetails = () => {
  const { id } = useParams();
  const products = useSelector((state) => state.products.products);

  const product = useMemo(() => {
    return products.find((p) => p.id === parseInt(id));
  }, [products, id]);

  const [currentImg, setCurrentImg] = useState(0);

  const handlePrev = () => {
    setCurrentImg((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImg((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  if (!product) return <div className="text-center pt-28">Loading or Product not found.</div>;

  return (
    <>
      <Navbar />
      <div className="pt-28 overflow-x-hidden">
        <div className="flex flex-col md:flex-row gap-8 px-8">
          {/* Image Slider */}
          <div className="relative w-full md:w-1/2 h-[500px] border rounded-lg overflow-hidden">
            <img
              src={product.images[currentImg]}
              alt={product.title}
              className="object-cover w-full h-full"
            />
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <IoChevronBack size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
            >
              <IoChevronForward size={24} />
            </button>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-semibold text-green-600">Rs. {product.price}</p>

            <div className="flex gap-4 mt-4">
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                <BsCartPlus size={20} />
                Add to Cart
              </button>
              <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                <FiHeart size={20} />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
