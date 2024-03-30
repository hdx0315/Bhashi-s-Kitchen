import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Splide, SplideSlide} from "@splidejs/react-splide"
import '@splidejs/react-splide/css';  

function Popular() {

    const [popular, setPopular] = useState([]);

    useEffect (() => {
        getPopular();
    }, [])


    const getPopular = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=#9f1b8c98ff7a41c89e3e1a10669795f2&number=9`);
        
        const data = await api.json();

        setPopular(data.recipes)

    }


  return (

    <Wrapper>
        <h3>Popular Picks</h3>

        <Splide>            
            {popular.map((recipe) => {
                return(
                    <SplideSlide>
                        <Card key={recipe.id}>
                            <p>{recipe.title}</p>
                            <img src={recipe.image} alt="" />
                        </Card>
                    </SplideSlide>
                )
            }
            )}
        </Splide>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`
const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;
    
    img{
        border-radius: 2rem;
    }
    
`
export default Popular