import React, { useState } from 'react'
import './Home.scss'
import ProductItem from '../../components/ProductCards/ProductItem';
import PopularStoreItem from '../../components/ProductCards/PopularStoreItem';
import { products, categories } from '../../../data';
import { NavLink } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import SliderOne from '../../components/SliderOne/SliderOne';
import SliderTwo from '../../components/SliderTwo/SliderTwo';

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : (products.length - 1))
    } else {
      setSlideIndex(slideIndex < (products.length - 1) ? slideIndex + 1 : 0)
    }
  }
  return (
    <section className='home'>
      <div className="slide container">
        <div className="image">
          <img src={products[0].image} alt="" />
        </div>
        <div className='slide-container'>
          <span>KSH {products[0].price}</span>
          <hr />
          {/*<h1 className='heading'>{products[0].description}</h1>*/}
          <p>{products[0].description}</p>
          <a href="#" className='btn'>Shop Now</a>
        </div>
      </div>


      <div className="categories">
        {
          categories && categories.map((category) => {
            return (
              <NavLink to={category.link}>
                <div className="card" key={category.id}>
                  <div className="image">
                    <img src={category.image} alt="" />
                  </div>
                  <div className="content">
                    <h3 >{category.title}</h3>
                  </div>
                </div>
              </NavLink>
            )
          })
        }
      </div>

      <Menu />
      <SliderOne />
      <h3 className="sub-heading">our menu</h3>
      <h1>today's specialty</h1>
      <div className="popular">
        {
          products && products.map(item => {
            return <PopularStoreItem data={{ ...item }} key={item.id} />
          })
        }
      </div>
      <SliderTwo />
      <h3 className="sub-heading">Explore Our Blog</h3>
      <h1 className="heading">Trending Posts</h1>
      <div className="posts">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </section>
  )
}
