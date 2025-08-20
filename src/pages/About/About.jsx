import './About.css';
import Image from '../../assets/logo.png';
import { FaCheckCircle, FaDollarSign, FaFacebook, FaHeadset, FaInstagram, FaShippingFast, FaTwitter, FaYoutube } from "react-icons/fa";
import Faq from '../../components/FaqItem/Faq';
import Review from '../../components/Review/Review';
import { FaXTwitter } from 'react-icons/fa6';
import Newsletter from '../../components/Newsletter/Newsletter';
import { NavLink } from 'react-router-dom';
import { ShareSocial } from 'react-share-social';
import { faqs, socialUrls } from '../../../data';

export default function About() {
    return (
        <section className='about' id='about'>
            <div className="channel-info">
                <div className="container">
                    <div className="channel-icon">
                        <img src={Image} alt="" />
                    </div>

                    <div className="channel-title">
                        <h1>Daddy Market<FaCheckCircle className='check' /></h1>
                    </div>

                    <div className="channel-subscribe">
                        <button className="subscribe-btn">Subscribed 100k</button>
                        <button className="twitter-btn" aria-label="Enable Notifications"><FaXTwitter /></button>
                    </div>
                </div>
                <p>Welcome all to Daddy Market. Here you will be able to shop food products for all your household needs. Feel free to ask any question in the contact page and don't forget to subscribe to our newsletter.</p>
                <span>
                    {
                        socialUrls.map(item => {
                            return <NavLink to={item.url} className='icon' target='_blank' title={item.title}>{ item.icon}</NavLink>
                        })
                    }
                </span>
            </div>
            <div className="row">
                <div className="image">
                    <img src={Image} alt="" />
                </div>
                <div className="content">
                    <h1 className="heading">About <span style={{ color: "#9B5DE5" }}>us</span></h1>
                    <p>Catering to the individualistic needs of each student.<br />
                        Maria Auxilium Girls’ Hr. Sec. School is situated at 15G Damalwar Street, Kancheepuram. It is set in a
                        conducive atmosphere suitable for the growth of young minds. At Maria Auxilium School every child is given
                        individual attention to ensure their holistic development. At MAS , all the needs of the child are met with understanding and utmost care, be it physical, emotional, intellectual or spiritual.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="content">
                    <h1 className="heading">Our <span style={{ color: "#9B5DE5" }}>mission</span></h1>
                    <p>Catering to the individualistic needs of each student.<br />
                        Maria Auxilium Girls’ Hr. Sec. School is situated at 15G Damalwar Street, Kancheepuram. It is set in a
                        conducive atmosphere suitable for the growth of young minds. At Maria Auxilium School every child is given
                        individual attention to ensure their holistic development. At MAS , all the needs of the child are met with understanding and utmost care, be it physical, emotional, intellectual or spiritual.
                    </p>
                </div>
                <div className="image">
                    <img src={Image} alt="" />
                </div>
            </div>


            <h3 className="sub-heading">about us</h3>
            <h1>why choose us?</h1>

            <div className="row">
                <div className="content">
                    <h3>best food in town</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit natus dolor cumque.
                    </p>
                    <div className="icons-container">
                        <div className="icons">
                            <FaShippingFast className='icon' />
                            <span>Fast delivery</span>
                        </div>
                        <div className="icons">
                            <FaDollarSign className='icon' />
                            <span>easy payments</span>
                        </div>
                        <div className="icons">
                            <FaHeadset className='icon' />
                            <span>27/7 service</span>
                        </div>
                    </div>
                    <NavLink to="/shop" className="btn">Go Shopping</NavLink>
                </div>
            </div>
            <h1>FAQ</h1>
            <div className="faqs-container">
                {
                    faqs.map(item => {
                        return <Faq data={item} />
                    })
                }
            </div>
            <Review />
            <Newsletter />
            <ShareSocial
                url={window.location.origin}
                socialTypes={['facebook', 'twitter', 'reddit', 'linkedin', 'telegram', 'whatsapp', 'line','email']}
                title={'share with friends'}
                className="share-social"
            />
        </section>
    )
}
