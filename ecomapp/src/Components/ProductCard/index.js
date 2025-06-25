import { ProductDetails } from "../../Pages/Product"
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const onProductClick = () => {
        navigate(`/product/${product.id}`);
    }
    
    return (
        <div onClick={onProductClick} className="card card-vertical d-flex direction-column relative shadow hover:cursor-pointer">
            <div className="card-image-container">
                <img className="card-image" src={product.images[0]} alt={product.title} />
            </div>
            <div className="card-details">
                <div className="card-title">{product.title}</div>
                <div className="card-description">
                
                    <p className="card-price">
                        Rs. {product.price}
                        <span className="price-strike-through">Rs. 2499</span>
                        <span className="discount">{product.discount}% OFF</span>
                    </p>
                </div>
                <div className="cta-btn">
                    <button className="button btn-primary btn-icon cart-btn d-flex  align-center justify-center gap cursor btn-margin">
                        <span className="material-icons-outlined  text-3xl hover:cursor-pointer">
                            shopping_cart
                        </span>
                        Add To Cart
                    </button>
                    <button className="button btn-primary btn-icon cart-btn d-flex  align-center justify-center gap cursor btn-margin">
                        <span className="material-icons-outlined  text-3xl hover:cursor-pointer">
                            favorite
                        </span>
                        Add To Wishlist
                    </button>
                </div>
            </div>
        </div>
    )
}