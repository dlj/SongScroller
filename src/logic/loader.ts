import { songlyric } from '@objects/songlyric'
import * as songdata from "./songmockup.json"
import * as lyricdata from "./lyricmockup.json"
import { song } from '@objects/song.js';
import { dataitem } from '@objects/dataitem.js';

var url : string = "http://192.168.1.166:8080/logic";

export function GetSongLyric(id : number) : Promise<songlyric>
{
    getRequest(id, "Song");
    return  new Promise<songlyric>((resolve, reject) => {             
        resolve(lyricdata.data[id - 1]); }
    );
}

export function GetSongTiming(id : number) : Promise<songlyric>
{
    return  new Promise<songlyric>((resolve, reject) => {             
        resolve(lyricdata.data[id - 1]); }
    );
}

export function UpdateSongLyric(lyric : songlyric) 
{
    //console.log(objectToQuery(lyric));// eslint-disable-line     
}

export function GetSong(id : number) : Promise<song>
{
    return  new Promise<song>((resolve, reject) => {             
        resolve(songdata.data[id - 1]); }
    );
}

export function GetSongNames() : Promise<Array<song>>
{
    return new Promise<song[]>((resolve, reject) => {             
        resolve(songdata.data); 
    });
    
}


function getRequest<T>(id : number, request : string) : Promise<T>
{
    return fetch(new Request( url + "/" + request + "?id=" + id, { method: "GET"}))
    .then(res => {
        if (!res.ok) {
            // Error handeling ?
        } else {
            return res.json();
        }
    })
    .catch(error => {
        // Error handeling ?
    });
    
}
/*
function updateRequest(id : number, request : string) : XMLHttpRequest
{
    const xhr = new XMLHttpRequest();
    xhr.open("get", url + "/" + request + "?id=" + id);
    
}
*/