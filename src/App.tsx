import Dashboard from "./Components/Dashboard/index";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import styles from "./App.module.scss";

const App = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.right_bar}>
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
