import React from 'react'
import './InputFile.scss'
import Clip from '../../../assets/logos/clip.png'

const InputFile = () => {
    return (
        <label className="file">
            <input className="file-input" type="file" placeholder="Photo Product"/>
            <p className="file-title">Photo Product</p>
            <img className="file-img" src={Clip} alt="upload image" />
        </label>
    )
}

export default InputFile
