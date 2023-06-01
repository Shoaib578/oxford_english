import React from 'react'
import Axios from 'axios'
import base_url from '../base_url'
export default class Add extends React.Component {
    state = {
        word:'',
        plural:'',
        type:'',
        origin:'',
        example:'',
        descripion:'',
        comment:''
    }

    insert_data = ()=>{
        Axios.post(base_url+'apis/insert_data',{
           
            'word':this.state.word,
            'plural':this.state.plural,
            'type':this.state.type,
            'origin':this.state.origin,
            'example':this.state.example,
            'descripion':this.state.descripion,
            'comment':this.state.comment
        })
        .then(res=>{
            if(res.data.is_updated){

                alert("Updated Successfully!")
                this.setState({
                    word:'',
                    plural:'',
                    type:'',
                    origin:'',
                    example:'',
                    descripion:'',
                    comment:''
                })
            }else{
              if(res.data.is_inserted){
                alert("Inserted Successfully!")
                this.setState({
                    word:'',
                    plural:'',
                    type:'',
                    origin:'',
                    example:'',
                    descripion:'',
                    comment:''
                })
              }else{
                alert(res.data.status)
              }
            }
        })
        .catch(err=>{
            alert(err.message)
        })
    }
    render(){
        return(
            <div style={{marginLeft:'30%',marginTop:50}}>

            <h3>Insert Data</h3>
            <br />

            <div class="form-group">
            <label for="exampleInputEmail1" >Word:</label>
            <input type="text" placeholder='word' onChange={(val)=>{
                this.setState({word:val.target.value})
            }} className='form-control' value={this.state.word} style={{width:'50%' }}/>
            </div>

            <div class="form-group">
            <label for="exampleInputEmail1" >Plural:</label>
            <input type="text" placeholder='plural' onChange={(val)=>{
                this.setState({plural:val.target.value})
            }} className='form-control' value={this.state.plural} style={{width:'50%' }}/>
            </div>


            <div class="form-group">
            <label for="exampleInputEmail1" >Type:</label>
            <input type="text" placeholder='type' onChange={(val)=>{
                this.setState({type:val.target.value})
            }} className='form-control' value={this.state.type} style={{width:'50%' }}/>
            </div>



            <div class="form-group">
            <label for="exampleInputEmail1" >origin:</label>
            <input type="text" placeholder='origin' onChange={(val)=>{
                this.setState({origin:val.target.value})
            }} className='form-control' value={this.state.origin} style={{width:'50%' }}/>
            </div>
            <div class="form-group">
            <label for="exampleInputEmail1" >Example:</label>
            <input type="text" onChange={(val)=>{
                this.setState({example:val.target.value})
            }} placeholder='example' className='form-control' value={this.state.example} style={{width:'50%'}}/>
            </div>

            <div class="form-group">
            <label for="exampleInputEmail1" >descripion:</label>

            <textarea className='form-control ' onChange={(val)=>{
                this.setState({descripion:val.target.value})
            }} style={{width:'50%'}} value={this.state.descripion} placeholder='descripion'></textarea>
            </div>
            
            <div class="form-group">
                <label for="exampleInputEmail1" >comment:</label>
            <textarea onChange={(val)=>{
                this.setState({comment:val.target.value})
            }} className='form-control' style={{width:'50%'}} value={this.state.comment} placeholder='comment'></textarea>

           </div>
           
            <button onClick={this.insert_data} className='btn btn-primary mt-5'>Add</button>


        </div>
        )
    }
}