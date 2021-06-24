import { PostContext } from '../../contexts/PostContext'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import SinglePage from '../../views/posts/SinglePage'
import AddPostModal from './AddPostModal'
import UpdatePost from '../layouts/UpdatePost'
import addIcon from '../../accests/add.svg'


const Dasboard = () => {
    const { postState: {posts, post} , getPost, setShowModal } = useContext(PostContext)
    const { authState: { users: { username } } } = useContext(AuthContext)

    useEffect(() => getPost(), [])
    // Handle open modal
    const handleShowModal = () => {
        setShowModal(true)
    }

    let body

    if (posts.length === 0) {
        body = (
            <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header>Hi {username}</Card.Header>
                <Card.Body>
                <Card.Title>Welcome to F8</Card.Title>
                <Card.Text>
                    Please enter button below to create to learn
                </Card.Text>
                <Button variant="primary">Learn it</Button>
                </Card.Body>
            </Card>
        )
    } else if (posts.length > 0) {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map( post => (
                        <Col key={post._id} className="my-2">
                            <SinglePage post={post} />
                        </Col>
                    ))}
                </Row>
                <Button className="btn-floating" variant="info" onClick={handleShowModal}>
                    <img src={addIcon} alt='play' width='46' height='46' />
                </Button>
            </>
        )
    }

    return (
    <> 
        { body }
        < AddPostModal /> 
        {post !== null && < UpdatePost /> }
    </>
    )
}

export default Dasboard
