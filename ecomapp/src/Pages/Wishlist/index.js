import { Navbar } from "../../Components/Navbar";
import { useSelector } from "react-redux";
import React from "react";  
import { ProductCard } from "../../Components/Cards/ProductsCards";

export const Wishlist = () => {
    const wishlistItems = useSelector((state) => state.wishlist.wishlist); // adapt based on your store

    return (
         <>
                    <Navbar />
                    <main className="flex flex-wrap gap-8 justify-center pt-28">
                        {
                             wishlistItems && wishlistItems.length > 0 ? (
                                wishlistItems.map(item => <ProductCard key={item.id} product={item} />)
                            ) : (
                                <p>No products found.</p>
                            )
        
                        }
                    </main>
                </>
    );
}

