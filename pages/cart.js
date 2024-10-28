import Head from "next/head";
import { FaShoppingCart } from "react-icons/fa";
import styles from "../styles/Cart.module.css";
import { useCart } from "../hooks/useCart";
import products from "../products.json";

import Table from "../components/Table";

const columns = [
  {
    columnId: "title",
    Header: "Maalingu Nimi",
  },
  {
    columnId: "quantity",
    Header: "Kogus",
  },
  {
    columnId: "pricePerItem",
    Header: "Hind Ühele Asjale",
  },
  {
    columnId: "total",
    Header: "Maalingu Summa",
  },
];

export default function Cart() {
  const { cartItems, checkout, updateCart } = useCart();

  const data = cartItems.map((item) => {
    const title = products.find((product) => product.id === item.id).title;
    const Quantity = () => {
      const handleOnSubmin = (e) => {
        e.preventDefault();
        const { currentTarget } = e;
        const inputs = Array.from(currentTarget.elements);
        const quantity = inputs.find(
          (input) => input.name === "quantity"
        )?.value;

        updateCart({ id: item.id, quantity: quantity && parseInt(quantity) });
      };
      return (
        <form onSubmit={handleOnSubmin} style={{ display: "flex" }}>
          <input
            className={styles.input}
            type="number"
            min={0}
            name="quantity"
            defaultValue={item.quantity}
          ></input>
          <button className={styles.updateButton} type="submit">
            Uuenda
          </button>
        </form>
      );
    };
    return {
      ...item,
      total: item.quantity * item.pricePerItem,
      title,
      quantity: <Quantity />,
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Ostukorv - Maalingu Pood</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Ostukorv
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <p>Tel. +372 32421023 Adress: Example 24</p>
          <p>E-mail: example@gmail.com</p>
          <p>Panki arve: EE123456789101010</p>
          <button className={styles.button} onClick={() => checkout()}>
          Välja Kirjutada
          </button>
          <p>Tagastus 14 päeva vahemikus.</p>
        </p>
      </main>
    </div>
  );
}
