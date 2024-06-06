import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PersonalPage from '../pages/PersonalPage'

const MainRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/my-shelf' element={<PersonalPage/>}/>
    </Routes>
  )
}

export default MainRouter
