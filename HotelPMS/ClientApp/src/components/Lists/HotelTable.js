import React, { Component } from 'react';
import '../../custom.css';

export class HotelTable extends Component {
    constructor(props) {
        super(props);
        this.state = { hotels: [], loading: true };
    }

    async populateHotelData() {
        console.log('hotels');
        console.log(this.props.companyHotels);
        if (this.props.companyHotels == null) {
            const response = await fetch('api/hotels');
            const data = await response.json();
            this.setState({ hotels: data, loading: false });
        }
        else {
            this.setState({ hotels: this.props.companyHotels, loading: false });
        }
    }

    componentDidMount() {
        this.populateHotelData();
    }

    static renderHotelsTable(hotels) {
        return (
            <div className='card'>
                <table className='table table-striped mb-0' aria-labelledby="tabelLabel">
                    <thead className='table-head'>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map(hotel =>
                            <tr key={hotel.id}>
                                <td>{hotel.id}</td>
                                <td><a href={"/hotel/" + hotel.id} >{hotel.name}</a></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.hotels.length == 0
                ? <p><em>No registered hotels.</em></p>
                : HotelTable.renderHotelsTable(this.state.hotels);

        return (
            <div>
                <p>Registered hotels:</p>
                {contents}
            </div>
        );
    }
}