// import {action, makeAutoObservable, makeObservable,observable, runInAction} from 'mobx'
import {makeAutoObservable, runInAction} from 'mobx'
import agent from '../api/agent';
import { Activity } from '../models/Activities';
import {v4 as uuid}  from 'uuid';
export default class ActivityStore{
    // title = "MOBX EXAMPLE!"
    // activities: Activity[] = [];
    activityRegistry = new Map<string,Activity>()
    selectedActivity: Activity | undefined = undefined;
    loading =false;
    loadingInitial = true;
    editMode = false;

    constructor(){
       makeAutoObservable(this)
    //    makeObservable(this,{
    //         title:observable,
    //         setTitle: action
    //    })

    }

    get activitiesByDate (){
        return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date) - Date.parse(b.date) )
    }

     loadActivites = async ()=>{
        try{
            const activities = await agent.Activities.list();
        
            activities.forEach(activity => {
            activity.date = activity.date.split('T')[0]
            // this.activities.push(activity);
            this.activityRegistry.set(activity.id,activity)
            })
            this.setLoadingInitial(false)
        }catch(error){
            console.log(error)
            
        this. setLoadingInitial(false)
        }
    }

     setLoadingInitial = (state:boolean)=>{
        this.loadingInitial = state;
    }

    selectActivity = (id: string)=>{
          this.selectedActivity = this.activityRegistry.get(id);
        // this.selectedActivity = this.activities.find((item)=> item.id === id)
    }

    cancelActivity = ()=>{
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) =>{
        id ? this.selectActivity(id) : this.cancelActivity();
        this.editMode = true
    }
    closeForm = () =>{
        this.editMode = false;
    }

    createActivity = async (activity:Activity) =>{
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction (()=>{
                // this.activities.push(activity);
                this.activityRegistry.set(activity.id,activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false
            })
        }catch(error){
            console.log(error)
             runInAction (()=>{
                 this.loading = false;
             })
        }
    }

      updateActivity = async (activity:Activity) =>{
        this.loading = true;
        try{
            await agent.Activities.update(activity);
            runInAction (()=>{
                this.activityRegistry.set(activity.id,activity)
                // this.activities = [...this.activities.filter((item)=> item.id !== activity.id),activity]
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false
            })
        }catch(error){
            console.log(error)
             runInAction (()=>{
                 this.loading = false;
             })
        }
    }

    deleteActivity = async (id:string) => {
        this.loading = true;
        try{
             await agent.Activities.delete(id);
            runInAction(()=>{
                // this.activities = [...this.activities.filter((item)=> item.id !== id)]
                this.activityRegistry.delete(id);
                this.loading=false;
                if ( this.selectedActivity?.id === id){  this.cancelActivity() };
            })
        }catch(error){
            console.log(error)
            runInAction(()=>{
                this.loading=false ;
            })
        }
    }
    // setTitle = ()=> {
    //     this.title= this.title + '!'
    // } 
    // loadActivites = ()=>{
    //     this.loadingInitial = true;
    // }
    //   loadActivites = async ()=>{
    //     this.loadingInitial = true;
    //     try{
    //         const activities = await agent.Activities.list();
    //     runInAction(()=>{
    //         activities.forEach(activity => {
    //         activity.date = activity.date.split('T')[0]
    //         this.activities.push(activity);
    //     })
    //     })
    //        this.loadingInitial = false;
    //     }catch(error){
    //         console.log(error)
    //          runInAction(()=>{
    //         this.loadingInitial = false;
    //         })
    //     }
    // }

   
} 