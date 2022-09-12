import { Switch, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import firebase from './firebase/firebase'
import Sound from 'react-sound'

// Stylesheet
import './App.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
// Components
import Home from './screens/Home/Home'
import OneTimeDashBoard from './screens/OneTimeDashboard/OneTimeDashboard'
import CreateQuiz from './screens/CreateQuiz/CreateQuiz'
import JoinQuiz from './screens/JoinQuiz/JoinQuiz'
import UserDashboard from './screens/UserDashboard/UserDashboard'
import CreatedSuccesfully from './screens/CreatedSuccesfully/CreatedSuccesfully'
import NotFoundPage from './screens/NotFoundPage'
import AttemptQuiz from './screens/Attempted/AttemptQuiz'
import Appbar from './components/Appbar/Appbar'
import Responses from './screens/Response/Responses'
import About from './screens/About/About'
import SoundComponent from './SoundComponent'
import MyButton from './SoundComponent'
const App = () => {
   const [user, setUser] = useState({})
   const [mainQuizCode, setMainQuizCode] = useState('631f94860b91454dc86e31c0')

   // useEffect hook is invoked when App component is mounted
   // Also, when a user's value changes
   useEffect(() => {
      const createUserInDB = async () => {
         if (user.uid) {
            // Using Firebase Auth Timestamps, check if we need to create a new user in the database
            if (
               firebase.auth().currentUser.metadata.lastSignInTime ===
               firebase.auth().currentUser.metadata.creationTime
            ) {
               try {
                  // Send a post request to the server with the user values
                  await fetch('/API/users/create', {
                     method: 'POST',
                     body: JSON.stringify({
                        uid: user.uid,
                        name: user.name,
                        email: user.email,
                        attemptedQuiz: [],
                        lastQuestion: 0,
                     }),
                     headers: { 'Content-Type': 'application/json' },
                  })
                  console.log('posted')
               } catch (error) {
                  console.log('User Creation Error: ', error)
               }
            }
         }
      }
      createUserInDB()
   }, [user])

   return (
      <div className="App">
         {!firebase.auth().currentUser ? (
            <Home setUser={setUser} />
         ) : (
            <>
               <MyButton />
               <div>
                  <Appbar user={user} setUser={setUser} />
               </div>
               <Switch>
                  <Route exact path="/">
                     <OneTimeDashBoard user={user} />
                  </Route>
                  <Route path="/dashboard">
                     <UserDashboard user={user} />
                  </Route>
                  <Route path="/about">
                     <About />
                  </Route>
                  <Route path="/create-quiz">
                     <CreateQuiz user={user} />
                  </Route>
                  <Route
                     path="/created-succesfully/:quizCode"
                     component={CreatedSuccesfully}
                  />
                  <Route path="/join-quiz">
                     <JoinQuiz user={user} quizCode={mainQuizCode} />
                  </Route>
                  <Route
                     path="/attempt-quiz/:quizCode"
                     component={AttemptQuiz}
                  />
                  <Route path="/responses/:quizCode" component={Responses} />
                  <Route component={NotFoundPage} />
               </Switch>
            </>
         )}
      </div>
   )
}

export default App
