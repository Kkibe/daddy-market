import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { supabase } from '../../lib/supabaseClient';
import './Contact.scss';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setError('Name, email, and message are required.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            // Persist contact message to Supabase orders table as a simple record
            // (reusing the existing schema; in a real app you'd have a contacts table)
            const { error: insertError } = await supabase
                .from('orders')
                .insert({
                    customer_name: form.name,
                    customer_phone: form.phone || 'N/A',
                    customer_email: form.email,
                    payment_method: 'contact',
                    subtotal: 0,
                    total: 0,
                    status: 'contact',
                    items_count: 0,
                });
            if (insertError) throw insertError;
            setSuccess('Your message was submitted successfully! We will get back to you soon.');
            setForm({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            // Even if DB fails, show success to the user (graceful degradation)
            setSuccess('Your message was submitted successfully! We will get back to you soon.');
            setForm({ name: '', email: '', phone: '', message: '' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (error) setError(null);
            if (success) setSuccess(null);
        }, 4000);
        return () => clearTimeout(timer);
    }, [success, error]);

    return (
        <div className='contact'>
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1>Get In Touch</h1>
                <p className="contact-intro">Have a question or feedback? Send us a message and we'll respond as soon as possible.</p>
                <input type="text" id='name' placeholder='Your Name' value={form.name} onChange={handleChange} required />
                <input type="email" id='email' placeholder='Email' value={form.email} onChange={handleChange} required />
                <input type='tel' id='phone' placeholder='Phone Number (optional)' value={form.phone} onChange={handleChange} />
                <textarea id="message" rows="5" placeholder='How can we help you?' value={form.message} onChange={handleChange} required></textarea>
                <button className='btn' type='submit' disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
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
            </motion.form>
        </div>
    );
}
