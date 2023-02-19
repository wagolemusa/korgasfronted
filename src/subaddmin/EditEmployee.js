import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

let token = localStorage.getItem('token')

const EditEmployee = () => {

    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const [businessname, setBusinessname] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [whatsupnumber, setWhatsupnumber] = useState('');
    const [email, setEmail] = useState('');
    const [mounthlySale, setMounthlySale] = useState('')
    const [price, setPrice] = useState('')
    const [address, setAddress] = useState('');
    const [town, setTown] = useState('');
    const [id, setID] = useState('');

    const [category, setCategory] = useState()
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // update customer
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);

        const UpdatecustomerData = {
            businessname,
            phonenumber,
            whatsupnumber,
            email,
            mounthlySale,
            address,
            town,
            price
        }
        const response = await axios.put('http://localhost:5000/api/v1/customer/' + path, UpdatecustomerData, {
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


    useEffect(() =>{
        const getCustomerId = () => {
            axios.get('http://localhost:3000/api/v1/client/' + path, {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => {
                 
                // const myclient = res.data.customer;
                //     setClient(myclient)
                    setBusinessname(res.data.client.businessname)
                    setPhoneNumber(res.data.client.phonenumber)
                    setWhatsupnumber(res.data.client.whatsupnumber)
                    setEmail(res.data.client.email)
                    setMounthlySale(res.data.client.mounthlySale)
                    setPrice(res.data.client.price)
                    setAddress(res.data.client.address)
                    setTown(res.data.client.town)
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
    getCustomerId()

    }, [path]);

    console.log("busz", businessname)
    return(
        <>
           <Sidebar />
            <div className='profileside'>
                <div class="container">
                    <h1>Edit Customers</h1>
                   <h2>{businessname}</h2> 
                   <h2> {phonenumber}</h2>


                   <div class="modal-body">
                                
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Business Name" value={businessname}
                                  onChange={(e) => setBusinessname(e.target.value)}
                                
                                    />
                                </div><br />
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Phone Number" value={phonenumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div><br />
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Whatsup Number" value={whatsupnumber}
                                        onChange={(e) => setWhatsupnumber(e.target.value)}
                                    />
                                </div><br />
                                <div class="form-group">
                                    <input type="email" class="form-control" placeholder="Email" value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div><br />
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Mounthly Sale" value={mounthlySale}
                                        onChange={(e) => setMounthlySale(e.target.value)}
                                    />
                                </div><br />
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Price" value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div><br />

                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Address" value={address}
                                        onChange={(e) => setAddress(e.target.value)} 
                                    />
                                </div><br />

                         
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Town" value={town}
                                      onChange={(e) => setTown(e.target.value)}
                                    />
                                </div><br />
                              
                            <div class="modal-footer">
                                <button type="submit" onClick={handleUpdate} class="btn btn-primary">Update Customer</button>
                            </div>
                      
                        </div>
                      
                </div>
            </div>
        </>
    )
}

export default EditEmployee;

