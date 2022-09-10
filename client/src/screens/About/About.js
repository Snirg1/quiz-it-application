import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import './About.css'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'
// TODO: ADD ABOUT CONTENT (LINE 20)

const About = () => {
   const [isBackToOneTimeDashboardClicked, setIsBackToOneTimeDashboardClicked] =
      useState(false)
   const oneTimeDashboardPath = '/'

   const onBackToOneTimeDashboard = () => {
      setIsBackToOneTimeDashboardClicked(true)
   }
   if (isBackToOneTimeDashboardClicked)
      return <Redirect push to={oneTimeDashboardPath} />

   return (
      <div id="about">
         <div id="about-div">
            <div id="logo-name">
               The<b>Other</b>Side
            </div>
            <Box sx={{ width: 500, height: 400 }}>
               <Card>ADD ABOUT CONTENT HERE</Card>
            </Box>
            <button className="about-button" onClick={onBackToOneTimeDashboard}>
               Back to menu
            </button>
         </div>
      </div>
   )
}

export default About
