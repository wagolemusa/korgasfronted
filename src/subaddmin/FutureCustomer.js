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
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const getcategory = res.data.address;
                    setCategory(getcategory)
                })

                console.log(category)
               
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
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Full Names"
                                        />
                                    </div><br />
                                    <div class="form-group">
                                        <input type="number" class="form-control" placeholder="phone Number"
                                        />
                                    </div><br />
                                    <div class="form-group">
                                        <input type="number" class="form-control" placeholder="Whatsup Number"
                                        />
                                    </div><br />
                                    <div class="form-group">
                                        <input type="number" class="form-control" placeholder="Phone Number"
                                        />
                                    </div><br />
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Status</option>
                                        <option value="1">homeuse</option>
                                        <option value="2">hotel</option>
                                        <option value="3">school</option>
                                        <option value="3">resale</option>
                                    </select><br />
                                    {/* <select class="form-select" aria-label="Default select example">

                                    {
                                    category.map(({catdata, index}) => {
                                        <option key={index}>{catdata.district}</option>
                                    })
                                }
                                
                                    </select><br/> */}

                                    <label htmlFor="category-select">Select a category:</label>
                                    <select
                                        id="category-select"
                                        className="form-select"
                                        aria-label="Default select example"
                                    >
                                        {category?.map(({ catdata, index }) => (
                                            <option key={index}>{catdata.district}</option>
                                        ))}
                                    </select>

                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Town"
                                        />
                                    </div><br />

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save</button>
                                </div>
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


