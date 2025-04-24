import Head from "next/head";
import { FaShoppingCart } from "react-icons/fa";
import styles from "../styles/Cart.module.css";
import { useCart } from "../hooks/useCart";
import products from "../products.json";

import Table from "../components/Table";

const columns = [
  {
    columnId: "title",
    Header: "Название Картины",
  },
  {
    columnId: "quantity",
    Header: "Количество",
  },
  {
    columnId: "pricePerItem",
    Header: "Цена За Штуку",
  },
  {
    columnId: "total",
    Header: "Общая Стоимость",
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
            Обновить
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
        <title>Корзина - Магазин Картин</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Корзина
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <p>Тел. +372 32421023 Адрес: Example 24</p>
          <p>Э-почта: example@gmail.com</p>
          <p>Счёт банка: EE123456789101010</p>
          <button className={styles.button} onClick={() => checkout()}>
          Оформить покупку
          </button>
          <p>Возврат в течении 14 дней.</p>
        </p>
      </main>
    </div>
  );
}
