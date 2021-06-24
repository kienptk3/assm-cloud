import React, { useContext, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'


const AddPostModal = () => {

    const { createPost } = useContext(PostContext)
    
    const { showModal, setShowModal } = useContext(PostContext)

    const [postData, setPostData] = useState({
        title: '',
        description: '',
        url: ''
    })
    const { title, description, url } = postData

    // Handle get data from input fields
    const onChangeInputForm = (event) => {
        return setPostData({ ...postData, [event.target.name]: event.target.value })
    }

    // Handle set modal and data from
    const closeModalAndForm = () => {
        setShowModal(false)
        setPostData({
            title: '',
            description: '',
            url: ''
        })
    }

    // Handle close modal
    const handleCloseModal = () => {
        closeModalAndForm()
    }

    // Handle submit form
    const onSubmitForm = async (event) => {
        event.preventDefault()
        try {
            const create = await createPost(postData)
            if (!create.success) {
                console.log('Creatd Post')
            }
            closeModalAndForm()
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <>
            <Modal show={showModal} animation={false} onHide={handleCloseModal}>
                <Modal.Header >
                    <Modal.Title>What you want to learn ?</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitForm}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Title'
                                name='title'
                                onChange={onChangeInputForm}
                                value={title}
                                required
                                aria-describedby='title-help'
                            />
                            <Form.Text id='title-help' muted>
                                Required
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                placeholder='Description'
                                name='description'
                                onChange={onChangeInputForm}
                                value={description}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Youtube Tutorial URL'
                                name='url'
                                onChange={onChangeInputForm}
                                value={url}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant='primary' type='submit'>
                            LearnIt!
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddPostModal
