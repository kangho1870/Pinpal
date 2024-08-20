import { Outlet } from "react-router-dom";
import BottomCategory from "../components/BottomCategory";
import HeaderCategory from "../components/HeaderCategory";
import styles from "../css/routes/Home.module.css";
import DefaultMain from "./DefaultMain";

function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <HeaderCategory ></HeaderCategory>
                </div>
                <Outlet>

                </Outlet>
                <div className={styles.bottom}>
                    <BottomCategory></BottomCategory>
                </div>
            </div>
        </>
    )
}

export default Home;