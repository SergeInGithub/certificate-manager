export const menuItems = [
  {
    url: '/',
    icon: { type: 'home', color: '#000000' },
    name: 'Start',
    content: 'Start',
  },
  {
    url: 'ml',
    icon: { type: 'hamburger', color: '#000000' },
    name: 'Machine Learning',
    subItems: [
      {
        url: '/example-one',
        name: 'Example 1',
        content: 'Example 1',
      },
      {
        url: '/example2',
        name: 'Example 2',
        content: 'Example 2',
      },
      {
        url: '/example3',
        name: 'Example 3',
        content: 'Example 3',
      },
    ],
  },
];
