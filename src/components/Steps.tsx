import React, {useState, useEffect, Component} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory,
    useRouteMatch
} from "react-router-dom";

import { AppContext } from './../context/Appcontext';

interface Props {
    statusLabel: string,
    activeStep: number
}

function Steps(props: Props) {

    const appContext = React.useContext(AppContext);
    appContext.subscriptionId = "61e3e395-104d-3aea-966c-0dd5dc059e37";

    const { id } = useParams();
    console.log("id:"+id);
    let match = useRouteMatch();

    console.log(match);

    return (
        <div className="steps">
            <h1>{props.statusLabel}</h1>
            <div className="steps-container">
                <div className="step-container"><Link to={appContext.subscriptionId}><div className="step active" id="step-1">1</div></Link></div>
                <div className="step-container"><Link to="/step2"><div className="step" id="step-2">2</div></Link></div>
                <div className="step-container"><Link to="/step3"><div className="step" id="step-3">3</div></Link></div>
                <div className="step-container"><Link to="/step4"><div className="step" id="step-4">4</div></Link></div>
            </div>
        </div>
    )
}

export default Steps;