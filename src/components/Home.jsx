import axios from 'axios'
import {useState, useContext, useEffect} from 'react'
import AuthContext from '../store/authContext'
import serverURL from '../url'
import ImageCard from './homeComponents/imageCard'

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import { Paper, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Featured = () => {
    const {userId, token} = useContext(AuthContext)
    const [images, setImages] = useState([])
    const [imageObjectArray, setImageObjectArray] = useState([])
    const [refreshImage, setRefreshImage] = useState(false)

    const [imageQuery, setImageQuery] = useState("")
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const query = data.get('search')
        // alert(query)

        axios
        .post(`${serverURL}/photos`, {query}, {
          headers: {
            authorization: token
        }
        })
        .then((res) => {
            setImages(res.data.photos)
        })
        .catch(err => console.log("error in getImages:", err))
    }
    
    useEffect(() => {
        // getImages()
        setRefreshImage(false)
    }, [refreshImage])


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
                        SEARCH
                    </Typography>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '50ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            style ={{
                                paddingTop: "15px"
                            }}
                            onSubmit={handleSubmit}
                        >
                        <TextField 
                        required
                        id="search" 
                        type="search"
                        name="search"
                        label="Search" 
                        variant="outlined" 
                        autoFocus
                        />
                        </Box>

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
                    {images.map((imageProps) => (
                        <ImageListItem key={imageObjectArray.photos}>
                            <ImageCard image={imageProps} id ={imageProps.id} setRefreshImage = {setRefreshImage}/>
                        </ImageListItem>
                    ))}
                    </ImageList>
                </Paper>
            </Grid>
        </Paper>
      );
}

export default Featured