import React, { useState, useEffect } from "react";
import List from "./List";
import axios from "axios";

import Sidebar from "./Sidebar";

let token = localStorage.getItem('token')

const Kgs = () => {

    const [date, setDate] = useState("");
    const [customer, setCustomer] = useState("")
    const [total, setTotal] = useState(0)
    const [numberkgs, setNumberkgs] = useState("");
    const [cyliders, setCyliders] = useState("");
    const [itemList, updateItemList] = useState([])

    const [ business,  setBusiness ] = useState()

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    
    //  handle the Culcations
    const handleSubmit = (e) => {
        e.preventDefault();
        const totalItems =  itemList.reduce((add, acc) => add + (acc.numberkgs * acc.cyliders), 0)
        
        updateItemList( prev => [...prev, { numberkgs, cyliders, key: Date.now(), total:numberkgs * cyliders }] )

        setTotal(totalItems + (numberkgs * cyliders)) 

        e.target.reset();

    }

    // Delete from list 
    const deleteItemFromList = key => {
        const newList = itemList.filter(itemObj => {
            return itemObj.key !== key;
        });
        updateItemList(newList);
        const totalItems =  newList.reduce((add, acc) => add + (acc.numberkgs * acc.cyliders), 0)
        setTotal(totalItems)

    }


    //  Save into database
    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);
        const kgsdata = {
            date,
            customer,
            
            cylinders: itemList.map(item => (
                {...item, kgs:item.numberkgs, quantity:item.cyliders }
            )),
          
            finaltotal: total ,
    
        }
        const response = await axios.post("http://localhost:5000/api/v1/kgs", kgsdata, {
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
            window.location.replace("/kgs")
        }
        if (response?.data?.errors) {
            const message = response.data.errors.map(item => item.msg)
            setError(message)
        }
    }


    //  Query busines names

    useEffect(() => {
        const mybusiness = () => {
            axios.get("http://localhost:5000/api/v1/customers", {
                headers: {
                    'Authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    const getbusiness = res.data.buz;
                    setBusiness(getbusiness)
                })
        }

        mybusiness()

    }, []);



    return (
        <>
            <Sidebar />
            <div className='profileside'>
                <div class="container">

                    <div className="row">
                        <div className="col-md-3">
                            <div className="userform">
                                <form onSubmit={handleSubmit}>
                                    <div class="form-group">

                                        <input type="number" class="form-control" placeholder="How many Kgs"
                                            onChange={e => setNumberkgs(e.target.value)}

                                        />
                                    </div><br />
                                    <div class="form-group">
                                        <input type="number" class="form-control" placeholder="How many Cyliders"
                                            onChange={e => setCyliders(e.target.value)}

                                        />

                                    </div><br />
                                    <div class="form-group">
                                        {/* <input type="submit" class="btnSubmit" value="Add" /> */}
                                        <button type="submit" class="btnSubmit">Add</button>
                                    </div><br />
                                </form>
                            </div>
                        </div>
                        <div className="col-md-2">

                        </div>

                        <div className="col-md-4">
                            <div className="userform">
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
                            <form onSubmit={handleSave}>
                                <div class="form-group">
                                    <input type="date" class="form-control" placeholder=""
                                     onChange={(e) => setDate(e.target.value)}
                                    />
                                </div><br />
                           

                                <select class="form-select" aria-label="Default select example" 
                                        onChange={(e) => setCustomer(e.target.value)}
                                    >
                                      
                                        {
                                            business?.map((bazdata, index) => {
                                                return (
                                                    // <option>{catdata.district}</option>
                                                    <option key={index}>{bazdata.businessname}</option>
                                                )
                                            })
                                        }

                                    </select><br/>

                                {

                                    itemList.map(itemObj => {

                                        let productNum = itemObj.numberkgs * itemObj.cyliders

                                        return (
                                            <div key={itemObj.key} className="items">

                                                <p>{itemObj.numberkgs}kgs *  {itemObj.cyliders} cyliders </p>

                                                <p>{Number(productNum)} </p>

                                                <button onClick={() => deleteItemFromList(itemObj.key)} >X</button>
                                            </div>

                                        )
                                    })


                                }
                                <div className="totalgas">
                                    <h2>Total: &nbsp; &nbsp; <span>{ total}</span> </h2> 
                                </div>


                                <br /><br />
                                <button type="submit" class="btnSubmit">Save Gas Kgs</button>
                            </form>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Kgs;


