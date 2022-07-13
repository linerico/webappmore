import React, { useEffect, useState } from 'react'
import { MonitoringList } from '../helpers/MonitoringList';
import MonitorItem from './MonitorItem';
import axios from 'axios'

const baseUrl = 'https://cors-everywhere.herokuapp.com/http://moreapp-env.eba-ep9ahmfp.ap-southeast-1.elasticbeanstalk.com'


const PemantauanComp = () => {
    const [monitor, setMonitor] = useState([])
    const token = localStorage.getItem("accessToken")
    const idPabrik = localStorage.getItem("activePabrik")
    const idMesin = localStorage.getItem("activeMesin")
    let myTime
    const getMonitor = async() => {
        const res = await axios.get(`${baseUrl}/pabrik/${idPabrik}/mesin/${idMesin}/monitor`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setMonitor(res.data.data.monitor)
    }

    myTime = () =>{
        setInterval(()=>{
            getMonitor()
        }, 60000);
    }
    myTime()

    useEffect(() => {
        getMonitor();
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