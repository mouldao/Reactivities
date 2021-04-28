import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import { Grid} from 'semantic-ui-react';
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { useStore } from '../../../App/Stores/store';

import ActivityList from './ActivityList';

export default observer(function ActivityDashboard()
{
    const {activityStore} = useStore();
    const {loadActivites, activityRegistry} = activityStore
    useEffect(()=>{
      if(activityRegistry.size<= 1)  loadActivites();
    },[loadActivites,activityRegistry.size])

if (activityStore.loadingInitial){ return <LoadingComponent content="Loading APPS" inverted={false}/>}

    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList />
            </Grid.Column>
             <Grid.Column width='6'>
                <h2>Activity Filters</h2>
            </Grid.Column>    
        </Grid>
       

    )
})