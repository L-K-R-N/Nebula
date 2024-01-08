import { ReactElement } from "react";

export interface ILink {
    to: string;
    children: string | ReactElement;
}