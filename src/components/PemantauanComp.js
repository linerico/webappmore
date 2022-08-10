import React, { useEffect, useState } from 'react'
import { MonitoringList } from '../helpers/MonitoringList';
import MonitorItem from './MonitorItem';
import axios from 'axios'

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'
// const baseUrl ='http://127.0.0.1:5000'


const PemantauanComp = () => {
    const [monitor, setMonitor] = useState([])
    // const [blink, setBlink] = useState(true)
    const [stsMesin, setStsMesin] = useState(false)
    const token = localStorage.getItem("accessToken")
    const idPabrik = localStorage.getItem("activePabrik")
    const idMesin = localStorage.getItem("activeMesin")
    var myB = false
    const getMonitor = async() => {
        try{
            // console.log("Masuk ke get Monitor")
            const res = await axios.get(`${baseUrl}/pabrik/${idPabrik}/mesin/${idMesin}/monitor`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setMonitor(res.data.data.monitor)
        } catch (err) {
            console.log(err)
        }
        
    }
    const getStatusMesin = async() => {
        try{
            const res = await axios.get(`${baseUrl}/pabrik/${idPabrik}/mesin/${idMesin}/status`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setStsMesin(res.data.data.online)
            console.log("Sts Mesin : ", res.data.data.online)
        } catch (err) {
            console.log(err)
        }
    }

    // myTime = () =>{
    //     setInterval(()=>{
    //         console.log("posisi di interval")
    //         getMonitor()
    //     }, 2000);
    //     return clearInterval()
    // }
    // myTime()
    const myBlink = async() => {
        if(myB){
            myB = false
            localStorage.setItem("blink", false)
        } else{
            myB = true
            localStorage.setItem("blink", true)
        }
    }

    useEffect(() => {
        const interval = setInterval(()=>{
            getStatusMesin()
            myBlink()
            getMonitor()
            // console.log("Sts Mesis", stsMesin)
        }, 2000);
        return () => clearInterval(interval)
    }, [])
    if(stsMesin){
        return (
            <div className='monitor d-flex container'>
                {monitor.map((menuItem, key) => {
                    return (
                        <MonitorItem
                            key={key}
                            data={menuItem.value}
                            satuan={menuItem.satuan}
                            ket={menuItem.nama}
                            alarm={menuItem.alarm} 
                            enableAlarm ={menuItem.enableAlarm}
                            fullData={monitor}
                            index = {key}
                            ba = {myB}
                            />
                            
                    );
                })}
            </div>
        )
    } else{
        return (
            <div className='monitor'>
                <h1>Mesin Offline</h1>
                <p>Silakan menghubungi teknisi lapangan untuk info lebih lanjut</p>
            </div>
        )
    }
    
}

export default PemantauanComp