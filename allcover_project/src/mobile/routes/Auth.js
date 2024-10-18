import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { signUpRequest } from "../../apis";
import { MAIN_PATH, ROOT_PATH } from "../../constants";


export default function Auth() {

    const [queryParam] = useSearchParams();
    const snsId = queryParam.get("snsId");
    const joinPath = queryParam.get("joinPath");
    const isSnsSignUp = snsId !== null && joinPath !== null;

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
    const navigator = useNavigate();

    const isSnsSignUp = snsId !== null && joinPath !== null;

    const [memberName, setMemberName] = useState("");
    const [memberId, setMemberId] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");

    // 각 input의 onChange 핸들러
    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const signUpResponse = (responseBody) => {
        const message = 
            !responseBody ? '서버에 문제가 있습니다.' :
            responseBody.code === 'VF' ? '올바른 데이터가 아닙니다.' :
            responseBody.code === 'DI' ? '중복된 아이디입니다.' :
            responseBody.code === 'DT' ? '중복된 전화번호입니다.' :
            responseBody.code === 'TAF' ? '인증번호가 일치하지 않습니다.' :
            responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';
        
        const isSuccessed = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccessed) {
            alert(message);
            return;
        }

        navigator(ROOT_PATH);
    };

    const signUpBtnClickHandler = () => {
        const requestBody = {
            memberName,
            memberId,
            password,
            gender,
            joinPath: joinPath ? joinPath : "home",
            snsId
        };
        console.log(requestBody);

        signUpRequest(requestBody).then(signUpResponse);
    };

    return (
        <div>
            <h2>추가정보 입력</h2>
            <div>
                id: 
                <input 
                    type="text" 
                    value={memberId} 
                    onChange={handleInputChange(setMemberId)} 
                />
            </div>
            <div>
                pwd: 
                <input 
                    type="password" 
                    value={password} 
                    onChange={handleInputChange(setPassword)} 
                />
            </div>
            <div>
                이름: 
                <input 
                    type="text" 
                    value={memberName} 
                    onChange={handleInputChange(setMemberName)} 
                />
            </div>
            <div>
                성별: 
                <input 
                    type="text" 
                    value={gender} 
                    onChange={handleInputChange(setGender)} 
                />
            </div>
            <button onClick={signUpBtnClickHandler}>확인</button>
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