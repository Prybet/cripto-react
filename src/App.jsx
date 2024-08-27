import styled from "@emotion/styled"
import { useEffect, useState } from "react";
import CriptoImage from "../src/img/criptos-image.png"
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";


function App() {
  const [currencies, setCurrencies] = useState({});
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(currencies).length > 0) {
      const request = async () => {
        setLoading(true);
        setResponse({});
        const { currency, cripto } = currencies;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${currency}`;
        const res = await fetch(url)
          .then(response => response.json())
          .catch(error => console.log(error));
        setResponse(res.DISPLAY[cripto][currency]);
        setLoading(false);
      }
      request();
    }
  }, [currencies]);
  return (
    <Container>
      <Image src={CriptoImage} alt="Criptos Image" />
      <div>
        <Heading> Cotiza Criptomonedas al instante</Heading>
        <Form setCurrencies={setCurrencies} />
        <pre>*CLP is not supported for the API</pre>
        {loading && <Spinner />}
        {response.PRICE && <Result response={response} />}

      </div>

    </Container>
  )
}

export default App;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }

  pre{
    color: white;
  }
`;

const Heading = styled.h1`
  font-family: "lato", sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66A2FB;
    display: block;
    margin: 10px auto 0 auto;
  }

`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;