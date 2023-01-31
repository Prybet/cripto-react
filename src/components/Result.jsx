import styled from "@emotion/styled";

const Result = ({ response }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = response;
    return (
        <Container>
            <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="Cripto Image" />
            <div>
                <Price> El precio de de: <span>{PRICE}</span></Price>
                <Text> Precio más alto del día: <span>{HIGHDAY}</span></Text>
                <Text> Precio más bajo del día: <span>{LOWDAY}</span></Text>
                <Text> Variacion últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Text>
                <Text> Última actualización: <span>{LASTUPDATE}</span></Text>
            </div>

        </Container>
    )
}

export default Result;

const Container = styled.div`
    color: #FFF;
    font-family: "Lato", sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
    span{
        font-weight: 700;
    }
`;

const Text = styled.p`
    font-size: 18px;
`;

const Price = styled.p`
    font-size: 24px;
`;
const Image = styled.img`
    display: block;
    width: 120px;
`;