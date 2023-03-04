import React, { useState } from "react";
import CustomerSider from "./CustomerSider";
import Payment from "./Payment";
import Upload from "./Upload";
import './styles.css'

let token = localStorage.getItem('token')
let userPrice = JSON.parse(localStorage.getItem('user'))

let money = userPrice


const Book = () => {
    const [page, setPage]  = useState(0);
    const [date, setDate] = useState("")
    const [cyliders, setCyliders] = useState("");
    const [numberkgs, setNumberkgs] = useState("");
    const [brand, setBrand] = useState("")
    const [paymentmethod, setPaymentmethod] = useState("")
    const [payslipImage, setPayslipImage] = useState("")
    const [total, setTotal] = useState("")
    const [itemList, updateItemList] = useState([])

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");



    // handling the culcations
    const handleSubmit = (e) => {
        e.preventDefault();
        const totalItems = itemList.reduce((add, acc) => add + (acc.numberkgs * acc.cyliders), 0)
        updateItemList(prev => [...prev, { numberkgs, cyliders, brand, key: Date.now(), total: numberkgs * cyliders }])
        setTotal(totalItems + (numberkgs * cyliders))
        e.target.reset()
    }

    // Delete from List
    const deleteItemFromList = key => {
        const newList = itemList.filter(itemObj => {
            return itemObj.key !== key;
        });
        updateItemList(newList)
        const totalItems = newList.reduce((add, acc) => add + (acc.numberkgs * acc.cyliders), 0)
        setTotal(totalItems)
    }

    const kgsper = money
    const amount = total * kgsper

    // save into the database

    const[BookData, setBookData] = useState ({
        date,
        cyliders: itemList.map(item => (
            { ...item, brand: item.brand, kgs: item.numberkgs, quantity: item.cyliders }
        )),
        finaltotal: total,
        amount,
        payslipImage,
        paymentmethod
    });

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await axios.post("http://localhost:5000/api/v1/book", BookData, {
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


    return (
        <>
            <CustomerSider />
            <div className='profileside'>
                <div class="container">
                    <div className="row">
                        <div className="col-md-4">
                            <button class="btnprice"> Price: {money} Per Kgs</button><br /><br />
                            <div className="userform">
                                <h1>Book Now</h1>
                                <form onSubmit={handleSubmit}>
                                    <select className="form-select" aria-label="Default select example"
                                        onChange={(e) => setBrand(e.target.value)}
                                    >
                                        <option>Select</option>
                                        <option>Korgas</option>
                                        <option>Mengas</option>
                                        <option>Total</option>
                                        <option>Oryx</option>
                                        <option>Shell</option>
                                        <option>Oilibya</option>
                                        <option>K-gas</option>
                                        <option>Hashi</option>
                                        <option>Stabex</option>
                                        <option>Easy</option>
                                        <option>Lake</option>
                                        <option>Mongas</option>
                                        <option>Petgas</option>
                                        <option>Others</option>
                                    </select><br />
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

                        {/* Saving Orders */}
                        <div className="col-md-6">
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
                                <input type="date" className="form-control" placeholder=""
                                    onChange={(e) => setDate(e.target.value)}
                                />

                                {

                                    itemList.map(itemObj => {
                                        let productNum = itemObj.numberkgs * itemObj.cyliders

                                        return (
                                            <div key={itemObj.key} className="items">
                                                <p>{itemObj.brand}   ---- </p>

                                                <p>{itemObj.numberkgs} kgs * {itemObj.cyliders} Cyliders</p>

                                                <p>{Number(productNum)}</p>
                                                <button onClick={() => deleteItemFromList(itemObj.key)} >X</button>
                                            </div>
                                        )
                                    })
                                }
                                <br />
                                <div className="totalgas">
                                    <h2>Total: &nbsp; &nbsp; <span>{total}</span> </h2>
                                </div>
                                <div className="totalgas">
                                    <h2>Amount: &nbsp; &nbsp; <span> {cash} </span> </h2>
                                </div>
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
export default Book;



