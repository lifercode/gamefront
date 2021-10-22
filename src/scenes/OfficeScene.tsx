import React from 'react';
import { io } from 'socket.io-client';

import Map from '../components/Map';
import Portals from '../components/Portals';
import Players from '../components/Players';
import { map, portals, players } from '../mock/scenes/office';

io('http://4ab2-179-218-21-239.ngrok.io');
export default function OfficeScene() {
    React.useEffect(() => {
        fetch('http://4ab2-179-218-21-239.ngrok.io').then(oq => {
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
