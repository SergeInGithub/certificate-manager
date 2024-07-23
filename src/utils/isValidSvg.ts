import { SVG_COMPONENT_TYPE } from '@components';

export const isValidSvgType = (
  type: string | undefined,
): type is SVG_COMPONENT_TYPE => {
  return Object.values(SVG_COMPONENT_TYPE).includes(type as SVG_COMPONENT_TYPE);
};
