import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Roots(){
    const [user, setUser] = useState(null)
    let content;
    useEffect(() => {
        fetch("http://localhost:5000/users", {
            headers: {
                "Content-Type": "application/json",
            },
        credentials: "include"
    })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        
        if(data.googleUser != undefined){
            setUser("google");
        }
        else if(data.localUser != undefined){
            setUser("local");
        }
        else{
            setUser(null)
        }
    })
    }, [])

    if(user != null){
        content = <div>
            <h1>Logined</h1>
            <h1 style={{cursor: "pointer"}} onClick={function(){
                fetch("http://localhost:5000/logout", {
                    method: "get",
                    
                })
                .then(function(){
                    setUser(null);
                })
            }}>Logout</h1>
        </div>
    }
    else{
        content = <div>
            <p><Link to="/regist">회원가입</Link></p>
            <p><Link to="/login">로그인</Link></p>
            <p><a href="http://localhost:5000/auth">구글로그인</a></p>
            </div>
    }

    return(
        content
    )
}

export default Roots;