import styles from "../css/components/HeaderCategory.module.css";

function HeaderCategory(props) {
    return (
        <>
            <div className={styles.mainBox}>
                <div>
                    <img src={require("../../imges/headerCategory-img/logo.png")} className={styles.logoBtn}></img>
                </div>
                <div>
                    Bowling
                </div>
                <div className={styles.categoryBox}>
                    <img src={require("../../imges/headerCategory-img/scoreboard.png")} className={styles.categoryBtn}></img>
                    <img src={require("../../imges/headerCategory-img/my.png")} className={styles.categoryBtn}></img>
                </div>
            </div>
        </>
    )
}

export default HeaderCategory;