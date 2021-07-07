import React, { Component } from 'react';
import NewsRelated from './NewsRelated';


class NewsDetail extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(result => this.setState({data:result}))
      .catch(err => console.error(err));
  }

  render() {
    var dem = 1 ; 
    return (
      <div>
        <div> {
          this.state.data.map((value,key) => {
            if(value.product_Id === parseInt(this.props.match.params.id )) {
              console.log(value.product_Name) ;
              return (
                <div className="clss6 heading text-center mb-3 mb-sm-5" key={key}>
                  <h3 className="heading text-center mb-3 mb-sm-5">-- Chi tiết món ăn --</h3>
                  <div className="container">
                    <img src={value.product_Img} className="" alt="react router demo" />
                    <h3 className="lead text-center">{value.product_Name}</h3>
                    <hr className="my-2" /> <br/>{value.product_Detail}<p>/</p><br/><br/>
                    <h4>Thành phần:</h4>    <br/>{value.product_TP}<br/><br/>
                    <h4>Sơ chế</h4>         <br/>{value.product_SC}<br/><br/>
                    <h4>Cách thực hiện:</h4><br/>{value.product_TH}<br/><br/>
                    <iframe width="779" height="438" src={value.product_Video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                </div>
              )
            }
          })
        }
        <br/><br/>
        <div className="container">
          <h4 className="card-title text-center">Món ăn ngon khác </h4>
          <br/>
          <div className="row">
            <div className="col-12">
              <div className="card-deck">{
                this.state.data.map((value,key) => {
                  if(value.product_Id !==  parseInt(this.props.match.params.id)  ){
                    if(dem <=4 ) {
                      dem++;  
                      return (
                        <NewsRelated key={key} 
                          tinId={value.product_Id}
                          anh={value.product_Img} 
                          tieuDe={value.product_Name}
                          trichDan={value.product_Note}> </NewsRelated>
                      )
                    }
                  }   
                })
              }
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>);
  }
}

export default NewsDetail;