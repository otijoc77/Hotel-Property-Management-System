import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'reactstrap';
import '../../custom.css';
import { Layout } from '../Layout';
import { useAuth } from '../Functions/UserProvider';

export function MetricsPage() {
    const { cookies } = useAuth();

    const [state, setState] = useState({
        metrics: {},
        loading: true
    });

    useEffect(() => {
        if (cookies.name == undefined) {
            window.location.href = '/login';
        }
        if (cookies.level == "Client" || cookies.level == "Worker") {
            window.location.href = '/unauthorised';
        }
        fetch('api/metrics/' + cookies.hotel)
            .then(response => response.json())
            .then(data => {
                setState({
                    ...state,
                    metrics: data,
                    loading: false
                });
            });
    }, []);

    return (
        <Layout>
            {state.loading &&
                <Container>
                    <div className="card p-3">
                        <Row>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <Row>
                        </Row>
                    </div>
                </Container>
            }
        </Layout>
    );
}