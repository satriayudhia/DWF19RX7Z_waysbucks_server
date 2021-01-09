import {useState, Fragment} from 'react'
import NumberFormat from 'react-number-format'
import {Modal} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import './Product.scss'

const Product = (props) => {
    //Get UserInfo
    const user = JSON.parse(localStorage.getItem('userInfo'))
    //Modal
    const [loginStatus, setLoginStatus] = useState(false)

    const router = useHistory();

    const handleDetail = (id) => {
        if (!user) {
            setLoginStatus(true)
        }else 
            router.push(`/detail/${id}`)
    }
    
    return (
        <Fragment>
            <div className="product-wrapper" onClick={() => handleDetail(props.id)}>
                <img className="img-product" src={`http://localhost:3001/uploads/${props.photo}`} alt="product waysbucks" />
                <p className="product-name">{props.name}</p>
                <NumberFormat value={props.price} displayType={'text'} thousandSeparator={true} prefix={'Rp, '} renderText={value => <p className="product-price">{value}</p>} />
            </div>
            <Modal
                    size="lg"
                    show={loginStatus}
                    onHide={() => setLoginStatus(false)}
                    centered>
                    <Modal.Body className="text-center"><p className="order-status">Please login first before taking an order</p></Modal.Body>
                </Modal>
        </Fragment>
    )
}

export default Product
