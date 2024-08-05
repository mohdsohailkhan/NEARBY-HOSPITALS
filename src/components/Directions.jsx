import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function Directions() {
    const [route, setRoute] = useState([])
    const [userLoc, setUserLoc] = useState([]);
    const location = useLocation();
    const [latLng, setLatLng] = useState({});
    const { name, formatted, lat, lon, city, state } = location.state;
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatLng({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            });
        }
    }, [])


    useEffect(() => {
        const API = `https://api.geoapify.com/v1/geocode/reverse?lat=${latLng.lat ? '18.437787613903744' : latLng.lat}&lon=${latLng.lng ? '79.13233004973263' : latLng.lng}&format=json&apiKey=028297c416dd4ea592d61082ab866a6f`
        axios.get(API).then((res) => {
            const formattedArr = res.data.results;
            const names = [];
            formattedArr.map((format) => names.push(format.formatted));
            setUserLoc(names)
        })
    }, [latLng])
    useEffect(() => {
        const directions = `https://api.geoapify.com/v1/routing?waypoints=18.437787613903744,79.13233004973263|17.3632928,78.4284984&mode=drive&apiKey=028297c416dd4ea592d61082ab866a6f`
        axios.get(directions).then((res) => {
            const directionArr = res.data.features;
            directionArr.map((direction) => {
                const legs = direction.properties.legs
                legs.map((leg) => {
                    setRoute(leg.steps);

                })
            })
        })
    }, [])
    console.log(route)
    return (
        <div>
            <Grid container spacing={2} style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div className="grid">
                    <Grid item xs={10} >
                        <h2 style={{ marginLeft: '2rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{name}</h2>
                        <hr className="hori" />
                        <h3 style={{ marginTop: 20 }}>User Latitude :- {latLng.lat}</h3>
                        <h3 style={{ marginTop: 20 }}>User Longitude :- {latLng.lng}</h3>
                        <h3 style={{ marginTop: 20 }}>User Formatted Address :- {userLoc} </h3>
                        <hr className="hori" />
                        <h3 style={{ marginTop: 20 }}>Hospital Latitude :- {lat}</h3>
                        <h3 style={{ marginTop: 20 }}>Hospital Longitude :- {lon}</h3>
                        <h3 style={{ marginTop: 20 }}>Hospital Formatted Address :-  {formatted}</h3>
                        <h3 style={{ marginTop: 20 }}>Hospital State:- {state}</h3>
                        <h3 style={{ marginTop: 20 }}>Hospital City :- {city}</h3>
                    </Grid>
                </div>
                <Grid item xs={6}>
                <h2 className="heading">Follow The Routes For The Destination</h2>
                    {
                        route.map((routing, index) => {
                            return (
                                    <div key={index} style={{ marginLeft: '10rem' }}>
                                        <Timeline position="left">
                                            <TimelineItem>
                                                <TimelineSeparator>
                                                    <TimelineDot style={{backgroundColor:'red'}} />
                                                    <TimelineConnector />
                                                </TimelineSeparator>
                                                <TimelineContent>{routing.instruction.text}</TimelineContent>
                                            </TimelineItem>
                                        </Timeline>
                                    </div>
                            )
                        })
                    }
                </Grid>
            </Grid>
            <h1 style={{marginLeft:'15rem',marginTop:'2rem',color:'green'}}>Thank You Visit Again</h1>
        </div>
    )
}