import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown, DropdownMenu} from 'semantic-ui-react'
import { useStore } from '../Stores/store';

// export default function NavBar({openForm}:Props){
export default observer(function NavBar(){
    const {userStore: {user,logout}} = useStore()
    return ( 
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to="/" header>
                    <img src="/assets/logo.png" alt="logo"/>
                    Reactivities
                </Menu.Item>
                 <Menu.Item   as={NavLink} to="/activities" name="Activites"/>
                 <Menu.Item as={NavLink} to="/Errors" name="Errors"/>
                 <Menu.Item >
                    <Button as={NavLink} to="/createActivity"  positive content="Create Activity"/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' icon />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <DropdownMenu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text="My Profile" icon='user'/>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>    
                        </DropdownMenu>
                    </Dropdown>
                </Menu.Item>

            </Container>
        </Menu>
    )
})