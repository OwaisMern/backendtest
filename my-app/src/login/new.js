import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link,useNavigate,useParams,Navigate} from "react-router-dom";

function New_form() {
  const [username,setusername] = useState();
  const [email,setemail] = useState();
  const [phone,setphone] = useState();
  const [password,setpassword] = useState();
  const [getalluser,setgetalluser] = useState();
  let navigate = useNavigate(); 
  
  useEffect( () => {
    axios.get(`http://localhost:4040/getuser`)
        .then(res => {
            setgetalluser(res.data)
      })
  },[])
  function reg_sub(e){
      e.preventDefault()
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
                        phone: phone,
                        password:password,
                    }
                )
            }).then(function (response) {
                localStorage.removeItem('user')
                localStorage.setItem("user", JSON.stringify(response.data))
                navigate('/dashboard')
            })
      }   
  }
    return (
        <div className="new_register_login">
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""></img>
                        <h3>Welcome</h3>
                        <p>Already have an account?</p>
                        <button><Link to="/login">Login</Link></button><br></br>
                    </div>
                    <div className="col-md-9 register-right">
                            <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <h3  className="register-heading">Register</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input onChange={(e) => setusername(e.target.value) } data-method="User Name" type="text" placeholder="Enter Username" name="uname" required></input>
                                            <span className='alert_text' id="alert_uname"></span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={(e) => setemail(e.target.value) } data-method="Email"  type="text" placeholder="Enter Email" name="Email" required></input>
                                            <span className='alert_text' id="alert_Email"></span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input onChange={(e) => setphone(e.target.value) } type="number"  className="form-control" name="phone" data-method="Phone" placeholder="Enter Phone"  ></input>
                                            <span className='alert_text' id="alert_phone"></span>
                                        </div>
                                        <div className="form-group">
                                            <input onChange={(e) => setpassword(e.target.value) } data-method="Password"  type="password" placeholder="Enter Password" name="psw" required></input>
                                            <span className='alert_text' id="alert_psw"></span>
                                        </div>
                                        <button onClick={reg_sub} className="btnRegister">Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        // </div>
    );
  }
  
  export default New_form;