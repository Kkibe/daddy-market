import { useState } from 'react'
import './Faq.scss'
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';

export default function Faq({data}) {
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
          {data.question}?
		  </h3>
      {!isActive  ? <FaChevronCircleDown className="fas fa-chevron-down" onClick={handleClick}/> : <FaChevronCircleUp className="fas fa-chevron-down"/> }
    </div>
		<p>
			{data.answer}
		</p>
	</div>
  )
}
