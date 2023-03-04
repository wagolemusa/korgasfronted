import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import './styles.css'
import axios from "axios";

const User = () => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [ price, setPrice ] = useState('')
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [getuserinfo, setGetuserinfo] = useState()

    // Create user by Manager
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const customer = {
            firstname,
            lastname,
            email,
            role,
            price
        }
        const response = await axios.post("http://localhost:5000/users/api/register", customer, {
            headers: {
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
            window.location.replace("/user")
        }
        if (response?.data?.errors) {
            const message = response.data.errors.map(item => item.msg)
            setError(message)
        }
    }


    // Query users
    useEffect(() => {
        const getUsers = () => {
            axios.get("https://korgasbackend.onrender.com/users/api/user", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const myuser = res.data.user;
                    setGetuserinfo(myuser)
                })
        }
        getUsers()
    }, []);
    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="userform">
                                <h1>Add User</h1>

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
                                        <input type="text" class="form-control" placeholder="FirstName"
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                    </div><br />
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="LastName"
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </div><br />
                                    <div class="form-group">
                                        <input type="email" class="form-control" placeholder="Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div><br />
                                    <div class="form-group">
                                        <select class="form-control" id="exampleFormControlSelect1"
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option>Select Role</option>
                                            <option>manager</option>
                                            <option>subadmin</option>
                                            <option>shopkeeper</option>
                                            <option>driver</option>
                                            <option>customer</option>
                                        </select>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <input type="number" className="form-control" placeholder="Price"
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                    <br/>
                                    <button type="submit" class="btnSubmit">Create User</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="userform">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>

                                                <th scope="col">FirstName</th>
                                                <th scope="col">LastName</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Role</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Password</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getuserinfo?.map((userdata) => {
                                                    return (
                                                        <tr>
                                                            <td>{userdata.firstname}</td>
                                                            <td>{userdata.lastname}</td>
                                                            <td>{userdata.email}</td>
                                                            <td>{userdata.role}</td>
                                                            <td>{userdata.price}</td>
                                                            <td>{userdata.password1}</td>

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

export default User;


