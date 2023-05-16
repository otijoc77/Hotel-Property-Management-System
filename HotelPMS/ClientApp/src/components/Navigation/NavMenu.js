import React, { Component } from 'react';
import { ListGroup, NavItem, NavLink, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PublicIcon from '@mui/icons-material/Public';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkIcon from '@mui/icons-material/Work';
import { useAuth } from '../Functions/UserProvider';

export function NavMenu() {
    const { cookies } = useAuth();

    return (
        <ListGroup flush className="flex-grow-1 separate">
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/"><b><HomeIcon className="icon" />Home</b></NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/user"><b><PersonIcon className="icon" />User</b></NavLink>
            </NavItem>
            {cookies.level != "Client" && cookies.level != undefined &&
                <>
                    {cookies.level != "Worker" &&
                        < NavItem >
                            <NavLink tag={Link} className="text-dark" to="/metrics"><b><EqualizerIcon className="icon" />Metrics</b></NavLink>
                        </NavItem>
                    }
                    {cookies.level == "Admin" &&
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/location-register"><b><PublicIcon className="icon" />Locations</b></NavLink>
                        </NavItem>
                    }
                    {cookies.level != "Admin" &&
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to={"/hotel/" + cookies.hotel}><b><WorkIcon className="icon" />My Workplace</b></NavLink>
                        </NavItem>
                    }
                </>
            }
            <UncontrolledAccordion flush stayOpen defaultOpen={["1"]}>
                <AccordionItem>
                    <AccordionHeader targetId="1">
                        <b><BusinessCenterIcon className="icon" />Companies</b>
                    </AccordionHeader>
                    <AccordionBody accordionId="1">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/company-list">Company List</NavLink>
                        </NavItem>
                        {cookies.level == "Admin" &&
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/company-register">Company Form</NavLink>
                            </NavItem>
                        }
                    </AccordionBody>
                </AccordionItem>
            </UncontrolledAccordion>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to="/hotel-list"><b><ApartmentIcon className="icon" />Hotels</b></NavLink>
            </NavItem>
            {
                cookies.level != "Client" && cookies.level != "Worker" && cookies.level != undefined &&
                <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/users"><b><PeopleAltIcon className="icon" />{cookies.level == "Admin" ? "Users" : "Employees"}</b></NavLink>
                </NavItem>
            }
        </ListGroup >
    );
}
