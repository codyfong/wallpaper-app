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

const ImageCard = ({image, id, setRefreshImage}) => {
    const navigate = useNavigate()
    let {src} = image
    let url = src.large
    const {userId, token} = useContext(AuthContext)
    // console.log(userId)
    const addFavorite = (image_properties) => {
        console.log('addfav', image_properties)
        axios.post(`${serverURL}/addfavorite`, {image_properties, userId}, {
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
                    {image.alt? `${image.alt}` : "(untitled)"}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={()=>navigate(`/imagedetails/${image.id}`,{state: {image: image}})}>About</Button>
                <Button size="small" onClick={()=>addFavorite(image)}>Add to Favorites</Button>
            </CardActions>
      </Card>
    );

}

export default ImageCard