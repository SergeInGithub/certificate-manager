import { SvgComponentType } from '../components/Svg';

export const getMenuItems = (translations: Record<string, string>) => [
  {
    url: '/',
    icon: { type: SvgComponentType.HOME, color: '#000000' },
    name: 'Start',
    content: translations['start'],
  },
  {
    url: 'ml',
    icon: { type: SvgComponentType.HAMBURGER, color: '#000000' },
    name: translations['machineLearning'],
    subItems: [
      {
        url: '/ml/certificates',
        name: translations['example1'],
        content: translations['example1'],
      },
      {
        url: '/ml/example2',
        name: translations['example2'],
        content: translations['example2'],
      },
      {
        url: '/ml/example3',
        name: translations['example3'],
        content: translations['example3'],
      },
    ],
  },
];
