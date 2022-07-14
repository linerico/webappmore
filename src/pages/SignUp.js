import axios from 'axios';
import React, {useState} from 'react';
// import {Logo} from '../assets/logo.jpeg';
import {Link, useHistory} from 'react-router-dom';
import "../styles/StartPage.css";
import validator from 'validator';

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'

function SignUp() {
  const history = useHistory()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)

  const userSingup = async() => {
    const user = {
      nama_pengguna:name,
      email,
      password,
      no_telepon:phone
    }
    if (!validator.isEmail(email)) {
      setIsError(true)
      setError("Email yang anda masukan tidak valid")
      setTimeout(() => {
        setIsError(false)
        setError("")
      }, 2000)
    } else if (password != rePassword) {
      setIsError(true)
      setError("Kata sandi dan ulang kata sandi tidak sama")
      setTimeout(() => {
        setIsError(false)
        setError("")
      }, 2000)
    } else {
      try{
        await axios.post(`${baseUrl}/users/register`, user)
        localStorage.setItem("lastEmail", email)
        localStorage.setItem("lastPassword", password)
        await axios.post(`${baseUrl}/users/sendverifikasi`, {email});
        setName("")
        setEmail("")
        setPassword("")
        setRePassword("")
        setPhone("")
        history.push('/verification')
      } catch (err){
        console.log(err.response.data.message)
        setIsError(true)
        setError(err.response.data.message)
        setTimeout(() => {
          setIsError(false)
          setError("")
        }, 2000)
      }
    }
  }

  return (
    <div className='signUp d-flex'>
        <div className='leftSide'>
          <img src='https://more-app-bucket.s3.ap-southeast-1.amazonaws.com/logo.jpeg' className='w-full img-side' />
        </div>
        <div className='rightSide w-100'>
            <div className='mt-5 p-3 w-75'>
              <h2 className='text-center fw-bold mb-5'>DAFTAR</h2>
              {/* <input value={email} name='email' className='form-control rounded-pill' type='email' placeholder='Alamat Email' onChange={(e) => setEmail(e.target.value)}/> */}
                <input value={name} name='name' className='form-control rounded-pill' type='text' placeholder='Nama Lengkap' onChange={(e) => setName(e.target.value)}/>
                
                <input value={email} name='email' className='form-control rounded-pill mt-3' type='email' placeholder='Alamat Email' onChange={(e) => setEmail(e.target.value)}/>

                <input value={phone} name='phone' className='form-control rounded-pill mt-3' type='tel' pattern='[0-9]{12}' placeholder='No. Telepon' onChange={(e) => setPhone(e.target.value)}/>

                <input value={password} name='password' className='form-control rounded-pill mt-3' type='password' placeholder='Kata Sandi' onChange={(e) => setPassword(e.target.value)}/>

                <input value={rePassword} name='repassword' className='form-control rounded-pill mt-3 mb-5' type='password' placeholder='Ulang Kata Sandi' onChange={(e) => setRePassword(e.target.value)}/>
                {/* <Link to='/verification'>
                  <input name='signup' className='btn btn-primary btn-lg mt-3 mb-5 w-100 rounded-pill fw-bold' type='submit'/>
                </Link> */}
                {isError && (
                  <div>
                {/* {error.map((item, index) => <p key={index} style={{color: "red", margin: "0.4rem 0"}}>{item.msg}</p>)} */}
                    <p style={{color: "red", margin: "0.4rem 0"}}>{error}</p>
                  </div>
                )}
                <button className='btn btn-primary btn-lg mt-3 mb-5 w-100 rounded-pill fw-bold' onClick={ userSingup}>Submit</button>
              <p className='mt-4  text-center'>Sudan punya akun? <Link to='/'> Masuk </Link></p>
            </div>
        </div>
    </div>
  )
}

export default SignUp