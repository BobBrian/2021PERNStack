import React,{Fragment, useState} from 'react'

const InputTable = () => {

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("Price Range")

    const handleSubmit = async e =>{
        e.preventDefault();
        try {
            const body = {name, location, price}
            const response = await fetch("http://localhost:5000/tableA",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            //console.log(response)
            window.location = "/"
            
        } catch (err) {
            console.error(err.message)
            
        }
    }

    return (
        <Fragment>
        <h1>Restaurant Finder</h1>
        <div className="mb-4">
          <form action="">
            <div className="form-row">
              <div className="col">
                 <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control"placeholder="name"/>
              </div>
              <div className="col">
                 <input className="form-control" value={location} onChange={e => setLocation(e.target.value)}  type="text" placeholder="location"/>
              </div>
              <div className="col">
                <select  className="custom-select my-1 mr-sm-2" value={price} onChange={e => setPrice(e.target.value)}  >
                  <option disabled>Price Range</option>
                  <option value="1">$</option>
                  <option value="2">$$</option>
                  <option value="3">$$$</option>
                  <option value="4">$$$$</option>
                  <option value="5">$$$$$</option>
                </select>
              </div>
              <button onClick={handleSubmit} type="submit" className="btn btn-primary" > Add </button>
            </div>
          </form>
        </div>
        </Fragment>
    )
}

export default InputTable
