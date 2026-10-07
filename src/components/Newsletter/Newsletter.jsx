import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './Newsletter.scss';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!email.match(mailformat)) {
            setError('Please enter a valid email address');
            return;
        }
        setSuccess('Thank you for subscribing!');
        setEmail('');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (error) setError(null);
            if (success) setSuccess(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [success, error]);

    return (
        <section className='newsletter' id='subscribe'>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >Subscribe to our newsletter</motion.h2>
            <p>Get the latest deals and updates delivered to your inbox</p>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    name='email'
                    placeholder='example@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type='submit' className='btn' title='submit'>
                    <FaPaperPlane /> Subscribe
                </button>
            </form>
            <AnimatePresence>
                {error && (
                    <motion.p className='error' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <FaExclamationTriangle /> {error}
                    </motion.p>
                )}
                {success && (
                    <motion.p className='success' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <FaCheckCircle /> {success}
                    </motion.p>
                )}
            </AnimatePresence>
        </section>
    );
}
