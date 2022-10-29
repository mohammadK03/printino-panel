export function formatPrice(value) {
    if (!value) {
        return 0;
    }
    let val = (value / 1).toFixed(0).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export function toPersianNumber(num, dontTrim) {
    if (!num) {
        return 0;
    }
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

