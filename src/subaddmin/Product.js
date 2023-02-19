
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import './styles.css'
import axios from "axios";
let token = localStorage.getItem('token')

const Product = () => {
    const [category, setCategory] = useState();
    const [kgs, setKgs] = useState('');
    const [price, setPrice] = useState('');
    const [points, setPoints] = useState('');

    const [product, setProduct] = useState();
    const [categorproduct, setCategoryproduct] = useState();


    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const productdata = {
            category,
            kgs,
            price,
            points
    
        }
        const response = await axios.post("http://localhost:5000/api/v1/product", productdata, {
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
            window.location.replace("/product")
        }
        if (response?.data?.errors) {
            const message = response.data.errors.map(item => item.msg)
            setError(message)
        }
    }

    useEffect(() => {
        // fetch product  data
        const productsdata = () => {
            axios.get('http://localhost:5000/api/v1/product', {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    const mypro = res.data.product;
                    setProduct(mypro)
                })
        }



        // fetch address data
        const productCategory = () => {
            axios.get("http://localhost:5000/api/v1/category/product", {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const cata_data = res.data.categ;
                    setCategoryproduct(cata_data)
                })


        }
        productCategory()
        productsdata()
    }, []);

    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">

                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                       Create Products
                    </button>


                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                               
                                    <h5 class="modal-title" id="exampleModalLabel">Product to Sell</h5>

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
                                 
                                <select class="form-select" aria-label="Default select example" 
                                            onChange={(e) => setCategory(e.target.value)}
                                    >
                                         <option>Select Category</option>
                                      
                                        {
                                            categorproduct?.map((catdata, index) => {
                                                return (
                                                    // <option>{catdata.district}</option>
                                                    <option key={index}>{catdata.name}</option>
                                                )
                                            })
                                        }

                                    </select><br />

                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Kgs"
                                                onChange={(e) => setKgs(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Price"
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div><br />
                               
                                    <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Points"
                                                onChange={(e) => setPoints(e.target.value)}
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

                                        <th scope="col">Category</th>
                                        <th scope="col">Kgs</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Points</th>
                                     

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product?.map((productinfo) => {
                                            return (
                                                <tr>
                                                    <td>{productinfo.category}</td>
                                                    <td>{productinfo.kgs}</td>
                                                    <td>{productinfo.price}</td>
                                                    <td>{productinfo.points}</td>
                                         
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

export default Product;


