import {useState, useContext, useEffect} from 'react'
import AuthContext from '../store/authContext'
import axios from 'axios'
import ImageCard from './homeComponents/imageCard'

import serverURL from '../url'


import { Formik, Field, Form } from "formik";


const Home = () => {
    const [search, setSearch] = useState("")
    const [images, setImages] = useState([])

    const {userId, token} = useContext(AuthContext)

    const getImages = (query) => {
        axios
            .post(`${serverURL}/photos`, {query}, {
              headers: {
                authorization: token
            }
            })
            .then((res) => {
                setImages(res.data.photos)
            })
            .catch(err => console.log("error in getImages:", err))
    }

    useEffect(() => {
        // getImages()
    }, [])
    
    return(
    <div>
        <h1>Home</h1>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={async (values) => {
          await getImages(values.query);
        }}
      >
        <Form>
          <Field name="query" type="text" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      
      <div>
        {images.map( image => {
          return(<ImageCard image={image}/>)
        })}
      </div>
    </div>
    
)}

export default Home