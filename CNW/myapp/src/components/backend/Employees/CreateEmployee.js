import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ViewTabs from "../viewtab";
import ViewMenu from "../ViewMenu";
import ViewHeader from "../viewHeader";
import ViewFooter from "../viewFooter";
import MustLogin from "../MustLogin";

const token = localStorage.getItem("token") ;

export default function CreateEmployee() {

    const [id_ep, setIdep]     = useState('');
    const [name_ep, setNameep]  = useState('');
    const [addr_ep, setAddrep] = useState('');
    const [phone_ep,setPhoneep]  = useState('') ;
    const history = useHistory() ;
    const url = "http://localhost:5000/employee"

    const handCreate = () => {
        let options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8" ,
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "employee_Id" : id_ep,
                "employee_Name": name_ep,
                "employee_Address": addr_ep,
                "employee_Phone": phone_ep
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

    const onChangeIdep = (e) => {
        setIdep(e.target.value);
    };
    const onChangeNameep = (e) => {
        setNameep(e.target.value);
    };
    const onChangeAddrep= (e) => {
        setAddrep(e.target.value);
    };
    const onChangePhoneep = (e) => {
        setPhoneep(e.target.value);
    };

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
                        <input type="text" placeholder="Nhập vào Id"  onChange = {onChangeIdep} />
                    </div>
                    <div className="newUserItem">
                        <label>Name : </label>
                        <input type="text" placeholder="Nhập vào username" onChange = {onChangeNameep} />
                    </div>
                    <div className="newUserItem">
                        <label>Address : </label>
                        <input type="text" placeholder="Nhập vào password" onChange = {onChangeAddrep}  />
                    </div>
                    <div className="newUserItem">
                        <label>Phone : </label>
                        <input type="text" placeholder="Nhập vào position" onChange = {onChangePhoneep}  />
                    </div>
                    <button className="newUserButton" onClick = {handCreate}>Create New Employee</button>
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
