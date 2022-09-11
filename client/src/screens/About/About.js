import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import './About.css'

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

            <div className="about-content">
               <br />
               <b>"Empathy"</b> – the ability to share someone else's feelings
               or experiences by imagining what it would be like to be in that
               person's situation.
               <br />
               <br />
               The other side is a game to develop self awareness and empathy
               for every person that leads or guides others.
               <br />
               In addition to increasing awareness, the game provides
               participants with a glimpse into others' opinions.
               <br />
               From "the other side", how do they perceive the situation?
               <br />
               The game will show us every day situations and ways we can react
               to them.
               <br />
               Different courses of action will be presented on cards such as
               this one.
               <br />
               Our good intentions aren't always interpreted the way we thought
               they would be, so we will learn how our actions can get
               interpreted by others throughout the game.
               <br />
               Empathy is a superpower when communicating with people. It would
               be good if it were added to the drinking water.
               <br />
               Until then, we hope our game is helpful to you!
            </div>
         </div>
         <button className="about-button" onClick={onBackToOneTimeDashboard}>
            Back to menu
         </button>
      </div>
   )
}

export default About
