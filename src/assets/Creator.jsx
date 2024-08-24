import React from 'react'

const Creator = ({name, instagram, twitter, youtube, desc, img}) => {
    return(
        <div className='creator'>
            <div className='top-line'>
                <h1>{name}</h1>
                <img src={img}></img>
            </div>
            <div className='socials'>
                <p>{youtube}</p>
                <p>{twitter}</p>
                <p>{instagram}</p>
            </div>
            <p>{desc}</p>
        </div>
    )
}

export default Creator