import styled from "@emotion/styled"
import { useEffect, useState } from "react";
import { currencies } from "../data/currencies";
import useSelectCurrency from "../hooks/useSelectCurrency"
import Error from "./Error";


const Form = ({ setCurrencies }) => {

    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);

    const [currency, SelectCurrency] = useSelectCurrency("Elige tu Moneda", currencies);
    const [cripto, SelectCriptoCurrency] = useSelectCurrency("Elige tu Criptomoneda", criptos);

    useEffect(() => {
        const requestAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD";
            const res = await fetch(url)
                .then(response => response.json())
                .catch(error => console.log(error));

            setCriptos(res.Data.map(cripto => ({ id: cripto.CoinInfo.Name, name: cripto.CoinInfo.FullName })));
        }
        requestAPI();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if ([currency, cripto].includes("")) {
            setError(true);
            return;
        }
        setError(false);
        setCurrencies({ currency, cripto });

    }

    return (
        <>
            {error && <Error>Todos los cambios son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}>

                <SelectCurrency />
                <SelectCriptoCurrency />

                <InputSubmit type="submit" value="cotizar" />
            </form>
        </>

    )
}

export default Form

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    margin-top: 30px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`;