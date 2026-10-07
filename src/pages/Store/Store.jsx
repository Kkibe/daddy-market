import './Store.scss';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import PopularStoreItem from '../../components/ProductCards/PopularStoreItem';
import Flyer from '../../components/Flyer/Flyer';
import Dishes from '../../components/Dishes/Dishes';
import ProductItem from '../../components/ProductCards/ProductItem';
import StoreItem from '../../components//ProductCards/StoreItem';
import { useProduct } from '../../hooks/useProduct';
import Loader from '../../components/Loader/Loader';
import { filteredProductsSelector } from '../../recoil/selectors';

export default function Store() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filteredProducts = useRecoilValue(filteredProductsSelector);
  const { fetchProducts } = useProduct();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchProducts();
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    loadProducts();
  }, [fetchProducts]);

  if (loading) return <Loader />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className='shop'>
      <Flyer />
      {filteredProducts.length > 0 && <Dishes data={filteredProducts} />}

      <h1 className="heading">Explore Brands</h1>
      <div className="container">
        {filteredProducts.map(item => (
          <PopularStoreItem data={{ ...item }} key={item.id} />
        ))}
      </div>

      <h3 className="sub-heading">Discover Variety</h3>
      <h1 className="heading">Popular Drinks</h1>
      <div className="container">
        {filteredProducts.map(item => (
          <PopularStoreItem data={{ ...item }} key={item.id} />
        ))}
      </div>

      <h1 className="heading">Read Our Blogs</h1>
      <div className="container blogs">
        {filteredProducts.slice(0, 6).map(item => ( // Only show 6 blog items
          <ProductItem product={{ ...item }} key={item.id} />
        ))}
      </div>

      <h3 className="sub-heading">Discover Variety</h3>
      <h1 className="heading">Popular Drinks</h1>
      <div className="container">
        {filteredProducts.map(item => (
          <StoreItem data={{ ...item }} key={item.id} />
        ))}
      </div>
    </section>
  );
}