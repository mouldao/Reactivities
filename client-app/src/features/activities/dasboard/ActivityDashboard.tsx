import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Grid} from 'semantic-ui-react';
// import { Activity } from '../../../App/models/Activities';
import { useStore } from '../../../App/Stores/store';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

// interface Props{
//     createOrEdit: (activity:Activity)=> void;
//     deleteActivity: (id:string)=> void;
//     submitting: boolean;
// }
// interface Props{
//     deleteActivity: (id:string)=> void;
//     submitting: boolean;
// }

// export default function ActivityDashboard(props:Props)
// export default function ActivityDashboard({activities,selectActivity,
// selectedActivity, cancelSelectActivity,editMode,openForm,closeForm,
// createOr
export default observer(function ActivityDashboard()
{
    const {activityStore} = useStore();

    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList />
            </Grid.Column>
             <Grid.Column width='6'>
            {activityStore.selectedActivity && !activityStore.editMode &&
                <ActivityDetails />}  
            {activityStore.editMode && 
            <ActivityForm />
            }
            </Grid.Column>    
        </Grid>
       

    )
})