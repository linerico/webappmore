/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import "../styles/NavBar.css";

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

const NavBar = () => {
    const [nama, setnama] = useState("")
    const [img, setImg] = useState()
    const [imgNotif, setImgNotif] = useState()
    const token = localStorage.getItem("accessToken")

    const getUser = async() => {
        const res = await axios.get(`${baseUrl}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setnama(res.data.data.user.nama_pengguna)
        if(res.data.data.user.foto_profil !== null) {
            setImg(res.data.data.user.foto_profil)
        } else {
            setImg('/assets/logo.jpeg')
        }
    }
    const getUnread = async() => {
        const res = await axios.get(`${baseUrl}/notifikasi/unread`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(res.data.data.unread){
            setImgNotif('/assets/Notif.png');
        }else{
            setImgNotif('/assets/bell.png')
        }
    }

    getUser();
    getUnread();

    return (
        <div className='navbar'>
            <div className='leftSide'>
                <Link to="/pabrik"><img src={'https://more-app-bucket.s3.ap-southeast-1.amazonaws.com/logo.jpeg'} /></Link>
            </div>
            <div className='rightSide'>
                <Link to="/profile">{nama}</Link>
                <Link to="/profile"><img src={img} style={{
                    width:"50px",
                    height:"50px",
                    border: "1px solid white",
                    borderRadius: "30px"
                    
                }}/></Link>
                <Link to="/notifikasi"><img src={imgNotif} /></Link>
            </div>
        </div>
    )
}

export default NavBar