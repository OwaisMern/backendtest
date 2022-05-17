import {useState,useEffect} from 'react'
import axios from 'axios'
import { Navigate,useNavigate,Link } from "react-router-dom";

function Login() {

    const [password,setpassword] = useState();
    const [email,setemail] = useState();
    const [getalluser,setgetalluser] = useState();
    const [is_user_login,setis_user_login] = useState(false); 
    let navigate = useNavigate();
    
    useEffect( () => {
      axios.get(`http://localhost:4040/getuser`)
          .then(res => {    
              setgetalluser(res.data)
            })

        if(localStorage.getItem("user") !== null){
            setis_user_login(true)
        }
    },[])
    
    function login_sub(e){
        e.preventDefault()
         var form_condition = true;
        document.querySelectorAll("input").forEach(function(index,key){
            if( index.value == ""){
              form_condition = false;
              document.getElementById('alert_'+index.attributes.name.nodeValue).innerHTML = 'Please Add '+index.getAttribute('data-method');
            }else{

                if(index.attributes.name.nodeValue === 'Email'){
                    var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!EMAIL_REGEX.test(index.value) && index.value !== "") {
                        form_condition = false;
                        document.getElementById('alert_Email').innerHTML = 'Invalid email address!';
                    }else{
                        document.getElementById('alert_'+index.attributes.name.nodeValue).innerHTML = '';
                    }
                }else{
                    document.getElementById('alert_'+index.attributes.name.nodeValue).innerHTML = '';
                } 
            }
        })
        if(form_condition){
          const check_already_user = getalluser.filter( items => {return items.Email == email}  )
          if(check_already_user.length == 1){
            axios({
                method: 'post',
                url: 'http://localhost:4040/password',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(
                    {
                        pass: password,
                        checkpass:check_already_user[0].Password,
                        id:check_already_user[0].id
                    }
                )
            }).then(function (response) {
                if(response.data.message == 'Successfull'){
                    setis_user_login(true);
                    localStorage.setItem("user", JSON.stringify(response.data))
                }else{
                    document.getElementById("alert_psw").innerHTML = 'Incorrect Password' 
                }
            })
          }else{
            document.getElementById("alert_Email").innerHTML = 'Incorrect Email'
          }
          
        }
    }
  
    return (
        <div className="main_login_container">
            {
                is_user_login ? <Navigate to="/dashboard/?update=Your are Logged In" replace={true} />
                :
            
            
            <div className="Login_app">
                <div id="id01" className="modal">
                    <form className="modal-content animate" action="">
                        <div className="imgcontainer">
                        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="avatar"></img>
                        </div>
                        <div className="Login_text">
                            <h2>Login</h2>
                        </div>

                        <div className="container">

                        <label><b>Email</b></label>
                        <input onChange={(e) => setemail(e.target.value) } data-method="Email"  type="text" placeholder="Enter Email" name="Email" required></input>
                        <span className='alert_text' id="alert_Email"></span>

                        <label htmlFor="psw"><b>Password</b></label>
                        <input onChange={(e) => setpassword(e.target.value) } type="password" placeholder="Enter Password" data-method="Password" name="psw" required></input>
                        <span className='alert_text' id="alert_psw"></span>
                        
                        <button onClick={login_sub} type="submit">Login</button>
                            <div className="login_redirect">
                                <p>Don't have an account? <Link to="/register">Register</Link> for free!</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            }
        </div>
    );
  }
  
  export default Login;