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
    default:
      return null;
  }
};
