import { useState } from 'react'

import './App.css'


function App() {

  return (
    <div className='w-full min-h-screen bg-linear-to-b from-green-600 to-blue-800'>
      <TopBar />
      <Hero/>
    </div>
  )

}


function TopBar(){
  return(
    <div className='flex justify-between px-3 md:px-20 py-2 bg-white'>
    <div className='text-4xl text-green-950 font-bold'>StackShare</div>
    <div>
      <button className='transition-all hover:bg-green-800 hover:text-white p-2 font-bold rounded-3xl'>Login</button>
      <button className='bg-green-500 text-white px-5 py-2 hover:bg-green-800 rounded-3xl font-bold mx-3'>SignUp </button>
      
    </div>

  </div>
  )
}

function Hero(){
  return(
    <div className='flex mx-5 my-14 md:mx-70 md:my-50 justify-center flex-col'>
      <p className='font-bold text-5xl md:text-7xl text-white'>Build Fast. Build Together</p> 
      <br />

     <center>
       <p className='text-green-300 text-1xl md:text-2xl'>Pitch your next side-project ,recruit developers by tech stack, <br />
       and collaborate in real-time workplace</p>
     </center>
    </div>
  )
}

export default App
