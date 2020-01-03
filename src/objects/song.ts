import { dataitem } from './dataitem';

export interface song extends dataitem
{
    id : number,
    artist : string,
    title : string,
}