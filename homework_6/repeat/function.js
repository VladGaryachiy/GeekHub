(function () {


    var body = $(document.body);

    $('#products [data-drag-helper]').on('mousedown',function (event) { // событие при нажатие мышки
        var helper = $(event.currentTarget); // клонируем выбранный елемент , привязка через атрибут к header


        var clone = helper.clone();
        clone.css('width', helper.width()); // соответсвие ширины клона с елементом который выбрали




        var helperOffset = helper.offset(); // ростояние от верхнего края до кусора и левого
        var offset = {
            top : event.pageY - helperOffset.top, // находим разницу между хелпером(елементом) и положением курсора мышки , напирмер(90 - 100)
            left : event.pageX - helperOffset.left
        };
        clone.css({ /*росположение елемента под курсором*/
            top:event.pageY - offset.top,
            left:event.pageX - offset.left
        });


        var product  = helper.closest('[data-drag-helper]');
        product.addClass('drugging');

        helper.addClass('drugging'); // добавляем клас со стилем елементу от которого начинаем тягать
        clone.appendTo(body); // вставляем клон в body


        var carts = $('#carts [data-cart]').toArray().map(function (cart) {  // узнаем розмищение cart (корзин)
            var rect = cart.getBoundingClientRect();
            return {
                node:$(cart), /*елемент*/
                rect:rect /*координаты*/
            }
        });

        var prevCart;




        body.on('mousemove.dragProduct', function (event) { // движение мышки
            clone.css({
                top:event.pageY - offset.top, // теперь положение курсора будет постоянно тем же что и при нажатии (координаты курсора)
                left:event.pageX - offset.left
            });


            var cloneRect = clone.get(0).getBoundingClientRect(); // первый елемент из массива jquery чтобы взять нативный елемент т.к у него нету метода getBounding

            var cart = carts.find(function (cart) {
                return overlaps(cart.rect, cloneRect); //если пересикает то обьект емли нет то undefined
            });




            if(cart && cart !== prevCart){
                console.log(1);
                if(prevCart){
                    prevCart.node.removeClass('overlaps'); // что бы засвечивался один карт на конорый навели
                }
                cart.node.addClass('overlaps'); /*если true то добавляем класс*/
                prevCart = cart;
            }

            if(!cart && prevCart){
                prevCart = null;
            }

        });


        body.on('mouseup.dragProduct',function () { /*огда отпускаем клавишшу*/
            if(prevCart){
                product.appendTo(prevCart.node);
                prevCart.node.removeClass('overlaps');
                prevCart = null;
            }
            clone.remove();
            product.removeClass('drugging');

            body.off('mousemove.dragProduct','mouseup.dragProduct')
        });
    });

    function overlaps(rect1, rect2) {  /* фукция ищет пересичение елемента с корзиной*/
        return !(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom)
    }


})();