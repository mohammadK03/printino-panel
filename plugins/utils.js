import Vue from 'vue'
Vue.prototype.$toPersianNumber = (num) => {
    var i = 0,
    dontTrim = dontTrim || false,
    num = dontTrim ? num.toString() : num.toString().trim(),
    len = num.length,
    res = "",
    pos,
    persianNumbers =
      typeof persianNumber == "undefined"
        ? ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
        : persianNumbers;

  for (; i < len; i++)
    if ((pos = persianNumbers[num.charAt(i)])) res += pos;
    else res += num.charAt(i);

  return res;
}

Vue.prototype.$formatPriceIR = (value) => {
    let val = (value / 1).toFixed(0).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

Vue.prototype.$calcDiscount = (price, discount,quantity=1)=>{
  price=price*quantity;
    return price - (discount * price) / 100 + "";
}

Vue.prototype.$isLoggedUser = ()=>{
 
    if(localStorage.getItem('userToken')){
      return true;
    }else{
      return false;
    }
  
 

}