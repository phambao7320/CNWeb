import React from "react";
import { useHistory } from "react-router-dom";
import { useState , useEffect } from "react";
import ViewTabs from "../viewtab";
import ViewMenu from "../ViewMenu";
import ViewHeader from "../viewHeader";
import ViewFooter from "../viewFooter";
import MustLogin from "../MustLogin";


export default function EditEmployee() {

    const token = localStorage.getItem("token") ;
    const getid = window.location.pathname.split('/').slice(-1)[0]
    const [ep_name, setNameep]  = useState('');
    const [ep_addr, setAddrep] = useState('');
    const [ep_phone,setPhoneep]  = useState('') ;
    const history = useHistory() ;
    const url = "http://localhost:5000/employee/" + getid ;
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
              setNameep(result.employee_Name);
              setAddrep(result.employee_Address);
              setPhoneep(result.employee_Phone) ;
            },
            () => {
              console.log("Lỗi Get thông tin Employee")
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
                "employee_Name": ep_name,
                "employee_Address": ep_addr,
                "employee_Phone": ep_phone
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

    const onChangeNamecs = (e) => {
        setNameep(e.target.value);
    };
    const onChangeAddrcs = (e) => {
        setAddrep(e.target.value);
    };
    const onChangePhonecs = (e) => {
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
                        <input type="text" value = {getid} disabled="disabled" />
                    </div>
                    <div className="newUserItem">
                        <label>Name : </label>
                        <input type="text" value = {ep_name} onChange = {onChangeNamecs} />
                    </div>
                    <div className="newUserItem">
                        <label>Address : </label>
                        <input type="text" value = {ep_addr} onChange = {onChangeAddrcs}  />
                    </div>
                    <div className="newUserItem">
                        <label>Phone : </label>
                        <input type="text" value = {ep_phone} onChange = {onChangePhonecs}  />
                    </div>
                    <button className="newUserButton" onClick = {handUpdate}>Update Employee</button>
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
