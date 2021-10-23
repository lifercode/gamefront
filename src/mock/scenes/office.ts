export const map = `
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · # # # # # # # # # # # # # # # # # · · · ·
· · · · · · # · W T # T · · W T · W · · · T # · · · ·
· · · · · · # · · · · · · · · · · · · · · o # · · · ·
· · · · · · # o · · # · · · # # # # · · # # # · · · ·
· · · · · · # # # # # · · · # W o W · · T W # · · · ·
· · · · · · # C C C # · · · T · · · · · · · # · · · ·
· · · · · · # o · · · · · · · · · · · · · o # · · · ·
· · · · · · # # # # # # # # # · · # # # # # # · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · # # # # # · · · · ·
· · · · · · · · · · · · · · · · · # i # i # · · · · ·
· · · · · · · · · · · · · · · · · # · # · # · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
· · · · · · · · · · · · · · · · · · · · · · · · · · ·
`;

export const players = [
    { id: 1, x: 6, y: 3 },
    // { id: 2, x: 9, y: 4 },
    // { x: 13, y: 9 },
    // { x: 15, y: 6 },
    // { x: 18, y: 8 },
];

export const portals = [
    {
        x: 18,
        y: 5,
        name: 'exit',
        enterDirection: [0, -1],
        target: 'other/start',
    },
    {
        x: 20,
        y: 5,
        name: 'exitdanger',
        enterDirection: [0, -1],
        target: 'danger/start',
    },
];
