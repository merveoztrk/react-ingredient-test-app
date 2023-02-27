import React, { useState, useEffect, useReducer } from 'react'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchAllMeals, fetchIngredientList, fetchRandomRecipe, fetchRecipeCategories } from '../apis/recipe';
import { Card, Space, Checkbox, Button } from 'antd';

const QuestionPage = ( { questionCount } ) =>
{//Girilen sayı değeri questionCount'ta, QuestionPage componentimde
    const [ allMeals, setAllMeals ] = useState( [] )//bütün yemek bilgileri bu state'de 
    const [ questions, setQuestions ] = useState( [] );//soru sayımın tutulduğu state
    const [ answers, setAnswers ] = useState( [] ); //verilen cevapların tutulduğu state
    const [ ratio, setRatio ] = useState( 0 );// test sonucunu hesaplamak için kullandığım state
    const [ testFinished, setTestFinished ] = useState( false ); //testin bitip bitmediğini gösteren state
    const [ currentQuestionIndex, setCurrentQuestionIndex ] = useState( 0 );//current değer o an olduğum soru

    const handleClick = ( option ) => //option ile check yapıldığı anda map(item) ile gelen item option oluyor 
    {
        console.log( 'option', option ) //checkboxta bir seçim yapıldığında answers statetimin güncellenmesini istiyorum 
        console.log( 'answers', answers )
        const newAnswers = [ ...answers ];
        /*direkt newanswer=answer demedim ve react yeni gelen veri var mı eskisinden farklı mı 
        diye sürekli kontrol ettiğinden ve yeni gelen veriyi kaydedip state'i güncelleyebileceğinden spreated operator kullanırım 
        ...answers ile cevaplardaki farkı görebilir ve newanswers'da güncel hali alablirim ve setter'ıma verebilirim */
        console.log( 'newanswers answers eklendikten sonra', newAnswers )
        console.log( 'currentQuestionTndex', currentQuestionIndex )
        newAnswers[ currentQuestionIndex ] = option;
        console.log( 'yeni-newanswers option eklendikten sonra', newAnswers )
        setAnswers( newAnswers )//setAnswers'ı newanswers'ı aldığı haliyle, güncellenmiş değeriyle çağırıyorum
    };

    const handleFinish = ( e ) =>
    {
        setRatio( ( answers.reduce( ( p, c, i ) =>
        { //cevapların içinde gezerken doğru eğer doğru seçeneğe geldiysem accumulatörü 1 arttırıyorum  
            if ( c === questions[ i ].correctOption ) return p + 1
            else return p;//doğru cevap yoksa acc değerimi döndürüyorum 
        }, 0 ) / questions.length * 100 ) ) //yüz üzerinden puanımı hesaplıyorum
        setTestFinished( true ) //setTestfinished değerimi trueya çekiyorum
    }
    const { Meta } = Card;

    const getAllMeals = async () =>
    {
        setAllMeals( ( await fetchAllMeals() ).data.meals )
    } //verimdeki tüm meals bilgisini çektim

    useEffect( () =>
    {
        getAllMeals();
        console.log( "getAllMeals", questionCount )
    }, [ questionCount ] ) //girilen soru sayısı değiştiğinde yemek listesi çekiliyor

    useEffect( () =>
    {
        if ( allMeals.length > 0 )
        {//eğer yemek listem boş değilse, verilerim geldiyse
            const selectedIndexes = []; //böyle bir array oluştur. Bu sorulacak yemeklerin indexlerinin tutulduğu array random dolacak.
            console.log( "1" );
            for ( ; selectedIndexes.length < questionCount; )
            {
                /*önce 1 numaralı soruyu seçip attım oluşturulan array'a ta ki
                test kaç sorudan oluşsun isteniyorsa o kadar soruluk random soru seçilip randomların aynı gelmeme
                ihtimali de kontrol edilerek array'a atıldı */
                /*bu oluşturduğum array'in uzunluğu girilen soru sayısıyla aynı olacak yani
                girilen değer 3 ise index de 0 1 2 diye toplam 3 değeri alıp eşit 
                sayıda olacak(for'la sadece bu şartı vermem yeterli, while ile de yapablirdim)*/
                const index = Math.floor( Math.random() * allMeals.length );//index değeri(sorulacak sorularıN) oluşturdum random şekilde, 0-1 arasındaki değeri value değerimin uzunluğu ile çarpıp floorladım aşağı yuvarladım tam sayı olması için  
                if ( selectedIndexes.indexOf( index ) < 0 )
                {
                    selectedIndexes.push( index );//random gelen index değerleri aynı olma ihtimaline karşı index değeri arrayde yoksa(<0, indexOf yoksa -1 döndürüyor), array'e pushla 
                } //Hangi soruları soracağımız belirlendi soruları, belli şartlara göre hazırlayacağız----
            }

            console.log( "2", "selectedIndex" );

            const questions = selectedIndexes.map( el =>
            {//el bana bir index numarası veryor 1 2 7 12 19 
                let otherIndex = Math.floor( Math.random() * allMeals.length );//yanlış cevapları başka bir yemeğin malzeme bilgisinden alacağım o yemeği burada seçiyorum random şekilde 
                while ( otherIndex === el || !allMeals[ otherIndex ].strIngredient3 )
                {
                    /*random fake yemek sorulacak sorular içindeki yemeğin indexine eşitse veya gelen 
                    yanlış cevabın 3 tane ingredient bilgisi bulunmuyorsa başka bir yanlış cevap indexi oluştur, 3 çünkü 
                    3 yanlış cevaba ihtiyacım var */
                    otherIndex = Math.floor( Math.random() * allMeals.length );
                }
                console.log( "3", "otherIndex " );
                //Yanlış cevapların bazı kontrolleri burada hazırlandı---


                const otherMeal = allMeals[ otherIndex ];//diğer yemekten gelen fake ingredient bilgileri için

                const meal = allMeals[ el ];//allMeals'ın ilgili indexinden meal bilgimi oluşturuyorum(yani sorunun fotoğrafı,ismi ve malzemesini oluşturuyorum)
                const name = meal.strMeal;
                const photo = meal.strMealThumb;
                const correctOption = meal.strIngredient1; //doğru şık burada :)
                //name, photo, doğru şık, tüm seçenekler bilgisi buradan geldi---- 

                const inCorrectOptions = [];
                const options = [];
                for ( let i = 1; inCorrectOptions.length < 3; i++ )
                {//3 elemanlı olacak yanlış cevap array'im 
                    const option = otherMeal[ "strIngredient" + i ]; //fake meal'daki seçenekleri(strIngredient1, strIngredient2, strIngredient3 ) optionlarıma koydum ancak 
                    if ( option !== correctOption ) inCorrectOptions.push( option );//doğru cevaba eşit olmayan seçenekleri yanlış cevapları array'ime pushladım, çakışmayı engelledim
                    console.log( i, otherMeal, correctOption, option );
                }
                console.log( "4", "inCorrectOptions" );
                //Doğru cevaba eşit olmayan cevapları kontrol ederek inCorrectOptions arrayime yolladım, yanlış cevapların kalan kontrolleri

                const correctIndex = Math.floor( Math.random() * 4 );//doğru cevap hangi şıkta dursun 0 1 2 3 (a b c d) bu random belirlendi
                for ( let i = 0; i < 4; i++ )
                {//i değerine ihtiyacım var içerde kullanmak üzere bu kez
                    if ( i === correctIndex )
                        options.push( correctOption ); //i random belirlenen doğru şık indexine eşitse doğru şıkkı optiona pushladım, şıklara yerleştirdik
                    else options.push( inCorrectOptions.pop() ) //değilse yanlış seçeneklardan sonuncuyu alıp şıklara verdim
                }
                //bütün cevapların birleştiği bir options arrayim var, doğru cevabımı hep aynı şıkta tutamayacağım için bunun kontrolünü burada sağladım
                return { name, photo, options, correctOption }
            } );

            console.log( questions )
            setQuestions( questions )

        }
        console.log( "allMeals", allMeals )
    }, [ allMeals ] )

    const nav = useNavigate();

    const onsubmit = event =>
    {
        event.preventDefault();
        nav( '/questionpage' )
    };


    return (
        <>{
            questions[ currentQuestionIndex ] ?
                (
                    testFinished ?
                        <div>Test completed✔️
                            <br /> <br /> Success rate percent 🎖️: <br /> { ratio }</div> :
                        <article className='review'>
                            <Meta style={ { padding: "30px" } } title={ questions[ currentQuestionIndex ].name } />
                            <div className='img-container'>
                                <Card
                                    className='food-img'
                                    style={ { width: "150px", height: "150px", margin: "0px 0 0 0px" } }
                                    cover={ <img alt="photo"
                                        src={ questions[ currentQuestionIndex ].photo }
                                    /> }></Card>
                            </div>
                            <Space className='checkbox-container' >
                                { questions[ currentQuestionIndex ].options.map( ( item ) => (
                                    <Checkbox
                                        style={ { padding: 10 } } onClick={ () => handleClick( item ) } checked={ answers[ currentQuestionIndex ] === item } >{ item }
                                    </Checkbox> ) ) }
                            </Space>
                            <br />
                            <div className='button-container'>
                                <button className='prev-btn' disabled={ currentQuestionIndex === 0 } onClick={ () => setCurrentQuestionIndex( currentQuestionIndex - 1 ) }>
                                    <FaChevronLeft />
                                </button>
                                <button className='next-btn' disabled={ currentQuestionIndex === questions.length - 1 } onClick={ () => setCurrentQuestionIndex( currentQuestionIndex + 1 ) }>
                                    <FaChevronRight />
                                </button>
                            </div>
                            <br />
                            { currentQuestionIndex === questions.length - 1 && <button className='next-btn' onClick={ handleFinish } >Finish Test</button> }
                        </article> )
                :
                <div></div> }</>

    )
}

export default QuestionPage
