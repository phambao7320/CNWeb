import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ViewTabs from "../viewtab";
import ViewMenu from "../ViewMenu";
import ViewHeader from "../viewHeader";
import ViewFooter from "../viewFooter";
import MustLogin from "../MustLogin";

const token = localStorage.getItem("token") ;

export default function CreateProduct() {

    const [idpr, setIdpr]              = useState('') ;
    const [namepr, setNamepr]          = useState('') ;
    const [notepr, setNotepr]          = useState('') ;
    const [pricepr,setPricepr]         = useState('') ;
    const [detailpr,setDetailpr]       = useState('') ;
    const [imgpr,setImgpr]             = useState('') ; 
    const [videopr,setVideopr]         = useState('') ;
    const [tphanpr,setThanhphanpr]     = useState('') ;
    const [sochepr,setSochepr]         = useState('') ;
    const [thienpr,setThuchienpr]      = useState('') ;

    const history = useHistory() ;
    const url = "http://localhost:5000/product" ;


    const handCreate = () => {
        let optionss = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "product_Id"    : idpr,
                "product_Name"  : namepr,
                "product_Note"  : notepr,
                "product_Price" : pricepr,
                "product_Img"   : imgpr,
                "product_Detail": detailpr,
                "product_Video" : videopr,
                "product_TP"    : tphanpr,
                "product_SC"    : sochepr,
                "product_TH"    : thienpr
            })
        };
        fetch(url,optionss)
        // .then(ris => ris.json())
        .then(() => {
                window.alert("Thêm Thành Công") ;
            },
            () => {
                window.alert("Thêm Thất Bại") ;
            }
        )
        history.goBack() ;
    };

    const onChangeIdpr = (e) =>{
        setIdpr(e.target.value) ;
    }
    const onChangeNamepr = (e) => {
        setNamepr(e.target.value);
    };
    const onChangeNotepr = (e) => {
        setNotepr(e.target.value);
    };
    const onChangePricepr = (e) => {
        setPricepr(e.target.value);
    };
    const onChangeImgpr = (e) => {
        setImgpr(e.target.value);
    };
    const onChangeDetailpr = (e) => {
        setDetailpr(e.target.value);
    };
    const onChangeVideopr = (e) => {
        setVideopr(e.target.value);
    };
    const onChangeThanhphanpr = (e) => {
        setThanhphanpr(e.target.value);
    };
    const onChangeSochepr = (e) => {
        setSochepr(e.target.value);
    };
    const onChangeThuchienpr = (e) => {
        setThuchienpr(e.target.value);
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
                        <input type="text" placeholder = "Nhập Id sản phẩm" onChange = {onChangeIdpr} />
                    </div>
                    <div className="newUserItem">
                        <label>Name : </label>
                        <input type="text" placeholder = "Nhập tên sản phẩm" onChange = {onChangeNamepr} />
                    </div>
                    <div className="newUserPr">
                        <label>Note : </label>
                        <textarea placeholder= "Nhập trích dẫn" onChange = {onChangeNotepr}  />
                    </div>
                    <div className="newUserItem">
                        <label>Price : </label>
                        <input type="text" placeholder= "Nhập giá sản phẩm"  onChange = {onChangePricepr}  />
                    </div>
                    <div className="newUserItem">
                        <label>Image : </label>
                        <input type="text" placeholder= "Nhập link ảnh" onChange = {onChangeImgpr}  />
                    </div>
                    <div className="newUserPr">
                        <label>Detail : </label>
                        <textarea placeholder = "Nhập chi tiết sản phẩm" onChange = {onChangeDetailpr}  />
                    </div>
                    <div className="newUserItem">
                        <label>Video : </label>
                        <input type="text" placeholder = "Nhập link Video" onChange = {onChangeVideopr}  />
                    </div>
                    <div className="newUserPr">
                        <label>Thành phần : </label>
                        <textarea placeholder = "Nhập thành phần " onChange = {onChangeThanhphanpr}  />
                    </div>
                    <div className="newUserPr">
                        <label>Sơ chế : </label>
                        <textarea placeholder = "Nhập cách sơ chế" onChange = {onChangeSochepr}  />
                    </div>
                    <div className="newUserPr">
                        <label>Thực hiện : </label>
                        <textarea placeholder = "Nhập cách thực hiện" onChange = {onChangeThuchienpr}  />
                    </div>
                    <button className="newUserButton" onClick = {handCreate}>Create Product</button>
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
