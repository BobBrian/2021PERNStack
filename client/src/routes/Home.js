import React,{Fragment} from 'react'
import InputTable from "../components/InputTable"
import ListTable from "../components/ListTable"

const Home = () => {
    return (
        <Fragment>
            <div>
                <InputTable/>
                <ListTable/>
            </div>
       </Fragment>
    )
}

export default Home
