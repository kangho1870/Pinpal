import styles from "../css/components/BottomCategory.module.css";

function BottomCategory() {

    return (
        <>
            <div className={styles.bottomCategory}>
                <div className={styles.categoryBox}>
                    <i class="fa-solid fa-house" style={{color: "#a3a3a3"}}></i>
                    <span>홈</span>
                </div>
                <div className={styles.categoryBox}>
                    <i class="fa-solid fa-bowling-ball" style={{color: "#a3a3a3"}}></i>
                    <span>볼링클럽</span>
                </div>
                <div className={styles.categoryBox}>
                    <i class="fa-solid fa-users" style={{color: "#a3a3a3"}}></i>
                    <span>내모임</span>
                </div>
                <div className={styles.categoryBox}>
                    <i class="fa-solid fa-user" style={{color: "#a3a3a3"}}></i>
                    <span>마이페이지</span>
                </div>
            </div>
        </>
    )
}

export default BottomCategory;