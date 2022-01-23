import styles from "./home.module.scss";
import Head from "next/head";
import { SubscribeButton } from "../componensts/SubscribeButton";
import { GetStaticProps } from 'next';
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {

//21 97716-0367
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> Hey, welcome</span>
          <h1>News about the <span>React</span>World.</h1>
          <p>
            Get access to all the publications <br />
            <span>for { product.amount } month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1KLEnIC1RDI7fBrSHKWtOiLx', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format((price.unit_amount / 100)),

  }
   return {
     props: {
      product
     },
     revalidate: 60 * 60 * 24 //24 hs
   }
}
