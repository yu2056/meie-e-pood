import Head from "next/head";
import styles from "@/styles/Home.module.css";
import products from "../products.json";
import { useCart } from "../hooks/useCart";
import Link from "next/link";
import React from "react";

export default function Home() {
  //@ts-ignore
  const { addToCart } = useCart();
  return (
    <>
      <Head>
        <title>Магазин Картин</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <ul className={styles.grid}>
          {products.map((product) => {
            const { id, image, title, description, price } = product;
            return (
              <li key={id} className={styles.card}>
                <Link href={`/products/${id}`}>
                  <img src={image} alt={title}></img>
                  <h3>{title}</h3>
                  <p>{price}€</p>
                  <p>{description}</p>
                </Link>

                <button
                  style={{ zIndex: 10 }}
                  className={styles.button}
                  onClick={() => addToCart({ id })}
                >
                  Положить в Корзину
                </button>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
