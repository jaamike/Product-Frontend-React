import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/add" element={<ProductForm />} />
                <Route path="/edit/:productId" element={<ProductForm />} />
            </Routes>
        </Router>
    );
}

export default App;
