import * as React from 'react';
import { Message } from 'semantic-ui-react';
interface Props {
    errors: string[] | null ;
}
export default function ValidationError({errors}: Props) {
    debugger
    return(
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((err:any,i)=>( 
                        <Message.Item key={i}>
                            {err}
                        </Message.Item>
                    ))}
                </Message.List>
            )
            }
        </Message>
    )
}