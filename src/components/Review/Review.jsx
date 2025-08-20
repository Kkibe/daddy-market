import './Review.scss';
import Image from '../../assets/logo.png';
import {FaQuoteRight, FaStar, FaStarHalf } from "react-icons/fa";
import { testimonials } from '../../../data';

export default function Review() {
    const Item = ({ data }) => {
        return (
        <div className="slide">
            <span>
                <FaQuoteRight />
            </span>
            <div className="user">
                <img src={data.image} alt="" />
                <div className="user-info">
                        <h3>{data.name}</h3>
                        <p ><FaStar className='star'/>{ data.stars} </p>
                </div>
            </div>
                <p>{data.comment}</p>
        </div>
        );
    }
    return (
    <section className='review' id='review'>
        <h3 className="sub-heading">customer reviews</h3>
        <h1 className='heading'>What they say</h1>
        <div className="review-slider">
            <div className="wrapper">
                {
                    testimonials.map((testimonial) => {
                        return<Item data = {testimonial} />
                    })
                }
            </div>
        </div>
    </section>
  )
}
