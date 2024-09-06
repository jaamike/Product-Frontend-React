import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { fetchProducts, Product } from '../api'; // Import API functions and Product type
import { Card, CardContent, Grid, Typography, CardMedia, Button } from '@mui/material'; // Import MUI components
import '../styles/ProductList.css'; // Import CSS for styling

const ProductList: React.FC = () => {
    // State to store the list of products
    const [products, setProducts] = useState<Product[]>([]);
    // Hook for navigating programmatically
    const navigate = useNavigate();

    // Effect to load products when the component mounts
    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts(); // Fetch products from API
            setProducts(data); // Update state with fetched products
        };

        loadProducts(); // Call function to load products
    }, []); // Empty dependency array means this runs once when component mounts

    // Handler for navigating to product edit page
    const handleCardClick = (productId: string) => {
        navigate(`/edit/${productId}`); // Navigate to edit page for the clicked product
    };

    // Handler for navigating to the add product page
    const handleAddProductClick = () => {
        navigate('/add'); // Navigate to add product page
    };

    return (
        <div className="product-list-container">
            <Typography variant="h4" gutterBottom className="product-list-title">
                Product Catalog
            </Typography>
            <div className="button-container">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddProductClick}
                    className="add-product-button"
                >
                    Add Product
                </Button>
            </div>
            <Grid container spacing={4}>
                {/* Iterate over products and create a card for each */}
                {products.map(product => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card 
                            className={`product-card ${!product.isActive ? 'inactive' : ''}`} 
                            onClick={() => handleCardClick(product.id)}
                        >
                            {product.imageUrl && (
                                <CardMedia
                                    component="img"
                                    alt={product.name}
                                    height="200"
                                    image={product.imageUrl}
                                    title={product.name}
                                    className="product-image"
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6" className="product-title">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" className="product-description">
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" className="product-price">
                                    ${product.price}
                                </Typography>
                                <Typography variant="body2" className="product-stock">
                                    Stock: {product.qty}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ProductList;
