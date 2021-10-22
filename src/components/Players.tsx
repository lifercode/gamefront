import React from 'react';
import Player from '../entities/Player';

export default function Players({ data }: any) {
    return (
        <>
            {data.map(({ x, y }: any, index: React.Key) => (
                <Player x={x} y={y} key={index} static={index !== 0} />
            ))}
        </>
    );
}
