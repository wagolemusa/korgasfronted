import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

let token = localStorage.getItem('token');

const Tank = () => {

    const [ date, setDate ] = useState("");
    const [ openStock, setOpenStock ] = useState("")
    const [ closedStock, setClosedStock] = useState("")
    const [ stock, setStock ] = useState()
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);

        const stocks = {
            date,
            openStock,
            closedStock
        }

        const response = await axios.post("http://localhost:5000/api/v1/stock", stocks, {
            headers: {
                'Authorization': token,
                'Accept':'application/json',
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
        window.location.replace("/tank")
    }
    if (response?.data?.errors) {
        const message = response.data.errors.map(item => item.msg)
        setError(message)
    }
    }

    useEffect(() => {
        const myStock = () => {
            axios.get('http://localhost:5000/api/v1/stock', {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    const getStock = res.data.stock;
                  
                    setStock(getStock)
                })
        }
        myStock()
    }, []);

    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="userform">
                                <h1>Add Tank Stock</h1>
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
                                <input type="date" class="form-control" placeholder=""
                                 onChange={(e) => setDate(e.target.value)}
                                     />
                            </div><br/>
                            <div class="form-group">
                                <input type="number" class="form-control" placeholder="Opening Stock"
                                 onChange={(e) => setOpenStock(e.target.value)}
                                    />
                            </div><br/>
                            <div class="form-group">
                                <input type="number" class="form-control" placeholder="Closing Stock"
                                 onChange={(e) => setClosedStock(e.target.value)}
                                    />
                            </div><br/>
                          
                         
                                <div class="form-group">
                                <input type="submit" class="btnSubmit" value="Add Stock" />
                            </div><br/>
                            </form>
                            </div>
                            
                        </div>
                        <div className="col-md-8">

                     {/* Fetch Stock Data */}
                    <div className="userform">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>

                                        <th scope="col">Date</th>
                                        <th scope="col">Gas Stock</th>
                              
                                        {/* <th scope="col">Current Stock</th> */}
                                        <th scope="col">Tank Number</th>
                                        <th scope="col">Gas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stock?.map((stockdata) => {
                                            return (
                                                <tr>
                                                    <td>{stockdata.date}</td>
                                                    <td>{stockdata.closedStock}</td>

                                                    {/* <td>{stockdata.currentStock}</td> */}
                                                    <td>{stockdata. tank_category}</td>
                                                    <td>{stockdata. in_stock}</td>
                                            
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

export default Tank;


