import React from 'react';
import Map from '../components/Map';
import Portals from '../components/Portals';
import Players from '../components/Players';
import { map, portals, players } from '../mock/scenes/danger';

export default function DangerScene() {
    return (
        <>
            <Map data={map} />
            <Portals data={portals} />
            <Players data={players} />
        </>
    );
}
