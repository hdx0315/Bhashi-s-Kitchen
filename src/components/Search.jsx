import  { useState } from 'react'
import styled from 'styled-components'
import {FaSearch} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'


function Search() {

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/searched/" + input);
    };

  return (
    <FormStyle onSubmit={submitHandler}>
        <div>
            <FaSearch/>
            <input onChange={(e) => setInput(e.target.value)} type="text" value={input}/>
        </div>
    </FormStyle>
  )
}
const FormStyle = styled.form`
    display: flex;
    justify-content: center; /* Center the form horizontally */
    margin: 0 auto; /* Center the form itself */
    max-width: 600px; /* Set a maximum width for the form */
    width: 90%; /* Use 90% of the available width */

    div {
        width: 100%;
        position: relative;
    }

    input {
        width: 100%;
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: #fff;
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none;
    }

    svg {
        position: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: #fff;
    }

    @media (max-width: 768px) {
        input {
            width: 80%; /* Reduce width on smaller screens */
        }
    }
`;

export default Search


