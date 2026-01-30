import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';




const Modal = ({image, onClose}) => {
  if(!image) return null;
  return createPortal(
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal-overlay" 
        onClick={onClose}
     >
      <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }} // 스프링 느낌의 물리 효과
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
        >
        <img src={image.urls.regular} alt={image.alt_description} />
        <div className="modal-info">
          <h2>{image.user.name}</h2>
          <p>{image.description || "설명이 없습니다."}</p>          
        </div>
        <button className="modal-close-btn" onClick={onClose}>닫기</button>
      </motion.div>
    </motion.div>,
    document.getElementById('modal-root')
  )
}

export default Modal