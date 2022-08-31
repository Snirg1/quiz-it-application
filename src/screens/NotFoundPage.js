import {Link} from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
    return (
        <div className="loading">
            <h1>404 Page Not Found!</h1>
            <div id="logo-name">
                The<b> Other </b> Side
            </div>
            <h3>
                <Link to="/">Click here</Link> and
                Go back to the Dashboard.
            </h3>
        </div>
    );
};

export default NotFoundPage;
