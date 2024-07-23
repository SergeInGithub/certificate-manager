import { SvgComponentType } from '@components';

export const isValidSvgType = (
  type: string | undefined,
): type is SvgComponentType => {
  return Object.values(SvgComponentType).includes(type as SvgComponentType);
};
