import Navbar from "../components/Navbar";
import styles from './page.module.css';
import Image from 'next/image';
import wholesalevintage from '../../public/wholesalevintage.webp';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <section id="main-section" className={styles.mainsection}>
        <div className={styles.mainaction}>
          <div className={styles.motto}> 
            Manage
            <br/>
            Organize
            <br/>
            Optimize
          </div>
          <div className={styles.registerdiv}>
            <Link href="/register" className={styles.register}>Start</Link>
          </div>
        </div>
        <div className={styles.vintage}>
          <Image
            src={wholesalevintage}
            width={639}
            height={401}
            alt="Image of a vintage clothes"
          />
        </div>
      </section>
      <section id="about-section" className={styles.aboutsection}>
        <div className={`${styles.aboutdiv} ${styles.aboutfirst}`}>
          The right software has the power to unlock incredible opportunities
        </div>
        <div className={`${styles.aboutdiv} ${styles.aboutsecond}`}>
          Transform your vintage clothing business with our advanced software. Streamline inventory, automate tasks, and gain insights for informed decisions. Stay ahead in the evolving fashion landscape and unlock growth opportunities with our tailored solution.
        </div>
      </section>
      <section id="product-section" className={styles.productsection}>
        Product
      </section>
    </main>
  )
}
