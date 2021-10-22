export const map = `
# # # i # # # # # # # # # # # # #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# · · · · · · · · · · · · · · · #
# # # # # # # # # # # # # # # # #
`;

export const players = [{ x: 3, y: 6 }];

export const portals = [
    {
        x: 3,
        y: 7,
        name: 'start',
        enterDirection: [0, -1],
        target: 'office/exitdanger',
    },
];
