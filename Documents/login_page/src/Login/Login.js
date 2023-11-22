import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

    /* test 아이디
    hailcryptic@gmail.com
    test123
    */

export default function Login() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [failid, setFailid] = useState(false);
    const [failpw, setFailpw] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      // 페이지가 로드될 때 localStorage에서 토큰을 확인하여 로그인 상태를 설정
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPw(e.target.value);
    };

    const handleLogin = () => {
        axios.post(`http://43.202.250.219:8080/user/login`, { email: email, password: pw })
        .then((response) => { 
            console.log(response.data) 
            const code = response.data.code;
            // 특정 코드에 따라 모달 띄우기
            if (code === 404) { // 잘못된 아이디
              setFailid(true);
            } 
            else if (code === 400) { // 잘못된 비밀번호
              setFailpw(true);
            }
            else if (code === 200) {
            const token = response.data.token;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            }
          })
        .catch((error) => {console.log(error)})
    }

    const closeModal = () => {
        setFailid(false);
        setFailpw(false);
    };
    
    return (
        <div className="page">
            <div className='loginlogo'>
                <img className="callogo" src="img/logo.png" />
            </div>
            <div classname='Box'>
                <img className="loginBox" src="img/loginBox.png" />
            </div>
            <div className='centerContainer'>
            <div className='contentWrap'>
                <div className="inputTitle">아이디</div>
                <div className='inputWrap'>
                    <input
                        type='text'
                        className="input"
                        placeholder="ID"
                        value={email}
                        onChange={handleEmail} />
                </div>
                <div style={{ marginTop: "26px" }} className="inputTitle">비밀번호</div>
                <div className='inputWrap'>
                    <input
                        type='password'
                        className="input"
                        placeholder="PASSWORD"
                        value={pw}
                        onChange={handlePassword} />
                </div>
            </div>
            </div>
            <div className='signupbutton'>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                    <button className="signButton">
                        회원가입
                    </button>
                </Link>
            </div>
            <div className='loginbutton'>
                <button onClick={handleLogin} className="bottomButton">
                    로그인
                </button>
                {failid && (
                <div className= "modal_background_login">
                    <div className= "modal_login">
                        <div className= "modal-content">
                            <img className="modalfooter" onClick={closeModal} src="img/modal_footer.png" />
                            <img className="failicon" src="img/failicon.png" />
                            <p className="failtext"> 존재하지 않는 ID 입니다. </p>
                            <button className= "closemodal" onClick={closeModal}>확 인</button>
                        </div>
                    </div>
                </div>  
                )} 
                {failpw && (
                <div className= "modal_background_login">
                    <div className= "modal_login">
                    <div className= "modal-content">
                            <img className="modalfooter" onClick={closeModal} src="img/modal_footer.png" />
                            <img className="failicon" src="img/failicon.png" />
                            <p className="failtext"> 잘못된 PW입니다. </p>
                            <button className= "closemodal" onClick={closeModal}>확 인</button>
                        </div>
                    </div>
                </div>  
                )}          
            </div>
        </div>
    )
}