import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

function Signup() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [modal, setModal] = useState(false);
    const [dep, setDep] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectDepText, setSelectDepText] = useState('소속 학과 선택');
    const [useemail, setUseemail] = useState(false);
    const history = useHistory();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPw(e.target.value);
    };

    const handleName = (e) => {
        setName(e.target.value);
    };

    const showModal = () => {
        setModal(true);
    };

    const hideModal = () => {
        setModal(false);
        setUseemail(false);
    };

    const handleDep = (e) => {
        setDep(e.target.value);
    }
    
    const showUseemail = () => {
        setUseemail(true);
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
            email,
            password: pw,
            name,
            department: selectDepText,
        };
        axiosInstance.post('/user/signup', userData)
            .then((response) => {
                const responseData = response.data;
                console.log(responseData);
    
                if (responseData.isSuccess) {
                    console.log('회원가입 성공');
                    history.push('/mainpage');
                } else {
                    console.log('회원가입 실패:', responseData.message);
                    showUseemail();
                }
            })
            .catch((error) => {
                console.error('회원가입 중 오류 발생:', error.message);
            });
    };

    return (
        <div className="signuppage">
            <div className='Signlogo'>
                <img className="signlogo" src="img/Signlogo.png" />
            </div>
            
            <div className = 'signBox'>
                <img className="signBox" src="img/Signbox.png" />
            </div>

            <div className = 'content'>
                <div className="Title">사용할 아이디 (이메일 형태로 입력)</div>
                <div className='Wrap'>
                    <input
                        type='email' 
                        className="inputidpw" 
                        placeholder="ID"
                        value={email}
                        onChange={handleEmail} />
                </div>

                <div style={{marginTop: "26px"}} className="Title">사용할 비밀번호</div>
                <div className='Wrap'>
                    <input
                        type='password'
                        className="inputidpw"
                        placeholder="PASSWORD" 
                        value={pw}
                        onChange={handlePassword} />
                </div>

                <div style={{marginTop: "26px"}} className="Title">이름</div>
                <div className='Wrap'>
                    <input
                        type='username'
                        className="inputidpw"
                        placeholder="USERNAME" 
                        value={name}
                        onChange={handleName} />
                </div>
            </div>
            
            <div>
                <button onClick= {handleSignup} className="signupButton">
                    회원가입
                </button>
            </div>
            
            <div>
                <button onClick={showModal} className="selectdep">
                    {selectDepText}
                </button>
                {modal && (
                <div className="modal_background">
                    <div className="modal">
                        <div className='modalinputWrap'>
                            <input
                            type='dep'
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
            {useemail && (
                <div className= "modal_background">
                    <div className= "modal_useemail">
                        <div className= "modal-content">
                            <img className="modalfooter" onClick={hideModal} src="img/modal_footer.png" />
                            <img className="failicon" src="img/failicon.png" />
                            <p className="failtext"> 이미 존재하는 ID 입니다. </p>
                            <button className= "closemodal" onClick={hideModal}>확 인</button>
                        </div>
                    </div>
                </div>  
                )} 
        </div>
    )
}

export default Signup;