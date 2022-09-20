import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {

  const [questions, setQuestions] = useState([])

  const handleUpdates = (id, updatedQuestions) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
     body: {
      "correctIndex": parseInt(questions.correctIndex)
     }
     .then(setQuestions(updatedQuestions))
    })
  };

  const handleDeletedQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method:'DELETE',
    })
    .then(res => res.json())
    .then(() => {
      const updatedQuestions = questions.filter((question) => question.id !== id )
      setQuestions(updatedQuestions)
    })
  };

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then (data => setQuestions(data))

  }, [])

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => <QuestionItem handleDeletedQuestion= {handleDeletedQuestion} key = {question.id} question={question}/>)}</ul>
    </section>
  );
}

export default QuestionList;
