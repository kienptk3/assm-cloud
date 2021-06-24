import React, { useContext } from 'react'
import { Card, Row, Col, Button, Nav } from 'react-bootstrap'
import ActionButtons from '../../views/posts/ActionButton'
import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { ProfileContext } from '../../contexts/ProfileContext'




const SinglePage = ({ post: { _id: postId, title, description, url, status, user } }) => {
    const { authState: { users: { _id: userId } } } = useContext(AuthContext)
    const { getPostProfile } = useContext(ProfileContext)

    
    const log = async () => {
        await getPostProfile(user)
    }

    return (
        <>
            <Card className="" border={ status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col>
                                <p>{ title }</p>
                                <Button variant={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'} disabled>{ status }</Button>
                            </Col>
                            <Col className='text-right'>
                            {userId === user ? 
                                <ActionButtons url={url} id={postId} user={user} /> :  
                                <Button style={{boder: 'none', backgroundColor: 'white', marginTop: '15px'}} onClick={log}>
                                    <Nav.Link as={Link} to="/about">View Profile {user.username}</Nav.Link>
                                </Button>}
                            </Col>
                        </Row>
                    </Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default SinglePage
