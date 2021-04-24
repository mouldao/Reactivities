import * as React from 'react';
import { useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../App/modules/Activities';

interface Props{
    activity:Activity;
    cancelSelectActivity: ()=> void;
    openForm :(id:string)=> void;
    deleteActivity:(id:string) => void;
    submitting: boolean;
}
const ActivityDetails = ({activity,cancelSelectActivity,openForm,deleteActivity,submitting}:Props)=>{
    const [target,setTarget] =  useState('');

    function handleActivityDelete(e:React.SyntheticEvent<HTMLButtonElement>,id:string){
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }
    return(
        <Card fluid>
    <Image  src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span >J{activity.date}</span>
      </Card.Meta>
      <Card.Description>
       {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Button.Group widths='3'> 
            <Button onClick={()=> openForm(activity.id)} basic color='blue'content='Edit'/>
            <Button 
                name={activity.id}
                loading={submitting && target === activity.id}
                onClick={(e)=>handleActivityDelete(e,activity.id)}
                basic 
                color='red'
                content='Delete'/> 
            <Button onClick={cancelSelectActivity} basic color='grey'content='Cancel'/>
           
            
        </Button.Group>
    </Card.Content>
  </Card>
    )
}

export default ActivityDetails