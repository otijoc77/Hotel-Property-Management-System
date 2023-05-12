import React, { Component } from 'react';
import '../../custom.css';
import { Layout } from '../Layout';

export function UnauthorisedPage() {
    return (
        <Layout>
            <h1 id="name" >You are unauthorised to view this page</h1>
            <p>Please contact an administrator.</p>
        </Layout>
    )
}