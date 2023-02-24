
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import '../styles.css'
import axios from "axios";
let token = localStorage.getItem('token')

const Shop = () => {
    const [shop_name, setShop_name] = useState();
    const [employee, setEmployee] = useState('');
    const [address, setAddress] = useState('');
    const [town, setTown] = useState('');

    const [shop, setShop] = useState();
    const [category, setCategory] = useState();
    const [empl, setEmpl] = useState();
  
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const shopdata = {
            shop_name,
            employee,
            address,
            town
    
        }
        const response = await axios.post("https://korgasbackend.onrender.com/api/v1/shop", shopdata, {
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
            window.location.replace("/treller")
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
                    setShop(myshop)
                })
        }

        const employeedata = () => {
            axios.get('https://korgasbackend.onrender.com/api/v1/employee', {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    const myemployee = res.data.employee;
                    setEmpl(myemployee)
                })
        }


        // fetch address data
        const myCategoey = () => {
            axios.get("https://korgasbackend.onrender.com/api/v1/address", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const getcategory = res.data.address;
                    setCategory(getcategory)
                })

        }
        myCategoey()
        employeedata()
        shopsdata()
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
                                            <input type="text" class="form-control" placeholder="Shop Name"
                                                onChange={(e) => setShop_name(e.target.value)}
                                            />
                                        </div><br />
                                       
                                        <select class="form-select" aria-label="Default select example" 
                                            onChange={(e) => setEmployee(e.target.value)}
                                    >
                                       <option>Select Employee</option>
                                        {
                                            empl?.map((employees, index) => {
                                                return (
                                                    // <option>{catdata.district}</option>
                                                   
                                                    <option key={index}>{employees.lastname}</option>
                                                )
                                            })
                                        }

                                    </select><br />
                                        <select class="form-select" aria-label="Default select example" 
                                            onChange={(e) => setAddress(e.target.value)}
                                    >
                                         <option>Select District</option>
                                      
                                        {
                                            category?.map((catdata, index) => {
                                                return (
                                                    // <option>{catdata.district}</option>
                                                    <option key={index}>{catdata.district}</option>
                                                )
                                            })
                                        }

                                    </select><br />
                                    <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Town"
                                                onChange={(e) => setTown(e.target.value)}
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

                                        <th scope="col">Shop Name</th>
                                        <th scope="col">Emaployee</th>
                                        <th scope="col">District</th>
                                        <th scope="col">Town</th>
                                     

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        shop?.map((shopinfo) => {
                                            return (
                                                <tr>
                                                    <td>{shopinfo.shop_name}</td>
                                                    <td>{shopinfo.employee}</td>
                                                    <td>{shopinfo.address}</td>
                                                    <td>{shopinfo.town}</td>
                                         
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

export default Shop;


