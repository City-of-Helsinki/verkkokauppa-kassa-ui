import React from "react";
import { Container } from "hds-react-next";
import { useTranslation } from "react-i18next";

interface Props {
  statusLabel: string;
  activeStep: number;
  steps: number;
}

function Steps(props: Props) {
  const { activeStep, steps } = props;
  const { t } = useTranslation();

  return (
    <div className="light-bg">
      <Container className="checkout-container">
        <div className="steps">
          <div className="status-label">
            <h1>{props.statusLabel}</h1>
          </div>

          <ol className="steps-container">
            <div aria-live="polite" className="sr-only">
              {`${t("steps.step")} ${activeStep} / ${steps}: ${props.statusLabel}`}
            </div>
            {[...Array(steps)].map((e, step) => (
              <li className="step-container" key={`step-${step + 1}`}>
                <div
                  className={
                    (activeStep === step + 1 && "step active") ||
                    (activeStep > step + 1 && "step done") ||
                    "step"
                  }
                  id={`step-${step + 1}`}
                  key={`step-${step + 1}-div`}
                  aria-hidden="true"
                >
                  {activeStep <= step + 1 && step + 1}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </div>
  );
}

export default Steps;
