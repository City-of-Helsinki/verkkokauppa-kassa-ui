import React, {useState, useEffect, Component} from 'react';
import {Container } from "hds-react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useHistory,
    useRouteMatch
} from "react-router-dom";

interface Props {
    statusLabel: string,
    activeStep: number
}

function Steps(props: Props) {
    let activeStep = props.activeStep;
    return (
        <Container className="checkout-container" id="checkout-container">
            <div className="steps">
                <h1>{props.statusLabel}</h1>
                <div className="steps-container">
                    <div className="step-container"><div className={(activeStep == 1 && 'step active') || (activeStep == 2 && 'step done') || (activeStep == 3 && 'step done') || (activeStep == 4 && 'step done')|| 'step' } id="step-1">{(activeStep == 1 && '1') || ''}</div></div>
                    <div className="step-container"><div className={(activeStep == 2 && 'step active') || (activeStep == 3 && 'step done') || (activeStep == 4 && 'step done') || 'step' } id="step-2">{(activeStep == 1 && '2') || (activeStep == 2 && '2') || ''}</div></div>
                    <div className="step-container"><div className={(activeStep == 3 && 'step active') || (activeStep == 4 && 'step done') || 'step' } id="step-3">{(activeStep == 1 && '3') || (activeStep == 2 && '3') || (activeStep == 3 && '3') || ''}</div></div>
                    <div className="step-container"><div className={(activeStep == 4 && 'step active') || 'step' } id="step-4">4</div></div>
                </div>
            </div>
        </Container>
    )
}

export default Steps;