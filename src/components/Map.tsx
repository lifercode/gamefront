import React, { Fragment } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import CoffeeMachine from '../entities/CoffeeMachine';
import PizzaPickup from '../entities/PizzaPickup';
import Plant from '../entities/Plant';
import Portal from '../entities/Portal';
import Workstation from '../entities/Workstation';
import spriteData from '../spriteData';

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.objects} state="floor" />
        </GameObject>
    );

    switch (type) {
        case '·':
            return floor;
        case 'o':
            return (
                <Fragment key={key}>
                    {floor}
                    <PizzaPickup {...position} />
                </Fragment>
            );
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall" />
                </GameObject>
            );
        case 'W':
            return (
                <Fragment key={key}>
                    {floor}
                    <Workstation {...position} />
                </Fragment>
            );
        case 'C':
            return (
                <Fragment key={key}>
                    {floor}
                    <CoffeeMachine {...position} />
                </Fragment>
            );
        case 'T':
            return (
                <Fragment key={key}>
                    {floor}
                    <Plant {...position} />
                </Fragment>
            );
        case 'i':
            return (
                <Fragment key={key}>
                    {floor}
                    <Portal {...position} />
                </Fragment>
            );
        default:
            return null;
    }
};

export default function Map({ data }: any) {
    return (
        <GameObject name="map">
            <ambientLight />
            <TileMap
                data={mapDataString(data)}
                resolver={resolveMapTile}
                definesMapSize
            />
        </GameObject>
    );
}
