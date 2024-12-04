import React from 'react'
import {NavLink} from 'react-router-dom'
import "./Card.css"
const Card=({cardData}) => {
    return (
        <div className="container mt-5">
            <div className="row card-bottom">
                {
                    cardData?.length==1?
                        <div className='col-md-6'>
                            <div className="card">
                                <img src={cardData[0]?.postImageURL} className='card-image' alt="Blog Image" />
                                <div className="card-body">
                                    <div>
                                        <h5 className="card-title">{cardData[0].title}</h5>
                                    </div>
                                    <div className='view-details'>
                                        <p>
                                            {cardData[0].description.substring(0,50)}
                                            <NavLink to={`/blog/${cardData[0]?._id}`}> Read More....</NavLink>
                                        </p>
                                    </div>
                                    <div className='category-container'>
                                        <p>
                                            #{cardData[0].category}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='row'>
                            {cardData?.map((card,index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card">
                                        <img src={card?.postImageURL} className='card-image' alt="Blog Image" />
                                        <div className="card-body">
                                            <div>
                                                <h5 className="card-title">{card.title}</h5>
                                            </div>
                                            <div className='view-details'>
                                                <p>
                                                    {card.description.substring(0,50)}
                                                    <NavLink to={`/blog/${card?._id}`}> Read More....</NavLink>
                                                </p>
                                            </div>
                                            <div className='category-container'>
                                                <p>
                                                    #{card.category}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                }
            </div>
        </div>
    )
}

export default Card
