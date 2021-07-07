import React,{Component} from 'react';
import NewIteam from './NewIteam';
class Product extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data : [],
          activePage: 15
        };
      }
     
      handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }
    
      componentDidMount() {
        fetch('http://localhost:5000/products')
          .then(res => res.json())
          .then(result => this.setState({data: result}))
          .catch(err => console.error(err));
    }


     
     render(){

         return(
            <div>
            <section className="inner-page-banner" id="home">
            </section>
            
            
            
            <div className="breadcrumb-agile">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Product</li>
                </ol>
            </div>
            
            
            <section className="what-we-do py-5">
            <h3 className="heading text-center mb-3 mb-sm-5">-- Món ngon mỗi ngày --</h3>
            
                <div className="container">
                <div className="row mt-4">

           
          {

              this.state.data.map((value,key) => {
                  return (
                    <NewIteam key={key}  
                    tinId={value.product_Id}
                    anh1={value.product_Img} 
                    tieuDe1={value.product_Name}
                    trichDan={value.product_Note}> </NewIteam>
                  )
              }) 
          }

           </div>  
   

                  <div className="pagination">
                 <a href="#!">«</a>
                 <a className="active"  href="#">1</a>
                 <a href="#!">2</a>
                 <a href="#!">3</a>
                 <a href="#!">4</a>
                 <a href="#!">5</a>
                 <a href="#!">6</a>
                 <a href="#!">»</a>
               </div>

               
                </div>
                
                              
              </section>

                </div>
         )
     }
 }


 export default Product