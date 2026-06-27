import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCopy, FaFacebook, FaLink, FaLinkedin, FaTelegram, FaTwitter, FaWhatsapp, FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { FacebookShareButton, LinkedinShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import './ShareModal.scss';

export default function ShareModal({ visible, setVisible, product }) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);

  const shareUrl = product
    ? `${window.location.origin}/shop/${product.id}`
    : window.location.href;

  const shareTitle = product ? product.title : 'Check out this product on Daddy Market';
  const shareDesc = product ? product.description : '';

  useEffect(() => {
    if (!visible) return;
    const handleScroll = () => setVisible(false);
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible, setVisible]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = modalRef.current?.querySelector('.share-url-input');
      if (input) {
        input.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <div className="share-modal-backdrop" onClick={() => setVisible(false)} />
          <motion.div
            className='share-modal'
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
          >
            <div className="content-share">
              <p>
                <span>Share this product</span>
                <span className='close' onClick={() => setVisible(false)}><FaXmark /></span>
              </p>
              <ul className="icons">
                <li className='facebook'>
                  <FacebookShareButton quote={shareTitle} url={shareUrl} hashtag='#daddymarket'>
                    <FaFacebook />
                  </FacebookShareButton>
                </li>
                <li className='twitter'>
                  <TwitterShareButton url={shareUrl} title={shareTitle} hashtags={['daddymarket', 'groceries']}>
                    <FaTwitter />
                  </TwitterShareButton>
                </li>
                <li className='whatsapp'>
                  <WhatsappShareButton url={shareUrl} title={shareTitle}>
                    <FaWhatsapp />
                  </WhatsappShareButton>
                </li>
                <li className='telegram'>
                  <TelegramShareButton url={shareUrl} title={shareTitle}>
                    <FaTelegram />
                  </TelegramShareButton>
                </li>
                <li className='linkedin'>
                  <LinkedinShareButton url={shareUrl} title={shareTitle} summary={shareDesc}>
                    <FaLinkedin />
                  </LinkedinShareButton>
                </li>
              </ul>
              <p className="copy-label">Or copy link</p>
              <div className="field">
                <FaLink className='link-class' />
                <input className="share-url-input" type="text" value={shareUrl} readOnly />
                <button onClick={handleCopy} aria-label="Copy link">
                  {copied ? <FaCheck /> : <FaCopy />}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
