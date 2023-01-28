import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import './styles.css'
import axios from "axios";
let token = localStorage.getItem('token')

const Productcateogry = () => {
    const [name, setName] = useState('')

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [proCate, setProCate] = useState()

    // Create user by Manager
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const cataData = {
            name,
      
        }
        const response = await axios.post("http://localhost:5000/api/v1/category/product", cataData, {
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).catch((err) => {
            if (err && err.response) setError(err.response.data.message);
            setSuccess(null)
        });
        if (response && response.data) {
            setError(null);
            setSuccess(response.data.message);
        }
        if (response.status === 201) {
            window.location.replace("/productcategory")
        }
        if (response?.data?.errors) {
            const message = response.data.errors.map(item => item.msg)
            setError(message)
        }
    }


    // Query users
    useEffect(() => {
        const productcate = () => {
            axios.get("http://localhost:5000/api/v1/category/product", {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const mycata = res.data.categ;
                    setProCate(mycata)
                })
        }
        productcate()
    }, []);
    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="userform">
                                <h1>Create Category</h1>

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
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div><br />
                                
        
                                 
                                    <br />
                                    <button type="submit" class="btnSubmit">Create Category</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="userform">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>

                                                <th scope="col">Name</th>
                                        
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                proCate?.map((catadata) => {
                                                    return (
                                                        <tr>
                                                            <td>{catadata.name}</td>
                                                  

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
                </div>
            </div>
        </>
    )
}

export default Productcateogry;


