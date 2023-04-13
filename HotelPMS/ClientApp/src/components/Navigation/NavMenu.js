import React, { Component } from 'react';
import { ListGroup, NavItem, NavLink, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    render() {
        return (
            <ListGroup flush className="flex-grow-1">
                <NavItem>
                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <UncontrolledAccordion flush stayOpen defaultOpen={["1"]}>
                    <AccordionItem>
                        <AccordionHeader targetId="1">
                            <b>Companies</b>
                        </AccordionHeader>
                        <AccordionBody accordionId="1">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/company-list">Company List</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/company-register">Company Form</NavLink>
                            </NavItem>
                        </AccordionBody>
                    </AccordionItem>
                </UncontrolledAccordion>
                <UncontrolledAccordion flush stayOpen defaultOpen={["2"]}>
                    <AccordionItem>
                        <AccordionHeader targetId="2">
                            <b>Hotels</b>
                        </AccordionHeader>
                        <AccordionBody accordionId="2">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/hotel-list">Hotel List</NavLink>
                            </NavItem>
                        </AccordionBody>
                    </AccordionItem>
                </UncontrolledAccordion>
                <UncontrolledAccordion flush stayOpen defaultOpen={["3"]}>
                    <AccordionItem>
                        <AccordionHeader targetId="3">
                            <b>Locations</b>
                        </AccordionHeader>
                        <AccordionBody accordionId="3">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/location-register">Add locations</NavLink>
                            </NavItem>
                        </AccordionBody>
                    </AccordionItem>
                </UncontrolledAccordion>
            </ListGroup>
        );
    }
}
