import { dataitem } from './dataitem';

export interface songlyric extends dataitem
{
    id : number,
    songid : number,
    lyric : Array<string>,
    timing : Array<number>,
}