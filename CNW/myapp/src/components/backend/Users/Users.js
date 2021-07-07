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

export default function Users() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const history = useHistory() ;

    const handleDelete = (id) => {
      let url = "http://localhost:5000/user/" + id ;
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
          console.log("Delete User Thành công") ;
          window.alert("Xóa Thành Công !")
        },
        (error) => {
          console.log("Delete User Thất bại") ;
          window.alert("Xóa Thất Bại !")
        }
      )
    };

    useEffect(() => {
      fetch("http://localhost:5000/users",{
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
      { name: "user_Id",        label: "Id",         options: { filter: true, sort: true,  }},
      { name: "user_Name",      label: "Username",   options: { filter: true, sort: true,  }},
      { name: "user_Pass",      label: "Password",   options: { filter: true, sort: false, }},
      { name: "user_Position",  label: "Position",   options: { filter: true, sort: false, }},
      { name: "Edit", 
        options: { filter: true, sort: false, empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              // <Link to={"/qledituser/" + `${items[tableMeta.rowIndex].user_Id}` }>
              //   <EditSharp />
              // </Link>
              <EditSharp onClick = {() => {
                let name_us = `${items[tableMeta.rowIndex].user_Name}` ;
                let id_us = `${items[tableMeta.rowIndex].user_Id}` ;
                const sl = window.confirm("Clicked Edit for Username " + name_us) ;
                if ( sl == true ){
                  history.push("/qledituser/" + id_us) ;
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
                  let user_name = `${items[tableMeta.rowIndex].user_Name}` ;
                  let user_id = `${items[tableMeta.rowIndex].user_Id}` ;
                  const sl = window.confirm("Clicked Delete for Username " + user_name) ;
                  if ( sl == true ){
                    handleDelete(user_id) ;
                    setItems(items.filter((item) => item.user_Id != user_id));
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
                    <Link to={"/qlcreateuser"}>
                      <AddCircle/> Create New User
                    </Link>
                  </div>    
                  <div className="card-body">
                    <MUIDataTable
                      title={"List Users"}
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
