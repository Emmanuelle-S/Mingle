// src/pages/NotFound.jsx
import React, { useEffect } from 'react';
import styles from './NotFound.module.css';

const NotFound = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#FFEDC5';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className={styles.container}>
            <svg width="380px" height="500px" viewBox="0 0 837 1045" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" stroke="#007FB2" strokeWidth="6" id="Polygon-1" className={styles.polygon}></path>
                    <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" stroke="#EF4A5B" strokeWidth="6" id="Polygon-2" className={styles.polygon}></path>
                    <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" stroke="#795D9C" strokeWidth="6" id="Polygon-3" className={styles.polygon}></path>
                    <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" stroke="#F2773F" strokeWidth="6" id="Polygon-4" className={styles.polygon}></path>
                    <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" stroke="#36B455" strokeWidth="6" id="Polygon-5" className={styles.polygon}></path>
                </g>
            </svg>
            <div className={styles.messageBox}>
                <h1>404</h1>
                <p>Page non trouvée</p>
                <div className={styles.buttonsCon}>
                    <div className={styles.actionLinkWrap}>
                        <a onClick={() => window.history.back()} className={`${styles.planete} ${styles.linkButton}`}>Retour</a>
                        <a href="/" className={styles.atom}>Accueil</a>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default NotFound;

