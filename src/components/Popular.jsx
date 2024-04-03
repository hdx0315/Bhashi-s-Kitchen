import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Splide, SplideSlide} from "@splidejs/react-splide"
import '@splidejs/react-splide/css';
import {Link} from 'react-router-dom';

function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect (() => {
        getPopular();
    }, [])

    const getPopular = async () => {
        const check = localStorage.getItem("popular"); 
        
        if (check) {
            setPopular(JSON.parse(check));
        } else {
            let apiKey = import.meta.env.VITE_KEY_1;
            let response;
    
            try {
                console.log("Using API Key 1");
                response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=29`);
                
                if (response.status === 402) {
                    console.log("Switching to API Key 2");
                    // Switch to the next API key
                    apiKey = import.meta.env.VITE_KEY_2;
                    response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=29`);
    
                    if (response.status === 402) {
                        console.log("Switching to API Key 3");
                        // Switch to the third API key
                        apiKey = import.meta.env.VITE_KEY_3;
                        response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=29`);
                    }
                }
    
                const data = await response.json();
                localStorage.setItem("popular", JSON.stringify(data.recipes));
                setPopular(data.recipes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };
    

  return (

    <div>
        <Wrapper>
            <h3>Popular Picks</h3>
 
            <Splide options={{
                perPage: 4,
                arrows: false,
                drag: "free",
                gap: '21rem',
            }}>            
                { popular.map((recipe) => {
                    return(
                        <SplideSlide key={recipe.id}>
                            <Card >
                                <Link to={"/recipe/" + recipe.id}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                    <Gradient/>
                                </Link>
                            </Card>
                        </SplideSlide>
                    );
                })} 
            </Splide>

        </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`


const Card = styled.div`
    margin-right: 44rem;
    width: 300%;
    min-width: 20rem;
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    
    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;

    }

    p{
        position: absolute;
        z-index: 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width :100%;
    height:100%;
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
    

`

export default Popular
