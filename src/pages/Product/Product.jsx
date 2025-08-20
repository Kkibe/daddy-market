import { useState } from 'react';
import './Product.scss'
import { FaMinus } from "react-icons/fa6";
import { FaPlus, FaStar } from 'react-icons/fa';

import {   products} from '../../../data';
import PopularStoreItem from '../../components/ProductCards/PopularStoreItem';

export default function Product() {
  const [inStore, setInStore] = useState(false);
  const data = products[3];
  const [items, setItems] = useState(1);

  const handleAdd = (type) => {
    if (type === 'add') {
      setItems(items + 1)

    } else if (type === 'less') {
      items != 1 && setItems(items - 1)
    }
  }



  return (
    <div className='product'>
      <div className="card">
        <div className="image">
          <img src={item.image} alt="" />
        </div>
        <div className="content">
          <h3>{data.description}</h3>
          <p>{data.description}</p>
          <p>
            {
              data.categories && data.categories.map(category => {
                return <span className="hash" key={category.id}>{category}</span>
              })
            }
          </p>
          <span className='pricing'>
            <h3 className="sub-heading duration">$800.00</h3>
            <a className="badge"><FaStar className='star' /> 5.4K</a>
          </span>
          <span>
            <div className="disabled">
              <a onClick={() => handleAdd('less')}><FaMinus /></a>
              <h3 className="sub-heading">{items}</h3>
              <a onClick={() => handleAdd('add')}><FaPlus /></a>
            </div>
            <span className="btn" onClick={() => setInStore(!inStore)}>
              {
                inStore ? "Remove" : "Add"
              }
            </span>
          </span>
        </div>
      </div>
      <div className="wrapper">
        <h3>You Might Also Like</h3>
        <div className="container">
          {
            products && products.map(item => {
              return <PopularStoreItem data={{ ...item }} key={item.id} />
            })
          }</div>
      </div>
    </div>
  )
}
