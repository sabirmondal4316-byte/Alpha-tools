import React from 'react';
import {
  Minimize2,
  Maximize2,
  QrCode,
  FileText,
  Calendar,
  Braces,
  ArrowRightLeft,
  RefreshCw,
  Wrench,
  LucideProps
} from 'lucide-react';

interface ToolIconProps extends LucideProps {
  name: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Minimize2':
      return <Minimize2 {...props} />;
    case 'Maximize2':
      return <Maximize2 {...props} />;
    case 'QrCode':
      return <QrCode {...props} />;
    case 'FileText':
      return <FileText {...props} />;
    case 'Calendar':
      return <Calendar {...props} />;
    case 'Braces':
      return <Braces {...props} />;
    case 'ArrowRightLeft':
      return <ArrowRightLeft {...props} />;
    case 'RefreshCw':
      return <RefreshCw {...props} />;
    default:
      return <Wrench {...props} />;
  }
};
