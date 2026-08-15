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
}