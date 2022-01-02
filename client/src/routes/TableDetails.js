import React,{Fragment, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import AddReview from '../components/AddReview'
import StarRating from '../components/StarRating'
import { UserContext } from '../context/UserContext'

const TableDetails = () => {

  //This is the Most Efficent Version of the Code
  //As it has data form the Resturants and Reviews and is able to Display them
  //Effectively 
    
    const {id} = useParams()

    const {selectedrest , setSelectedrest} = useContext(UserContext)

    const {selectreview, setSelectReview} = useContext(UserContext)

    useEffect(() =>{
        fetchData();
        fetchDataB();
    },[setSelectedrest,setSelectReview ,id]);

    const fetchData = async () =>{
        try 
        {
          const response = await  fetch(`http://localhost:5000/tableA/${id}`) // This is the All gET
          const jsonData = await response.json()
          console.log(jsonData);
          setSelectedrest(jsonData);


        } catch (err) 
      {
          console.error(err.message)
      }
    
    }; 

    //Gets all the Review Information on the Restaurant
    
    const fetchDataB = async () =>{
        try 
        {
          const response = await  fetch(`http://localhost:5000/tableB/${id}`) 
          const jsonData = await response.json()
          console.log(jsonData);
          setSelectReview(jsonData);


        } catch (err) 
      {
          console.error(err.message)
      }
    
    };


    return (

        <Fragment>
            <h1 className="text-center display-1">Restaurant Details </h1>
            <>
             <h2 className="text-center display-1">{selectedrest.name}</h2>
             <div className='text-center'>
               <StarRating rating={selectedrest.average_rating}/>
             </div>
            </>
            <div className="row row-cols-3 mb-2">
            {selectreview.map(selectreviewX =>(
                <div key={selectreviewX.id} className="card text-white bg-primary mb-3 mr-4" style={{ maxWidth: "30%" }}>
                    <div className="card-header d-flex justify-content-between">
                      <span>{selectreviewX.name} </span>
                      <span>
                        <StarRating rating={selectreviewX.rating}/>
                      </span>
                    </div>
                    <div className="card-body">
                      <p className="card-text">{selectreviewX.review}</p>
                    </div>
                </div>
            ))}
            </div>
            
            <div>
                <AddReview/>
            </div>
        </Fragment>

  )
}

export default TableDetails
