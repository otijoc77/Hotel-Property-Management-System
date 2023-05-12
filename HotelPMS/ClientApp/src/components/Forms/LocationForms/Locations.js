import React, { useState } from 'react';
import { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useAuth } from '../../Functions/UserProvider';
import { Layout } from '../../Layout';
import { CityForm } from './CityForm';
import { CountryForm } from './CountryForm';

export function Locations() {
    const { cookies } = useAuth();

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadedCountries, setLoadedCountries] = useState(false);
    const [loadedCities, setLoadedCities] = useState(false);

    useEffect(() => {
        if (cookies.name == undefined) {
            window.location.href = '/login';
        }
        if (cookies.level != "Admin") {
            window.location.href = '/unauthorised';
        }
        fetch('api/countries')
            .then(response => response.json())
            .then(data => {
                setCountries(data);
                setLoadedCountries(true);
            });
    }, []);

    useEffect(() => {
        fetch('api/cities')
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setLoadedCities(true);
            });
    }, [loadedCountries]);

    return (
        <Layout>
            {loadedCities &&
                <Row>
                    <Col>
                        <CountryForm />
                        <br />
                        <CityForm countries={countries} />
                    </Col>
                    <Col>
                        <h1 id="header" >Locations</h1>
                        {countries.map(country =>
                            <div className="card margin-b-5 border-danger" key={country.id}>
                                <div className="card-header text-white bg-color"><h4><strong>{country.name}</strong></h4></div>
                                <ul className="list-group list-group-flush">
                                    {cities.map(city =>
                                        city.countryId == country.id &&
                                        <li key={city.id} className="list-group-item">{city.name}</li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </Col>
                </Row>
            }
        </Layout>
    );
}