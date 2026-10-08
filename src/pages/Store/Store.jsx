import './Store.scss';
import { useRecoilValue } from 'recoil';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import PopularStoreItem from '../../components/ProductCards/PopularStoreItem';
import SponsoredAd from '../../components/SponsoredAd/SponsoredAd';
import Dishes from '../../components/Dishes/Dishes';
import ProductItem from '../../components/ProductCards/ProductItem';
import StoreItem from '../../components/ProductCards/StoreItem';
import { products } from '../../../data';
import { filteredProductsSelector } from '../../recoil/selectors';
import { searchState } from '../../recoil/atoms';
import { useRecoilState } from 'recoil';

export default function Store() {
  const filteredProducts = useRecoilValue(filteredProductsSelector);
  const [searchQuery] = useRecoilState(searchState);
  const isSearching = searchQuery.trim().length > 0;

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : (isSearching ? [] : products);

  return (
    <section className='shop'>
      {!isSearching && <SponsoredAd />}

      {!isSearching && displayProducts.length > 0 && <Dishes data={displayProducts.slice(0, 8)} />}

      <div className="section-header">
        <h3 className="sub-heading">{isSearching ? 'Search Results' : 'Explore Brands'}</h3>
        <h1>{isSearching ? `"${searchQuery}"` : 'All Products'}</h1>
        {isSearching && (
          <p className="search-count">
            {displayProducts.length} {displayProducts.length === 1 ? 'product' : 'products'} found
          </p>
        )}
      </div>

      {displayProducts.length === 0 ? (
        <div className="no-results">
          <p>No products match your search. Try a different keyword.</p>
        </div>
      ) : (
        <div className="container">
          {displayProducts.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.05 }}
            >
              <PopularStoreItem data={{ ...item }} />
            </motion.div>
          ))}
        </div>
      )}

      {!isSearching && (
        <>
          <div className="section-header">
            <h3 className="sub-heading">Discover Variety</h3>
            <h1>Featured Items</h1>
          </div>
          <div className="container">
            {displayProducts.slice(0, 6).map((item) => (
              <StoreItem data={{ ...item }} key={item.id} />
            ))}
          </div>

          <div className="section-header">
            <h3 className="sub-heading">Read Our Blogs</h3>
            <h1>Trending Posts</h1>
          </div>
          <div className="container blogs">
            {displayProducts.slice(0, 6).map((item) => (
              <ProductItem product={{ ...item }} key={item.id} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
