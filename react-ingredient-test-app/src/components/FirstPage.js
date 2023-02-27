import React, { useEffect, useState } from 'react'
import { fetchRandomRecipe } from '../apis/recipe';
import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


const FirstPage = () =>
{
    const [ photo, setPhoto ] = useState( {} );

    const getPhoto = async () =>
    {
        const res = await fetchRandomRecipe();
        setPhoto( res.data.meals[ 0 ].strMealThumb )
    }

    useEffect( () =>
    {
        getPhoto();
    }, [] )

    const nav = useNavigate();

    const onsubmit = event =>
    {
        event.preventDefault();
        nav( '/numberofquestion' )
    };

    return (
        <article className='review'>
            <h2>Welcome to Recipe Ingredient Test</h2>
            <div className='img-container'>
                <img alt="photo" src={ photo } className='food-img' />
            </div>
            <p className='info'>We know that enjoy using our website with recipes.
                We thank you. We believe it specializes you in dishes and in their ingredients.
                How confident are you? Let's test it!</p>
            <div className='button-container'>
                <button className='next-btn' onClick={ onsubmit }>
                    <FaChevronRight />
                </button>
            </div>
        </article>
    )
}

export default FirstPage
