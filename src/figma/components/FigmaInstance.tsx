import React from 'react';
import type { IFigmaInstanceNode } from '../schema/types';
import { FigmaFrame } from './FigmaFrame';

export const FigmaInstance: React.FC<IFigmaInstanceNode & { children?: React.ReactNode }> = (props) => {
  // An Instance is a clone of a Component. In the dumb GUI rendering stage, 
  // it just renders like a Frame using whatever overrides the AI/parser has flattened into it.
  
  return <FigmaFrame {...(props as any)} />;
};
