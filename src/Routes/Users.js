const express = require('express')
const ObjectId = require('mongodb').ObjectId
const Router = express.Router()
const DB = require('./DB')

// Create User in DB
Router.post('/create', (req, res) => {
   console.log('posting user...')
   const { uid, name, email, lastQuestion } = req.body
   if (!uid) return res.status(500).json({ error: 'Incomplete Parameters' })
   DB.createUser(uid, name, email, lastQuestion, res)
})

// Update user's last question seen - we will use it for resume game
Router.post('/paused', (req, res) => {
   const { uid, lastQuestion } = req.body
   console.log('The last question was: ', lastQuestion)
   if (!uid) return res.status(500).json({ error: 'Incomplete Parameters' })
   DB.updateUserInDB(uid, lastQuestion)
})

// Get user Data
Router.get('/:uid', (req, res) => {
   const uid = req.params.uid
   if (!uid) return res.status(500).json({ error: 'Incomplete Parameters' })

   DB.withDB(async (db) => {
      const createdCursor = db
         .collection('quizzes')
         .find({ uid })
         .project({
            isOpen: 1,
            title: 1,
            questions: 1,
            responses: {
               $size: '$responses',
            },
         })
      const createdQuiz = await createdCursor.toArray()
      // console.log(createdQuiz)
      const userCursor = await db.collection('users').find({ uid }).project({
         attemptedQuiz: 1,
      })
      const userInfo = await userCursor.toArray()
      if (userInfo) {
         const attemptedCursor = db
            .collection('quizzes')
            .find({ _id: { $in: userInfo[0].attemptedQuiz } })
            .project({
               title: 1,
               totalQuestions: {
                  $size: '$questions',
               },
               responses: { $elemMatch: { uid } },
            })
         const attemptedQuiz = await attemptedCursor.toArray()
         // console.log(attemptedQuiz)
         res.status(200).json({ createdQuiz, attemptedQuiz })
      } else {
         res.status(200).json({ createdQuiz })
      }
   }, res)
})

Router.get('/:uid/lastQuestion', async (req, res) => {
  let uid = req.params.uid
  // console.log('get last question from: ', uid)
  if (!uid) return res.status(500).json({ error: 'Incomplete Parameters' })
  let lastQuestion = await DB.getLastQuestionFromDB(uid)
  console.log('lastQuestion in line 69 in DB is:', lastQuestion)
  return res.status(200).json({ lastQuestion })
})

module.exports = Router
