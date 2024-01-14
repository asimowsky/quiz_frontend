import React, { useEffect, useState } from 'react'
import QuizTable from './QuizTable';
import axios from 'axios';
export const Statistic = () => {
    const [quizData, setQuizData] = useState([]);
    useEffect(() => {
        const getQuizData = async () => {
            try {
                const quiz_data = await axios.get('https://quiz-backend-theta.vercel.app/api/quiz/');
                setQuizData(quiz_data?.data);
                console.log(quiz_data?.data);
            } catch (error) {
                console.error("Failed to fetch quiz data:", error);
            }
        };
        getQuizData();
    }, []);
    return (
        <div className='stats_layout'>
            <div className="stat_box">
                <QuizTable quizData={quizData} />
            </div>
            {/* <iframe src='http://localhost:5173/' height="680px" width="1200px" style={{ border: "0px #ffffff none" }} /> */}

        </div>
    )
}
