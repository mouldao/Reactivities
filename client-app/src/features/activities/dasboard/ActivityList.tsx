import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../App/Stores/store';

 const ActivityList = ()=>{
     const {activityStore} = useStore();
    return(
        <Segment>
            <Item.Group divided>
                {activityStore.activitiesByDate.map(activity=>( 
                    <Item key ={activity.id}>
                        <Item.Content>
                            <Item.Header as ="a">{activity.title}</Item.Header>
                              <Item.Meta >{activity.date}</Item.Meta>
                              <Item.Description>
                                  <div>{activity.description}</div>
                                  <div>{activity.city}{activity.venue}</div>
                              </Item.Description>
                              <Item.Extra>
                                  <Button as={Link} to={`activities/${activity.id}`} floated='right' content='View' color='blue'/>
                                  <Label basic content={activity.category} />
                              </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )

}

export default observer(ActivityList)