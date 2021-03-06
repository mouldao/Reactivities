import * as React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../App/Stores/store';

export default function  ServerError(){
    const {commonStore} = useStore();
    return(
        <Container>
            <Header as='h1' context='Server Error' />
            <Header sub as='h5' color='red' content={commonStore.error?.message} />
            {commonStore.error?.details &&
                <Segment>
                    <Header as='h4' content="Stack Trace" color='teal'/>
                    <code style={{marginTop:'10px'}}>{commonStore.error.details}</code>
                </Segment>}
        </Container>
    )
}