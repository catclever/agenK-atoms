import {
  Select,
  SelectItem,
  NextUIProvider,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Checkbox,
  Switch,
  Spacer,
  Divider,
  Spinner,
  Link,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
  Badge,
  Chip
} from '@nextui-org/react';

// Export individually for programmatic React usage
export {
  Select,
  SelectItem,
  NextUIProvider,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Checkbox,
  Switch,
  Spacer,
  Divider,
  Spinner,
  Link,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
  Badge,
  Chip
};

// Unified UI Registry mapping tailored precisely for the Agent K Renderer
// This maps the {"type": "Button"} JSON spec string to the actual React component.

import React from 'react';
// @ts-ignore
export const AgentSelect = React.forwardRef(({ options, ...props }: any, ref) => {
  
  return React.createElement(Select, { ...props, ref }, 
    options ? options.map((opt: any) => React.createElement(SelectItem, { key: opt.key }, opt.text)) : null
  );

});

export const AgentFAtoms: Record<string, any> = {
  Select: AgentSelect,
  SelectItem,
  NextUIProvider,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Textarea,
  Checkbox,
  Switch,
  Spacer,
  Divider,
  Spinner,
  Link,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
  Badge,
  Chip
};

// Export Figma elements namespace
export * as FigmaAtoms from './figma';
