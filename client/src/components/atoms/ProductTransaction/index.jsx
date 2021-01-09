import './ProductTransaction.scss'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Gap from '../../atoms/Gap'

const ProductTransaction = (props) => {
    return (
        <Container>
            <Row>
                <Col sm={3} className="img-trans-wrapper">
                    <img className="product-trans" src={`http://localhost:3001/uploads/${props.photo}`} alt="Coffe Image"/>
                </Col>
                <Col sm={9} className="detail-trans">
                    <Row className="title-trans">{props.name}</Row>
                    <Row className="date-trans"><strong>Saturday</strong>, 5 March 2020</Row>
                    <Gap height={14} />
                    <Row><span className="brown-txt">Toping</span><span className="red-txt"> : Bill Berry Boba, Buble Tea Gelatin</span></Row>
                    <Row className="brown-txt">Price : Rp. {props.price}</Row>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductTransaction
