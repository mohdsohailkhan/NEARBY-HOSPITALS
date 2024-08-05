import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    const [latLng , setLatLng] = useState({});
    const [hospitals , setHospitals] = useState([]);
    useEffect(()=>{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                    setLatLng({
                        lat : position.coords.latitude,
                        lng : position.coords.longitude
                    })
              });
          } 
    },[])
    useEffect(()=>{
        console.log(latLng)
        if(Object.keys(latLng).length > 0){
            const geoApi = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:78.44202,17.3707564,5000&bias=proximity:78.44202,17.3707564&limit=20&apiKey=028297c416dd4ea592d61082ab866a6f`;
            axios.get(geoApi).then((res)=>{
                const featuresArr = (res.data.features);
                const names = [];
                featuresArr.map((feature)=> names.push(feature.properties))
                setHospitals(names)
            })
        }
    },[latLng])
    const handleSubmit = (hospital)=>{
        navigate('/directions',{state:hospital})
    }
    return(
        <div>
            {
                hospitals.map((hospital , index)=>{
                    return(
                        <Button key={index} onClick={()=>handleSubmit(hospital)} style={{padding:'2rem'}}>
                             <Card style={{width:'40rem',padding:'1rem'}}>
                                <Typography variant="h5" component="div">
                                      {hospital.name}
                                </Typography>
                                <Typography variant="body2">
                                    {hospital.formatted}
                                </Typography>
                            </Card>
                        </Button>
                    )
                })
            }
        </div>
    )
}