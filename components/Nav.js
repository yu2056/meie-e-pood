import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Nav.module.css";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

const Nav = () => {
  const { totalPrice, checkout, totalItems } = useCart();
  return (
    <nav className={styles.nav}>
      <div className={styles.main}>
      <Link href="/">
          <button>
        <p className={styles.navTitle}>Магазин Картин</p>
        </button>
        </Link>
        <p className={styles.description}>
          Уникальные картины в нашем э-магазине!
        </p>
      </div>
      <p>
        <Link href="/cart">
          <button>
            <FaShoppingCart size={50} color="whitesmoke" />
            <p>{totalPrice} €</p>
          </button>
        </Link>
      </p>
    </nav>
  );
};

export default Nav;
