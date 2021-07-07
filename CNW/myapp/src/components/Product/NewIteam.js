import React, { Component } from 'react';

class NewIteam extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        return (
            <div className="col-4">
            <div className="card-deck">
            <div className="card">
               <a href={"/product2/"+this.props.tinId}><img className="card-img-top" src={this.props.anh1}
               alt="for react router" /></a>
                <div className="card-body">
                <h4 className="card-title">{this.props.tieuDe1}</h4>
                <p className="card-text">{this.props.trichDan}</p>
                </div>
            </div>
            </div>
           
            <hr />
            
        </div>

     
                
        );
    }
}
export default NewIteam;