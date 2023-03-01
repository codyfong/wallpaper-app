import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import serverURL from "../../url";
import AuthContext from '../../store/authContext'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const FavoriteImageCard = ({image, id, setRefreshImage}) => {
    const navigate = useNavigate()
    let {src} = image
    let url = src.large
    const {userId, token} = useContext(AuthContext)
    console.log(userId)
    const removeFavorite = (image_properties) => {
        axios.delete(`${serverURL}/favorites/${id}`, {image_properties, userId, id}, {
            headers: {
                authorization: token
            }
        })
        setRefreshImage(true)
    }

    let cardStyle = {
        maxWidth: 345,
        margin: '10px'
    }

    return(
        // <div className="image-card">
        //     <img src={url} alt="missing image" onClick={()=>navigate(`/imagedetails/${image.id}`,{state: {image: image}})}></img>
        //     <button onClick={(evt)=>removeFavorite(image)}>Remove Favorite</button>
        // </div>

        <Card style={cardStyle} sx={{ boxShadow: 3 }}>
            <CardMedia
            style={{cursor: "pointer"}}
            sx={{ height: 250 }}
            image={url}
            title=""
            onClick={()=>navigate(`/imagedetails/${image.id}`,{state: {image: image}})}
            />
            <CardContent
            sx={{ height: 100 }}
            style={{margin: '10px'}}
            >
                <Typography variant="subtitle1" color="text" >
                    "{image.alt}"
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>navigate(`/imagedetails/${image.id}`,{state: {image: image}})}>About</Button>
                <Button size="small" onClick={(evt)=>removeFavorite(image)}>Remove From Favorites</Button>
            </CardActions>
      </Card>
    );

}

export default FavoriteImageCard