import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

let token = localStorage.getItem('token');

const FutureCustomer = () => {

    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [whatsupNumber, setWhatsupNumber] = useState("")
    const [town, setTown] = useState("")
    const [status, setStatus] = useState("")
    const [address, setAddress] = useState("")
    const [future, setFuture] = useState()
    const [category, setCategory] = useState()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)

        const futureSvae = {
            name,
            phoneNumber,
            whatsupNumber,
            town,
            address,
            status,
            category
        }

        const response = await axios.post("http://localhost:5000/api/v1/future/customer", futureSvae, {
            headers: {
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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
            window.location.replace("/future")
        }
        if (response?.data?.errors) {
            const message = response.data.errors.map(item => item.msg)
            setError(message)
        }

    }




    useEffect(() => {
        const myFucture = () => {
            axios.get("http://localhost:5000/api/v1/future/customer", {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const getfuture = res.data.future;
                    setFuture(getfuture)
                })
        }


        const myCategoey = () => {
            axios.get("http://localhost:5000/api/v1/address", {
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
        myFucture()
        myCategoey()

    }, []);

    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Future Customers
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add Treller</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                </div>
                                <form onSubmit={handleSubmit}>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Full Names"
                                         onChange={(e) => setName(e.target.value)}
                                        />
                                    </div><br />
                                    <div class="form-group">
                                        <input type="number" class="form-control" placeholder="phone Number"
                                         onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div><br />
                                    <div class="form-group">
                                        <input type="number" class="form-control" placeholder="Whatsup Number"
                                         onChange={(e) => setWhatsupNumber(e.target.value)}
                                        />
                                    </div><br />
                              
                                    <select class="form-select" aria-label="Default select example" 
                                      onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option selected>Status</option>
                                        <option>homeuse</option>
                                        <option>hotel</option>
                                        <option>school</option>
                                        <option>resale</option>
                                    </select><br />
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
                                </div></form>
                          
                            </div>
                        </div>
                    </div>

                    {/* Fetch Stock Data */}
                    <div className="userform">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>

                                        <th scope="col">Name</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Whats'up Number</th>
                                        <th scope="col">Town</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        future?.map((futuredata) => {
                                            return (
                                                <tr>
                                                    <td>{futuredata.name}</td>
                                                    <td>{futuredata.phoneNumber}</td>
                                                    <td>{futuredata.whatsupNumber}</td>
                                                    <td>{futuredata.town}</td>
                                                    <td>{futuredata.status}</td>
                                                    <td>{futuredata.address}</td>

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

export default FutureCustomer;


