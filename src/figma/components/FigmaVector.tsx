import React from 'react';
import type { IFigmaVectorNode, IFigmaPaint } from '../schema/types';

const resolvePaintToCSS = (paints?: IFigmaPaint[]): string | undefined => {
  if (!paints || paints.length === 0) return undefined;
  const paint = paints.find(p => p.type === 'SOLID' && p.visible !== false);
  if (paint?.color) {
    const { r, g, b, a } = paint.color;
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${paint.opacity ?? a ?? 1})`;
  }
  return undefined;
};

export const FigmaVector: React.FC<IFigmaVectorNode> = (props) => {
  const {
    id,
    name,
    type,
    fills,
    strokes,
    strokeWeight,
    opacity,
    width,
    height,
    cornerRadius
  } = props;

  // For generic vectors like RECTANGLE and ELLIPSE without SVG data,
  // we can use standard CSS borders and radius to emulate them.
  const style: React.CSSProperties = {
    width: width !== undefined ? `${width}px` : '100%',
    height: height !== undefined ? `${height}px` : '100%',
    opacity: opacity,
    backgroundColor: resolvePaintToCSS(fills),
    border: strokes && strokes.length > 0 ? `${strokeWeight || 1}px solid ${resolvePaintToCSS(strokes)}` : undefined,
    borderRadius: type === 'ELLIPSE' ? '50%' : cornerRadius ? `${cornerRadius}px` : undefined,
    boxSizing: 'border-box',
    display: 'block'
  };

  return <div id={id} data-figma-name={name} data-figma-type={type} style={style} />;
};
