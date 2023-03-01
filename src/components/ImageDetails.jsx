import { Button, Grid, Link, ListItem, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useParams, useLocation } from "react-router-dom";

const ImageDetails = () => {
    const {state} = useLocation()
    const {id} = useParams()
    const {alt, avg_color, height, photographer, photographer_id, photographer_url, src, url, width} = state.image

    return(
        <Paper
        square = {true}          
        style={{ 
            width: '100%', 
            padding: '0', 
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <Grid
                container
                style={{ 
                    width: '100%', 
                    // padding: '10px', 
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    // alignItems: 'center',
                }}
            >
                <Paper elevation={8}
                    style={{
                        padding: '20px 75px', 
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                <Grid
                    container
                    style={{ 
                        // width: '70%', 
                        padding: '30px', 
                        height: '95%',
                        display: 'flex',
                        justifyContent: 'center',
                        // alignItems: 'center',
                    }}
                >
                    <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // width: '100%'
                    }}>
                        <img src={src.large} alt={alt} 
                        style={{
                            boxShadow: `0 0 .7rem ${avg_color}`
                        }}
                        />
                        
                        <Typography variant="h5"
                        style={{paddingTop:'20px', textShadow: "black 1px 0 10px"}}>
                        {alt}
                        </Typography>
                        <Link href={photographer_url} variant="subtitle2" target="_blank" rel="noopener noreferrer">
                            {photographer}
                        </Link>
                        <Grid container
                            alignItems="center"
                            spacing={2} 
                            style={{
                                paddingTop: '30px'

                            }}
                            wrap="wrap"

                        >
                            <Grid item xs={3}>
                                <Button variant="outlined" fullWidth href={src.original} target="_blank" rel="noopener noreferrer">Original</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" fullWidth href={src.landscape} target="_blank" rel="noopener noreferrer">Landscape</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" fullWidth href={src.portrait} target="_blank" rel="noopener noreferrer">Portrait</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" fullWidth href={src.medium} target="_blank" rel="noopener noreferrer">Medium</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" fullWidth href={src.large} target="_blank" rel="noopener noreferrer">Large</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" fullWidth href={src.large2x} target="_blank" rel="noopener noreferrer">Very Large</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" fullWidth href={src.small} target="_blank" rel="noopener noreferrer">Small</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" fullWidth href={src.tiny} target="_blank" rel="noopener noreferrer">Very Small</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                </Paper>
            </Grid>

        </Paper>
    )
}

export default ImageDetails