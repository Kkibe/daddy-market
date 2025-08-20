import { useState } from 'react'
import './SliderOne.scss'
import { products } from '../../../data';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function SliderOne() {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : (products.length - 1))
        } else {
            setSlideIndex(slideIndex < (products.length - 1) ? slideIndex + 1 : 0)
        }
    }
    return (

        <div className="slider">
            <div className="arrow" onClick={() => handleClick("left")}>
                <FaArrowLeft />
            </div>
            <div className="slide-wrapper" style={{ transform: `translateX(${slideIndex * -100}vw)` }}>
                {
                    products && products.map(dish => {
                        return (
                            <div className="slide container">
                                <div className="image">
                                    <img src={dish.image} alt="" />
                                </div>
                                <div className='slide-container'>
                                    <span>KSH {dish.price}</span>
                                    <hr />
                                    <h1 className='heading'>{dish.title}</h1>
                                    <p>{dish.description}</p>
                                    <a href="#" className='btn'>Shop Now</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="arrow" onClick={() => handleClick("right")}>
                <FaArrowRight />
            </div>
        </div>
    )
}
