import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import './styles.css'
import axios from "axios";
let token = localStorage.getItem('token')

const Customer = () => {
    const [businessname, setBusinessname] = useState();
    const [phonenumber, setPhoneNumber] = useState('');
    const [whatsupnumber, setWhatsupnumber] = useState('');
    const [email, setEmail] = useState('');
    const [mounthlySale, setMounthlySale] = useState('')
    const [address, setAddress] = useState('');
    const [town, setTown] = useState('');
    const [client, setClient ] = useState()
    const [category, setCategory] = useState()

  
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const customerData = {
            businessname,
            phonenumber,
            whatsupnumber,
            email,
            mounthlySale,
            address,
            town

    
        }
        const response = await axios.post("https://korgasbackend.onrender.com/api/v1/customers", customerData, {
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
            window.location.replace("/client")
        }
        if (response?.data?.errors) {
            const message = response.data.errors.map(item => item.msg)
            setError(message)
        }
    }

    //  fetch customer's data
    useEffect(() => {
        const clientdata = () => {
            axios.get('https://korgasbackend.onrender.com/api/v1/clients', {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then((res) => {
                    const myclient = res.data.customer;
                    setClient(myclient)
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

            console.log("Category", category)

        }
        myCategoey()
        clientdata()
    }, []);

    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">

                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Create Customer
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
                                            <input type="text" class="form-control" placeholder="Business Name"
                                                onChange={(e) => setBusinessname(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Phone Number"
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Whatsup Number"
                                                onChange={(e) => setWhatsupnumber(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div><br />
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Mounthly Sale"
                                                onChange={(e) => setMounthlySale(e.target.value)}
                                            />
                                        </div><br />
                                        <select class="form-select" aria-label="Default select example" 
                                            onChange={(e) => setAddress(e.target.value)}
                                    >
                                      
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

                                        <th scope="col">Business Name</th>
                                        <th scope="col">phone Number</th>
                                        <th scope="col">Whatsup Number</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Daily Sale</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Town</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        client?.map((clientdata) => {
                                            return (
                                                <tr>
                                                    <td>{clientdata.businessname}</td>
                                                    <td>{clientdata.phonenumber}</td>
                                                    <td>{clientdata.whatsupnumber}</td>
                                                    <td>{clientdata.email}</td>
                                                    <td>{clientdata.mounthlySale}</td>
                                                    <td>{clientdata.address}</td>
                                                    <td>{clientdata.town}</td>
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

export default Customer;


