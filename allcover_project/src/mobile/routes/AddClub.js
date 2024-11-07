import { useNavigate } from "react-router-dom";
import styles from "../css/routes/AddClub.module.css";
import { onClickBackBtn } from "../../hooks";
import { useState } from "react";
import ReactQuill from "react-quill";
import useSignInStore from "../../stores/useSignInStore";
import { addClubRequest } from "../../apis";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, MY_CLUB_PATH, ROOT_PATH } from "../../constants";

export default function AddClub() {
    const navigator = useNavigate();
    const { signInUser } = useSignInStore();
    const memberId = signInUser?.id || null;
    const [cookies] = useCookies();
    const token = cookies[ACCESS_TOKEN];
    const [place, setPlace] = useState("");
    const [clubName, setClubName] = useState("");
    const [clubDescription, setClubDescription] = useState("");

    const addClubResponse = (responseBody) => {

        const message = 
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'AF' ? '잘못된 접근입니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'SJC' ? '취소 처리되었습니다.' : 
        responseBody.code === 'SU' ? '클럽을 개설하였습니다.' : '';

        const isSuccessed = responseBody.code === 'SU' || 'SJC';
        if (!isSuccessed) {
            alert(message);
            return;
        }
        
        alert(message);
        navigator(ROOT_PATH);
    }

    const addClub = () => {
        const dto = {
            memberId: memberId,
            place: place,
            clubName: clubName,
            clubDescription: clubDescription
        }
        console.log(dto)
        addClubRequest(dto, token).then(addClubResponse);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.topCategory} onClick={() => onClickBackBtn(navigator)}><i class="fa-solid fa-chevron-left"></i></div>
                    <h5 className={styles.topCategoryTitle}>클럽 개설</h5>
                </div>
                <div className={styles.contents}>
                    <div className={styles.inputBox}>
                        <p>지역</p>
                        <input className={styles.inputText} onChange={(e) => setPlace(e.target.value)} placeholder="지역을 입력해 주세요." />
                    </div>
                    <div className={styles.inputBox}>
                        <p>클럽명</p>
                        <input className={styles.inputText} onChange={(e) => setClubName(e.target.value)} placeholder="클럽 이름" />
                    </div>
                    <div className={styles.inputBox}>
                        <p>클럽 소개</p>
                    </div>
                    <div className={styles.inputBox}>
                        <DescriptionEditor setClubDescription={setClubDescription}></DescriptionEditor>
                    </div>
                </div>
                <div className={styles.clubAddBtnBox}>
                    <button className={styles.clubAddBtn} onClick={addClub}>클럽 만들기</button>
                </div>
            </div>
        </>
    )
}

function DescriptionEditor({ setClubDescription }) {
    const modules = {
        toolbar: {
            container: [
                ["image"],
                [{ header: [1, 2, 3, 4, 5, false] }],
                ["bold", "underline"],
            ],
        },
    }

    return (
        <>
            <ReactQuill
                style={{ width: "100%", height: "100%" }}
                modules={modules}
                onChange={setClubDescription}
            >
            </ReactQuill>
        </>
    )
}