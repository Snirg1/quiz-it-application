import "./About.css";
import "./about_content"
import React, {useState} from "react";
import {Redirect} from "react-router-dom";


const About = () => {
    const [path, setPath] = useState("/about");
    const onOneTimeDashboard = () => {
        console.log('onOneTimeDashboard');
        setValid('true');
        setPath('');
    }
    const [valid, setValid] = useState("false");
    const [code, setCode] = useState("");


    // here we check if we need to be redirected to other screen (also other URL)
    if (valid === 'true') return <Redirect to={path}/>;
    return (
        <div id="about">
            <div id="about-div">
                <div id="logo-name">
                    <b style={{ fontweight: 600 }}>About</b>
                </div>
                <div className="about-content">
                    <b>
                        TESTING About
                    </b>
                </div>
                <button className="back-to-dashboard-button" onClick={onOneTimeDashboard}>
                    Back to dashboard
                </button>
            </div>
        </div>
    );
};

export default About;