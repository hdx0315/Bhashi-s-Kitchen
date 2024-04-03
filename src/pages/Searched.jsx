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
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=ba1d5103a19d470f8916d943268b69cd&query=${name}&number=9`)
    
      const recipes = await data.json();
      setSearchedRecipes(recipes.results);
    
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