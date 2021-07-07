import React from "react";
import { Link , useHistory } from "react-router-dom";
import { Delete, EditSharp , AddCircle } from "@material-ui/icons";
import { useState , useEffect} from "react";
import MUIDataTable from "mui-datatables";
import ViewTabs from "../viewtab";
import ViewMenu from "../ViewMenu";
import ViewHeader from "../viewHeader";
import ViewFooter from "../viewFooter";
import MustLogin from "../MustLogin";

const token = localStorage.getItem("token") ;

export default function Products() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const history = useHistory() ;
    let pr_id = null ;

    const handleDelete = (id) => {
      let url = "http://localhost:5000/product/" + id ;
      let options = {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          "Authorization": "Bearer " + token
        },
      };
      fetch(url,options)
        .then(ris => ris.json())
        .then(() => {
          console.log("Delete Product Thành công") ;
          window.alert("Xóa Thành Công !")
        },
        (error) => {
          console.log("Delete Product Thất bại") ;
          window.alert("Xóa Thất Bại !")
        }
      )
    };

    useEffect(() => {
      fetch("http://localhost:5000/products",{
        headers: { 
          "Accept": "application/json",
          "Content-Type": "application/json",
        // "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyNDc5OTk3OSwianRpIjoiNDUxNWEwNzgtODFmZi00ZGJhLTkxNGEtMDZmN2M0YjdkMTk2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6MiwidXNfTmFtZSI6ImR1Y3RhbSIsInVzX1Bvc2l0aW9uIjoiRW1wbG95ZWUifSwibmJmIjoxNjI0Nzk5OTc5LCJleHAiOjE2MjQ4MDA4Nzl9.aN8QMKrr9Ts0bV6UcN56j8FxVgGlgmpSW5uzEQBk1Lc"
        },
        method: "GET"
        })
        .then(res => res.json())
        .then((result) => {
          if ( result.message == "You dont have permission" ){
            window.alert("Không có quyền hạn") ;
            history.goBack() ;
          }
          else{
            console.log(result)
            setIsLoaded(true);
            setItems(result);
          }
        },
        (error) => {
          console.log("Lỗi con mẹ nó rồi")
          setIsLoaded(true);
          setError(error);
        }
      )
    }, [])
  
    const columns = [
      { name: "product_Id",         label: "Id",                options: { filter: true, sort: true, }},
      { name: "product_Name",       label: "Tiêu đề",           options: { filter: true, sort: true, }},
      { name: "product_Note",       label: "Trích dẫn",         options: { filter: true, sort: false, display: true}},
      { name: "product_Detail",     label: "Nội dung",          options: { filter: true, sort: false, display: false}},
      { name: "product_Price",      label: "Giá",               options: { filter: true, sort: false, }},
      { 
        name: "product_Img",
        label: "Ảnh", 
        options: { filter: true, sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
            let imgs = `${items[tableMeta.rowIndex].product_Img}`.toString() ;
            return (
                <img height="35%" width="35%" src = {imgs} ></img>
            );
          }
        }
      },
      { name: "Edit", 
        options: { filter: true, sort: false, empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              // <Link to={"/qleditproduct/" + `${items[tableMeta.rowIndex].product_Id}` }>
              //   <EditSharp />
              // </Link>
              <EditSharp onClick = {() => {
                let pr_name = `${items[tableMeta.rowIndex].product_Name}` ;
                let id_pr = `${items[tableMeta.rowIndex].product_Id}` ;
                const sl = window.confirm("Clicked Edit for Product : " + pr_name)
                if ( sl == true ){
                  history.push("/qleditproduct/" + id_pr)
                }
              }}
              />
            );
          }
        }
      },
      { name: "Delete", 
        options: { filter: true, sort: false, empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <Delete 
                onClick={() => {
                  let pr_name = `${items[tableMeta.rowIndex].product_Name}` ;
                  let pr_id = `${items[tableMeta.rowIndex].product_Id}` ;
                  const sl = window.confirm("Clicked Delete for " + pr_name) ;
                  if ( sl == true ){
                    handleDelete(pr_id) ;
                    setItems(items.filter((item) => item.product_Id != pr_id));
                    console.log(items) ;
                  }
                }}
              />              
            );
          }
        }
      },
   ];   
    const options = {
      filterType: 'checkbox',
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
                    <Link to={"/qlcreateproduct"}>
                      <AddCircle/> Create New Product
                    </Link>
                  </div>    
                  <div className="card-body">
                    <MUIDataTable
                      title={"List Products"}
                      data={items}
                      columns={columns}
                      options={options} 
                    />
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
