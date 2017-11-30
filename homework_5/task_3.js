

function  filterWhere(){

    var arr = [];
    var obj = [];
    var objTwo = [];
    for(var keyOne in arguments[0]){
        obj.push(arguments[0][keyOne]);
    }
    if(typeof obj[0] === "object"){
        for(var keyThree in obj[0]){
            if(typeof obj[0][keyThree] === "object"){
                for(var keyFour in obj[0][keyThree] ){
                    objTwo.push(obj[0][keyThree][keyFour])
                }
            }
        }
    }

    var resOne = obj[0];
    var resTwo = objTwo[0];
    for(var i = 0; i<this.length; i++){

        for(var keyTwo in this[i]){
            if(typeof this[i][keyTwo]  === "object"){
                for (var keyFive in this[i][keyTwo]){
                    if(typeof  this[i][keyTwo][keyFive] === "object" ){
                        for (var keySix in this[i][keyTwo][keyFive]){
                            if(resTwo.test(this[i][keyTwo][keyFive][keySix][1])){
                                arr.push(this[i])
                            }
                        }
                    }
                }
            }


            else {

            }
        }


    }
    return arr;

}

Array.prototype.filterWhere = filterWhere;

var users = [
    {id: 1, name: 'Max', photo: {url: 'ava1.jpg', size: {width: 100, height: "asdas"}}},
    {id: 2, name: 'Bob', photo: {url: 'avatar.png', size: {width: 800, height: "asda"}}},
    {id: 3, name: 'Nick', photo: {url: 'img.jpg', size: {width: 440, height: 320}}}
];
var usersWithBigPhoto = users.filterWhere({photo: {size: {height: /\d{3}/}}});
console.log(usersWithBigPhoto);

/*   else if(typeof this[i][keyTwo]  != "object"){
                if(resOne.test(this[i][keyTwo] )){
                    arr.push(this[i])
                }
            }

*/