import React from 'react'
import Axios from 'axios'
import base_url from '../base_url'
import Pagination from "react-js-pagination";

export default class Home extends React.Component{
    state = {
        search_value:'',
        offset:0,
        selected_page:0,
        data_count:null,
        type:'',
        data:[],
        is_sorted:false
     
    }
    get_all_data = ()=>{
        Axios.get(base_url+`apis/get_all_data?offset=${this.state.offset}`)
        .then(res=>{
            this.setState({data:res.data.data,data_count:res.data.data[0]?.data_count})
        })
        .catch(err=>{
            console.log(err)
        })
    }


    search = ()=>{
        Axios.get(base_url+`apis/search?offset=${this.state.offset}&&search_value=${this.state.search_value}`)
        .then(res=>{
            
            this.setState({data:res.data.data,data_count:res.data.data[0]?.data_count})
        })
        .catch(err=>{
            console.log(err)
        })
    }


    filter_with_search = ()=>{
        Axios.get(base_url+`apis/filter_with_search?offset=${this.state.offset}&&filter_value=${this.state.type}&&search_value=${this.state.search_value}`)
        .then(res=>{
            
            this.setState({data:res.data.data,data_count:res.data.data[0]?.data_count})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    filter = (type)=>{
     

      Axios.get(base_url+`apis/filter?offset=${this.state.offset}&&filter_value=${type}`)
      .then(res=>{
          
          this.setState({data:res.data.data,data_count:res.data.data[0]?.data_count})
      })
      .catch(err=>{
          console.log(err)
      })
    }



    sort = ()=>{
        
        var sortedList = this.state.data.sort((a, b) =>
            a.word?.localeCompare(b.word) ||  a.description?.localeCompare(b.description) || a.plural?.localeCompare(b.plural) || a.comment?.localeCompare(b.comment) || a.origin?.localeCompare(b.origin));
        this.setState({data:sortedList,is_sorted:true})
    }

   

    componentDidMount(){
        this.get_all_data()
       
    }
    render(){
       return <div>
      
            <button type="button" className="btn btn-primary mt-4 " data-toggle="modal" data-target="#exampleModal">
            <i class="fa fa-filter"></i>

            </button>


            <a href="/add" className="btn btn-primary mt-4 float-right mr-5" >Add</a>




        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <input className='form form-control' onChange={(val)=>this.setState({search_value:val.target.value})} placeholder='Search...'/>
            <button type="button" onClick={()=>{
                if(this.state.type.length>0){
                    this.filter_with_search()
                }else{
                    this.search()
                }
            }} class="btn btn-primary">Search</button>
        </div>
        <table class="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">word</th>
                    <th scope="col">type</th>
                    <th scope="col">plural</th>
                    <th scope="col">description</th>
                    <th scope="col">origin</th>
                    <th scope="col">example</th>

                    <th scope="col">comment</th>
                    <th scope="col">Edit</th>

                    <th scope="col">Edit</th>




                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map(i=>{
                        return   <tr>
                        <th scope="row">{i.id}</th>
                        <td>{i.word}</td>
                        <td>{i.type}</td>
                        <td>{i.plural}</td>
                        <td>{i.description}</td>
                        <td>{i.origin}</td>
                        <td>{i.example}</td>
                        <td>{i.comment}</td>
                        <td>
                            <a href={'/view/'+i.id} class="btn btn-primary">View</a>
                        </td>
                        <td>
                            <a href={'/edit/'+i.id} class="btn btn-primary">Edit</a>
                        </td>
                    
                        </tr>
                    })}
                  
                    
                </tbody>
         </table>




        

       
    <div style={{justifyContent:'center',display:'flex',marginTop:80 }}>

    <Pagination
          activePage={this.state.selected_page}
          itemsCountPerPage={2}
          itemClass="page-item"
          linkClass="page-link"

          totalItemsCount={Math.ceil(this.state.data_count/10)}
          pageRangeDisplayed={10}
          onChange={(page)=>{
            console.log(page)
            this.setState({offset:page*10,selected_page:page},()=>{
                if(this.state.search_value.length >0 && this.state.type.length<1){
                    this.search()
                }else if(this.state.search_value.length <1 && this.state.type.length>0){
                    this.filter(this.state.type)
                }
                else if(this.state.search_value.length >1 && this.state.type.length>1){
                    this.filter_with_search()
                }else{
                    this.get_all_data()
                }


                if(this.state.is_sorted){
                    this.sort()
                }
            })

        }}
        />
       
  
    </div>
     
    
  
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Filter or Sort</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      

      <select onChange={(val)=>{
        this.setState({type:val.target.value})
        if(this.state.search_value.length>0){
            this.filter_with_search(val.target.value)
        }else{
            this.filter(val.target.value)

        }
      }} className='form-control'>
        <option selected>Filter</option>
        <option value="n">n</option>
        <option value="a">a</option>
        <option value="i">i</option>
        <option value="f">f</option>
        <option value="l">l</option>
        <option value="o">o</option>




       

      </select>

     

     <button onClick={this.sort} className='btn btn-primary mt-4' style={{width:'100%'}}>Sort Alphabatically</button>



      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
     
      </div>
    </div>
  </div>
</div>

       </div>
    }
}