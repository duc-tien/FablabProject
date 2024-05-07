export const formatTimeWithOnlyDate=(data)=>{
    let time=data.replace(/-/g, '/');
    time = time.replace('T', ' ');
    time = time.substring(0, 11);
    return time
}

export const formatTimeFull=(data)=>{
    let time=data.replace(/-/g, '/');
    time = time.replace('T', ' ');
    time = time.substring(0, 19);
    return time
}

