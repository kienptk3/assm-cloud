import React, { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { Form, Button, Modal } from 'react-bootstrap'


const UpdatePost = () => {
    const { postState: { post }, showUpdate, setShowUpdate, updatePost } = useContext(PostContext)
  
    const [dataUser, setDataUser] = useState(post)
    useEffect(() => setDataUser(post), [post])
    const onChangeInputForm = (event) => {
        return setDataUser({ ...dataUser, [event.target.name]: event.target.value })
    }


    const closeModal = () => {
        return setShowUpdate(false)
    }

    const onSubmitUpdatedPost = async (event) => {
        event.preventDefault()
        try {
            const updated = await updatePost(dataUser)
            if (updated.success) {
                closeModal()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Modal show={showUpdate} animation={false} onHide={closeModal}>
                <Modal.Header >
                    <Modal.Title>What you want to update course ?</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitUpdatedPost}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Title'
                                name='title'
                                onChange={onChangeInputForm}
                                value={dataUser.title}
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
                                value={dataUser.description}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                placeholder='Youtube Tutorial URL'
                                name='url'
                                onChange={onChangeInputForm}
                                value={dataUser.url}
                            />
                        </Form.Group>
                        <Form.Group as="select" name="status" value={dataUser.status} onChange={onChangeInputForm}>
                            <option value="TO LEARN" >To Learn</option>
                            <option value="LEARNING" >Learning</option>
                            <option value="LEARNED" >Learned</option>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant='primary' type='submit'>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default UpdatePost
