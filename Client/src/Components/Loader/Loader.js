import React from 'react'
import {Rings} from 'react-loader-spinner'
import "./Loader.css"

const Loader=() => {
    return (
        <div className='loader-container'>
            <Rings
                visible={true}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="rings-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader
