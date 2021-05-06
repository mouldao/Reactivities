import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import { Grid} from 'semantic-ui-react';
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { useStore } from '../../../App/Stores/store';
import ActivityFilters from './ActivityFIlters';
import ActivityList from './ActivityList';

export default observer(function ActivityDashboard()
{
    const {activityStore} = useStore();
    const {loadActivites, activityRegistry} = activityStore
    useEffect(()=>{
      if(activityRegistry.size<= 1)  loadActivites();
    },[loadActivites,activityRegistry.size])

if (activityStore.loadingInitial){ return <LoadingComponent content="Loading Activities..." inverted={false}/>}

    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList />
            </Grid.Column>
             <Grid.Column width='6'>
               <ActivityFilters/>
            </Grid.Column>    
        </Grid>
       

    )
})