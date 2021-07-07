import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewsRelated extends Component {
   
    render() {
        return (
           
            <div className="card">
            
                <Link to={"/product2/" + this.props.tinId}>
                <img className="card-img-top" src={this.props.anh} alt="react router demo" />
                </Link>   
                <div className="card-body">
                    <h4 className="card-title">{this.props.tieuDe}</h4>
                    <p className="card-text"> 
                    {this.props.trichDan}</p>
                </div>
            </div>
             

        );
    }
}

export default NewsRelated;