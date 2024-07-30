import React from 'react'
import { data } from '../data'


export default function Quiz  ()  {
    
  let [index, setIndex] = React.useState(0)
  let [question, setQuestion] = React.useState(data[index])
  let [lock, setLock] = React.useState(false)
  let [score, setScore] = React.useState(0)
  let [result, setResult] = React.useState(false)
  
  let option1 = React.useRef(null)
  let option2 = React.useRef(null)
  let option3 = React.useRef(null)
  let option4 = React.useRef(null)
  
  let optionArr = [option1, option2, option3, option4]
  
  const checkAns = (e, ans) => {
    if(lock === false) {
    if(question.ans === ans) {
        e.target.classList.add("correct")
        setLock(true)
        setScore(prevScore => prevScore + 1)
    } else {
        e.target.classList.add("wrong")
        setLock(true)
        optionArr[question.ans-1].current.classList.add("correct")
    }
        
    }
  }
  
  const nextBtn = () => {
    if(lock){
       if(index === data.length - 1) {
            setResult(true)
            return
       } 
         
        setIndex(++index)
        setQuestion(data[index])
        setLock(false)
        optionArr.map((option) => {
            option.current.classList.remove("wrong")
            option.current.classList.remove("correct")
        } 
        )
    }
    
  }
  
   const restBtn = () => {
    setIndex(0)
    setQuestion(data[0])
    setScore(0)
    setLock(false)
    setResult(false)
    
   } 
    
  return (
    <div className="container">
        <h1>Quiz App</h1>
        <hr className="line" />
        {result? <></> : <> <h2>{index + 1}. {question.question}</h2>
        <ul>
            <li ref={option3}onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
            <li ref={option1}onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
            <li ref={option4}onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
            <li ref={option2}onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
        </ul>
        <button onClick={nextBtn}>Next</button>
        <div className="index" onClick={nextBtn}>{index + 1} of {data.length} questions</div>  
        </>}
        {result?<><h3>
            Your Scored {score} out of {data.length}
        </h3>
        <button onClick={restBtn}>Reset</button></> : <></>}
        
      </div> 
  )
} 

