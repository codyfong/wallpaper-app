import axios from 'axios'
import {useState, useContext, useEffect} from 'react'
import AuthContext from '../store/authContext'
import serverURL from '../url'
import FavoriteImageCard from './favoriteComponents/favoriteImageCard'

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material'
const Favorites = () => {
    const {userId, token, username} = useContext(AuthContext)
    const [images, setImages] = useState([])
    const [imageObjectArray, setImageObjectArray] = useState([])
    const [refreshImage, setRefreshImage] = useState(false)

    const getImages = async () => {
        await axios
        .post(`${serverURL}/favorites`, {userId}, {
            headers: {
                authorization: token
            }
        })
        .then((res) => {
            // console.log('imageobjectarray', res.data)
            setImageObjectArray(res.data)
            setImages(res.data.map((image) => image.image_properties))
            
        })
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        getImages()
        setRefreshImage(false)
    }, [refreshImage])

    // useEffect(() => {
    //     // console.log('username', username)
    // },)

    // return(
    // <div>
    //     <h1>Favorites</h1>
    //     {/* {images.map( image => {
    //       return(<FavoriteImageCard image={image}/>)
    //     })} */}
    //     {imageObjectArray.map( imageObj => {
    //       return(<FavoriteImageCard image={imageObj.image_properties} id ={imageObj.id} setRefreshImage = {setRefreshImage}/>)
    //     })}
    // </div>
    // )
    return (
        <Paper   
        square = {true}          
        style={{ 
            width: '100%', 
            padding: '0', 
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>

            <Grid
            container
            style={{ 
                width: '70vw', 
                padding: '10px', 
                height: '',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >

                <Paper elevation={16}
                style={{
                    width: '', 
                    paddingTop: '40px', 
                    paddingLeft: '10px', 
                    paddingRight: '10px', 
                    paddingBottom: '0px',
                    height: '',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >

                    <Typography 
                        variant="h6"
                        noWrap
                        component="a"
                        
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'Arial',
                            fontWeight: 300,
                            letterSpacing: '.4rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            textShadow: "black 1px 0 10px"
                        }}
                    style={{
                        margin: ''
                    }}
                    >
                        {username.toUpperCase()}'s FAVORITES
                    </Typography>

                    <ImageList 
                    sx={{ width: 1200, height: 750 }} cols={3} rowHeight={470}
                    justifyContent="center"
                    alignItems="center"
                    style={{
                        padding: "",
                        height: "100%",
                        width: "100%"
                    }}
                    >
                    {imageObjectArray.map((imageObj) => (
                        <ImageListItem key={imageObjectArray.image_properties}>
                            <FavoriteImageCard image={imageObj.image_properties} id ={imageObj.id} setRefreshImage = {setRefreshImage}/>
                        </ImageListItem>
                    ))}
                    </ImageList>
                </Paper>
            </Grid>
        </Paper>
      );
}

export default Favorites