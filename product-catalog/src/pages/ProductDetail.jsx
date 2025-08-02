import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import ErrorMessage from '../components/Error'; 
import '../css/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch product');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />; 
  if (!product) return null;

  return (
    <div className="product-detail-wrapper">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back to Products</button>
      <div className="product-detail-card">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-category">📦 {product.category}</p>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
