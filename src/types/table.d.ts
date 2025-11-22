import "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface ColumnMeta {
		style?: React.CSSProperties | ((row: Row<unknown>) => React.CSSProperties);
		className?: string | ((row: Row<unknown>) => string);
	}
}
