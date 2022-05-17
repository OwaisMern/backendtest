import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link,useNavigate,useParams,Navigate} from "react-router-dom";

function Register() {
  const [username,setusername] = useState();
  const [email,setemail] = useState();
  const [password,setpassword] = useState();
  const [getalluser,setgetalluser] = useState();
  const [loader,setloader] = useState(false);
  let navigate = useNavigate(); 
  
  useEffect( () => {
    axios.get(`http://localhost:4040/getuser`)
        .then(res => {
            setgetalluser(res.data)
      })
  },[])
  function reg_sub(e){
      e.preventDefault()
      setloader(true)
       var form_condition = true;
      document.querySelectorAll("input").forEach(function(index,key){
          if( index.value == ""){
            form_condition = false;
            document.getElementById('alert_'+index.attributes.name.nodeValue).innerHTML = 'Please Add '+index.getAttribute('data-method');
          }else{
            document.getElementById('alert_'+index.attributes.name.nodeValue).innerHTML = '';
          }
          if(index.attributes.name.nodeValue == 'Email'){
            var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!EMAIL_REGEX.test(index.value) && index.value !== "") {
                form_condition = false;
                document.getElementById('alert_Email').innerHTML = 'Invalid email address!';
            }
          }
          if(index.attributes.name.nodeValue == 'uname'){
            if(index.value.length < 4 && index.value !== ""){
                form_condition = false;
                document.getElementById('alert_uname').innerHTML = 'User Name Should be greater than 3 Character';
            }
          }
          if(index.attributes.name.nodeValue == 'psw'){
            if(index.value.length < 9 && index.value !== ""){
                form_condition = false;
                document.getElementById('alert_psw').innerHTML = 'Password Should be greater than 8 Character';
            }
          }

      })
      if(form_condition){
          const check_duplicate_email = getalluser.filter( user => { return user.Email.toLowerCase() == email.toLowerCase() })
          if(check_duplicate_email.length == 1){
            document.getElementById('alert_Email').innerHTML = 'Email already Registered';
            return false;
          }

            axios({
                method: 'post',
                url: 'http://localhost:4040/register',
                headers: { 'Content-Type': 'application/json' },
                data: JSON.stringify(
                    {
                        username: username,
                        email: email,
                        password:password,
                    }
                )
            }).then(function (response) {
                localStorage.removeItem('user')
                localStorage.setItem("user", JSON.stringify(response.data))
                navigate('/dashboard')
            })
      }else{
          setTimeout(() => {
            setloader(false)
          }, 1000);
        
      }


 
        
      
  }
    return (
        <div className="main_login_container">
            <div className="Login_app">
                <div id="id01" className="modal">
                    <form className="modal-content animate" action="">
                        <div className="imgcontainer">
                        <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" className="avatar"></img>
                        </div>
                        <div className="Login_text">
                            <h2>Register</h2>
                        </div>

                        <div className="container">
                        <label><b>Username</b></label>
                        <input onChange={(e) => setusername(e.target.value) } data-method="User Name" type="text" placeholder="Enter Username" name="uname" required></input>
                        <span className='alert_text' id="alert_uname"></span>

                        <label><b>Email</b></label>
                        <input onChange={(e) => setemail(e.target.value) } data-method="Email"  type="text" placeholder="Enter Email" name="Email" required></input>
                        <span className='alert_text' id="alert_Email"></span>

                        <label><b>Password</b></label>
                        <input onChange={(e) => setpassword(e.target.value) } data-method="Password"  type="password" placeholder="Enter Password" name="psw" required></input>
                        <span className='alert_text' id="alert_psw"></span>
                    
                       
                        {/* {
                            loader ? 
                            <button className="buttonload">
                                <i className="fa fa-spinner fa-spin"></i>Loading
                            </button>
                            :
                            <button onClick={reg_sub} type="submit">Register</button>
                        } */}
                        <button onClick={reg_sub} type="submit">Register</button>
                        <div className="login_redirect">
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
  
  export default Register;