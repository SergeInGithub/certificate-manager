import { SVG_COMPONENT_TYPE } from '../components/Svg';

export const menuItems = [
  {
    url: '/',
    icon: { type: SVG_COMPONENT_TYPE.HOME, color: '#000000' },
    name: 'Start',
    content: 'Start',
  },
  {
    url: 'ml',
    icon: { type: SVG_COMPONENT_TYPE.HAMBURGER, color: '#000000' },
    name: 'Machine Learning',
    subItems: [
      {
        url: '/ml/example-one',
        name: 'Example 1',
        content: 'Example 1',
      },
      {
        url: '/ml/example2',
        name: 'Example 2',
        content: 'Example 2',
      },
      {
        url: '/ml/example3',
        name: 'Example 3',
        content: 'Example 3',
      },
    ],
  },
];
