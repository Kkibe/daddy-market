import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import './Faq.scss';

export default function Faq({ data }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={`faq ${isActive ? "active" : ""}`} onClick={() => setIsActive(!isActive)}>
            <div className="faq-header">
                <h3>{data.question}</h3>
                <motion.span
                    className="chevron"
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <FaChevronDown />
                </motion.span>
            </div>
            <AnimatePresence initial={false}>
                {isActive && (
                    <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {data.answer}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
