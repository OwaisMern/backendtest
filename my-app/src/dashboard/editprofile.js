
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {useState,useEffect} from 'react'
import axios from 'axios'
import Header from './header'


function Editprofile() {
    let params = useParams();
    let navigate = useNavigate();
    const [user,setuser] = useState(' ');
    const [email,setemail] = useState(' ');
    const [nick,setnick] = useState(' ');
    

    useEffect( () => {
        axios.get(`http://localhost:4040/getuser`)
        .then(res => {    
            setuser(res.data.filter( items => { return items.id == params.id })[0].username)
            setemail(res.data.filter( items => { return items.id == params.id })[0].Email)
            setnick(res.data.filter( items => { return items.id == params.id })[0].nickname)
        })
    },[])

    function update_profile(e){
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://localhost:4040/updateprofile',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(
                {
                    user: user,
                    email:email,
                    id:params.id,
                    nick:nick
                }
            )
        }).then(function (response) {
            navigate("/dashboard/?update=Data Updated");
        })
    }
    
    return (
        <div className="dashboard_main_container">
                <Header />
                <div className="dashboard_main_container_inner">
                    <h2>Edit Profile</h2>
                    <div className="edit_profile_main_container">
                        <div className="edit_profile_main_container_form">
                            <form className="edit_profile__form">
                                <label><b>User Name</b></label>
                                <input onChange={(e) => setuser(e.target.value)} value={user} type="text" placeholder="User Name" name="User" required></input>
                               
                                <label><b>Email</b></label>
                                <input onChange={(e) => setemail(e.target.value)} value={email} type="email" placeholder="Enter Email" name="Email" required></input>
                                
                                <label><b>Nick Name</b></label>
                                <input onChange={(e) => setnick(e.target.value)} value={nick} type="text" placeholder="Enter Nick Name" name="Nick" required></input>
                                <button onClick={update_profile}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>         
        </div>
    );
  }
  
  export default Editprofile;