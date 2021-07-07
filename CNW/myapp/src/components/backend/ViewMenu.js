import React from "react"

export default function ViewMenu (){
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav">
                  <div className="sb-sidenav-menu-heading">Home</div>
                  <a className="nav-link" href="/">
                    <div className="sb-nav-link-icon"><i className="fas fa-user-circle-o" /></div>
                    Home
                  </a>
                  <div className="sb-sidenav-menu-heading">Manage</div>
                  <a className="nav-link collapsed" href="http://localhost:3000/qlcustomers" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
                    List Customers
                  </a>
                  <a className="nav-link collapsed" href="http://localhost:3000/qlemployees" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
                    List Employees
                  </a>
                  <a className="nav-link collapsed" href="http://localhost:3000/qlusers" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
                    List Users
                  </a>
                  <a className="nav-link collapsed" href="http://localhost:3000/qlproducts" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
                    List Products
                  </a>
                </div>
              </div>
              <div className="sb-sidenav-footer">
                <div className="mt-4">Logged in as:</div>
               TBT Admin 
              </div>
            </nav>
          </div>
    )
}