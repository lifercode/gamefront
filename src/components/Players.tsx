import React from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import useSceneManager from '../@core/useSceneManager';
import useGameObject from '../@core/useGameObject';
import Player from '../entities/Player';

const socket = io(process.env.API_URL);

export default function Players() {
    const [isLoading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [next, setNext] = React.useState(null);
    const [currentPLayer, setCurrentPlayer] = React.useState(null);
    const { currentScene } = useSceneManager();
    const a = useGameObject();
    // const { isLoading, data } = useFetch(`${process.env.API_URL}/players`);

    React.useEffect(() => {
        socket.on('connected', (o: any) => {
            console.log('ei gente', { currentScene, o, currentPLayer });
            if (currentScene && o && currentPLayer) {
                console.log('ei gente 2', { currentScene, o, currentPLayer });
                // eslint-disable-next-line no-underscore-dangle
                if (o.scene === currentScene || o._id !== currentPLayer._id) {
                    // eslint-disable-next-line no-underscore-dangle
                    if (!data.some(({ _id }) => _id === o._id)) {
                        setNext(o);
                    }
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    React.useEffect(() => {
        console.log('1111', data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(() => {
        console.log('2222', data);
    }, [data]);
    React.useEffect(() => {
        console.log('3333', next);
        if (next) {
            const newArray = [...data, next];
            console.log('veiooo fiu', { data, newArray, next });
            setData(newArray);
            setNext(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [next]);

    const saveLocalPlayer = (player: any) => {
        window.sessionStorage.setItem('game@player', JSON.stringify(player));
    };

    const getLocalPlayer = () => {
        const player = window.sessionStorage.getItem('game@player');
        const normalizedPlayer = JSON.parse(player);
        return normalizedPlayer;
    };

    const getPlayer = plr => {
        axios
            // eslint-disable-next-line no-underscore-dangle
            .get(`${process.env.API_URL}/player/${plr._id}`)
            .then((response: any) => {
                setCurrentPlayer(response.data);
                console.log({
                    a,
                });
            })
            .catch(() => {})
            .finally(() => {});
    };

    const getPlayers = plr => {
        axios
            // eslint-disable-next-line no-underscore-dangle
            .get(`${process.env.API_URL}/players/${plr._id}/${currentScene}`)
            .then((response: any) => {
                setData(response.data);
            })
            .catch(() => {})
            .finally(() => {});
    };

    const createPlayer = () => {
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        axios
            .post(`${process.env.API_URL}/players`, {
                x: randomIntFromInterval(1, 9),
                y: randomIntFromInterval(1, 9),
                scene: 'office',
            })
            .then(response => {
                saveLocalPlayer(response.data);
                getPlayer(response.data);
                getPlayers(response.data);
            });
    };

    // eslint-disable-next-line consistent-return
    const configPlayer = () => {
        const player = getLocalPlayer();
        if (!player) {
            return createPlayer();
        }

        getPlayer(player);
        getPlayers(player);
    };

    React.useEffect(() => {
        configPlayer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log({ currentPLayer });

    return (
        <>
            {currentPLayer ? <Player x={1} y={1} /> : <Player x={1} y={1} />}
            {data.map(({ _id, x, y }: any) => (
                <Player x={x} y={y} key={_id} id={_id} static />
            ))}
        </>
    );
}
