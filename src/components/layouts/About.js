import React, { useContext, useEffect } from 'react'
import { ProfileContext } from '../../contexts/ProfileContext'
import { Row, Col } from 'react-bootstrap'
import Profile from '../../views/profile/Profile'


const About = () => {

    const { profile: { postsProfile }, } = useContext(ProfileContext)
    let body
    if (postsProfile.length === 0) {
        body = (
            <h1>Not found profile</h1>
        )
    } else if (postsProfile.length > 0) {
        body = (
            <Row className="row-cols-1 row-cols-md-1 g-4 mx-auto mt-1">
                <h1>{postsProfile[1].user.username}</h1>
                {postsProfile.map( post => (
                    <Col key={post._id} className="my-2">
                        <Profile postProfile={post} />
                    </Col>
                ))}
            </Row>
        )
    }

    return (
        <>
            { body }
        </>
    )
}

export default About
