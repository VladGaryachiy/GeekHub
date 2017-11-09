var path = require('path');

module.exports = function (request,response) {


    var obj = {};

    var num = request.body;
    var lett = request.body;
    var checkbox = request.body;
    var radio = request.body;

    var err = [];
    var success = [];

    request;


/*-----------------------------------------NUMBER----------------------------------------------*/

        var res;
        if(res = /[^0-9]/.test(num.numbers)){
  /*              obj.NumValid = ["error","Only numbers"];*/
            err.push({
                name: "numbers",
                message:"Only numbers",
                class:"error"
            })

        }
        else if(num.numbers === ""){

            err.push({
                name: "numbers",
                message:"Empty text",
                class:"error"
            })
        }
        else{
                success.push({
                   name:"numbers",
                   message:"Very good",
                   class:"success"
                });
        }

/*---------------------------------------------LETTERS---------------------------------------------------------*/
        var les;

        if(les = /[0-9]/.test(lett.letters)){

            err.push({
                name: "letters",
                message:"Only letters",
                class:"error"
            })

        }
        else if(lett.letters === ""){
            err.push({
                name: "letters",
                message:"Empty text",
                class:"error"
            })
        }
        else{
            success.push({
                name:"letters",
                message:"Very good",
                class:"success"
            });
        }


    /*-------------------------------------CHECKBOX---------------------------------------------*/


        if(checkbox.check !== true){
            err.push({
                name: "checkbox",
                message:"Check please",
                class:"error"
            })
        }
        else{
            success.push({
                name:"checkbox",
                message:"Very good",
                class:"success"
            });
        }




/*------------------------------------------RADIO-----------------------------------------------------*/


        if(radio.radio === true){
            success.push({
                name:"radio",
                message:"Very good",
                class:"success"
            });
        }
        else{
            err.push({
                name: "radio",
                message:"Choose one variants radio button please",
                class:"error"
            })
        }


    (function () {
        if(err.length > 0){
            response.status(500).json({error:err})
        }
        else{
            response.status(200).json({success:success})
        }
    })();
















};









/*-------------------------------------------------------------*/

