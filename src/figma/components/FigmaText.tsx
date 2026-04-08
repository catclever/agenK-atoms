import React from 'react';
import type { IFigmaTextNode, IFigmaPaint } from '../schema/types';

const resolvePaintToCSS = (paints?: IFigmaPaint[]): string | undefined => {
  if (!paints || paints.length === 0) return undefined;
  const paint = paints.find(p => p.type === 'SOLID' && p.visible !== false);
  if (paint?.color) {
    const { r, g, b, a } = paint.color;
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${paint.opacity ?? a ?? 1})`;
  }
  return undefined;
};

export const FigmaText: React.FC<IFigmaTextNode> = (props) => {
  const {
    id,
    name,
    characters,
    fills,
    opacity,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    textAlignHorizontal,
    textAlignVertical
  } = props;

  const style: React.CSSProperties = {
    color: resolvePaintToCSS(fills) || 'inherit',
    opacity: opacity,
    fontSize: fontSize ? `${fontSize}px` : undefined,
    fontWeight: fontWeight,
    textAlign: textAlignHorizontal === 'CENTER' ? 'center' :
               textAlignHorizontal === 'RIGHT' ? 'right' :
               textAlignHorizontal === 'JUSTIFIED' ? 'justify' : 'left',
    display: 'flex',
    alignItems: textAlignVertical === 'CENTER' ? 'center' :
                textAlignVertical === 'BOTTOM' ? 'flex-end' : 'flex-start',
    fontFamily: props.fontName?.family,
    margin: 0,
    padding: 0,
    whiteSpace: 'pre-wrap'
  };

  // Convert lineHeight types
  if (lineHeight) {
    style.lineHeight = lineHeight.unit === 'PIXELS' ? `${lineHeight.value}px` :
                       lineHeight.unit === 'PERCENT' ? `${lineHeight.value}%` : 'normal';
  }

  // Convert letterSpacing
  if (letterSpacing) {
    style.letterSpacing = letterSpacing.unit === 'PIXELS' ? `${letterSpacing.value}px` :
                          letterSpacing.unit === 'PERCENT' ? `${letterSpacing.value / 100}em` : undefined;
  }

  return (
    <span id={id} data-figma-name={name} style={style}>
      {characters}
    </span>
  );
};
