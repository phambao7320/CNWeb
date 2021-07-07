import React from "react";
import { useHistory } from "react-router-dom";
import { useState , useEffect } from "react";
import ViewTabs from "../viewtab";
import ViewMenu from "../ViewMenu";
import ViewHeader from "../viewHeader";
import ViewFooter from "../viewFooter";
import MustLogin from "../MustLogin";

export default function EditProduct() {

    const getid = window.location.pathname.split('/').slice(-1)[0]
    const token = localStorage.getItem("token") ;
    const [pr_name, setNamepr]      = useState('') ;
    const [pr_note, setNotepr]      = useState('') ;
    const [pr_price,setPricepr]     = useState('') ;
    const [pr_detail,setDetailpr]   = useState('') ;
    const [pr_img,setImgpr]         = useState('') ; 
    const [pr_video,setVideopr]     = useState('') ;
    const [thanhphan,setThphan]     = useState('') ;
    const [soche,setSoche]          = useState('') ;
    const [thuchien,setThHien]      = useState('') ;
    const history = useHistory() ;
    const url1 = "http://localhost:5000/productget/" + getid ;
    const url2 = "http://localhost:5000/product/" + getid ;

    let op = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": "Bearer " + token
        }
    };

    useEffect(() => {
        fetch(url1,op)
          .then(res => res.json())
          .then((result) => {
              console.log(result) ;
              setNamepr(result.product_Name)
              setNotepr(result.product_Note);
              setPricepr(result.product_Price)
              setDetailpr(result.product_Detail);
              setImgpr(result.product_Img) ;
              setVideopr(result.product_Video) ;
              setThphan(result.product_TP) ;
              setSoche(result.product_SC) ;
              setThHien(result.product_TH) ;
            },
            () => {
              console.log("Lỗi Get thông tin Product") ;
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
                "product_Id" : getid,
                "product_Name"  : pr_name,
                "product_Note"  : pr_note,
                "product_Price" : pr_price,
                "product_Img"   : pr_img,
                "product_Detail": pr_detail,
                "product_Video" : pr_video,
                "product_TP"    : thanhphan,
                "product_SC"    : soche,
                "product_TH"    : thuchien
            })
        };
        fetch(url2,options)
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
    const onChangeThPhan = (e) => {
        setThphan(e.target.value);
    };
    const onChangeSoChe = (e) => {
        setSoche(e.target.value);
    };
    const onChangeThHien = (e) => {
        setThHien(e.target.value);
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
                        <input type="text" value = {pr_name} onChange = {onChangeNamepr} />
                    </div>
                    <div className="newUserPr">
                        <label>Note : </label>
                        <textarea value = {pr_note} onChange = {onChangeNotepr}  />
                    </div>
                    <div className="newUserItem">
                        <label>Price : </label>
                        <input type="text" value = {pr_price} onChange = {onChangePricepr}  />
                    </div>
                    <div className="newUserItem">
                        <label>Image : </label>
                        <input type="text" value = {pr_img} onChange = {onChangeImgpr}  />
                    </div>
                    <div className="newUserPr">
                        <label>Detail : </label>
                        <textarea value = {pr_detail} onChange = {onChangeDetailpr}  />
                    </div>
                    <div className="newUserItem">
                        <label>Video : </label>
                        <input type="text" value = {pr_video} onChange = {onChangeVideopr}  />
                    </div>
                    <div className="newUserPr">
                        <label>Thành phần : </label>
                        <textarea value = {thanhphan} onChange = {onChangeThPhan}  />
                    </div>
                    <div className="newUserPr">
                        <label>Sơ chế : </label>
                        <textarea value = {soche} onChange = {onChangeSoChe}  />
                    </div>
                    <div className="newUserPr">
                        <label>Thực hiện : </label>
                        <textarea value = {thuchien} onChange = {onChangeThHien}  />
                    </div>
                    <div>
                        <button className="newEditButton" onClick = {handUpdate}>Update Product</button>
                    </div>
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
