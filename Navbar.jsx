import React from 'react'

const Navbar = () => {
  return (
   <nav className='justify-between bg-slate-600 text-white py-2'>
    <div className="logo">
        <span className='font-bold text-xl mx-8 my-2' >Your Planner</span>
        </div>
    <ul className="flex gap-6 justify-end mx-5   ">

        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>code</li>
    </ul>
   
   </nav>
   
  )
}

export default Navbar
