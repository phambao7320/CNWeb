import React, { Component } from 'react';

class Listproduct extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="col-md-4 col-sm-6 gal-img">
                    <img src={this.props.anh1} alt="aegis" className="img-fluid mt-4" />
                    <h4 className="card-title">{this.props.tieuDe1}</h4>
            </div>
        );
    }
}

export default Listproduct;