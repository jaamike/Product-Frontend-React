// src/api.ts
import axios from 'axios';

// Define the base URL of your .NET Core API
const API_BASE_URL = 'http://localhost:5013/api/Products';

// Define the types for Product
export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
    qty: number;
    dateAdded: string;
    isActive: boolean;
    imageUrl?: string;
}

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

// Fetch a product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};

// Create a new product
export const createProduct = async (product: Product): Promise<Product> => {
    const response = await axios.post(API_BASE_URL, product);
    return response.data;
};

// Update an existing product
export const updateProduct = async (id: string, product: Product): Promise<Product> => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, product);
    return response.data;
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};
