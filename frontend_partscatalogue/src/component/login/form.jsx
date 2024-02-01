import React, { useState } from "react";
import "./../../assets/css/login.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "react-validation/build/input";
import { useNavigate } from "react-router-dom";
import { signin } from "../../redux/authSlice";
function FormLogin(props) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const user = useSelector((state) => state.auth.user);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkUser, setCheckUser] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  console.log("userdata",userData);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignin = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!userData.email) {
        setEmailError("Vui lòng nhập tên đăng nhập");
      } else {
        setEmailError("");
      }
    
      if (!userData.password) {
        setPasswordError("Vui lòng nhập mật khẩu");
      } else {
        setPasswordError("");
      }

    await dispatch(signin(userData))
      .then(() => {
        if (user) {
          navigate("home");
        }
      })
      .catch((err) => {
        setCheckUser("Tên đăng nhập hoặc mật khẩu không đúng")
      });
    setLoading(false);
  };

  if (user) {
    navigate("home");
  }
  return (
    <section>
            <div className="signin">
                <div className="content">
                    <div className="wrap-icon-login">
                        <div className="icon-login"> <span style={{ fontSize: '50px' }} className="bi bi-person" /></div>
                        <h2>Đăng Nhập</h2>
                    </div>

                    <div className="form">
                        <div className="inputBox">
                            <input type="text"                            
                              name="email"
                              onChange={handleChange}
                              required
                             /> <i>Tên đăng nhập</i>
                               {emailError && userData.email.length <= 0 && (
                      <div className="text-red-500 text-sm">{emailError}</div>
                      )}
                        </div>
                      
                        <div className="inputBox">
                          <input type="password"        
                            name="password"
                            onChange={handleChange}
                            required /> <i>Mật khẩu</i>
                              {passwordError && userData.password.length <= 0 && (
                      <div className="text-red-500 text-sm">{passwordError}</div>
                     )}
                        </div>

                        <div className="inputBox">
                            <button className='btn-login'  type="submit" onClick={handleSignin} > Đăng nhập</button>
                        </div>
                        {checkUser && (
                      <div className="text-red-500 text-sm">{checkUser}</div>
                     )}
                        <div className="links">
                            <div className="form-check form-check-cus">
                                <input className="form-check-input" type="checkbox" defaultValue id="rememberPassword" />
                                <label style={{fontSize:'14px', cursor:'pointer'}} className="form-check-label" htmlFor="rememberPassword">
                                Ghi Nhớ Mật Khẩu
                                </label>
                            </div>
                            <div style={{fontSize:'14px', cursor:'pointer'}} href="#"> Quên Mật Khẩu ?</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


  );
}

export default FormLogin;
