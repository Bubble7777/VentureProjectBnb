import Header from "../Header/Header";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
