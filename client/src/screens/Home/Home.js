import React, {useState, useEffect} from "react";
import "./Home.css";
import {StyledFirebaseAuth} from "react-firebaseui";
import firebase from "../../firebase/firebase";
import LoadingScreen from "../LoadingScreen/LoadingScreen";


const Home = ({setUser}) => {

    const [loading, setLoading] = useState(true);

    const uiConfig = {
        signInflow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
    };

    useEffect(() => {
        console.log("HOME")
        let isMounted = true;
        firebase.auth().onAuthStateChanged((user) => {
            if (user && isMounted) {
                setUser({
                    uid: firebase.auth().currentUser.uid,
                    name: firebase.auth().currentUser.displayName,
                    email: firebase.auth().currentUser.email,
                });
                console.log("User Logged In");
            } else {
                console.log("User Signed Out");
                setUser({});
            }
            console.log("auth change");
            if (isMounted) setLoading(false);
        });

        return () => (isMounted = false);

    }, [setUser]);

    return (
        <>
            {loading ? (
                <LoadingScreen/>
            ) : (
                <div id="Home">

                    <div id="logo">
                        <div id="logo-name">
                            The <b>Other</b> Side
                        </div><div></div><div></div><div></div>
                        <div id="description">
                              <b>B</b>e more <b>EMPATHETIC</b>
                        </div>
                        <div></div>
                        <div id="description">
                              <b>B</b>ecome a better <b>LEADER</b>
                        </div>
                    </div>
                    <div id="login-card">
                        <label className="login-label">
                            <b>Login</b>
                        </label>
                        <StyledFirebaseAuth
                            borderRadius="40px"
                            uiConfig={uiConfig}
                            firebaseAuth={firebase.auth()}
                        />}
                    </div>

                </div>
            )}
        </>
    );
};

export default Home;
