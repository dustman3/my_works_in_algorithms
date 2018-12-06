
module.exports = { charFrequencyCount };

function charFrequencyCount(data) {

    if (data.length == 0) throw console.log(`Data passed to count the Frequency of Character is Empty`);

    let len = data.length;
    let str = data.toLowerCase();
    let obj = {};

    for (let i = 0; i < len; i++) {

        if (obj.hasOwnProperty(str[i])) {

            obj[str[i]] = obj[str[i]] + 1;

        } else {
            obj[str[i]] = 1;

        }

    }

    var keysSorted = Object.keys(obj).sort(function (a, b) { return obj[a] - obj[b] }); //https://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value

    let i = 0;
    let arr = [];
    let total = 0;

    for (let i = 0; i < keysSorted.length; i++) {
        arr.push([keysSorted[i], obj[keysSorted[i]]]);
        total += obj[keysSorted[i]];
    }
    obj = {};
    obj.array = arr;
    obj.total = total;
    return obj;
}