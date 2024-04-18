
import './App.css'
import {AppBar, Toolbar, Typography} from '@mui/material'
import VideoPlayer from './components/VideoPlayer'
import Options from './components/Options'
import Notification from './components/Notifications'

function App() {
  return (
    <>
    <div >
      <AppBar position="static" color='transparent'>
        <Toolbar  >
          <Typography variant="h5" >
            Video Chat
          </Typography>
        </Toolbar>
      </AppBar>
   
      <VideoPlayer/>
      <Options>
      <Notification  />
      </Options>
    </div>
    </>
  )
}

export default App
