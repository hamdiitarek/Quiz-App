import React, { useState, useEffect } from 'react';
import './questions.css'; 
import Timer from './timer'; 
import questionsData from './questions.json';

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);

    useEffect(() => {
        if (isQuizCompleted) return;

        const timer = setTimeout(() => {
            if (selectedOption === null) {
                handleNextQuestion();
            }
        }, 10000); 

        return () => clearTimeout(timer);
    }, [currentQuestionIndex, isQuizCompleted, selectedOption]);

    const currentQuestion = questionsData[currentQuestionIndex];

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
        const correct = index === currentQuestion.correctOption;
        setIsCorrect(correct);

        if (correct) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (selectedOption !== null || selectedOption === null) {
            setSelectedOption(null);
            setIsCorrect(null);

            if (currentQuestionIndex === questionsData.length - 1) {
                setIsQuizCompleted(true);
            } else {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            }
        }
    };

    return (
        <div>
            {isQuizCompleted ? (
                <div>
                    <h2>Your Score: {score}</h2>
                </div>
            ) : (
                <>
                    <Timer key={currentQuestionIndex} />
                    <h2>Question {currentQuestionIndex + 1} of {questionsData.length}</h2> <br />
                    <h3>{currentQuestion.question}</h3> 
                    <ol>
                        {currentQuestion.options.map((option, index) => {
                            let backgroundColor = 'white';
                            if (selectedOption !== null) {
                                if (index === currentQuestion.correctOption) {
                                    backgroundColor = 'lightgreen'; // Correct answer
                                } else if (index === selectedOption && index !== currentQuestion.correctOption) {
                                    backgroundColor = 'salmon'; // Incorrect answer
                                }
                            }

                            return (
                                <li 
                                    key={index} 
                                    onClick={() => handleOptionSelect(index)}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: backgroundColor,
                                        pointerEvents: selectedOption !== null ? 'none' : 'auto' // Disable further clicks after an option is selected
                                    }}
                                >
                                    {option}
                                </li>
                            );
                        })}
                    </ol>
                    <button style={{ color: 'white' }} onClick={handleNextQuestion} disabled={selectedOption === null}>
                        Next
                    </button>
                </>
            )}
        </div>
    );
}

export default Questions;
