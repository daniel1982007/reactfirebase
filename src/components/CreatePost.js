import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'


const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const navigate = useNavigate()

    const posts_ref = collection(db, 'posts')

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addDoc(posts_ref, {title, body})
        navigate('/')
    }

    const handleChange = (e) => {
        const name = e.target.name
        name === 'title' ?  setTitle(e.target.value) : setBody(e.target.value)
    }

    return (
        <div>
            <h3>Create a post</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>title</label>
                    <input placeholder='add title' name='title' onChange={handleChange} value={title} />
                </div>
                <div>
                    <label>body</label>
                    <textarea placeholder='add body' name='body' onChange={handleChange} value={body} />
                </div>
                <button>submit</button>
            </form>
        </div>

    )
}

export default CreatePost