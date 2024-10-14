import { useState } from "react";
import styles from "../../css/components/modal/SideGameJoinUsers.module.css";

function SideGameJoinUsers({ members, sideJoinSetModalToggle }) {

    const [page, setPage] = useState(0);
    const [navBtns] = useState(["사이드", "Avg사이드"]);

    const btnClickHandler = (index) => {
        setPage(index);
    }
    
    return (
        <>
            <div className={styles.modalContainer}>
                <div className={styles.closeBox}>
                    <div onClick={sideJoinSetModalToggle}><i class="fa-regular fa-circle-xmark"></i></div>
                </div>
                <div className={styles.modalArea}>
                    <div className={styles.userArea}>
                        <div className={styles.navBox}>
                            {navBtns.map((btn, index) => (
                                <>
                                    <button className={`${styles.navBtns} ${page == index ? styles.selectBtn : ""}`} onClick={() => btnClickHandler(index)}>{btn}</button>
                                </>
                            ))}
                        </div>
                        <div className={styles.usersBox}>
                            {page == 0 && members.filter(member => member.sideGrade1 == true)
                            .map((member, index) => (
                                <div className={styles.userBox}>
                                    <h3 className={styles.userNo}>{index + 1}</h3>
                                    <div className={styles.userInfoBox}>
                                        <div>
                                            <span className={styles.userInfoTitle}>name</span>
                                            <h3 className={styles.userInfo}>{member.memberName}</h3>
                                        </div>
                                        <div>
                                            <span className={styles.userInfoTitle}>avg</span>
                                            <h3 className={styles.userInfo}>{member.memberAvg}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {page == 1 && members.filter(member => member.sideAvg == true)
                            .map((member, index) => (
                                <div className={styles.userBox}>
                                    <h3 className={styles.userNo}>{index + 1}</h3>
                                    <div className={styles.userInfoBox}>
                                        <div>
                                            <span className={styles.userInfoTitle}>name</span>
                                            <h3 className={styles.userInfo}>{member.memberName}</h3>
                                        </div>
                                        <div>
                                            <span className={styles.userInfoTitle}>avg</span>
                                            <h3 className={styles.userInfo}>{member.memberAvg}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideGameJoinUsers;
