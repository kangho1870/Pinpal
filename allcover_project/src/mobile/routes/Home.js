import BottomCategory from "../components/BottomCategory";
import HeaderCategory from "../components/HeaderCategory";
import styles from "../css/routes/Home.module.css";

function Home() {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <HeaderCategory></HeaderCategory>
                </div>
                <div className={styles.section}>
                    
                </div>
                <div className={styles.bottom}>
                    <BottomCategory></BottomCategory>
                </div>
            </div>
        </>
    )
}

export default Home;