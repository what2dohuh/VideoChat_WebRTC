import React, { useContext, useState } from 'react';
import { Button } from '@mui/material';
import { SocketContext } from '../context/Socket.context';

const Notifications = ({children}) => {
    const {answerCall,call,callaccepted} = useContext(SocketContext)
    return (
        <div>
            {call.isReceivedCall && !callaccepted}
            <h2>{call.name} is calling:</h2>
            <Button variant='primary' onClick={()=>answerCall}>

            </Button>
        </div>
    );
}

export default Notifications;
