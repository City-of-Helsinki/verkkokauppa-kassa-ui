import React, { FunctionComponent } from 'react';
import { Container } from "hds-react-next";

interface OwnProps {
    divClassName?: string;
    containerClassName?: string;
}

type Props = OwnProps;

const ConfigurableContainer: FunctionComponent<Props> = (props) => {
    return (
        <Container className={ props.divClassName || ''}>
            <div className={ props.containerClassName || "box py-5" }>
                <div>
                    { props.children }
                </div>
            </div>
        </Container>
    );
};

export default ConfigurableContainer;
