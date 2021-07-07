import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component{
    render(){
        return(
            <header>
			<div className="container">
				<div className="header d-lg-flex justify-content-between align-items-center">
					<div className="header-agile">
						<h1>
							<Link to='/' className="navbar-brand logo2">
								<span className="fa fa-cutlery clss5" aria-hidden="true" ></span>   TBT Restaurant   <span className="fa fa-hand-o-left" aria-hidden="true" ></span>
							</Link>
						</h1>
					</div>
					<div className="nav_w3ls">
						<nav>
							<label htmlFor="drop" className="toggle mt-lg-0 mt-1"><span className="fa fa-bars" aria-hidden="true"></span></label>
							<input type="checkbox" id="drop" />
								<ul className="menu">
									<li className="mr-lg-3 mr-2 active"><Link to='/'>Home</Link></li>
									<li className="mr-lg-3 mr-2"><Link to='/about'>About</Link></li>
									<li className="mr-lg-3 mr-2 p-0">
										<label htmlFor="drop-2" className="toggle">Dropdown <span className="fa fa-angle-down" aria-hidden="true"></span> </label>
										<a href="#">Dropdown <span className="fa fa-angle-down" aria-hidden="true"></span></a>
										<input type="checkbox" id="drop-2"/>
										<ul className="inner-dropdown">
											<li><Link to='/product'>Product</Link></li>
											<li><Link to='/listproduct'>listproduct</Link></li>
										</ul>
									</li>
									<li className="mr-lg-3 mr-2"><Link to='/contact'>Contact</Link></li>
									<li className="mr-lg-3 mr-2 p-0">
										<a href="/login">Login</a>
									</li>
								</ul>
						</nav>
					</div>
				</div>
			</div>
			</header>
        )
    }
}
export default Navbar