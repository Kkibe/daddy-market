import { useState } from 'react';
import './Single.scss'
import { FaMinus, FaXmark } from "react-icons/fa6";
import { FaPlus, FaShippingFast, FaStar, FaStarHalf } from 'react-icons/fa';
import Image from '../../assets/logo.png';

export default function Single() {
  const [items, setItems] = useState(0);
  const toggleSingle = () => {
    document.querySelector('.single').classList.toggle('active');
  }

  const handleItems = (type) => {
    if (type === 'add') {
      setItems(items + 1);
    } else {
      if (items === 0) return;
      setItems(items - 1);
    }
  }
  return (
    <div className='single'>
      <div className="wrapper">
        <div className="image">
          <img src={Image} alt="" />
        </div>
        <div className="details">
          <h1 >Tony Hunfinger T-Shirt New York</h1>
          <span className='pricing'>
            <h3 className="sub-heading">$800.00</h3>
            <a className="icon badge">Free Shipping<FaShippingFast /></a>
          </span>
          <p>
            Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Sit Natus Dolor Cumque.
            Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Sit Natus Dolor Cumque.
          </p>
          <div className="stars">
            <FaStar className='star' />
            <FaStar className='star' />
            <FaStar className='star' />
            <FaStar className='star' />
            <FaStarHalf className='star' />
          </div>
          <span>

            {
              items === 0 ? <a href="#" className="btn" onClick={() => handleItems('add')}>Add To Cart</a> : <div className="disabled">
                <a href="#" className="icon eye" onClick={() => handleItems('remove')}><FaMinus /></a>
                <h3 className="sub-heading">{items}</h3>
                <a href="#" className="icon eye" onClick={() => handleItems('add')}><FaPlus /></a>
              </div>
            }

            <a href="#" className="btn">Buy Now</a>
          </span>
        </div>
      </div>
      <span id="close" onClick={toggleSingle}><FaXmark /></span>
    </div>
  )
}
