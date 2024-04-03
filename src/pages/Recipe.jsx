

import styled from "styled-components";
import  { useParams } from 'react-router-dom';

import React, { useEffect, useState } from 'react'

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');


  useEffect(() => {
    const fetchDetails = async () => {
      const storedData = localStorage.getItem(params.name);
      if (storedData) {
        setDetails(JSON.parse(storedData));
        return;
      }

      let apiKey = import.meta.env.VITE_KEY_1;
      let response;

      try {
        console.log("Using API Key 1");
        response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`);
            
        if (response.status === 402) {
          console.log("Switching to API Key 2");
          // Switch to the next API key
          apiKey = import.meta.env.VITE_KEY_2;
          response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`);

          if (response.status === 402) {
            console.log("Switching to API Key 3");
            // Switch to the third API key
            apiKey = import.meta.env.VITE_KEY_3;
            response = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`);
          }
        }

        const detailData = await response.json();
        setDetails(detailData);
        console.log(detailData.extendedIngredients);
        console.log(params.name); 
        localStorage.setItem(params.name, JSON.stringify(detailData)); // Save data to local storage
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetails();
  }, [params.name]);

 
  return (
    <DetailWrapper>
      
      <div>
        <h2>{details.title}</h2>
        <StyledImg src={details.image} alt="" />
      </div>

      <Info>
        <Button 
          className={activeTab === 'instructions' ? 'active' : ''}
          onClick={ ()=> setActiveTab("instructions")} >
            Instructions
        </Button>
        <Button 
          className={activeTab === 'ingredients' ? 'active' : ''}
          onClick={()=> setActiveTab("ingredients")}>
            Ingredients
        </Button>

        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{__html: details.summary}}>
            </h3>
            {console.log(details.instructions)};
            {console.log(details.summary)};
            <h3 dangerouslySetInnerHTML={{__html: details.instructions}}>
            </h3>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients && details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id+Math.random()}>
                {ingredient.original}
              </li>
            ))}
            </ul>
        )}
      </Info>

    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;

  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }

  h2{
    margin-bottom: 2rem;
  }

  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul{
    margin-top: 2rem;
  }

`
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid black;
  margin-right: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;

`

const Info = styled.div`
  position: relative;flex: 1 1 100%; /* Set flex-grow, flex-shrink, and flex-basis */
  margin-top: 2rem;
  margin-left: 2rem;
  flex: 1 1 100%; 

  @media (min-width: 768px) {
    flex-basis: 50%; /* Adjust flex-basis to 50% for medium screens and larger */
    margin: 0rem;
  }
`

const StyledImg = styled.img`
  width: 100%; /* Set the image width to 100% */
  height: auto; /* Automatically adjust the height to maintain aspect ratio */
`;


export default Recipe

