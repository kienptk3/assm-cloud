import pencil from '../../accests/penceil.svg'
import playIcon from '../../accests/play.svg'
import trashIcon from '../../accests/trash.svg'
import  { Button } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'
import { useContext } from 'react'
 

const ActionButton = ({ url, id }) => {

    const { deletePost, setShowUpdate, findPost } = useContext(PostContext)

    // Handle delete post
    const handleDeletePost = async () => {
        try {
            deletePost(id)
        } catch (error) {
            console.log(error)
        }
    }
    
    // handle update post
    const handleUpdatePost = async () => {
        setShowUpdate(true)
        findPost(id)
    }


    return (
        <>
            <Button className='post-button' href={url} target='_blank' style={{boder: 'none', backgroundColor: 'white'}}>
                <img src={playIcon} alt='play' width='25' height='25' />
            </Button>
            <Button className='post-button' target='_blank' style={{boder: 'none', backgroundColor: 'white'}} onClick={handleUpdatePost}>
                <img src={pencil} alt='pencil' width='25' height='25' />
            </Button>
            <Button className='post-button' target='_blank' style={{boder: 'none', backgroundColor: 'white'}} onClick={handleDeletePost} >
                <img src={trashIcon} alt='trash' width='25' height='25' />
            </Button>
        </>
    )
}

export default ActionButton
