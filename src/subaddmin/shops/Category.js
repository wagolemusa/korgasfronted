import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import '../styles.css'
import axios from "axios";

let token = localStorage.getItem('token')
const Category = () => {

    const [category_name, setCategory_name] = useState('')
    const [ category, setCategory] = useState()

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const categoryData ={
            category_name
        }

        const response = await axios.post("http://localhost:5000/api/v1/category",categoryData, {
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .catch((err) => {
                if (err && err.response) setError(err.response.data.message);
                setSuccess(null)
            });
        if (response && response.data) {
            setError(null)
            setSuccess(response.data.message);
        }
        if (response.status === 201) {
            window.location.replace("/category")
        }
        if (response?.data?.errors) {
            const message = response.data.errors.map(item => item.msg)
            setError(message)
        }
    }

    //  fetch Categiory data
    useEffect(() => { 
        const myCategory =() => {
            axios.get('http://localhost:5000/api/v1/category', {
               headers:{
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
               } 
            })
            .then((res) => {
                const getdata = res.data.cate;
                setCategory(getdata)
            })
        }
        myCategory()
    }, []);

    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div className="container">
                    
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Create Employee
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                               
                                    <h5 class="modal-title" id="exampleModalLabel">Create Customer</h5>

                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                {!error && <div className='suc'>{success ? success : ""}</div>}
                                {!success && Array.isArray(error) ? error.map((item, i) => (
                                    <div class="notice notice-danger alert fade show" role="alert">
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                        <h4 key={i}> {item} </h4>
                                    </div>
                                )) : <p>{error} </p>
                                }
                                 <form onSubmit={handleSubmit}>
                                <div class="modal-body">
                                
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Category"
                                                onChange={(e) => setCategory_name(e.target.value)}
                                            />
                                        </div><br />
                                      
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Save</button>
                                    </div>
                              
                                </div>
                                </form>
                            
                                
                            </div>
                        
                        </div>
                       
                 </div>
                        
                

                    {/* Fetch Treller Data */}
                    <div className="userform">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>

                                        <th scope="col">Category Name</th>
                                   

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        category?.map((catdata) => {
                                            return (
                                                <tr>
                                                    <td>{catdata.category_name}</td>
                                                 
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category;


