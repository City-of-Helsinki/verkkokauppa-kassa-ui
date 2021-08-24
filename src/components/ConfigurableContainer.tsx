import React, { FunctionComponent } from 'react';
import { Container } from "hds-react";

interface OwnProps {
    divClassName?: string;
    containerClassName?: string;
}

type Props = OwnProps;

const ConfigurableContainer: FunctionComponent<Props> = (props, divClassName = "", containerClassName = "box py-5") => {
    return (
        <Container className={ divClassName }>
            <div className={ containerClassName }>
                <div>
                    { props.children }
                </div>
            </div>
        </Container>
    );
};

export default ConfigurableContainer;
