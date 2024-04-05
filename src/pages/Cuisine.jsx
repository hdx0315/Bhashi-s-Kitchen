import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import {Link, useParams} from 'react-router-dom';

function Cuisine () {

  let params = useParams();

  useEffect(() => {
    getCuisine(params.type);
  },[params.type]);

  const [cuisine, setCuisine] = useState([]);

  const getCuisine = async (name) => {
    // Check if data for the cuisine is available in local storage
    const savedData = localStorage.getItem(name.toLowerCase());

    if (savedData) {
        console.log(`Using saved data for cuisine: ${name}`);
        setCuisine(JSON.parse(savedData));
        return;
    }

    // If data is not available in local storage, fetch it from the API
    let apiKey = import.meta.env.VITE_KEY_1;
    let response;

    try {
        console.log(`Fetching cuisine: ${name} using API Key 1`);
        response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=9f1b8c98ff7a41c89e3e1a10669795f2&cuisine=${name}&number=69`);
        
        if (response.status === 402) {
            console.log(`API Key 1 exceeded limit for cuisine: ${name}, switching to API Key 2`);
            // Switch to the next API key
            apiKey = import.meta.env.VITE_KEY_2;
            response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=4b89129fc71b4d099fab6fab19f8210b&cuisine=${name}&number=69`);

            if (response.status === 402) {
                console.log(`API Key 2 exceeded limit for cuisine: ${name}, switching to API Key 3`);
                // Switch to the third API key
                apiKey = import.meta.env.VITE_KEY_3;
                response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ba1d5103a19d470f8916d943268b69cd&cuisine=${name}&number=69`);
            }
        }

        const recipes = await response.json();
        // Save the fetched data for the cuisine in local storage
        localStorage.setItem(name.toLowerCase(), JSON.stringify(recipes.results));
        setCuisine(recipes.results);
    } catch (error) {
        console.error(`Error fetching data for cuisine: ${name}`, error);
    }
}



/*
  const getCuisine = async (name) => {
    let apiKey = import.meta.env.VITE_KEY_1;
    let response;

    try {
        console.log("Using API Key 1");
        response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}&number=9`);
        
        if (response.status === 402) {
            console.log("Switching to API Key 2");
            // Switch to the next API key
            apiKey = import.meta.env.VITE_KEY_2;
            response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}&number=9`);

            if (response.status === 402) {
                console.log("Switching to API Key 3");
                // Switch to the third API key
                apiKey = import.meta.env.VITE_KEY_3;
                response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}&number=9`);
            }
        }

        const recipes = await response.json();
        setCuisine(recipes.results);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}*/

  return (
    <Grid
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
    >
      {cuisine.map ((item) => {
        return (
          <Card key={item.id}>
            <Link to={"/Bhashi-s-Kitchen/recipe/"+item.id}>
              <img src={item.image} alt="" />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
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

export default  Cuisine