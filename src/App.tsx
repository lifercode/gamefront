import { css, Global } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AssetLoader from './@core/AssetLoader';
import Game from './@core/Game';
import Scene from './@core/Scene';
import SceneManager from './@core/SceneManager';
import useWindowSize from './@core/useWindowSize';
import OfficeScene from './scenes/OfficeScene';
import OtherScene from './scenes/OtherScene';
import DangerScene from './scenes/DangerScene';
import soundData from './soundData';
import spriteData from './spriteData';
import globalStyles from './styles/global';
import { API_URL } from './config';

const styles = {
    root: (width: number, height: number) => css`
        display: flex;
        width: ${width - (width % 2)}px;
        height: ${height - (height % 2)}px;
        justify-content: center;
        align-items: center;
    `,
};

const urls = [
    ...Object.values(spriteData).map(data => data.src),
    ...Object.values(soundData).map(data => data.src),
    // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

export default function App() {
    const [width, height] = useWindowSize();
    const [isLoading, setLoading] = useState(true);
    const [scene, setScene] = useState('office');

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
            .get(`${API_URL}/player/${plr._id}`)
            .then((response: any) => {
                setScene(response.data.scene);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });

        axios
            // eslint-disable-next-line no-underscore-dangle
            .get(`${API_URL}/player/connect/${plr._id}`)
            .then(() => {})
            .catch(() => {})
            .finally(() => {});
    };

    const createPlayer = () => {
        function randomIntFromInterval(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        axios
            .post(`${API_URL}/players`, {
                x: randomIntFromInterval(1, 9),
                y: randomIntFromInterval(1, 9),
                scene: 'office',
            })
            .then(response => {
                saveLocalPlayer(response.data);
                getPlayer(response.data);
            });
    };

    // eslint-disable-next-line consistent-return
    const configPlayer = () => {
        const player = getLocalPlayer();
        if (!player) {
            return createPlayer();
        }

        getPlayer(player);
    };

    useEffect(() => {
        configPlayer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <p>Loading data ...</p>;
    }

    return (
        <>
            <Global styles={globalStyles} />
            <div css={styles.root(width, height)}>
                <Game cameraZoom={80}>
                    <AssetLoader urls={urls} placeholder="Loading assets ...">
                        <SceneManager defaultScene={scene}>
                            <Scene id="office">
                                <OfficeScene />
                            </Scene>
                            <Scene id="other">
                                <OtherScene />
                            </Scene>
                            <Scene id="danger">
                                <DangerScene />
                            </Scene>
                        </SceneManager>
                    </AssetLoader>
                </Game>
            </div>
        </>
    );
}
