import React from 'react';
import { useSelector } from 'react-redux';
import { CartProductCard } from '../../Components/Cards/CartProductsCard';
import { Navbar } from '../../Components/Navbar';
import { CartSummary } from '../../Components/CartSummary';

export const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cart); // adapt based on your store
    console.log(cartItems);
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
    );


    return (
        <>
            <Navbar />
            <main className='pt-20 overflow-x-hidden'>
                <div className="flex flex-col md:flex-row gap-4 p-4">
                    {/* Left Section - Product Cards */}
                    <div className="flex flex-col w-full md:w-2/3 gap-4">
                        {cartItems.length > 0 ? (
                            cartItems.map((product) => (
                                <CartProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <p className="text-gray-600">Your cart is empty.</p>
                        )}
                    </div>
                    <CartSummary cartItems={cartItems} total={total} />
                </div>
            </main>
        </>
    );
};
