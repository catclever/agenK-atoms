export interface IFigmaColor {
  r: number;
  g: number;
  b: number;
  a: number; // In Figma API this is actually alpha from 0 to 1
}

export interface IFigmaPaint {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'IMAGE' | string;
  visible?: boolean;
  opacity?: number;
  color?: IFigmaColor;
}

export interface IFigmaLayout {
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL';
  primaryAxisSizingMode?: 'FIXED' | 'AUTO';
  counterAxisSizingMode?: 'FIXED' | 'AUTO';
  primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  itemSpacing?: number;
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  layoutAlign?: 'INHERIT' | 'STRETCH' | 'MIN' | 'CENTER' | 'MAX';
  layoutGrow?: number;
}

export interface IFigmaBaseNode {
  id: string;
  name: string;
  type: string;
  fills?: IFigmaPaint[];
  strokes?: IFigmaPaint[];
  strokeWeight?: number;
  opacity?: number;
  width?: number;
  height?: number;
}

export interface IFigmaFrameNode extends IFigmaBaseNode, IFigmaLayout {
  type: 'FRAME';
  cornerRadius?: number;
  clipsContent?: boolean;
  children?: any[]; 
}

export interface IFigmaGroupNode extends IFigmaBaseNode {
  type: 'GROUP';
  children?: any[];
}

export interface IFigmaComponentNode extends Omit<IFigmaFrameNode, 'type'> {
  type: 'COMPONENT' | 'COMPONENT_SET';
  componentPropertyDefinitions?: Record<string, any>;
}

export interface IFigmaInstanceNode extends Omit<IFigmaFrameNode, 'type'> {
  type: 'INSTANCE';
  componentId: string;
  componentProperties?: Record<string, any>;
}

export interface IFigmaVectorNode extends IFigmaBaseNode {
  type: 'VECTOR' | 'BOOLEAN_OPERATION' | 'STAR' | 'LINE' | 'ELLIPSE' | 'REGULAR_POLYGON' | 'RECTANGLE';
  cornerRadius?: number;
}

export interface IFigmaTextNode extends IFigmaBaseNode {
  type: 'TEXT';
  characters: string;
  fontSize?: number;
  fontName?: { family: string; style: string };
  fontWeight?: number;
  lineHeight?: { value: number; unit: 'PIXELS' | 'PERCENT' | 'AUTO' };
  letterSpacing?: { value: number; unit: 'PIXELS' | 'PERCENT' };
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
}
