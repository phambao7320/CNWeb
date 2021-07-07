import React, { useState } from 'react';
import ViewFooter from './viewFooter';
import {Link, useHistory} from 'react-router-dom';

export default function ResetPassword() {

    const [usernamers, setNamers]  = useState('') ;
    const [emailrs, setEmailrs]    = useState('') ;
    const url = "http://localhost:5000/login"
    const history = useHistory() ;

    const handCheck = () => {
      let options = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          "username" : usernamers,
          "email" : emailrs
        })
      };
      fetch(url,options)
      .then(ris => ris.json())
      .then((result) => {
        console.log(result.message) ;
        if ( result.message == "Invalid username or password"){
          window.alert("Đăng nhập thất bại") ;
        }
        else{
          window.alert("Đăng nhập thành công") ;
          localStorage.setItem("token",result.token) ;
          history.push('/qlproducts')
        }
      },
        () => {
          console.log("Đăng nhập thất bại") ;
        }
      )
    }

    const onChangeUsernamers = (e) => {
      setNamers(e.target.value);
    };
    const onChangeEmailrs = (e) => {
      setEmailrs(e.target.value);
    };


    return (
      <div className = 'magic'>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <title>Password Reset - SB Admin</title>
      <link href="css/styles.css" rel="stylesheet" />
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Password Recovery</h3></div>
                    <div className="card-body">
                      <div className="small mb-3 text-muted">Enter your email address and username to reset password.</div>
                      <form>
                        <div className="form-floating mb-3">
                          <input className="form-control" type="text" onChange = {onChangeUsernamers} />
                          <label htmlFor="inputEmail">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input className="form-control" id="inputEmail" type="email" onChange={onChangeEmailrs} />
                          <label htmlFor="inputEmail">Email address</label>
                        </div>
                        {/* <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a className="small" href="login.html">Return to login</a>
                          <a className="btn btn-primary" href="login.html">Reset Password</a>
                        </div> */}
                      </form>
                    </div>
                    <div className="card-footer text-center py-3">
                       <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <div className="small">
                            <Link to = '/login'>Return to login</Link>
                          </div>
                          <a className="btn btn-primary" href="login.html">Reset Password</a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
         <ViewFooter/>
        </div>
      </div>
    </div>
    
    );
}