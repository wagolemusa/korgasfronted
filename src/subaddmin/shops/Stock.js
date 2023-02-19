
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import '../styles.css'
import axios from "axios";
let token = localStorage.getItem('token')

const Stock = () => {
    const [category, setCategory] = useState('');
    const [added_stock, setAdded_stock] = useState('');
    const [shop, setShop] = useState();


    const [queryshop, setQueryshop] = useState();
    const [querycategory, setQuerycategory] = useState();
    const [stockdata, setStockdata ] = useState();

  
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const shopdata = {
            category,
            added_stock,
            shop,
        }
        const response = await axios.post("https://korgasbackend.onrender.com/api/v1/add/stock", shopdata, {
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
            window.location.replace("/stock")
        }
        if (response?.data?.errors) {
            const message = response.data.errors.map(item => item.msg)
            setError(message)
        }
    }

    useEffect(() => {
        // fetch shop data
        const shopsdata = () => {
            axios.get('https://korgasbackend.onrender.com/api/v1/shop', {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    const myshop = res.data.shop;
                    setQueryshop(myshop)
                })
        }

        
        // fetch kgs category data
        const myCategoey = () => {
            axios.get("https://korgasbackend.onrender.com/api/v1/category", {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const getcategory = res.data.cate;
                    setQuerycategory(getcategory)
                })
        }

        const myStock = () => {
            axios.get("https://korgasbackend.onrender.com/api/v1/add/stock", {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const getstock = res.data.shops;
                    setStockdata(getstock)
                })
        }

        myCategoey()
        shopsdata()
        myStock()
    }, []);

    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">

                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                       Create Shops
                    </button>


                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                               
                                    <h5 class="modal-title" id="exampleModalLabel">Add Treller</h5>

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
                                            <input type="number" class="form-control" placeholder="Number of cyliders"
                                                onChange={(e) => setAdded_stock(e.target.value)}
                                            />
                                        </div><br />
                                <select class="form-select" aria-label="Default select example" 
                                            onChange={(e) => setCategory(e.target.value)}
                                    >
                                         <option>Select kgs</option>
                                      
                                        {
                                            querycategory?.map((catdata, index) => {
                                                return (
                                                    // <option>{catdata.district}</option>
                                                    <option key={index}>{catdata.category_name}</option>
                                                )
                                            })
                                        }

                                    </select><br />

                                    <select class="form-select" aria-label="Default select example" 
                                            onChange={(e) => setShop(e.target.value)}
                                    >
                                       <option>Select Shop</option>
                                        {
                                            queryshop?.map((shopkeeper, index) => {
                                                return (
                                                    // <option>{catdata.district}</option>
                                                   
                                                    <option key={index}>{shopkeeper.shop_name}</option>
                                                )
                                            })
                                        }

                                    </select><br />
                                        
       
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

                                        <th scope="col">Shops</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Initial Quantity</th>
                                        <th scope="col">Stock Added</th>
                                        <th scope="col">Final Stock</th>
                                     

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stockdata?.map((stockinfo) => {
                                            return (
                                                <tr>
                                                    <td>{stockinfo.shop}</td>
                                                    <td>{stockinfo.category}</td>
                                                    <td>{stockinfo.price}</td>
                                                    <td>{stockinfo.initial_quantity}</td>
                                                    <td>{stockinfo.added_stock}</td>
                                                
                                                    <td>{stockinfo.stock_quantity}</td>
                                         
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

export default Stock;


