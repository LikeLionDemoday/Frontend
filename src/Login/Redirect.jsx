import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";


export function Redirect(){
    const navigate = useNavigate();
    let access_code = new URL(window.location.href).searchParams.get("code");
   

    useEffect(() => {
            console.log("access_code" ,access_code);
            const sendCode = async(access_code)=>{
                try{
                    const response=await axiosInstance.post(`/auth/kakao/login`,{
                        accessCode: access_code
                    })
                    
                    console.log(response.data.data.existMember);

                    console.log(response.data.data.accessToken);
                    console.log(response.data.data.refreshToken);
                    
                    //받아온 토큰 로컬 스토리지에 저장
                    localStorage.setItem("access_token",response.data.data.accessToken);
                    localStorage.setItem("refresh_token",response.data.data.refreshToken);
                    
                    if(response.data.data.existMember===true){
                        navigate("/main"); //로그인 성공 후 메인페이지로 이동
                    }else{ //서비스 최초 로그인 시
                        navigate("/nickname"); //로그인 성공 후 닉네임 입력 페이지로 이동
                    }
                   

                }
                catch(error){
                    console.log(error);
                    console.log("로그인 실패");
                    navigate("/login"); //로그인 실패 후 로그인 페이지로 이동
                }
            }
            
            sendCode(access_code);
        
      
    },[])
    
    return(
        <>
        <p>로그인 중입니다.</p>
        </>
    );
}