import React from 'react';

export enum SVG_COMPONENT_TYPE {
  HAMBURGER = 'hamburger',
  HOME = 'home',
  ARROW_DOWN = 'arrowDown',
}

type SvgComponentProps = {
  color?: string;
  type: SVG_COMPONENT_TYPE;
  className: string;
};

const Hamburger: React.FC<{ color?: string; className: string }> = ({
  color,
  className,
}) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 18L20 18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 12L20 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 6L20 6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const Home: React.FC<{ color?: string; className: string }> = ({
  color,
  className,
}) => (
  <svg
    height="800px"
    width="800px"
    version="1.1"
    id="_x32_"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    className={className}
  >
    <g>
      <polygon
        fill={color}
        points="434.162,293.382 434.162,493.862 308.321,493.862 308.321,368.583 203.682,368.583 203.682,493.862 77.841,493.862 77.841,293.382 256.002,153.862"
      />
      <polygon
        fill={color}
        points="0,242.682 256,38.93 512,242.682 482.21,285.764 256,105.722 29.79,285.764"
      />
      <polygon
        fill={color}
        points="439.853,18.138 439.853,148.538 376.573,98.138 376.573,18.138"
      />
    </g>
  </svg>
);

const ArrowDown: React.FC<{ color?: string; className: string }> = ({
  color,
  className,
}) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 -4.5 20 20"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={className}
  >
    <title>arrow_down [#338]</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g
      id="Page-1"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="Dribbble-Light-Preview"
        transform="translate(-220.000000, -6684.000000)"
        fill={color}
      >
        <g
          id="icons"
          transform="translate(56.000000, 160.000000)"
        >
          <path
            d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
            id="arrow_down-[#338]"
          ></path>
        </g>
      </g>
    </g>
  </svg>
);

const Search: React.FC<{ color?: string; className: string }> = ({
  color,
  className,
}) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Close: React.FC<{ color?: string; className: string }> = ({
  color,
  className,
}) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fill={color}
      d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
    />
  </svg>
);

const SelectDownArrow: React.FC<{ color?: string; className: string }> = ({
  color,
  className,
}) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
      fill={color}
    />
  </svg>
);

export const SvgComponent: React.FC<SvgComponentProps> = ({
  color = '#000000',
  className,
  type,
}) => {
  switch (type) {
    case 'hamburger':
      return (
        <Hamburger
          color={color}
          className={className}
        />
      );
    case 'home':
      return (
        <Home
          color={color}
          className={className}
        />
      );
    case 'arrowDown':
      return (
        <ArrowDown
          color={color}
          className={className}
        />
      );
    case 'search':
      return (
        <Search
          color={color}
          className={className}
        />
      );
    case 'close':
      return (
        <Close
          color={color}
          className={className}
        />
      );
    case 'selectDownArrow':
      return (
        <SelectDownArrow
          color={color}
          className={className}
        />
      );
    default:
      return null;
  }
};
