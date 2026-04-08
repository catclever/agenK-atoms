import React from 'react';
import type { IFigmaComponentNode } from '../schema/types';
import { FigmaFrame } from './FigmaFrame';

export const FigmaComponent: React.FC<IFigmaComponentNode & { children?: React.ReactNode }> = (props) => {
  // A Component in Figma is essentially a Frame that acts as a master template.
  // In our dumb UI renderer, it behaves identically to a Frame aesthetically.
  // The logic for resolving `componentPropertyDefinitions` would be handled upstream by the AI.
  
  // We cast it back to FigmaFrame's expected props since they share identical visual traits
  return <FigmaFrame {...(props as any)} />;
};
