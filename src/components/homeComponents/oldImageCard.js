import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverURL from "../../url";
import AuthContext from '../../store/authContext'


const ImageCard = ({image}) => {
    const navigate = useNavigate()
    let {src} = image
    let url = src.tiny
    const {userId, token} = useContext(AuthContext)
    console.log(userId)
    const addFavorite = (image_properties) => {
        axios.post(`${serverURL}/addfavorite`, {image_properties, userId}, {
            headers: {
                authorization: token
            }
        })
    }
    return(
        <div className="image-card">
            <img src={url} alt="missing image" onClick={()=>navigate(`/imagedetails/${image.id}`,{state: {image: image}})}></img>
            <button onClick={()=>addFavorite(image)}>Add to Favorites</button>
            <button >Details</button>
        </div>
    )
}

export default ImageCard