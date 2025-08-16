import { useState } from 'react'
import './Faq.scss'
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';

export default function Faq() {
    const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    if(isActive){
        setIsActive(!isActive)
    } else {
        setIsActive(true);
    }
  }
  return (
	<div className={`faq ${isActive ? "active" : ""}`} onClick={handleClick}>
    <div>
      <h3>
			  What's the object-oriented way to become wealthy? 
		  </h3>
      {!isActive  ? <FaChevronCircleUp className="fas fa-chevron-down"/> : <FaChevronCircleDown className="fas fa-chevron-down" onClick={handleClick}/> }
    </div>
		<p>
			Inheritance.
		</p>
	</div>
  )
}
