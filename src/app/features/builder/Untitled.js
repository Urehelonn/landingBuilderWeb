let res = '';
    console.log('xxx');
    let pre = '';
    let ocNum = 0;
    for(let i=0;i<message;i++){
        console.log(i + ' '+message.charAt(i));
        if(pre!='' && message.charAt(i)===pre){
            ocNum++;
        } else {
            res+=ocNum;
            ocNum=0;
        }
        res+=message.charAt(i);
        pre=message.charAt(i);
    }
    console.log('res:',res);
    return res;