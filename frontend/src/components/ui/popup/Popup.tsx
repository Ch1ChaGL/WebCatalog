import React, { useState } from 'react';
import styles from './Popup.module.css';

interface PopupProps {
  title: string;
  message: string;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, message, onClose }) => {
  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
        </div>
        <div className={styles.popupContent}>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
