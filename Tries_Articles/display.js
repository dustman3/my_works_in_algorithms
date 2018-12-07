let display = (companies, obj, totalWords, companyFound) => {
  console.log(`Company                     Hit Count               Relevance`);
  console.log("*********                   **********              **********")

  let objt = {};
  let total = 0;
  let totalPercent = 0;
  let totalPad = 0;



  companies.forEach(element => {
    let arrFirstName = element.replace(/[^a-zA-Z ]/g, "").split("\t");
    let arr = element.replace(/[^a-zA-Z ]/g, "").split(" ");
    let relevance = 0;
    objt[arr[0]] = 0;


    for (let i = 0; i < companyFound.length; i++) {
      if (arr[0] == companyFound[i]) {
        objt[arr[0]] = obj[arr[0]];
        break;
      }
    }

    if (objt[arr[0]] == undefined) {
      objt[arr[0]] = 0;
      relevance = 0;
    } else {
      relevance = objt[arr[0]] / totalWords;
    }
    let padding1 = arrFirstName[0].length
    padding1 = " ".repeat((30 - padding1));

    totalPad = padding1;
    let arr1 = relevance.toString().split(".");
    let str1 = (`${arrFirstName}${padding1}${objt[arr[0]]}                      ${relevance.toFixed(4-arr1[0].length)} %`)
    console.log(str1);
    total = total + objt[arr[0]];
    totalPercent = totalPercent + relevance;

  });
  let padding1 = "Total".length;
  padding1 = " ".repeat((30 - padding1));
  let arr1 = totalPercent.toString().split(".");
  console.log(`Total${padding1}${total}                      ${totalPercent.toFixed(4-arr1[0].length)} %`);
  padding1 = "Total Words".length;
  padding1 = " ".repeat((30 - padding1));
  console.log(`Total Words${padding1}${totalWords}`);


}

module.exports = display;