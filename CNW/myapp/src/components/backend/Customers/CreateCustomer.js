import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ViewTabs from "../viewtab";
import ViewMenu from "../ViewMenu";
import ViewHeader from "../viewHeader";
import ViewFooter from "../viewFooter";

const token = localStorage.getItem("token") ;

export default function CreateCustomer() {

    const [id_cs, setIDCS]     = useState('');
    const [name_cs, setNameCS]  = useState('');
    const [address_cs, setAddressCS] = useState('');
    const [phone_cs,setPhoneCS]  = useState('') ;
    const history = useHistory() ;
    const url = "http://localhost:5000/customer"

    const handCreate = () => {
        let options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "customer_Id" : id_cs,
                "customer_Name": name_cs,
                "customer_Address": address_cs,
                "customer_Phone": phone_cs
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

    const onChangeIdcs = (e) => {
        setIDCS(e.target.value);
        console.log(id_cs) ;
    };
    const onChangeNamecs = (e) => {
        setNameCS(e.target.value);
    };
    const onChangeAddcs = (e) => {
        setAddressCS(e.target.value);
    };
    const onChangePhonecs = (e) => {
        setPhoneCS(e.target.value);
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
                  {/* Tao form thêm  */}
                <div className="newUser">
                    <div className="newUserItem">
                        <label>ID : </label>
                        <input type="text" placeholder="Nhập vào Id"  onChange = {onChangeIdcs} />
                    </div>
                    <div className="newUserItem">
                        <label>FullName : </label>
                        <input type="text" placeholder="Nhập vào họ tên" onChange = {onChangeNamecs} />
                    </div>
                    <div className="newUserItem">
                        <label>Address : </label>
                        <input type="text" placeholder="Nhập vào địa chỉ" onChange = {onChangeAddcs}  />
                    </div>
                    <div className="newUserItem">
                        <label>Phone : </label>
                        <input type="text" placeholder="Nhập vào số điện thoại" onChange = {onChangePhonecs}  />
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
      </div> : null
  );
}
