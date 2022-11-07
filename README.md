# Quiz-It - [https://quiz-it-app.onrender.com](https://quiz-it-app.onrender.com/)


## Project Idea
A simple quiz application which consists of MCQs (single or multi choice). 
A user can create quiz and share the quiz among other users using the quiz ID code.
Users can submit quizzes and get their feedback about thier results,
also the user who created the quiz can see the responses. 


# Application Outline
## Major Entities
1. **User**: The user can create a quiz and submit a submission. Also, can see the submissions of the quiz which was created by him.
1. **Quiz**: The quiz which is created by the user will have a unique Id which user can share among other users.

## Functionalities
**Login/Sign Up**: Google Auth using Firebase


![](https://github.com/Snirg1/quiz-it-application/blob/main/login%20ss.png?raw=true)


**Create Quiz Page**: Create a quiz step by step.

![](https://github.com/Snirg1/quiz-it-application/blob/main/quiz%20code%20ss.png?raw=true)


**Submission view**: View the details of submission for a particular quiz.

![](https://github.com/Snirg1/quiz-it-application/blob/main/dashboard%20ss.png?raw=true)


## Technical Details
- Front End: React.js & Material UI 
- Back End: Express.js & Node.js 
- Database: MongoDB (NoSQL)
- Auth - Firebase
- Other: npm modules 
- Deployment: Render


## Installation

To run it locally, install it by using npm:
```
git clone https://github.com/Snirg1/quiz-it-application.git

cd quiz-it-application

npm install

cd client

npm install
```

## Activation
```
cd quiz-it-application

npm start

cd client

npm start
```

