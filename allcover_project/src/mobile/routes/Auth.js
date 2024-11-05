import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { idCheckRequest, signUpRequest } from "../../apis";
import { ROOT_PATH } from "../../constants";
import styles from "../css/routes/Auth.module.css";


export default function Auth() {

    const [queryParam] = useSearchParams();
    const snsId = queryParam.get("snsId");
    const joinPath = queryParam.get("joinPath");

    const [path, setPath] = useState("로그인");

    useEffect(() => {
        if(snsId && joinPath) 
            setPath("회원가입");
    }, [])
    return (
        <div>
            {path == "로그인" &&
                <SignIn></SignIn>
            }
            {path == "회원가입" &&
                <SignUp></SignUp>
            }
        </div>
    )
};

function SignUp() {
    const [queryParam] = useSearchParams();
    const snsId = queryParam.get("snsId");
    const joinPath = queryParam.get("joinPath");
    const profileImageUrl = queryParam.get("profileImageUrl");
    console.log(profileImageUrl)
    const navigator = useNavigate();

    const isSnsSignUp = snsId !== null && joinPath !== null;

    const [memberName, setMemberName] = useState("");
    const [memberBirth, setMemberBirth] = useState("");
    const [memberId, setMemberId] = useState("");
    const [gender, setGender] = useState(0);

    const [idMessage, setIdMessage] = useState("");
    const [birthMessage, setBirthMessage] = useState("");
    
    const [idMessgaeError, setIdMessageError] = useState(false);
    const [birthMessageError, setBirthMessageError] = useState(false);

    const [matchedId, setMatchedId] = useState(false);
    const [matchedBirth, setMatchedBirth] = useState(false);

    const [idCheckBtnStatus, setIdCheckBtnStatus] = useState(false);

    const signUpRequestCheck = memberName && matchedId && matchedBirth && (gender === 0 || gender === 1) && snsId && joinPath;

    const handleIdInputChange = (event) => {
        const { value } = event.target;
        setMemberId(value);

        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isMatched = pattern.test(value);

        const message = (isMatched || !value) ? "" : "올바른 이메일 주소를 입력하세요."
        setIdMessage(message);
        setIdMessageError(!isMatched);
        setMatchedId(isMatched);
    };

    const handleNameInputChange = (event) => {
        setMemberName(event.target.value);
    };

    const handleBirthInputChange = (event) => {
        const { value } = event.target;
        setMemberBirth(value);

        const pattern = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
        const isMatched = pattern.test(value);

        const message = (isMatched || !value) ? "" : "YYYYMMDD 형식으로 입력하세요."
        setBirthMessage(message);
        setBirthMessageError(!isMatched);
        setMatchedBirth(isMatched);
    };

    const signUpResponse = (responseBody) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
            responseBody.code === 'DI' ? '중복된 아이디입니다.' :
            responseBody.code === 'DT' ? '중복된 전화번호입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        navigator(ROOT_PATH);
    };

    const signUpBtnClickHandler = () => {
        if(!signUpRequestCheck) return;
        const requestBody = {
            memberName,
            memberId,
            memberBirth,
            gender,
            joinPath: joinPath ? joinPath : "home",
            snsId,
            profileImageUrl
        };

        signUpRequest(requestBody).then(signUpResponse);
    };

    const idCheckResponse = (responseBody) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isMatched = pattern.test(memberId);

        if(!isMatched) {
            return;
        }

        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '올바른 형식이 아닙니다.' :
            responseBody.code === 'DI' ? '이미 사용중인 아이디입니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : 
            responseBody.code === 'SU' ? '사용 가능한 아이디입니다.' : '';

        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        setIdMessage(message);
    };

    const idCheck = () => {
        if(!memberId) return;
        const id = { memberId: memberId}
        idCheckRequest(id).then(idCheckResponse);
    }




    return (
        <div className={styles.signUpContainer}>
            <div className={styles.topBox}>
                <p className={styles.title}>추가정보 입력</p>
            </div>
            <div className={styles.addInformationContainer}>
                <div className={styles.addInformationBox}>
                    <span className={styles.informationTitle}>아이디(이메일)</span>
                    <div className={styles.emailBox}>
                        <input
                            className={styles.signUpInput}
                            placeholder="이메일 주소"
                            type="text" 
                            value={memberId} 
                            onChange={(e) => handleIdInputChange(e)} 
                        />
                        <button className={styles.emailCheckBtn} onClick={idCheck} disabled={!matchedId}>중복확인</button>
                    </div>
                    <span className={`${styles.message} ${idMessage === "사용 가능한 아이디입니다." ? styles.okMessage : ""}`}>{idMessage}</span>
                </div>
                <div className={styles.addInformationBox}>
                    <span className={styles.informationTitle}>이름</span>
                    <input
                        className={styles.signUpInput}
                        placeholder="이름"
                        type="text" 
                        value={memberName} 
                        onChange={handleNameInputChange} 
                    />
                </div>
                <div className={styles.addInformationBox}>
                    <span className={styles.informationTitle}>생년월일</span>
                    <input
                        className={styles.signUpInput}
                        placeholder="8자리 (19970405)"
                        type="text" 
                        value={memberBirth} 
                        onChange={handleBirthInputChange} 
                    />
                    {birthMessageError && 
                        <span className={styles.message}>{birthMessage}</span>
                    }
                </div>
                <div className={styles.addInformationBox}>
                    <span className={styles.informationTitle}>성별</span>
                    <div className={styles.btnBox}>
                        <button className={`${styles.btn} ${gender == 0 ? styles.selectedBtn : ""}`} onClick={() => setGender(0)}>남자</button>
                        <button className={`${styles.btn} ${gender == 1 ? styles.selectedBtn : ""}`} onClick={() => setGender(1)}>여자</button>
                    </div>
                </div>
            </div>
            <div className={styles.signUpBtnBox}>
                <button className={styles.signUpBtn} onClick={signUpBtnClickHandler}>시작하기</button>
            </div>
        </div>
    );
}

function SignIn() {

    return (
        <div>
            로그인
        </div>
    )
}