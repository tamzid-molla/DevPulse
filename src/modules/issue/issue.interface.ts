import type { JwtPayload } from "jsonwebtoken"

export interface IIssue {
    title: string,
    description: string,
    type:string
};

export interface IUpdateData{
    title? : string,
    description? : string,
    type? : string,
    status? : string
};

export interface UserPayload extends JwtPayload {
    id: number,
    name: string,
    role: string,
    iat: number,
    exp:number
}

export interface IQuery {
    type: string,
    status: string,
    sort: string
}