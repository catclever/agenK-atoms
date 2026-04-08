import React from 'react';
import type { IFigmaFrameNode, IFigmaPaint } from '../schema/types';

// A simple utility to convert Figma's fractional RGBA to a CSS standard string
const resolvePaintToCSS = (paints?: IFigmaPaint[]): string | undefined => {
  if (!paints || paints.length === 0) return undefined;
  // Find the first visible solid color fill
  const paint = paints.find(p => p.type === 'SOLID' && p.visible !== false);
  if (paint?.color) {
    const { r, g, b, a } = paint.color;
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${paint.opacity ?? a ?? 1})`;
  }
  return undefined;
};

export const FigmaFrame: React.FC<IFigmaFrameNode & { children?: React.ReactNode }> = (props) => {
  const {
    id,
    name,
    layoutMode,
    primaryAxisAlignItems,
    counterAxisAlignItems,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    itemSpacing,
    fills,
    strokes,
    strokeWeight,
    opacity,
    width,
    height,
    cornerRadius,
    clipsContent,
    children
  } = props;

  // We map Figma's layout properties directly to flexbox inline styling
  const style: React.CSSProperties = {
    display: layoutMode && layoutMode !== 'NONE' ? 'flex' : 'block',
    flexDirection: layoutMode === 'HORIZONTAL' ? 'row' : layoutMode === 'VERTICAL' ? 'column' : undefined,
    width: width !== undefined ? `${width}px` : undefined,
    height: height !== undefined ? `${height}px` : undefined,
    opacity: opacity,
    backgroundColor: resolvePaintToCSS(fills),
    border: strokes && strokes.length > 0 ? `${strokeWeight || 1}px solid ${resolvePaintToCSS(strokes)}` : undefined,
    borderRadius: cornerRadius ? `${cornerRadius}px` : undefined,
    overflow: clipsContent ? 'hidden' : 'visible',
    paddingLeft: paddingLeft ? `${paddingLeft}px` : undefined,
    paddingRight: paddingRight ? `${paddingRight}px` : undefined,
    paddingTop: paddingTop ? `${paddingTop}px` : undefined,
    paddingBottom: paddingBottom ? `${paddingBottom}px` : undefined,
    gap: itemSpacing ? `${itemSpacing}px` : undefined,
    boxSizing: 'border-box',
    position: 'relative' // Figma frames behave like relative positioning contexts
  };

  // Convert Figma Alignments to CSS Flexbox Alignments
  if (primaryAxisAlignItems) {
    style.justifyContent = primaryAxisAlignItems === 'MIN' ? 'flex-start' :
                           primaryAxisAlignItems === 'CENTER' ? 'center' :
                           primaryAxisAlignItems === 'MAX' ? 'flex-end' :
                           primaryAxisAlignItems === 'SPACE_BETWEEN' ? 'space-between' : undefined;
  }
  if (counterAxisAlignItems) {
    style.alignItems = counterAxisAlignItems === 'MIN' ? 'flex-start' :
                       counterAxisAlignItems === 'CENTER' ? 'center' :
                       counterAxisAlignItems === 'MAX' ? 'flex-end' : undefined;
  }

  return (
    <div id={id} data-figma-name={name} style={style}>
      {children}
    </div>
  );
};
