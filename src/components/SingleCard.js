import React from "react";
import styles from "../App.module.css";
export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
    handleChoice(card);
  };
  return (
    <div className={styles.card}>
      <div className={flipped ? styles.flipped : ""}>
        <img className={styles.front} src={card.src} alt="card front" />
        <img
          clasName={styles.back}
          src="/img/cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
