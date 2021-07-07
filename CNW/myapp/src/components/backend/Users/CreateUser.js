import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ViewTabs from "../viewtab";
import ViewMenu from "../ViewMenu";
import ViewHeader from "../viewHeader";
import ViewFooter from "../viewFooter";
import MustLogin from "../MustLogin";

const token = localStorage.getItem("token") ;

export default function CreateUser() {

    const [id_us, setIdus]      = useState('');
    const [name_us, setNameus]  = useState('');
    const [pass_us, setPassus]  = useState('');
    const [pos_us,setPosus]     = useState('') ;
    const [email_us,setEmailus] = useState('') ;
    const history = useHistory() ;
    const url = "http://localhost:5000/user"

    const handCreate = () => {
        let options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "user_Id" : id_us,
                "user_Name": name_us,
                "user_Pass": pass_us,
                "user_Position": pos_us,
                "user_Email" : email_us

            })
        };
        fetch(url,options)
        .then(ris => ris.json())
        .then(() => {
                window.alert("Thêm Thành Công") ;
            },
            () => {
                window.alert("Thêm Thất Bại") ;
            }
        )
        history.goBack() ;
    };

    const onChangeIdus = (e) => {
        setIdus(e.target.value);
        console.log(id_us) ;
    };
    const onChangeNameus = (e) => {
        setNameus(e.target.value);
    };
    const onChangePassus = (e) => {
        setPassus(e.target.value);
    };
    const onChangePosus = (e) => {
        setPosus(e.target.value);
    };
    const onchangEmailus = (e) => {
        setEmailus(e.target.value) ;
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
                  {/* Tao form thêm  */}
                <div className="newUser">
                    <div className="newUserItem">
                        <label>ID : </label>
                        <input type="text" placeholder="Nhập vào Id"  onChange = {onChangeIdus} />
                    </div>
                    <div className="newUserItem">
                        <label>Username : </label>
                        <input type="text" placeholder="Nhập vào username" onChange = {onChangeNameus} />
                    </div>
                    <div className="newUserItem">
                        <label>Password : </label>
                        <input type="text" placeholder="Nhập vào password" onChange = {onChangePassus}  />
                    </div>
                    <div className="newUserItem">
                        <label>Position : </label>
                        <input type="text" placeholder="Nhập vào position" onChange = {onChangePosus}  />
                    </div>
                    <div className="newUserItem">
                        <label>Email : </label>
                        <input type="text" placeholder="Nhập vào email" onChange = {onchangEmailus}  />
                    </div>
                    <button className="newUserButton" onClick = {handCreate}>Create New Customer</button>
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
