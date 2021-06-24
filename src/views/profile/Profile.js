import React from 'react'
import { Card, Row, Col, Button } from 'react-bootstrap'

const Profile = ({ postProfile: { title, description, status , user} }) => {
    return (
        <>
            <Card className="" border={ status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'} style={{ margin: '16px 300px' }}>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col>
                                <p>{ title }</p>
                                <Button variant={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'} disabled>{ status }</Button>
                            </Col>
                            <Col className='text-right'>
                            </Col>
                        </Row>
                    </Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Profile
