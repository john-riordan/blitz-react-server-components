import styles from './Card.module.css';

function Card({ children, className, cardRef }) {
  return (
    <section ref={cardRef} className={`${styles.card} ${className}`}>
      {children}
    </section>
  );
}

export default Card;
