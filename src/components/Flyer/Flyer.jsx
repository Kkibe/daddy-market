import Image from '../../assets/download.jpg';
import './Flyer.scss';

export default function Flyer() {
  return (
      <div className="flyer">
        <div className="image">
          <img src={Image} alt="fl" />
        </div>
        <div className="content">
          <h1>White Potatoes, 1 sack</h1>
          <span>Special Offer @3000 ksh</span>
          <p>Hurry up!</p>
          <a href="#" className='btn'>order now</a>
        </div>
      </div>
  )
}
