const calculateTime=(startTime,endTime,storeTime)=>{
    
        const timeFormer = new Date(startTime);
        let timeLater = new Date(endTime);
        let timeDiff
        if(timeFormer<=timeLater && storeTime>0){
          timeDiff=storeTime*1000
        }
        else if(timeFormer<=timeLater && storeTime==0)
        {
           timeDiff = timeLater.getTime() - timeFormer.getTime() ;
        } else{
          timeLater=new Date()
          timeDiff = timeLater.getTime() - timeFormer.getTime() +storeTime*1000 ;
        }
    
        var seconds = Math.floor(timeDiff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
  
        seconds = formatTime(seconds % 60);
        minutes = formatTime(minutes % 60);
        hours = formatTime(hours % 24);

        return `${hours}:${minutes}:${seconds}`
}

const formatTime = (time) => {
    if (time < 10) time = '0' + time;
    return time;
  };


export default calculateTime


