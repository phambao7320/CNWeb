import React from "react";
import { Link , useHistory } from "react-router-dom";
import { Delete, EditSharp , AddCircle } from "@material-ui/icons";
import { useState , useEffect} from "react";
import MUIDataTable from "mui-datatables";
import ViewTabs from "../viewtab";
import ViewMenu from "../ViewMenu";
import ViewHeader from "../viewHeader";
import ViewFooter from "../viewFooter";

const token = localStorage.getItem("token") ;
console.log(token) ;

export default function Customers() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const history = useHistory() ;

    const handleDelete = (id) => {
      let url = "http://localhost:5000/customer/" + id ;
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
          console.log("Delete Customer Thành công") ;
          window.alert("Xóa Thành Công !")
        },
        (error) => {
          console.log("Delete Customer Thất bại") ;
          window.alert("Xóa Thất Bại !")
        }
      )
    };

    useEffect(() => {
      fetch("http://localhost:5000/customers",{
        headers: { 
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
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
      { name: "id",       label: "Id",      options: { filter: true, sort: true,  }},
      { name: "cs_Name",  label: "Name",    options: { filter: true, sort: true,  }},
      { name: "cs_Add",   label: "Address", options: { filter: true, sort: false, }},
      { name: "cs_Phone", label: "Phone",   options: { filter: true, sort: false, }},
      { name: "Edit", 
        options: { filter: true, sort: false, empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
                <EditSharp onClick = {() => {
                  let name_p = `${items[tableMeta.rowIndex].cs_Name}` ;
                  let id_p = `${items[tableMeta.rowIndex].id}` ;
                  // window.alert('Clicked "Delete" for row '+ name_p) ;
                  const sl = window.confirm("Clicked Edit for " + name_p)
                  if ( sl == true ){
                    history.push("/qleditcustomer/" + id_p)
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
                  let name_p = `${items[tableMeta.rowIndex].cs_Name}` ;
                  let id_p = `${items[tableMeta.rowIndex].id}` ;
                  const sl = window.confirm("Clicked Delete for " + name_p)
                  if ( sl == true ){
                    handleDelete(id_p) ;
                    setItems(items.filter((item) => item.id != id_p));
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
                    <Link to={"/qlcreatecustomer"}>
                      <AddCircle/> Create New Customer
                    </Link>
                  </div>    
                  <div className="card-body">
                    <MUIDataTable
                      title={"Customer List"}
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
      </div> : null
    );
}
