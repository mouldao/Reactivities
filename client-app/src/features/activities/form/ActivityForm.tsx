// import { update } from 'immutable';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { useStore } from '../../../App/Stores/store';
import {v4 as uuid}  from 'uuid';
import { Formik,Form } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../App/common/form/TextInput';
import SelectInput from '../../../App/common/form/SelectInput';
import { categoryOptions } from '../../../App/common/options/categoryOptions';
import DateInput from '../../../App/common/form/DateInput';
import { Activity } from '../../../App/models/Activity';
import TextAreaInput from '../../../App/common/form/TextAreaInput';
const ActivityForm = () =>
{
    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity,updateActivity,loading ,
        loadActivity,loadingInitial,setLoadingInitial}= activityStore;

    const {id} = useParams<{id:string}>();
    const [activity,setActivity] = useState<Activity>({
        id: '',
        title: '',
        category:'',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required()
    })

    useEffect(()=>{
      
        if (id) {
            loadActivity(id).then(activity=> setActivity(activity!))
        }else{
            setLoadingInitial(false)
        }
    },[id,loadActivity,setLoadingInitial])



    function handleFormSubmit(activity:Activity){
        debugger
      if (activity.id.length ===0) {
        let newActivity = {...activity, id : uuid()}
        createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`))
      } else{
           updateActivity(activity).then(()=> history.push(`/activities/${activity.id}`))
      }
    //   ? updateActivity(activity) : createActivity(activity)
    }

//    const  handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
//        const {name,value} = event.target;
//        setActivity({ ...activity, [name]:value})
//     }
    if (loadingInitial) return <LoadingComponent content="loading activity..."/>
    return( 
    <Segment clearing>
        <Header content='Activity Details' sub color='teal'/>
        <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={activity}
            onSubmit = {values=> handleFormSubmit(values)}>
            {(formikProps)=> (
            <Form className="ui form" onSubmit={formikProps.handleSubmit} autoComplete={'off'}>
                <TextInput name='title' placeholder='Title' />
                <TextAreaInput rows={3}  placeholder="Description" name='description' />
                <SelectInput options={categoryOptions} placeholder="Category" name='category' />
                <DateInput
                    placeholderText="Date"
                    name='date'
                    showTimeSelect
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy h:mm aa' 
                />
                <Header content='Location Details' sub color='teal'/>
                <TextInput placeholder="City"  name='city' />
                <TextInput placeholder="Venue" name='venue'/>
                <Button 
                    disabled={formikProps.isSubmitting || !formikProps.dirty || !formikProps.isValid }
                    loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button  as={Link}  to={'/activities'} floated='right' type='button' content='Cancel'/>
            </Form>
            )}

        </Formik>
       
    </Segment>
    )
}

export default observer(ActivityForm);