import './About.css';
import { FaCheckCircle, FaDollarSign, FaHeadset, FaShippingFast } from "react-icons/fa";
import Faq from '../../components/FaqItem/Faq';
import Review from '../../components/Review/Review';
import Newsletter from '../../components/Newsletter/Newsletter';
import { NavLink } from 'react-router-dom';
import { ShareSocial } from 'react-share-social';
import { faqs, socialUrls } from '../../../data';

export default function About() {
    return (
        <section className='about' id='about'>
            <div className="channel-info">
                <div className="container">
                    <h1>Daddy Market <FaCheckCircle className='check' /></h1>
                    <div className="channel-subscribe">
                        <button className="subscribe-btn">Subscribed 100k</button>
                    </div>
                </div>
                <p>Welcome to Daddy Market. Shop fresh food products for all your household needs. Feel free to ask any question on the contact page and don't forget to subscribe to our newsletter.</p>
                <span className="socials-row">
                    {socialUrls.map(item => (
                        <NavLink to={item.url} className='icon' target='_blank' title={item.title} key={item.id}>
                            {item.icon}
                        </NavLink>
                    ))}
                </span>
            </div>

            <div className="row">
                <div className="content">
                    <h1 className="heading">About <span className="accent">Us</span></h1>
                    <p>
                        Daddy Market is your trusted online grocery store, delivering fresh produce,
                        staples, and household essentials right to your doorstep. We source directly
                        from local farmers to bring you the best quality at fair prices.
                    </p>
                </div>
            </div>

            <div className="row">
                <div className="content">
                    <h1 className="heading">Our <span className="accent">Mission</span></h1>
                    <p>
                        To make fresh, quality food accessible to every household through reliable
                        delivery, fair pricing, and exceptional customer service. We support local
                        farmers and promote sustainable agriculture.
                    </p>
                </div>
            </div>

            <div className="section-header">
                <h3 className="sub-heading">About Us</h3>
                <h1>Why Choose Us?</h1>
            </div>

            <div className="row">
                <div className="content">
                    <div className="icons-container">
                        <div className="icons">
                            <FaShippingFast className='icon' />
                            <span>Fast delivery</span>
                        </div>
                        <div className="icons">
                            <FaDollarSign className='icon' />
                            <span>Easy payments</span>
                        </div>
                        <div className="icons">
                            <FaHeadset className='icon' />
                            <span>24/7 service</span>
                        </div>
                    </div>
                    <NavLink to="/shop" className="btn">Go Shopping</NavLink>
                </div>
            </div>

            <div className="section-header">
                <h1>Frequently Asked Questions</h1>
            </div>
            <div className="faqs-container">
                {faqs.map((item, i) => (
                    <Faq data={item} key={i} />
                ))}
            </div>

            <Review />
            <Newsletter />

            <ShareSocial
                url={window.location.origin}
                socialTypes={['facebook', 'twitter', 'reddit', 'linkedin', 'telegram', 'whatsapp', 'email']}
                title={'Share with friends'}
                className="share-social"
            />
        </section>
    );
}
