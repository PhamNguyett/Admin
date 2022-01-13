const moment =require('moment')

module.exports={
    upperCase(item) { return item.charAt(0).toUpperCase() + item.slice(1);},
    increase(a,i){ return a+i},
    multipAB(a,b){return a*b},
    quantityy(item){return item.reduce((total,i)=>{return total+i.quantity},0) },
    newLine(a){if(a) return a.replace(/\n/g, "<br />");},
    checkedBox(array,_this){ array.includes(_this)>=0?"true":"false" },
    momentFormatL (date){return moment(date).format('L'); },
    momentFormatAgo (date){return moment(date).startOf('day').fromNow();  },
    selectDefault(a,b){ if(a===b) {return 'selected'}},
    compareValue(a,b){if(a==b){return true}; return false},
    timeCalendar(a){return moment(a).calendar();}
}