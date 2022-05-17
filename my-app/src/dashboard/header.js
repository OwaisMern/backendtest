import {Link,useNavigate,useParams} from "react-router-dom";
import { Navigate } from "react-router-dom";
import {useState,useEffect} from 'react'
import axios from 'axios'


function Header() {
    let navigate = useNavigate();
    const [username,setnickname] = useState();
    const [getid,setgetid] = useState();
    let params = useParams();

    useEffect( () => {
    if(localStorage.getItem("user") !== null){
        const {id,token} = JSON.parse(localStorage.getItem("user"))
        axios({
            method: 'post',
            url: 'http://localhost:4040/verifyuser',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({id:id, token:token})
        }).then(function (response) {
            if(response.data._id !== id){
                navigate("/login");
            }else{
                setgetid(response.data._id)
                axios.get(`http://localhost:4040/getuser`)
                .then(res => {    
                    setnickname(res.data.filter( items => { return items.id == response.data._id })[0].nickname)
                })
            }
        })
    }else{
        navigate("/login");
    }
    })

    function logout(){
        localStorage.removeItem('user')
        navigate("/login")
    }
    return (
                <header>
                    <div className="topnav" id="myTopnav">
                        <div className="dasboard_link">
                            <h2><Link to="/dashboard">Dashboard</Link></h2>
                    </div>
                    <div className="menu_link">
                            <Link to="/login">Login</Link>
                            <a onClick={logout} >Logout</a>
                            <Link to="/register">Register</Link>
                            <Link to={'/edit/'+getid}>Edit Profile</Link>
                            <button className="btn success">{username}</button>
                    </div>
                    </div>
                </header>
            );
  }
  
  export default Header;