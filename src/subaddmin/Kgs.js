import React, { useState } from "react";
import List from "./List";

import Sidebar from "./Sidebar";

const Kgs = () => {

    const [ numberkgs, setNumberkgs ] = useState("");
    const [cyliders,  setCyliders] = useState("");
    const [itemList, updateItemList ] = useState([])
    // const [addtotal, AddTotal ] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
     
        updateItemList([...itemList, {numberkgs, cyliders, key: Date.now()}])
        // AddTotal([...addtotal,  numberkgs * cyliders ])
      
        // console.log("kgs", itemList)
        // console.log("total", addtotal)
        e.target.reset();
      
    }



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
                                    onChange={e=>setNumberkgs(e.target.value) }
                         
                                    />
                                </div><br />
                                <div class="form-group">
                                    <input type="number" class="form-control" placeholder="How many Cyliders"
                                    onChange={e=>setCyliders(e.target.value) }
                                 
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
                            <div class="form-group">
                                <input type="date" class="form-control" placeholder=""
                                     />
                            </div><br/>
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Select Customer</option>
                                <option value="1">homeuse</option>
                                <option value="2">hotel</option>
                                <option value="3">school</option>
                                <option value="3">resale</option>
                            </select><br/>
                                <List itemList={itemList}  updateItemList={updateItemList} />  
                                <br/><br/>
                                <button type="submit" class="btnSubmit">Save Gas Kgs</button>
                            </div>
                          
                    </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default Kgs;


