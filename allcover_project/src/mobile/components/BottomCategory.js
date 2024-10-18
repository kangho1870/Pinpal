import { useNavigate } from "react-router-dom";
import useStore from "../../stores/useSignInStore";
import styles from "../css/components/BottomCategory.module.css";
import { MY_CLUB_PATH } from "../../constants";

function BottomCategory() {

    const navigator = useNavigate();

    const onClickBtnHandler = () => {
        navigator(MY_CLUB_PATH);
    }

    return (
        <>
            <div className={styles.bottomCategory}>
                <div className={styles.categoryBox}>
                    <i class="fa-solid fa-house" style={{color: "#a3a3a3"}}></i>
                    <span>홈</span>
                </div>
                <div className={styles.categoryBox}>
                    <i class="fa-solid fa-bowling-ball" style={{color: "#a3a3a3"}}></i>
                    <span>검색</span>
                </div>
                <div className={styles.categoryBox} onClick={onClickBtnHandler}>
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