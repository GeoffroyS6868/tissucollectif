import Navbar from "../components/Navbar";
import styles from './page.module.css';
import Image from 'next/image';
import vintageImage from '../../public/wholesalevintage.webp';
import ideaImage from '../../public/idea.png';
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
            <Link href="/register" className={styles.actionbutton}>Start</Link>
            <Link href="#about-section" className={`${styles.actionbutton} ${styles.invert}`}>Discover</Link>
          </div>
        </div>
        <div className={styles.vintage}>
          <Image
            src={vintageImage}
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
        <div className={styles.productphrase}>
          Secure tranquility with flexible spend management tools.
        </div>
        <div className={styles.productdiv}>
          <Image
            src={ideaImage}
            alt="Tool image 1"
            className={styles.toolimage}
          />
          <div className={styles.tooldiv}>
            <h1>
              Optimal Inventory Status Management
            </h1>
            <p>
              Direct and control your bale&apos;s status through careful and thorough management.
            </p>
          </div>
        </div>
        <div className={styles.productdiv}>
          <div className={styles.tooldiv}>
            <h1>
              Generation of Ideal Prices
            </h1>
            <p>
              Our sofware generate optimal prices for your vintage clothing using your old selling data.
            </p>
          </div>
          <Image
            src={ideaImage}
            alt="Tool image 2"
            className={styles.toolimage}
          />
        </div>
      </section>
    </main>
  )
}
