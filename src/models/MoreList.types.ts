export interface IAction {
    title: string;
    action: (e: React.MouseEvent<HTMLDivElement>) => void;
}