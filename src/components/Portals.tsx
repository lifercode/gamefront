import React from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import { MoveDirection } from '../@core/Moveable';
import ScenePortal from '../@core/ScenePortal';

type Ass = {
    x: number;
    y: number;
    name: string;
    target: string;
    enterDirection: MoveDirection;
};

export default function Portals({ data }: any) {
    return (
        <>
            {data.map(({ x, y, name, enterDirection, target }: Ass, index) => (
                <GameObject x={x} y={y} key={index}>
                    <Collider />
                    <Interactable />
                    <ScenePortal
                        name={name}
                        enterDirection={enterDirection}
                        target={target}
                    />
                </GameObject>
            ))}
        </>
    );
}
