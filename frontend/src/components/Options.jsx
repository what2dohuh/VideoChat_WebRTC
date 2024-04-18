import React, { useContext, useState } from 'react';
import { Button, TextField ,Grid,Typography,Container,Paper } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assessment,PhoneDisabled,Phone, CallEnd } from '@mui/icons-material';
import { SocketContext } from '../context/Socket.context';
const Options = ({children}) => {
    const {answerCall,leaveCall,callUser,name,myid,callaccepted,setname,call} = useContext(SocketContext)
    const [idToCall, setidToCall] = useState();
    console.log(myid)
    return (

        <div>
            <Container>
                <Paper elevation={5}>
                    <form noValidate autoComplete='off'>
                        <Grid container>
                                <Grid item>
                                    <Typography gutterBottom variant='h6'>
                                        Info:
                                    </Typography>
                                    <TextField label="Name" value={name} onChange={(e)=>setname(e.target.value)} fullWidth/>
                                    <CopyToClipboard text={myid} >
                                        <Button variant="contained" color="primary" fullWidth startIcon={<Assessment fontSize='large'/>}>
                                            Copy Id
                                        </Button>
                                
                                    </CopyToClipboard>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant='h6'>
                                        Make A Call:
                                    </Typography>
                                    <TextField label="Id" value={idToCall} onChange={(e)=>setidToCall(e.target.value)} fullWidth/>
                                    {callaccepted && !CallEnd ? (<Button variant="contained" color="primary" fullWidth startIcon={<PhoneDisabled/>} onClick={()=>leaveCall}>Hang Up</Button>):
                                    (<Button variant="contained" color="primary" fullWidth startIcon={<Phone/>} onClick={()=>callUser(idToCall)}>Call</Button>)}
                                </Grid>
                        </Grid>
                    </form>
            {children}
                </Paper>
            </Container>
        </div>
    );
}

export default Options;
