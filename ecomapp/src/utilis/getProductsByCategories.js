export const getProductsByCategory = (products, categoryId) => {
    return categoryId === 0 ? products : products.filter(product => product.category.id === categoryId);
};