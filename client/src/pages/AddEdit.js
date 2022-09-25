
import React ,{useState, useEffect} from "react";
import {useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import "./AddEdit.css"
const initialstate={
    name:"",
    email:"",
    contact:""
}
const AddEdit = ()=>{
    const [state,setState]=useState(initialstate);
    const {name, email, contact}=state;
    const navigate =useNavigate();

    const {id}=useParams();

    useEffect(()=>{
     axios.get(`/api/get/${id}`).then((resp)=>setState({...resp.data[0]}));
    },[id]);

    const HandleSubmit=(e)=>{
       e.preventDefault();
       if(!name ||!email ||!contact){
        toast.error("Please enter the value in each input field");
       }else{
        if(!id){
            axios.post("/api/post",{
            name,
            email,
            contact
        }).then(()=>{
            setState({name:"" , email:"", contact:""});
        }).catch((err)=>{ console.log(err.response.data);})
        toast.success("Contact Added Sucessfully")
        }else{
            axios.put(`/api/update/${id}`,{
                name,
                email,
                contact
            }).then(()=>{
                setState({name:"" , email:"", contact:""});
            }).catch((err)=>{ console.log(err.response.data);})
            toast.success("Contact Updated Sucessfully")
        }
        setTimeout(()=> navigate('/'),500);

       }
    };
    const HandleInputChange=(e)=>{
        const {name , value}=e.target;
        setState({... state,[name]: value})
    }


    return(
        <div style={{marginTop:"100px"}}>
            <form style={{
                margin:"auto",
                padding:"15px",
                maxWidth:"400px",
                alignContent:"center"

            }}

            onSubmit={HandleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input type="text"
                id="name"
                name="name"
                placeholder="Enter your Name"
                value={name || ""}
                onChange={HandleInputChange} />

                <label htmlFor="email">Email</label>
                <input type="text"
                id="email"
                name="email"
                placeholder="Enter your Email"
                value={email || ""}
                onChange={HandleInputChange} />

                <label htmlFor="contact">Contact</label>
                <input type="number"
                id="contact"
                name="contact"
                placeholder="Enter your contact"
                value={contact || ""}
                onChange={HandleInputChange} />

                <input type="submit" value="save" />
                <Link to="/">
                    <input type="button" value="Go Back" />
                </Link>

            </form>
            
        </div>
    );
}
export default AddEdit;