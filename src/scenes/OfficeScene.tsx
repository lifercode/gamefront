import React from 'react';
import useFetch from 'react-fetch-hook';
import axios from 'axios';

import Map from '../components/Map';
import Portals from '../components/Portals';
import Players from '../components/Players';
import { map, portals, players } from '../mock/scenes/office';

export default function OfficeScene() {
    return (
        <>
            <Map data={map} />
            <Portals data={portals} />
            <Players />
        </>
    );
}
