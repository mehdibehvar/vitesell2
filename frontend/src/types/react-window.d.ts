declare module 'react-window' {
  export interface GridChildComponentProps {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
    data?: any;
    isScrolling?: boolean;
  }
  export function FixedSizeGrid(props: any): JSX.Element;
  export function FixedSizeList(props: any): JSX.Element;
  export interface FixedSizeListProps {
    [key: string]: any;
  }
}
