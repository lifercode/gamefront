import React from 'react';
import { io } from 'socket.io-client';

import Map from '../components/Map';
import Portals from '../components/Portals';
import Players from '../components/Players';
import { map, portals, players } from '../mock/scenes/office';

io('https://gamebiris.herokuapp.com');
export default function OfficeScene() {
    React.useEffect(() => {
        fetch('https://gamebiris.herokuapp.com').then(oq => {
            console.log('foi', oq);
        });
    }, []);

    // socket.on('connect', () => {
    //     console.log(socket.connected); // true
    // });

    return (
        <>
            <Map data={map} />
            <Portals data={portals} />
            <Players data={players} />
        </>
    );
}
