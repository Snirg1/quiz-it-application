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
    //TODO: check at deployment heroku
    if (valid === 'true') return <Redirect to={path}/>;
    return (
        <div id="about">
            <div id="about-div">
                <div id="logo-name">
                    <b style={{ fontweight: 600 }}>About</b>
                </div>
                {/*TODO: create a card for the about content*/}
                <div className="about-content">
                    <b>
                        {/*TODO: create about content*/}
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