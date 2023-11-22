import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

function Signup() {
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);
    const [dep, setDep] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectDepText, setSelectDepText] = useState('소속 학과 재선택');

    const handleName = (e) => {
        setName(e.target.value);
    };

    const showModal = () => {
        setModal(true);
    };

    const hideModal = () => {
        setModal(false);
    };

    const handleDep = (e) => {
        setDep(e.target.value);
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
    
    const searchres = () => {
        const encodedDepartmentName = encodeURIComponent(dep);
    
        axiosInstance.get(`/category/find-department/${encodedDepartmentName}`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
            },
            params: {
                departmentName: encodedDepartmentName,
            },
        })
        .then((response) => {
            const responseData = response.data;
            console.log(response.data);
            if (responseData && responseData.isSuccess) {
                const result = responseData.result;
    
                if (result && result.length > 0) {
                    // 요청 성공 및 데이터가 존재할 경우
                    const department = result[0];
    
                    console.log('학과 ID:', department.id);
                    console.log('학과 이름:', department.name);
                    console.log('카테고리 유형:', department.categoryType);
    
                    setSearchResults(result);
                } else {
                    console.log('해당 학과의 데이터가 없습니다.');
                    setSearchResults([]);
                }
            } else {
                console.error('데이터를 가져오는 중 오류 발생:', responseData.message);
            }
        })
        .catch((error) => {
            console.error('데이터를 가져오는 중 오류 발생:', error.message);
        });
    };
    
    const handleSignup = () => {
        const userData = {
            name,
            department: selectDepText,
        };
        axiosInstance.post('/user/signup', userData)
            .then((response) => {
                const responseData = response.data;
                console.log(responseData);
    
                if (responseData.isSuccess) {
                    console.log('회원가입 성공');
                    // 여기서 메인페이지로 곧바로 이동
                } else {
                    console.log('회원가입 실패:', responseData.message);
                }
            })
            .catch((error) => {
                console.error('회원가입 중 오류 발생:', error.message);
            });
    };

    return (
        <div className="signuppage">
            <div className='profileimg'>
                <img className="profile" src="img/profile.png" />
            </div>
            <div className='backbutton'>
                <Link to="/mypage" style={{ textDecoration: "none" }}>
                    <img className="backicon" src="img/backicon.png" />
                </Link>
            </div>
            <div className = 'ModifyBox'>
                <img className="ModifyBox" src="img/ModifyBox.png" />
            </div>
            <div className = 'Modifycontent'>
                <div className="Title">이름</div>
                <div className='Wrap'>
                    <input
                        className="inputidpw"
                        placeholder="USERNAME" 
                        value={name}
                        onChange={handleName} />
                </div>
            </div>
            <div>
                <button onClick= {handleSignup} className="modifyButton">
                    수정하기
                </button>
            </div>
            
            <div>
                <button onClick={showModal} className="modifydep">
                    {selectDepText}
                </button>
                {modal && (
                <div className="modal_background">
                    <div className="modal">
                        <div className='modalinputWrap'>
                            <input
                            className="inputdep"
                            placeholder="소속학과명" 
                            value={dep}
                            onChange={handleDep} />
                        </div>
                        <img className="modalbar" src="img/modalbar.png" />
                        <p className="bartext"> 소속 학과를 검색해보세요. </p>
                        <img onClick={searchres} className="search" src="img/search.png" />
                        <img onClick={hideModal} className="closeButton" src="img/close.png" />
                        <img className="searchresultbox" src="img/searchresultbox.png" />
                        <ul>
                            {searchResults.map((result) => (
                                <button onClick={() => {
                                    hideModal();
                                    setSelectDepText(result.name)
                                }}
                                className= "depname" 
                                key={result.id}>
                                    {result.name}
                                </button>
                            ))}
                        </ul>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Signup;