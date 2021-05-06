import { Formik,Form, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Button, Header } from 'semantic-ui-react';
import TextInput from '../../App/common/form/TextInput';
import { useStore } from '../../App/Stores/store';
import * as Yup from 'yup';
import ValidationErrors from '../errors/ValidationErrors';

export default observer(function RegisterForm()
{
    const {userStore} = useStore();
    const{register} = userStore;
    return(
        <Formik
            initialValues={{displayName:'', username:'',email:'',password:'',error:null}}
            onSubmit={(values,{setErrors}) => register(values).then(user=> console.log(user)).catch(error=> {setErrors({error}); 
            console.log(error)})}
            validationSchema = {Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit,isSubmitting,errors,isValid,dirty})=>
        (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Signup to Reactivities' color='teal' textAlign='center'/>
                    <TextInput name='displayName' placeholder='Display Name'/>
                    <TextInput name='username' placeholder='Username'/>
                    <TextInput name='email' placeholder='Email'/>
                    <TextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage
                        name='error' render={()=> 
                        <ValidationErrors errors={errors.error}/>
                    }
                    />
                    <Button loading={isSubmitting} disabled={isSubmitting || !isValid || !dirty}  
                        positive content='Register' type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
})
