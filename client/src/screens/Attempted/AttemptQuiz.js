import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import AttemptedModal from './AttemptedModal'

const AttemptQuiz = ({ match }) => {
  const quizCode = match.params.quizCode
  const [path, setPath] = useState('')
  const [questions, setQuestions] = useState([])
  const [attemptedQuestions, setAttemptedQuestions] = useState([])
  const [quizTitle, setQuizTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [currQuestionIndex, setCurrQuestionIndex] = useState(0)
  const [questionsPerPage, setQuestionsPerPage] = useState(1)
  const [selected, setSelected] = useState('false')
  const uid = firebase.auth().currentUser.uid

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch('/API/quizzes/join', {
        method: 'POST',
        body: JSON.stringify({ quizId: quizCode, uid }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const quizData = await res.json()
      setLoading(false)
      if (quizData.error) setQuizTitle(quizData.error)
      else {
        setQuizTitle(quizData.title)
        setQuestions(quizData.questions)
        const temp = quizData.questions.map((question) => {
          return {
            id: question.id,
            title: question.title,
            optionType: question.optionType,
            selectedOptions: [],
          }
        })
        console.log('AttemptedQuiz line 43 AttemptedQuestions: ', temp)
        setAttemptedQuestions(temp)
      }
    }

    const fetchUserPostionInQuiz = async () => {
      const res = await fetch(`/API/users/${uid}/lastQuestion`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      let resJson = await res.json()
      const { lastQuestion } = resJson
      setCurrQuestionIndex(lastQuestion)
      return lastQuestion
    }

    fetchQuiz()
    fetchUserPostionInQuiz()
  }, [quizCode, uid])

  const handleOptionSelect = (e, option, index) => {
    console.log('handleOptionSelect')
    const temp = [...attemptedQuestions]
    const options = temp[index].selectedOptions
    console.log('index:' + index)
    if (!options.includes(option) && e.target.checked) {
      if (attemptedQuestions[index].optionType === 'radio')
        options[0] = option
      else options.push(option)
    }
    if (options.includes(option) && !e.target.checked) {
      const i = options.indexOf(option)
      options.splice(i, 1)
    }
    temp[index].selectedOptions = options
    console.log('TEMP[index]:' + temp)
    console.log('AttemptedQuiz line 80 AttemptedQuestions: ', temp)
    setAttemptedQuestions(temp)
  }
  const isRadioSelected = (value) => selected === value
  const handleRadioClick = (e) => {
    console.log('AttemptQuiz line 87: ', e.currentTarget.value)
    setSelected(e.currentTarget.value)
  }
  const submitQuiz = async () => {
    // send attemped Questions to backend
    try {
      const res = await fetch('/API/quizzes/submit', {
        method: 'POST',
        body: JSON.stringify({
          uid,
          quizId: quizCode,
          questions: attemptedQuestions,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const body = await res.json()
      setResult(body)
      setShowModal(true)
      console.log('res body : ', body)
    } catch (e) {
      console.log('Error Submitting quiz', e)
    }
  }

  if (loading) return <LoadingScreen />

  const onNextQuestion = () => {
    setSelected('false')
    setCurrQuestionIndex(currQuestionIndex + 1)
  }
  const onPreviousQuestion = () => setCurrQuestionIndex(currQuestionIndex - 1)
  const onPauseGame = async () => {
    setPath('/')
    try {
      const res = await fetch('/API/users/paused', {
        method: 'POST',
        body: JSON.stringify({
          uid,
          lastQuestion: currQuestionIndex,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // const body = await res.json()
      // console.log('res body : ', body)
    } catch (e) {
      console.log('Error posting quiz checkpoint', e)
    }
  }

  if (path.length !== 0) return <Redirect push to={path} />
  // For Quiz not Found
  if (quizTitle === 'ERR:QUIZ_NOT_FOUND')
    return (
      <div className='loading'>
        <h1>404 Quiz Not Found!</h1>
        <div id='logo-name'>
          <b>Quiz</b>App
        </div>
        <h3>
          Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
        </h3>
      </div>
    )
  // For Quiz not accessible
  else if (quizTitle === 'ERR:QUIZ_ACCESS_DENIED')
    return (
      <div className='loading'>
        <h2>
          Quiz Access is Not Granted by the Creator. Please contact Quiz
          Creator.
        </h2>
        <div id='logo-name'>
          <b>Quiz</b>App
        </div>
        <h3>
          Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
        </h3>
      </div>
    )
  else if (quizTitle === 'ERR:QUIZ_ALREADY_ATTEMPTED')
    return (
      <div className='loading'>
        <h2>You have already taken the Quiz.</h2>
        <div id='logo-name'>
          <b>Quiz</b>App
        </div>
        <h3>
          Go back to <Link to='/join-quiz'>Join Quiz </Link>Page.
        </h3>
      </div>
    )
  else {
    // here we are slicing the questions that we want to show in single page
    const currPageQuestions = questions.slice(
      currQuestionIndex,
      currQuestionIndex + questionsPerPage,
    )
    return (
      <div id='main-body'>
        <div id='create-quiz-body'>
          <div className='quiz-header'>
            <h2>{quizTitle}</h2>
          </div>
          {currPageQuestions.map((question, index) => (
            <div className='attempQuestionCard' key={index}>
              <div id='title'>{question.title}</div>
              <div className='option-div'>
                {question.options.map((option, buttonIndex) => (
                  <div className='option' key={buttonIndex}>
                    {question.optionType === 'radio' ? (
                      <input
                        type='radio'
                        name='react-radio-btn'
                        value={`option${buttonIndex}`}
                        checked={isRadioSelected(`option${buttonIndex}`)}
                        // autocomplete="off"
                        // defaultChecked={index === 0}
                        onChange={(e) => {
                          handleRadioClick(e)
                          handleOptionSelect(e, option.text, currQuestionIndex)
                        }
                        }
                      />
                    ) : (
                      <input
                        type='checkbox'
                        name='option'
                        onChange={(e) =>
                          handleOptionSelect(e, option.text, index)
                        }
                      />
                    )}
                    <label
                      className='label'
                      style={{ padding: '0px 5px' }}
                    >
                      {option.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {currQuestionIndex === questions.length - 1 && (
            <button className='button wd-200' onClick={submitQuiz}>
              Submit
            </button>
          )}
          {currQuestionIndex !== questions.length - 1 && (
            <button className='button wd-200' onClick={onNextQuestion}>
              Next Question
            </button>
          )}
          {currQuestionIndex !== 0 && (
            <button
              className='button wd-200'
              onClick={onPreviousQuestion}
            >
              Previous Question
            </button>
          )}
          <button className='button wd-200' onClick={onPauseGame}>
            Pause Game
          </button>
          <AttemptedModal
            result={result}
            showModal={showModal}
            totalScore={questions.length}
          />
        </div>
      </div>
    )
  }
}

export default AttemptQuiz
