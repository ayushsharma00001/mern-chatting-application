import './App.css'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import Signup from './components/signup'
import Login from './components/Login'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/userSlice'
import store from './redux/store'
const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/register",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
])

function App() {
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();
  useEffect(()=>{
    if(authUser){
      const socket = io('http://localhost:8080',{
        query:{
          userId:authUser?._id
        },
        withCredentials: true,
        transports: ['websocket'],
      })
      dispatch(setSocket(socket));
      socket.on("getOnlineUsers",(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return ()=> socket.close();
    }
    else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser])
  return (
    <>
      <div className="App">
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App




// function App() { 
//   const {authUser} = useSelector(store=>store.user);
//   const {socket} = useSelector(store=>store.socket);
//   const dispatch = useDispatch();

//   useEffect(()=>{
//     if(authUser){
//       const socket = io('http://localhost:8080',{
//           query:{
//             userId:authUser._id
//           }
//       });
//       dispatch(setSocket(socketio));

//       socketio?.on('getOnlineUsers', (onlineUsers)=>{
//         dispatch(setOnlineUsers(onlineUsers))
//       });
//       return () => socketio.close();
//     }else{
//       if(socket){
//         socket.close();
//         dispatch(setSocket(null));
//       }
//     }

//   },[authUser]);

//   return (
//     <div className="p-4 h-screen flex items-center justify-center">
//       <RouterProvider router={router}/>
//     </div>

//   );
// }

// export default App;
