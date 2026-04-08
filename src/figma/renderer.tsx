import React from 'react';
import type { 
  IFigmaFrameNode, 
  IFigmaTextNode, 
  IFigmaVectorNode, 
  IFigmaGroupNode, 
  IFigmaComponentNode, 
  IFigmaInstanceNode 
} from './schema/types';
import { FigmaFrame } from './components/FigmaFrame';
import { FigmaText } from './components/FigmaText';
import { FigmaVector } from './components/FigmaVector';
import { FigmaGroup } from './components/FigmaGroup';
import { FigmaComponent } from './components/FigmaComponent';
import { FigmaInstance } from './components/FigmaInstance';

/**
 * Automatically parses a Figma node from JSON and renders it into the corresponding dumb React component.
 * This is the core renderer mapping JSON representations to UI Skeletons.
 */
export const renderFigmaNode = (node: any): React.ReactNode => {
  if (!node || !node.id) return null;

  // Recursively process children if present
  const children = node.children && Array.isArray(node.children) 
    ? node.children.map((child: any) => renderFigmaNode(child)) 
    : undefined;

  switch (node.type) {
    case 'FRAME':
    case 'CANVAS': // A Canvas is typically a page or root layout container in Figma JSON
    case 'SECTION': // Sections are wrappers similar to Frames
      return <FigmaFrame key={node.id} {...(node as IFigmaFrameNode)}>{children}</FigmaFrame>;
      
    case 'GROUP':
      return <FigmaGroup key={node.id} {...(node as IFigmaGroupNode)}>{children}</FigmaGroup>;
      
    case 'COMPONENT':
    case 'COMPONENT_SET':
      return <FigmaComponent key={node.id} {...(node as IFigmaComponentNode)}>{children}</FigmaComponent>;
      
    case 'INSTANCE':
      return <FigmaInstance key={node.id} {...(node as IFigmaInstanceNode)}>{children}</FigmaInstance>;
      
    case 'TEXT':
      return <FigmaText key={node.id} {...(node as IFigmaTextNode)} />;
      
    case 'VECTOR':
    case 'BOOLEAN_OPERATION':
    case 'STAR':
    case 'LINE':
    case 'ELLIPSE':
    case 'REGULAR_POLYGON':
    case 'RECTANGLE':
      return <FigmaVector key={node.id} {...(node as IFigmaVectorNode)} />;
      
    case 'DOCUMENT':
      // The top-level DOCUMENT type just acts as a root host wrapper.
      return (
        <div key={node.id} data-figma-type="DOCUMENT" style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
          {children}
        </div>
      );
      
    default:
      console.warn(`[Agent K Atoms] Unsupported Figma Type ignored: ${node.type}`, node);
      // Fallback
      return <div key={node.id} data-figma-unknown={node.type}>{children}</div>;
  }
};
