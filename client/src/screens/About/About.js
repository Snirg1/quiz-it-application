import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./About.css";

// TODO: ADD CONTENT (LINE 20)

const About = () => {
    const [isBackToOneTimeDashboardClicked,setIsBackToOneTimeDashboardClicked] = useState(false);
    const oneTimeDashboardPath = '/';

    const onBackToOneTimeDashboard = () => { setIsBackToOneTimeDashboardClicked(true); };
    if(isBackToOneTimeDashboardClicked) return <Redirect push to={oneTimeDashboardPath}/>

    return (
        <div id="about">
            <div id="about-div">
                <div id="logo-name">
                    The<b>Other</b>Side
                </div>
                <div className= "about-content" >
                        ADD ABOUT CONTENT HERE
                </div>
                <button className="about-button" onClick={onBackToOneTimeDashboard}>
                    Back to menu
                </button>
            </div>
        </div>
    );
};

export default About;
