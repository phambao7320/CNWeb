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

export default function Employees() {
  
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const history = useHistory() ;

    const handleDelete = (id) => {
      let url = "http://localhost:5000/employee/" + id ;
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
          console.log("Delete Employee Thành công") ;
          window.alert("Xóa Thành Công !") ;
        },
        (error) => {
          console.log("Delete Employee Thất bại") ;
          window.alert("Xóa Thất Bại !") ;
        }
      )
    };

    useEffect(() => {
      fetch("http://localhost:5000/employees",{
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
      { name: "Id",               label: "Id",      options: { filter: true, sort: true,  }},
      { name: "employee_Name",    label: "Name",    options: { filter: true, sort: true,  }},
      { name: "employee_Address", label: "Address", options: { filter: true, sort: false, }},
      { name: "employee_Phone",   label: "Phone",   options: { filter: true, sort: false, }},
      { name: "Edit", 
        options: { filter: true, sort: false, empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <EditSharp onClick = {() => {
                let ey_name = `${items[tableMeta.rowIndex].employee_Name}` ;
                let ey_id = `${items[tableMeta.rowIndex].Id}` ;
                const sl = window.confirm("Clicked Edit for Employee " + ey_name) ;
                if ( sl == true ){
                  history.push("/qleditemployee/" + ey_id) ;
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
                  let name_ey = `${items[tableMeta.rowIndex].employee_Name}` ;
                  let id_ey = `${items[tableMeta.rowIndex].Id}` ;
                  const sl = window.confirm("Clicked Delete for Employee " + name_ey) ;
                  if ( sl == true ){
                    handleDelete(id_ey) ;
                    setItems(items.filter((item) => item.Id != id_ey));
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
                    <Link to={"/qlcreateemployee"}>
                      <AddCircle/> Create New Employee
                    </Link>
                  </div>    
                  <div className="card-body">
                    <MUIDataTable
                      title={"Employee List"}
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
