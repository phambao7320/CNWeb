import React from "react" ;

export default function ViewFooter() {
    return (
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright © Your Website 2021</div>
                    <div>
                        <a href="#">Privacy Policy</a> -
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer> 
    )
}