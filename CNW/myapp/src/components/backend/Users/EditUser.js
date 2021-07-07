import React from "react";
import { useHistory } from "react-router-dom";
import { useState , useEffect } from "react";
import ViewTabs from "../viewtab";
import ViewMenu from "../ViewMenu";
import ViewHeader from "../viewHeader";
import ViewFooter from "../viewFooter";
import MustLogin from "../MustLogin";


export default function EditUser() {

    const token = localStorage.getItem("token") ;
    const getid = window.location.pathname.split('/').slice(-1)[0]
    const [us_name, setnameus]  = useState('');
    const [us_pass, setPassus]  = useState('');
    const [us_pos,setPosus]     = useState('');
    const [us_email,setEmailus] = useState('');
    const history = useHistory() ;
    const url = "http://localhost:5000/user/" + getid ;
    const op = {
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": "Bearer " + token
      }
  };


    useEffect(() => {
        fetch(url,op)
          .then(res => res.json())
          .then((result) => {
              console.log(result) ;
              setnameus(result.user_Name);
              setPassus(result.user_Pass);
              setPosus(result.user_Position) ;
              setEmailus(result.user_Email) ;
            },
            () => {
              console.log("Lỗi Get thông tin User")
            }
          )
      }, [])



    const handUpdate = () => {
        let options = {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "user_Id" : getid,
                "user_Name": us_name,
                "user_Pass": us_pass,
                "user_Position": us_pos,
                "user_Email" : us_email
            })
        };
        fetch(url,options)
        .then(ris => ris.json())
        .then(() => {
                window.alert("Update Thành Công") ;
            },
            () => {
                window.alert("Update Thất Bại") ;
            }
        )
        history.goBack() ;
    };

    const onChangeNameus = (e) => {
        setnameus(e.target.value);
    };
    const onChangePassus = (e) => {
        setPassus(e.target.value);
    };
    const onChangePosus = (e) => {
        setPosus(e.target.value);
    };
    const onChangeEmailus = (e) => {
        setEmailus(e.target.value);
    }

    return (
      localStorage.length != 0 ?
    <div>
        <title>Dashboard - SB Admin</title>
        <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
        <ViewHeader/>
        <div id="layoutSidenav">
          <ViewMenu/>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Thống kê nhanh</h1>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item active"></li>
                </ol>
                <ViewTabs/>
                <div className="card mb-4">
                <div className="card-header">
                 <h1>Vui lòng nhập thông tin</h1>
                </div>    
                <div className="card-body">
                <div className="newUser">
                    <div className="newUserItem">
                        <label>ID : </label>
                        <input type="text" value = {getid} disabled="disabled" />
                    </div>
                    <div className="newUserItem">
                        <label>Username : </label>
                        <input type="text" value = {us_name} onChange = {onChangeNameus} />
                    </div>
                    <div className="newUserItem">
                        <label>Password : </label>
                        <input type="text" value = {us_pass} onChange = {onChangePassus}  />
                    </div>
                    <div className="newUserItem">
                        <label>Position : </label>
                        <input type="text" value = {us_pos} onChange = {onChangePosus}  />
                    </div>
                    <div className="newUserItem">
                        <label>Email : </label>
                        <input type="text" value = {us_email} onChange = {onChangeEmailus}  />
                    </div>
                    <button className="newUserButton" onClick = {handUpdate}>Update User</button>
                </div>
                </div>
                </div>
              </div>
            </main>
            <ViewFooter/>
          </div>
        </div>
      </div> : <MustLogin/> 
  );
}
