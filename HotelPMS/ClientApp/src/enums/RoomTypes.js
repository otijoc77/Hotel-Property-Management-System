import OccupancyRoomTypes from 'OccupancyRoomTypes';
import BedRoomTypes from 'BedRoomTypes';
import LayoutRoomTypes from 'LayoutRoomTypes';
import AmenityRoomTypes from 'AmenityRoomTypes';
import SuiteRoomTypes from 'SuiteRoomTypes';

const RoomTypes = [
    {
        classification: "Occupancy",
        enum: { OccupancyRoomTypes },
    },
    {
        classification: "Bed",
        enum: { BedRoomTypes },
    },
    {
        classification: "Layout",
        enum: { LayoutRoomTypes },
    },
    {
        classification: "Amenity",
        enum: { AmenityRoomTypes },
    },
    {
        classification: "Suite",
        enum: { SuiteRoomTypes },
    },
];

export default RoomTypes;