import React from 'react';
import { io } from 'socket.io-client';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import Moveable from '../@core/Moveable';
import Sprite from '../@core/Sprite';
import CameraFollowScript from '../components/CameraFollowScript';
import CharacterScript from '../components/CharacterScript';
import PlayerScript from '../components/PlayerScript';
import spriteData from '../spriteData';
import { API_URL } from '../config';

const socket = io(API_URL);

interface GameObjectPropss extends GameObjectProps {
    static?: boolean;
    id?: number;
}

export default function Player(props: GameObjectPropss) {
    const [x, setX] = React.useState(props.x);
    const [y, setY] = React.useState(props.y);

    React.useEffect(() => {
        socket.on('move', (o: any) => {
            if (props.id === o.id) {
                setX(o.x);
                setY(o.y);
            }
        });
    }, [props.id]);

    return (
        <>
            {props.static ? (
                <GameObject x={x} y={y}>
                    {/* <Collider /> */}
                    <CharacterScript>
                        <Sprite {...spriteData.player} />
                    </CharacterScript>
                </GameObject>
            ) : (
                <GameObject
                    name="player"
                    displayName="Player"
                    layer="character"
                    {...props}
                >
                    <Moveable />
                    <Interactable />
                    <Collider />
                    <CharacterScript>
                        <Sprite {...spriteData.player} />
                    </CharacterScript>
                    <CameraFollowScript />
                    <PlayerScript />
                </GameObject>
            )}
        </>
    );
}
