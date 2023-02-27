import React from 'react'
import { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import QuestionPage from './QuestionPage';


const NumberofQuestion = () =>
{
    const [ number, setNumber ] = useState( 0 );//kullanıcının girdiği sayıyı burada tutacağım
    const [ questionsVisible, setQuestionsVisible ] = useState( false ); //question sayfasının gösterilip gösterilmeyeceği bilgisi burada 
    const nav = useNavigate();

    const onsubmit = event =>
    {
        event.preventDefault();
        setQuestionsVisible( true );//Start test butonu click olduğunda soru sayfasına geçilebilir sayfanın görünüleblirliğini true'ya çektim
    };

    return (
        <article id="userNumber" className='review'>
            { !questionsVisible ? <div >

                <p className='info'>How many questions would you like your exam
                    to consist of?</p>
                <input name="number" placeholder="Enter a number between 1-10"
                    onChange={ ( e ) => setNumber( e.target.value ) }
                    style={ { background: "lightyellow", borderRadius: 8, padding: 8, marginTop: 30, marginBottom: 100, width: "280px" } }>
                </input>
                <div className='button-container'>
                    {/* <button className='prev-btn' onClick={() => nav(-1)}>
                        <FaChevronLeft />
                    </button> */}
                    <button type="submit" className='next-btn' disabled={ number === 0 || number > 10 } onClick={ onsubmit }>
                        {/* <FaChevronRight /> */ }
                        Start Test </button>
                </div>
            </div> :
                //questionVisible true ise QuestionPage componentini göster
                <QuestionPage questionCount={ number } />
                //girilen sayıyı props olarak QuestionPage componentime yolladım
            }

        </article>
    )
}

export default NumberofQuestion
