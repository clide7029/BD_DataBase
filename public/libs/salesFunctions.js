function bought(username, ticker, numshares){
    var currentDate= new Date();
    var day=currentDate.getDate();
    var month=currentDate.getMonth()+1;
    var year=currentDate.getFullYear();
    if(day="1"){
        if(month==1){
            month==12;
            year--;
        }
        else{
            month--;
        }
        if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
            day=31;
        }
        else if(month==2){
            if(year%4==0){
                day==29;
            }
            day==28;
        }
        else{
            day=30;
        }
   }
   else{
       day--;
   }
   var date=""+day+"/"+month+"/"+year
   var priceper=queryEqual2("Pricing","closeprice","ticker",ticker,"day",date);
   var price=priceper*numshares;
   var currentCurr = queryEqual("User","currency","username",username)[0];
   var currOwnedList = queryEqual2("Owned","numshares","ticker",ticker,"username",username);
   updateat("User","currency",currentCurr-price,"username",username);
    
   if (currOwnedList.length==0){
        addOwned(username,ticker,numshares);
   }
   else{
       updateat2("Owned","numshares",currOwnedList[0]+numshares,"ticker",ticker,"username",username);
   }
}
function sold(username, ticker, numshares){
    var currentDate= new Date();
    var day=currentDate.getDate();
    var month=currentDate.getMonth()+1;
    var year=currentDate.getFullYear();
    if(day="1"){
        if(month==1){
            month==12;
            year--;
        }
        else{
            month--;
        }
        if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
            day=31;
        }
        else if(month==2){
            if(year%4==0){
                day==29;
            }
            day==28;
        }
        else{
            day=30;
        }
   }
   else{
       day--;
   }
   var date=""+day+"/"+month+"/"+year
   var priceper=queryEqual2("Pricing","closeprice","ticker",ticker,"day",date)[0];

   var price=priceper*numshares;
   var currentCurr = queryEqual("User","currency","username",username)[0];
   updateat("User","currency",currentCurr+price,"username",username);
   var currSharesList=queryEqual2("Owned","numshares","username",username,"ticker",ticker);
   var currShares=currSharesList[0];
   if (currSharesList.length==0){
        addOwned(username,ticker,numshares);
   }
   else if (currShares<numshares){
       return "You dont have enough shares to sell these";
   }
   else if (currShares>numshares){
       updateat2("Owned","numshares",currentShares-numshares,"ticker",ticker,"date",date)[0];
   }

}
function stockpast(ticker,numdays){
    var returnlist=[];
    var i=0;
    while(numdays>0){
        if(day="1"){
            if(month==1){
                month==12;
                year--;
            }
            else{
                month--;
            }
            if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
                day=31;
            }
            else if(month==2){
                if(year%4==0){
                    day==29;
                }
                day==28;
            }
            else{
                day=30;
            }
       }
       else{
           day--;
       }
       var date=""+day+"/"+month+"/"+year
       returnlist[i]=queryEqual2("Pricing","closeprice","ticker",ticker,"day",date)
    }
    returnlist.reverse();
    return returnlist;
}