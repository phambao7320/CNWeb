import React from "react";
import { useHistory } from "react-router-dom";
import { useState , useEffect } from "react";
import ViewTabs from "../viewtab";
import ViewMenu from "../ViewMenu";
import ViewHeader from "../viewHeader";
import ViewFooter from "../viewFooter";

const token = localStorage.getItem("token") ;

export default function EditCustomer() {

    const getid = window.location.pathname.split('/').slice(-1)[0]
    const [cs_name, setNamecs]  = useState('');
    const [cs_addr, setAddrcs] = useState('');
    const [cs_phone,setPhonecs]  = useState('') ;
    const history = useHistory() ;
    const url = "http://localhost:5000/customer/" + getid ;
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
              setNamecs(result.cs_Name);
              setAddrcs(result.cs_Add);
              setPhonecs(result.cs_Phone) ;
            },
            () => {
              console.log("Lỗi Get thông tin Customer")
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
                "customer_Id" : getid,
                "customer_Name": cs_name,
                "customer_Address": cs_addr,
                "customer_Phone": cs_phone
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
        setNamecs(e.target.value);
    };
    const onChangeAddrcs = (e) => {
        setAddrcs(e.target.value);
    };
    const onChangePhonecs = (e) => {
        setPhonecs(e.target.value);
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
                        <input type="text" value = {cs_name} onChange = {onChangeNamecs} />
                    </div>
                    <div className="newUserItem">
                        <label>Address : </label>
                        <input type="text" value = {cs_addr} onChange = {onChangeAddrcs}  />
                    </div>
                    <div className="newUserItem">
                        <label>Phone : </label>
                        <input type="text" value = {cs_phone} onChange = {onChangePhonecs}  />
                    </div>
                    <button className="newUserButton" onClick = {handUpdate}>Update Customer</button>
                </div>
                </div>
                </div>
              </div>
            </main>
            <ViewFooter/>
          </div>
        </div>
      </div> : null 
  );
}
