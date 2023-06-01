import React from 'react'
import Axios from 'axios'
import base_url from '../base_url'
let data_id = window.location.pathname.split('/')[2]

export default class View extends React.Component {
    state = {
        word:'',
        plural:'',
        type:'',
        origin:'',
        example:'',
        descripion:'',
        comment:''
    }
    get_data = () =>{
        
        Axios.get(base_url+'apis/view_data?id='+data_id)
        .then(res=>{
            
            this.setState({word:res.data.data[0].word, plural:res.data.data[0].plural,type:res.data.data[0].type,origin:res.data.data[0].origin,example:res.data.data[0].example,descripion:res.data.data[0].description,comment:res.data.data[0].comment})
        })
    }

    componentDidMount(){
            this.get_data()
        }
    render(){
        return(
            <center >
                <div className='jumbotron' style={{width:'60%',padding:10,borderRadius:10}}>
                <p>word : {this.state.word}</p>
                <p>plural : {this.state.plural}</p>
                <p>type : {this.state.type}</p>
                <p>origin : {this.state.origin}</p>
                <p>example : {this.state.example}</p>
                <p>descripion : {this.state.descripion}</p>
                <p>comment : {this.state.comment}</p>



                </div>
            </center>
        )
    }
}