import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../Stores/store'

interface Props{
    openForm: () => void;
}
// export default function NavBar({openForm}:Props){
export default function NavBar(){
const {activityStore} = useStore();
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo"/>
                    Reactivities
                </Menu.Item>
                 <Menu.Item >
                    <Button onClick={()=> activityStore.openForm()} positive content="Create Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}