import React from 'react';
import { SvgComponent, SvgComponentType } from './Svg';

interface ILookupHeaderProps {
  heading: string;
}

export const LookupHeader = ({ heading }: ILookupHeaderProps) => {
  return (
    <div className="lookup-header-container">
      <SvgComponent
        type={SvgComponentType.ARROW_DOWN}
        className="custom-select-arrow-icon"
        color="white"
      />
      <h6 className="lookup-header-text">{heading}</h6>
    </div>
  );
};
