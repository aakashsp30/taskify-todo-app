import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-purple-600 text-white py-2'>
        <div className="logo">
            <a href="./"><span className='font-bold text-xl'>Taskify</span></a>
        </div>
        <ul className="flex gap-8">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar