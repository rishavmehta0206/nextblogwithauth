import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return <div className={styles.container}>
    <div className={styles.textContainer}>
      <h1>Creative Thoughts Agency.</h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. At fugit quisquam sint, minima veniam quam aut placeat iusto, ut consequuntur.</p>
      <div className={styles.buttons}>
        <button className={styles.button}>Leaarn More</button>
        <button className={styles.button}>Contact</button>
      </div>
      <div className={styles.brands}>
        <Image layout="fill" src="/brands.png" alt="brands" className={styles.brandImg}/>
      </div>
    </div>
    <div className={styles.imgContainer}>
      <Image layout="fill" src="/hero.gif" alt="hero" className={styles.heroImg}/>
    </div>
  </div>;
}
