import React from 'react';
import { Layout } from '../../Layout';
import { CityForm } from './CityForm';
import { CountryForm } from './CountryForm';

export function LocationForm() {
    return (
        <Layout>
            <CountryForm />
            <br/>
            <CityForm />
        </Layout>
    );
}