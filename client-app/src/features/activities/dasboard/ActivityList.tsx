import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../App/Stores/store';
import ActivityListItem from './ActivityListItem';

 const ActivityList = ()=>{
     const {activityStore} = useStore();
     const {groupedActivites} = activityStore;


    return(
        <>
            {groupedActivites.map(([group,activities])=>(
                <Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
            
                    {activities.map(activity=>( 
                        <ActivityListItem key={activity.id} activity={activity}/>
                    ))}
             </Fragment>
            ))}
           
        </>
        
    )

}

export default observer(ActivityList)