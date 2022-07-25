import React, { useEffect, useState } from 'react'
import { MonitoringList } from '../helpers/MonitoringList';
import MonitorItem from './MonitorItem';
import axios from 'axios'

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'
// const baseUrl ='http://127.0.0.1:5000'


const PemantauanComp = () => {
    const [monitor, setMonitor] = useState([])
    const token = localStorage.getItem("accessToken")
    const idPabrik = localStorage.getItem("activePabrik")
    const idMesin = localStorage.getItem("activeMesin")
    let myTime
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

    // myTime = () =>{
    //     setInterval(()=>{
    //         console.log("posisi di interval")
    //         getMonitor()
    //     }, 2000);
    //     return clearInterval()
    // }
    // myTime()

    useEffect(() => {
        const interval = setInterval(()=>{
            console.log("interval di panggil")
            getMonitor()
        }, 2000);
        return () => clearInterval(interval)
    }, [])

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
                        index = {key}/>
                        
                );
            })}
        </div>
    )
}

export default PemantauanComp