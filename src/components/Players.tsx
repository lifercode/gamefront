import React from 'react';
import axios from 'axios';

import useSceneManager from '../@core/useSceneManager';
import Player from '../entities/Player';

export default function Players() {
    const [isLoading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [currentPLayer, setCurrentPlayer] = React.useState(null);
    const { currentScene } = useSceneManager();
    // const { isLoading, data } = useFetch('https://gamebiris.herokuapp.com/players');

    const saveLocalPlayer = (player: any) => {
        window.sessionStorage.setItem('game@player', JSON.stringify(player));
        console.log('saveLocalPlayer', JSON.parse(player));
    };

    const getLocalPlayer = () => {
        const player = window.sessionStorage.getItem('game@player');
        const normalizedPlayer = JSON.parse(player);
        console.log('getLocalPlayer', normalizedPlayer);

        return normalizedPlayer;
    };

    const getPlayer = plr => {
        axios
            // eslint-disable-next-line no-underscore-dangle
            .get(`https://gamebiris.herokuapp.com/player/${plr._id}`)
            .then((response: any) => {
                console.log(response.data);
                setCurrentPlayer(response.data);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    };

    const getPlayers = plr => {
        axios
            // eslint-disable-next-line no-underscore-dangle
            .get(`https://gamebiris.herokuapp.com/players/${plr._id}/${currentScene}`)
            .then((response: any) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    };

    const createPlayer = () => {
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        axios
            .post('https://gamebiris.herokuapp.com/players', {
                x: randomIntFromInterval(1, 9),
                y: randomIntFromInterval(1, 9),
                scene: 'other',
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

    if (isLoading || !currentPLayer) {
        return <Player x={1} y={1} />;
    }

    return (
        <>
            <Player x={currentPLayer.x} y={currentPLayer.y} id={currentPLayer.id} />
            {data.map(({ _id, x, y }: any) => (
                <Player x={x} y={y} key={_id} id={_id} static />
            ))}
        </>
    );
}
