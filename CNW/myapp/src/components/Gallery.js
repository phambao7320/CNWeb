import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Listproduct from './Listproduct';

class Gallery extends Component{

    state = {
        data: [],
    };
    
    componentDidMount() {
    fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(result => this.setState({data:result}))
        .catch(err => console.error(err));
    }


    render(){
        return(
            <div>
                <section className="inner-page-banner" id="home"></section>
                <div className="breadcrumb-agile">
                	<ol className="breadcrumb mb-0">
		                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
		                <li className="breadcrumb-item active" aria-current="page">listproduct</li>
	                </ol>
                </div>

                <section className="gallery py-5" id="gallery">
                <div className="container py-md-5">
	                <h3 className="heading text-center mb-3 mb-sm-5">Our listproduct</h3>
                    <div className="gallery-content">
                        <div className="row">{
                            this.state.data.map((value,key) => {
                                return (
                                    <Listproduct key={key}  
                                    tieuDe1={value.product_Name}
                                    anh1={value.product_Img} 
                                    > </Listproduct>
                                )
                            }) 
                        }
                        </div>
                        <div id="gal1" className="popup-effect">
                            <div className="popup">
                                <img src="assets/images/m1.jpg" alt="Popup image" className="img-fluid mt-4" />
                                <a className="close" href="#gallery">&times;</a>
                            </div>
                        </div>
                        <div id="gal2" className="popup-effect">
                            <div className="popup">
                                <img src="assets/images/g2.jpg" alt="Popup image" className="img-fluid mt-4" />
                                <a className="close" href="#gallery">&times;</a>
                            </div>
                        </div>
                        <div id="gal3" className="popup-effect">
                            <div className="popup">
                                <img src="assets/images/g3.jpg" alt="Popup image" className="img-fluid mt-4" />
                                <a className="close" href="#gallery">&times;</a>
                                <button type="button" className="btn btn-default">button</button>
                            </div>
                        </div>
                        <div id="gal4" className="popup-effect">
                            <div className="popup">
                                <img src="assets/images/g4.jpg" alt="Popup image" className="img-fluid mt-4" />
                                <a className="close" href="#gallery">&times;</a>
                            </div>
                        </div>
                        <div id="gal5" className="popup-effect">
                            <div className="popup">
                                <img src="assets/images/g5.jpg" alt="Popup image" className="img-fluid mt-4" />
                                <a className="close" href="#gallery">&times;</a>
                            </div>
                        </div>
                        <div id="gal6" className="popup-effect">
                            <div className="popup">
                                <img src="assets/images/g6.jpg" alt="Popup image" className="img-fluid mt-4" />
                                <a className="close" href="#gallery">&times;</a>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
            </div>
        )
    }
}
export default Gallery