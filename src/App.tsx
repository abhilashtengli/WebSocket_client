import { useEffect, useState } from 'react'


function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [latestMessage, setLatestMessage] = useState("");
  const [inputMessage, setInputMessage] = useState("");


  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8081");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    }
    socket.onmessage = (message) => {
      console.log("message received ", message.data);
      setLatestMessage(message.data);
    }
    setSocket(socket);

    return (() => {
      socket.close();
    })
  },[])

  if (!socket) {
    return <div>Connecting to the server..</div>
  }

  return (
    <>
      <input onChange={(e) => {
        setInputMessage(e.target.value);
      }} ></input>
      <button onClick={() => {
        socket.send(inputMessage)
      }}>Send message</button>
     {latestMessage}
    </>
  )
}

export default App
