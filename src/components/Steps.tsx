import React, { useState, useEffect, Component } from "react";
import { Container } from "hds-react";

interface Props {
  statusLabel: string;
  activeStep: number;
  steps: number;
}

function Steps(props: Props) {
  const { activeStep, steps } = props;
  return (
    <div className="light-bg">
    <Container className="checkout-container">
      <div className="steps">
        <div className="status-label">
          <h1>{props.statusLabel}</h1>
        </div>
        
        <div className="steps-container">
          {[...Array(steps)].map((e, step) => (
            <div className="step-container" key={`step-${step + 1}`}>
              <div
                className={
                  (activeStep === step + 1 && "step active") ||
                  (activeStep > step + 1 && "step done") ||
                  "step"
                }
                id={`step-${step + 1}`}
              >
                {activeStep <= step + 1 && step + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
    </div>
  );
}

export default Steps;
