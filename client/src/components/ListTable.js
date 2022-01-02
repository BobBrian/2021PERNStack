import React, {useEffect, useState, Fragment, useContext}from 'react'
import { UserContext } from '../context/UserContext';
import EditTable from './EditTable';
import {useHistory} from "react-router-dom"
import StarRating from './StarRating';


const ListTable = () => {

   // const [rest, setRest] = useState([])

   //Using the Context alone seems to yeild results but not the axios API
    const {rest, setRest} = useContext(UserContext)

    let history = useHistory()
  

    useEffect(() =>{
    
        fetchData();
    },[]);

    const fetchData = async () =>{
        try {
          const response = await  fetch("http://localhost:5000/tableA") // This is the All gET
          const jsonData = await response.json()
          console.log(jsonData);
          setRest(jsonData);
      } catch (err) 
      {
          console.error(err.message)
      }
    
    };

    

    const deleterestaurant = async (id) =>{
    
        try {
          const deleteRestaurant = await fetch(`http://localhost:5000/tableA/${id}`,{
            method: "DELETE"
          })
          setRest(rest.filter(rest => rest.id !== id))
          
        } catch (err) {
          console.error(err.message)
           
        }

    }

    //Used to Display the Average Review Ratings
    const Rating = (restX) => {
        if(!restX.count){
            return <span className='text-warning ml-1'>No Reviews</span>;
        }
        return(
            <>
            <StarRating rating={restX.id}/>
            <span className='text-warning ml-1'>({restX.count})</span>

            </>
        );  
    };


    const tabledetails = (id) =>{
        history.push(`/tableA/${id}`)
    }


    return (
        <Fragment>
            <table className='table table-hover table-dark'>
                <thead>
                    <tr className="bg-primary">
                        <th>Restaurant</th>
                        <th>Location</th>
                        <th>Price Range</th>
                        <th>Rating</th>
                        <th>Details</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>  
                </thead>
                <tbody>
                    {rest.map(restX =>(
                        <tr key={restX.id}>
                            <td>{restX.name}</td>
                            <td>{restX.location}</td>
                            <td>{"$".repeat(restX.price)}</td>
                            <td>{Rating(restX)}</td>
                            <td><button className='btn btn-warning' onClick={() => tabledetails(restX.id)} > Details</button></td>
                            <td> <EditTable  restX={restX}/> </td>
                            <td><button className='btn btn-danger' onClick={(e) => deleterestaurant(restX.id)}>Delete</button></td>
                        </tr>
                    ))}

                </tbody>

            </table>
        </Fragment>
    )
}

export default ListTable
