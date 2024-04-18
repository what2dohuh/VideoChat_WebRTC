import React, { useContext } from 'react';
import { Grid,Typography, Paper } from '@mui/material';
import { SocketContext } from '../context/Socket.context';
const VideoPlayer = () => {
    const {myVideo,callend,UserVideo,callaccepted,name,call,stream} = useContext(SocketContext)
    return (
        <div>
            <Grid container>
            <Paper>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" component="h3">
                        {name}:
                    </Typography>
                    <video muted autoPlay playsInline ref={myVideo}/>
                </Grid>
            </Paper>
            <Paper>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" component="h3">
                        user:
                    </Typography>
                    <video muted autoPlay playsInline ref={UserVideo}/>
                </Grid>
            </Paper>
            
           
            </Grid>
            
        </div>
    );
}

export default VideoPlayer;
