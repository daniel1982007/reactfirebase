import React, { useState, useEffect } from 'react'
import { getDocs, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const Home = () => {
    const [blogs, setBlogs] = useState([])
    const [toggle, setToggle] = useState(false)
    
    useEffect(() => {
        const blogs_ref = collection(db, 'posts')//move it into useeffect to avoid warning if it doesn't need except here
        const getBlogs = async () => {
            const blogs = await getDocs(blogs_ref)
            // blogs.docs.forEach(blog => console.log(blog.data()))
            console.log(blogs.docs.map(doc => doc.data()))
            setBlogs(blogs.docs.map(doc => ({...doc.data(), id: doc.id, edit: false})))
        }

        getBlogs()
    }, [toggle])

    const handleEdit = (id) => {
        setBlogs(prev => prev.map(blog => {
            if(blog.id === id) {
                return ({...blog, edit: true})
            } else {
                return blog
            }
        }))
    }

    const handleDelete = async (id) => {
        const deleted_doc = doc(collection(db, 'posts'), id)
        await deleteDoc(deleted_doc)
        setToggle(prev => !prev)
    }

    const handleChange = (e, id) => {
        const name = e.target.name
        if(name === 'title') {
            setBlogs(prev => prev.map(blog => {
                if(blog.id === id) {
                    console.log(e.target.value)
                    return ({...blog, title: e.target.value})
                } else {
                    return blog
                }
            }))
        } else {
            setBlogs(prev => prev.map(blog => {
                if(blog.id === id) {
                    return ({...blog, body: e.target.value})
                } else {
                    return blog
                }
            }))
        }
    }

    const handleBlur = async (e) => {
        // console.log(e.target)
        // console.log(e.currentTarget)
        // console.log(e.relatedTarget)
        // const blog_doc = doc(collection(db, 'posts'), id)

        if(e.relatedTarget === null) {
            const updatedBlogs = blogs.filter(blog => blog.edit === true)
            for(let blog of updatedBlogs) {
                await updateDoc(doc(collection(db, 'posts'), blog.id), {title: blog.title, body: blog.body})
            }     
            setToggle(prev => !prev)
        }


    }
    
    return (
        <div>
            {blogs.map(blog => {
                return (
                    <div key={blog.id} className='blog-item'>
                        <div>
                            <span className="material-icons edit" onClick={() => handleEdit(blog.id)}>edit</span>
                            <span className="material-icons delete" onClick={() => handleDelete(blog.id)}>clear</span>
                        </div>
                        <div>
                            {!blog.edit ? <h3>{blog.title}</h3> : <input autoFocus className='input-field' placeholder='enter' name='title' value={blog.title} onChange={(e) => handleChange(e, blog.id)} onBlur={handleBlur} />}
                            {!blog.edit ? <p>{blog.body}</p> : <input className='input-field' placeholder='enter' name='body' value={blog.body} onChange={(e) => handleChange(e, blog.id)} onBlur={handleBlur} />}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Home