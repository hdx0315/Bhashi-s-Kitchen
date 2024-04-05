import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import {Link, useParams} from 'react-router-dom';

function Searched () {

    let params = useParams ();

    useEffect(() => {
      getSearched(params.search);
  }, [params.search]);
  
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  
  const getSearched = async (name) => {
    let apiKey = import.meta.env.VITE_KEY_1;
    let response;

    try {
        console.log("Using API Key 1");
        response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=9f1b8c98ff7a41c89e3e1a10669795f2&query=${name}&number=49`);
        
        if (response.status === 402) {
            console.log("Switching to API Key 2");
            // Switch to the next API key
            apiKey = import.meta.env.VITE_KEY_2;
            response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4b89129fc71b4d099fab6fab19f8210b&query=${name}&number=49`);

            if (response.status === 402) {
                console.log("Switching to API Key 3");
                // Switch to the third API key
                apiKey = import.meta.env.VITE_KEY_3;
                response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ba1d5103a19d470f8916d943268b69cd&query=${name}&number=49`);
            }
        }

        const recipes = await response.json();
        setSearchedRecipes(recipes.results);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

     
  return (
    <Grid>
        {searchedRecipes.map ((item) => {
            return (
                <Card key={item.id}>
                  <Link to={"/recipe/"+item.id}>x
                      <img src={item.image} alt="" />
                      <h4>{item.title}</h4>
                  </Link>
                </Card>
            );
        })}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
  }

  a{
    text-decoration: none;
  }

  h4{
    text-align: center;
    padding: 1rem;
  }
`;


export default Searched