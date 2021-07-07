import React from "react" ;

export default function ViewHeader() {

    const handLogout = () => {
      localStorage.removeItem("token") ;
    }


    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark clss4">
          <a className="navbar-brand ps-3" href="/">TBT ADMIN</a>
          <div className="class3">
          <ul className="navbar-nav ms-auto ps-40 ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw" /></a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#!">Settings</a></li>
                <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="/login" onClick = {handLogout}>Logout</a></li>
              </ul>
            </li>
          </ul>
          </div>
        </nav>
    )
}