import { Formik,Form, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import TextInput from '../../App/common/form/TextInput';
import { useStore } from '../../App/Stores/store';

export default observer(function LoginForm()
{
    const {userStore} = useStore();
    const{login} = userStore;
    return(
        <Formik
            initialValues={{email:'',password:'',error:null}}
            onSubmit={(values,{setErrors}) => login(values).then(user=> console.log(user)).catch(error=> {setErrors({error:'Invalid email or password'}); 
            console.log(error)})}
        >
            {({handleSubmit,isSubmitting,errors})=>
            (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'/>
                    <TextInput name='email' placeholder='Email'/>
                    <TextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage
                        name='error' render={()=> <Label style={{marginBottom:10}} basic color='red' content={errors.error}/>}
                    />
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
})
