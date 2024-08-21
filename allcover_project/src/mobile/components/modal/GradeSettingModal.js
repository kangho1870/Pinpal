import styles from "../../css/components/modal/GradeSettingModal.module.css";

function GradeSettingModal() {
    return (
        <div className={styles.modalArea}>
            <div className={styles.gradeArea}>
                <div className={styles.gradeBox}>
                    <div className={styles.grades}>
                        <div>
                            <h4>1군</h4>
                        </div>
                        <div className={styles.gradeMember}>
                            <h5>1</h5>
                            <h5>강호</h5>
                            <h5>190</h5>
                        </div>
                    </div>
                    <div className={styles.grades}>
                        <h4>2군</h4>
                    </div>
                    <div className={styles.grades}>
                        <h4>3군</h4>
                    </div>
                </div>
                <div className={styles.gradeBox}>
                    <div className={styles.grades}>
                        <h4>4군</h4>
                    </div>
                    <div className={styles.grades}>
                        <h4>5군</h4>
                    </div>
                    <div className={styles.grades}>
                        <h4>6군</h4>
                    </div>
                </div>
            </div>
            <div className={styles.memberArea}>
                <div>
                    볼러
                </div>
            </div>
        </div>
    )
}

export default GradeSettingModal;