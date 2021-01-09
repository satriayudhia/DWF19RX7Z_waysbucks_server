import React from 'react'
import './Toping.scss'

const Toping = (props) => {
    return (
        <div className="toping-wrapper">
            <div className="img-toping-wrapper">
                <label for={props.name}>
                    <img className="img-toping" src={props.img} alt="toping" />
                </label>
                <input id={props.name} className="checkbox-toping" type="checkbox"/>
            </div>
            <div className="title-toping-wrapper">
                <p className="title-toping">{props.name}</p>
                <p className="title-toping">{props.price}</p>
            </div>
        </div>
    )
}

export default Toping
