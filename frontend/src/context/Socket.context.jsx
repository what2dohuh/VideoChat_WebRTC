import { useState,useRef,useEffect,createContext } from "react";
import Peer from 'simple-peer'
import {io} from 'socket.io-client'

export const SocketContext = createContext();

const socket = io('http://localhost:4000');

export const SocketProvider = ({children}) => {
    const [stream,setStream] = useState(null);
    const [myid,setId] = useState('kkdk');
    const [call,setCall] = useState({});
    const [callaccepted,setCallaccepted] = useState(false);
    const [callend,setCallend] = useState(false)
    const [name, setname] = useState('');

    const myVideo = useRef()
    const UserVideo = useRef()
    const connectionRef = useRef()
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((currenStream) => {
            setStream(currenStream)
            if (myVideo.current) {
                myVideo.current.srcObject = currenStream
            }
                socket.on('me',(id)=>setId(id))
            socket.on('calluser',({from,name:name,signal})=>setCall({isReceivedCall:true,from:from,name:name,signal}))
        })
    }, []);
    const answerCall =()=>{
        setCallaccepted(true)
        const peer = new Peer({initiator : false, trickle : false,stream:stream })
        peer.on('signal',(data)=>{
            socket.emit('answercall',{signal:data,to:call.from})
        })

        peer.on('stream',(currenStream)=>{
            UserVideo.current.srcObject = currenStream
        })
        peer.signal(call.signal)
        connectionRef.current = peer
    }
    const leaveCall =()=>{
        setCallend(true)
        connectionRef.current.destroy()
    }
    const callUser =(id)=>{
        const peer = new Peer({initiator : false, trickle : false,stream })
        peer.on('signal',(data)=>{
            socket.emit('calluser',{userToCall:id,signaldata:data,from:myid,name})
        })

        peer.on('stream',(currenStream)=>{
            UserVideo.current.srcObject = currenStream
        })
        socket.on('callaccepted',(data)=>{
            setCallaccepted(true)
            peer.signal(data)
            connectionRef.current = peer
        })
    }
    return (
        <SocketContext.Provider value={{call,callaccepted,callUser,leaveCall,answerCall,myVideo,UserVideo,connectionRef,myid,callend,name,setname}}>
            {children}
        </SocketContext.Provider>
    )
}