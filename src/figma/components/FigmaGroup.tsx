import React from 'react';
import type { IFigmaGroupNode } from '../schema/types';

export const FigmaGroup: React.FC<IFigmaGroupNode & { children?: React.ReactNode }> = (props) => {
  const { id, name, opacity, width, height, children } = props;

  // Group nodes typically do not have padding or background in Figma, they just bound their children
  const style: React.CSSProperties = {
    position: 'relative',
    opacity: opacity,
    width: width !== undefined ? `${width}px` : undefined,
    height: height !== undefined ? `${height}px` : undefined,
    pointerEvents: 'none' // Groups themselves usually don't intercept events
  };

  return (
    <div id={id} data-figma-name={name} style={style}>
      <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
};
