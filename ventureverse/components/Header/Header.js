import { getProvider } from "@/utils/walletprovider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWallet } from "@/store/walletSlice";
import styles from "./Header.module.css";
import Link from "next/link";

const Header = () => {
  const wallet = useSelector((state) => state.wallet.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedWallet = localStorage.getItem("wallet");

    if (savedWallet) {
      dispatch(addToWallet(savedWallet));
    }

    const ethereum = window.ethereum;
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts) => {
        dispatch(addToWallet(accounts[0]));
        localStorage.setItem("wallet", accounts[0]);
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await getProvider().send("eth_requestAccounts", []);
      dispatch(addToWallet(accounts[0]));
      localStorage.setItem("wallet", accounts[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.uls}>
          <li className={styles.lis}>
            <Link className={styles.links} href="companies">
              Donate To Companies
            </Link>
          </li>
          <li className={styles.lis}>
            <Link className={styles.links} href="makecompany">
              Make Company
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={connectWallet}>
          {wallet && wallet.length > 0
            ? `Connected: ${wallet.substring(0, 5)}...${wallet.substring(39)}`
            : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default Header;
