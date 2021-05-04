import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'

// export default function NavBar({openForm}:Props){
export default function NavBar(){
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
            </Container>
        </Menu>
    )
}