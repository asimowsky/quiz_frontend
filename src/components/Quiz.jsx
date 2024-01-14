import React, { useEffect, useRef, useState } from 'react';
import { Button, Carousel, Progress } from 'antd';
import axios from 'axios';
import { QuizCard } from './QuizCard';
import { QuizForm } from './QuizForm';
import data from './data.json';
import { ThankYou } from './ThankYou';
import Question from './Question';
import { QuizForm2 } from './QuizForm2';

const apiUrl = 'https://quiz-backend-theta.vercel.app/';
const createQuizUrl = `https://quiz-backend-theta.vercel.app/api/quiz/create`;

export const Quiz = () => {
    const carouselRef = useRef();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [formValues, setFormValues] = useState({
        userdetails: {
            name: '',
            surname: '',
            email: '',
            phone: '',
            postleitzahl: '',
        },
        questions: {},

    });
    const [isSent, setIsSent] = useState(false);
    const totalSlides = data.length;

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            carouselRef.current.next();
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            carouselRef.current.prev();
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleOptionSelect = (questionNumber, option) => {
        const questionText = data.find((d) => d.id === questionNumber)?.content?.question;
        setFormValues((prev) => {
            const updatedQuestions = {
                ...prev.questions,
                [questionText]: option,
            };

            return {
                ...prev,
                questions: updatedQuestions,
            };
        });

        nextSlide();
    };

    const progressPercent = (currentSlide / (totalSlides - 1)) * 100;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            userdetails: {
                ...prevFormValues.userdetails,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async () => {
        console.log('Sending form data to server:', formValues);
        try {
            const response = await axios.post(createQuizUrl, formValues);
            console.log('Server response:', response.data);
            setIsSent(true);
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
        <div className="layout">
            <div className="myPage">
                <div className="top-section">
                    <Progress percent={progressPercent} />
                    {data[currentSlide]?.content?.type === 'grid' && (
                        <Question question={data[currentSlide].content.question} />
                    )}
                </div>
                {!isSent ? (
                    <div className="centered-cards">
                        {/* <Carousel dots={false} ref={carouselRef} className="full-height-carousel">
                            {data?.map((item) => (
                                <div key={item.id}>
                                    <div className="slider_container">
                                        {item?.content?.type === 'grid' &&
                                            item.content.elements.map((gridItem, index) => (
                                                <QuizCard
                                                    key={index}
                                                    image={gridItem.image}
                                                    content={gridItem.text}
                                                    onClick={() => handleOptionSelect(item.id, gridItem.text)}
                                                    questionNumber={item.id}
                                                    selectedOption={formValues.questions[item.content.question]}
                                                />
                                            ))}

                                        {item?.content === 'form' && (
                                            <QuizForm
                                                questionNumber={item.id}
                                                onOptionSelect={handleOptionSelect}
                                                handleSubmit={handleSubmit}
                                                handleChange={handleChange}
                                                formData={formValues.userdetails}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Carousel> */}
                        <Carousel dots={false} ref={carouselRef} className="full-height-carousel">
                            {data?.map((item, index) => (
                                <div key={item.id}>
                                    <div className="slider_container">
                                        {item?.content?.type === 'grid' && (
                                            index === 0 ? (
                                                <div className="grid-container">
                                                    {item.content.elements.map((gridItem, index) => (
                                                        <QuizCard
                                                            key={index}
                                                            image={gridItem.image}
                                                            content={gridItem.text}
                                                            onClick={() => handleOptionSelect(item.id, gridItem.text)}
                                                            questionNumber={item.id}
                                                            selectedOption={formValues.questions[item.content.question]}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                item.content.elements.map((gridItem, index) => (
                                                    <QuizCard
                                                        key={index}
                                                        image={gridItem.image}
                                                        content={gridItem.text}
                                                        onClick={() => handleOptionSelect(item.id, gridItem.text)}
                                                        questionNumber={item.id}
                                                        selectedOption={formValues.questions[item.content.question]}
                                                    />
                                                ))
                                            )
                                        )}

                                        {item?.content === 'form' && (
                                            <QuizForm
                                                questionNumber={item.id}
                                                onOptionSelect={handleOptionSelect}
                                                handleSubmit={handleSubmit}
                                                handleChange={handleChange}
                                                formData={formValues.userdetails}
                                            />
                                        )}
                                    </div>
                                    <div className="flex_btns">
                                        {data[currentSlide]?.prev && <Button onClick={prevSlide} className='flex_btn'>Prev</Button>}
                                        {data[currentSlide]?.next && <Button onClick={nextSlide} className='flex_btn' >Next</Button>}
                                    </div>

                                </div>
                            ))}

                        </Carousel>
                        {/* 
                        <div className="flex_btns">
                            {data[currentSlide]?.prev && <Button onClick={prevSlide} className='flex_btn'>Prev</Button>}
                            {data[currentSlide]?.next && <Button onClick={nextSlide} className='flex_btn' >Next</Button>}
                        </div> */}
                    </div>
                ) : (
                    <ThankYou />
                )}
            </div>
        </div>
    );
};
