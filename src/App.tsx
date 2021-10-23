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
import useSceneManager from './@core/useSceneManager';

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
    const [scene, setScene] = useState('office');
    // const { setScene } = useSceneManager();

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
                console.log('klkkkkkkkkkkkkkkk', response.data);
                setScene(response.data.scene);
            })
            .catch(() => {})
            .finally(() => {});
    };

    useEffect(() => {
        const localplr = getLocalPlayer();
        localplr && getPlayer(localplr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
