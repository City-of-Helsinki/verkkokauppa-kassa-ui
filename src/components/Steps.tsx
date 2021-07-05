import React from 'react';
import {
    useRouteMatch
} from "react-router-dom";

import { AppContext } from '../context/Appcontext';

interface Props {
    statusLabel: string,
    activeStep: number
}

function Steps(props: Props) {
    const appContext = React.useContext(AppContext);
    let match = useRouteMatch();
    let activeStep = props.activeStep;

    if (activeStep == 1) {
        return (
            <div className="steps">
                <h1>{props.statusLabel}</h1>
                <div className="steps-container">
                    <div className="step-container"><div className="step active" id="step-1">1</div></div>
                    <div className="step-container"><div className="step" id="step-2">2</div></div>
                    <div className="step-container"><div className="step" id="step-3">3</div></div>
                    <div className="step-container"><div className="step" id="step-4">4</div></div>
                </div>
            </div>
        )
    } else if (activeStep == 2) {
        return (
            <div className="steps">
                <h1>{props.statusLabel}</h1>
                <div className="steps-container">
                    <div className="step-container"><div className="step done" id="step-1"/></div>
                    <div className="step-container"><div className="step active" id="step-2">2</div></div>
                    <div className="step-container"><div className="step" id="step-3">3</div></div>
                    <div className="step-container"><div className="step" id="step-4">4</div></div>
                </div>
            </div>
        )
    } else if (activeStep == 3) {
        return (
            <div className="steps">
                <h1>{props.statusLabel}</h1>
                <div className="steps-container">
                    <div className="step-container"><div className="step done" id="step-1"/></div>
                    <div className="step-container"><div className="step done" id="step-2"/></div>
                    <div className="step-container"><div className="step active" id="step-3">3</div></div>
                    <div className="step-container"><div className="step" id="step-4">4</div></div>
                </div>
            </div>
        )
    } 
    
}

export default Steps;