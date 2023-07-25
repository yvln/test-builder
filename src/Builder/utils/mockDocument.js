export const documentWithOneButton = (bodyChildren = []) => ({
    label: 'Root',
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    children: [
      {
        label: 'Body',
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        attributes: {
          bodyBackgroundColor: 'white',
          bodyWidth: 1190,
        },
        children: [...bodyChildren],
      },
    ],
});
