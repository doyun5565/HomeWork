import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom"

export default function Mypage() {
    const history = useHistory();
    const [userData, setUserData] = useState({});
    const [modal, setModal] = useState(false);
    const [schedulename, setSchedulname] = useState('');
    const [scheduleplace, setSchedulplace] = useState('');

    const showModal = () => {
        setModal(true);
    };

    const hideModal = () => {
        setModal(false);
    };

    const handleSchedulname = (e) => {
        setSchedulname(e.target.value);
    }

    const handleSchedulplace = (e) => {
        setSchedulplace(e.target.value);
    }

    const axiosInstance = axios.create({
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("Authorization") || ''
        },
        baseURL: 'http://43.202.250.219:8080',
      });

    useEffect(() => {
    // 사용자 정보를 가져오는 API 호출
    const token = localStorage.getItem('Authorization');

    if (token) {
      axiosInstance.get('/user/mypage', {
        headers: {
          Authorization: token,
        },
      })
      .then(response => {
        // API에서 받아온 사용자 정보를 상태 변수에 저장
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
     }
    }, [axiosInstance]);

    const handleLogout = () => {
      localStorage.removeItem('token');
      history.push('/login');
    };

    return (
        <div className="page">
            <div className='profileimg'>
                <img className="profile" src="img/profile.png" />
            </div>
            <p className="username">{userData.username}</p>
            <p className="userdep">{userData.department}</p>
            <p className="userid">{userData.email}</p>

            <div className='homeimg'>
                <Link to="/mainpage" style={{ textDecoration: "none" }}>
                    <img className="home" src="img/home.png" />
                </Link>
            </div>
            <div className='mypagel'>
                <img className="mypageline" src="img/mypageline.png" />
            </div>
            <div className='mypagel2'>
                <img className="mypageline2" src="img/mypageline2.png" />
            </div>
            <div className='first'>
                <Link to="/modifyinfo" style={{ textDecoration: "none" }}>
                    <button className="firstButton">
                        개인정보 수정
                    </button>
                </Link>
            </div>
            <div className='second'>
                <Link to="/modifylike" style={{ textDecoration: "none" }}>
                    <button className="secondButton">
                        관심 항목 수정
                    </button>
                </Link>
            </div>
            <div className='third'>
                <button onClick={showModal} className="thirdButton">
                        개인 일정 추가
                </button>
                {modal && (
                <div className="modal_background">
                    <div className="addschedulemodal">
                        <div className='addmodalinputWrap'>
                            <input
                            className="schedulename"
                            placeholder="제목" 
                            value={schedulename}
                            onChange={handleSchedulname} />
                        </div>
                        <div className='addmodalinputWrap2'>
                            <input
                            className="scheduleplace"
                            placeholder="장소" 
                            value={scheduleplace}
                            onChange={handleSchedulplace} />
                        </div>
                        <img className="addschedulebar" src="img/addschedulebar.png" />
                        <p className="addtext"> 개인 일정 추가 </p>
                        <img onClick={hideModal} className="modalcloseButton" src="img/close.png" />
                        </div>
                    </div>
                )}
            </div>
            <div className='mypagel3'>
                <img className="mypageline3" src="img/mypageline2.png" />
            </div>
            <div>
                <button onClick={handleLogout} className="logoutButton">
                    로그아웃
                </button>
            </div>
            <div>
                <Link to="/unregister" style={{ textDecoration: "none" }}>
                    <button className="unregisterButton">
                        회원탈퇴
                    </button>
                </Link>
            </div>
            <div className='logoutline'>
                <img className="outline" src="img/logoutline.png" />
            </div>
        </div>
    )
}