(function () {

    var valid_form = $('#valid-form');



   function exportRadio() {
       var radio = $('input[name="type"]');

       if(radio[0].checked === true || radio[1].checked === true || radio[2].checked === true  ){
           return true;
       }
       else{

       }

   };


    valid_form.on('submit',function (event) {
        event.preventDefault();
        var formData = {
            "numbers":$("#numbers").val(),
            "letters":$("#letters").val(),
            "check": $("#check").prop("checked"),
            "radio":exportRadio()
        };

        $.ajax({
            method:'POST',
            url:'/valid-form',
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            cache: false,
            success:function (result) {
                $('#numbers').toggleClass(result.success[0].class);
                $('#letters').toggleClass(result.success[0].class);
                $('#check').toggleClass('test');
            },
            error:function (error) {
                var obj = error.responseJSON;



                (function () {
                    for(var i = 0; i<obj.error.length; i++){
                        if(obj.error[i].name === 'checkbox'){
                            $('#checkText').css('display','block')
                        }
                    }
                })();


                (function () {
                    for(var i = 0; i<obj.error.length; i++){
                        if(obj.error[i].name === 'numbers'){
                            $('#numbers').toggleClass('error');
                        }
                    }
                })();


                (function () {
                    for(var i = 0; i<obj.error.length; i++){
                        if(obj.error[i].name === 'letters'){
                            $('#letters').toggleClass('error');
                        }
                    }
                })();

                (function () {

                    for(var i = 0; i<obj.error.length; i++){
                        if(obj.error[i].name === 'radio'){
                            $('#radioText').css('display','block')
                        }
                    }

                })();


            }
        });
    });



})();