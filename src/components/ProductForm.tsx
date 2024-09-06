import React, { useEffect, useState } from 'react'; // Import React and hooks
import { useNavigate, useParams } from 'react-router-dom'; // Import hooks for routing
import { createProduct, fetchProductById, updateProduct, deleteProduct, Product } from '../api'; // Import API functions and Product type
import { TextField, Button, Checkbox, FormControlLabel, Typography, Box } from '@mui/material'; // Import MUI components
import '../styles/ProductForm.css';  // Import the CSS file for custom styling

const ProductForm: React.FC = () => {
    // State to manage product form data
    const [product, setProduct] = useState<Partial<Product>>({
        name: '',
        price: 0,
        qty: 0,
        isActive: true,
        imageUrl: '',
        category: '',
        description: ''
    });
    // State to determine if the form is in editing mode
    const [isEditing, setIsEditing] = useState<boolean>(false);
    // Extract productId from route parameters
    const { productId } = useParams<{ productId?: string }>();
    // Hook for navigating programmatically
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            // If productId is present, fetch the product details to populate the form for editing
            const loadProduct = async () => {
                const data = await fetchProductById(productId);
                setProduct(data); // Populate form with product data
                setIsEditing(true); // Set form to editing mode
            };
            loadProduct(); // Call function to load product
        }
    }, [productId]); // Dependency array includes productId to re-run effect when it changes

    // Handler for input field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value // Update the state with new value
        }));
    };

    // Handler for form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Ensure all required fields are filled out
        if (product.name && product.price && product.category && product.description) {
            if (isEditing && productId) {
                // If editing, update the existing product
                await updateProduct(productId, product as Product);
            } else {
                // Otherwise, create a new product
                await createProduct(product as Product);
            }
            navigate('/'); // Navigate to the product list or any other route
        } else {
            alert("Please fill in all required fields."); // Alert if required fields are missing
        }
    };

    // Handler for deleting a product
    const handleDelete = async () => {
        if (productId) {
            await deleteProduct(productId); // Delete the product
            navigate('/'); // Navigate back to the product list or any other route
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="product-form">
            <Typography variant="h5" gutterBottom className="form-title">
                {isEditing ? 'Edit Product' : 'Add a New Product'}
            </Typography>
            <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={product.name || ''}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
                className="form-input"
            />
            <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={product.price || 0}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
                className="form-input"
            />
            <TextField
                fullWidth
                label="Stock Quantity"
                name="qty"
                type="number"
                value={product.qty || 0}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
                className="form-input"
            />
            <TextField
                fullWidth
                label="Image URL"
                name="imageUrl"
                value={product.imageUrl || ''}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                className="form-input"
            />
            <TextField
                fullWidth
                label="Category"
                name="category"
                value={product.category || ''}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
                className="form-input"
            />
            <TextField
                fullWidth
                label="Description"
                name="description"
                value={product.description || ''}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
                className="form-input"
                multiline
                rows={4}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={product.isActive || false}
                        onChange={() => setProduct(prev => ({ ...prev, isActive: !prev.isActive }))}
                        name="isActive"
                        className="form-checkbox"
                    />
                }
                label="Is Active"
                className="form-checkbox-label"
            />
            <Box className="button-container">
                <Button 
                    type="submit" 
                    variant="contained" 
                    className="submit-button"
                >
                    {isEditing ? 'Update' : 'Submit'}
                </Button>
                {isEditing && (
                    <Button 
                        type="button"
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        className="delete-button"
                    >
                        Delete
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ProductForm;
