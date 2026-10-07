import './Menu.scss';
import { FaEye } from "react-icons/fa";
import { products } from '../../../data';

export default function Menu() {
  const toggleSingle = () => {
    document.querySelector('.single').classList.toggle('active');
  }

  const Item = ({ data }) => {
    return (
      <div className="card">
        <div className="image">
          <img src={data.image} alt="" />
          <a className="icon eye" onClick={toggleSingle}><FaEye /></a>
        </div>
        <div className="content">
          {/*<div className="stars">
            <FaStar className='star' />
            <FaStar className='star' />
            <FaStar className='star' />
            <FaStar className='star' />
            <FaStarHalf className='star' />
          </div>*/}
          <h3>{data.description}</h3>
          <p>{data.description}</p>
          <div className="card-footer">
            <span className="price">KSH {data.price}</span>
            <a href="#" className="btn">add to cart</a>
          </div>
        </div>
      </div>)
  }
  return (
    <section className='menu' id='menu'>
      <h3 className="sub-heading">Discover More</h3>
      <h1>Trending Today</h1>
      <div className="container">
        {
          products && products.map(item => {
            return <Item data={{ ...item }} key={item.id} />
          })
        }
      </div>
    </section>
  )
}
