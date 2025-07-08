export const CartSummary = ({ cartItems, total }) => {
    return (
        <>
            <div className="fixed right-0 top-20 bottom-0 w-full md:w-1/3 bg-white shadow-lg p-4 rounded-xl overflow-hidden flex flex-col">

                {/* Scrollable product list */}
                <div className="flex-1 overflow-y-auto pr-2">
                    <h2 className="text-xl font-semibold mb-4">Cart Details</h2>
                    {cartItems.length > 0 ? (
                        cartItems.map((product) => (
                            <div
                                key={product.id}
                                className="flex justify-between items-center text-black mb-2"
                            >
                                <p className="flex-1">
                                    {product.title} <span className="text-gray-500">(x{product.quantity})</span>
                                </p>
                                <p className="right-0 text-gray-600 mb-2">
                                    Rs. {product.price * (product.quantity || 1)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">Your cart is empty.</p>
                    )}
                </div>
                {/* Sticky/fixed bottom section */}
                <div className="pt-4 border-t mt-4 sticky bottom-0 bg-white">
                    <h2 className="text-xl font-semibold mb-4">Price Details</h2>
                    <div className="flex justify-between mb-2">
                        <span>Total Items:</span>
                        <span>{cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Total Price:</span>
                        <span>Rs. {total}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Discount:</span>
                        <span className="text-green-600">- Rs. {(total * 0.3).toFixed(0)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                        <span>Final Amount:</span>
                        <span>Rs. {(total * 0.7).toFixed(0)}</span>
                    </div>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </>
    );
};