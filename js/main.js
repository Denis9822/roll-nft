var audio = new Audio('sounds/speen.mp3');
var wheelClick = false;
var winItemLength = 69;
var winItemImg = 0;
var winItemPrice = 0;

//random items 
function getRandomInt(max) {
    let res = Math.floor(Math.random() * max);
    if (res == 0)
        return getRandomInt(max);
    else
        return res;
}

function updateWheel() {
    $('.wheel_wrap_item').each(function(index) {
        let imageId = getRandomInt(14);
        let shadowStyle = getRandomInt(3);
        let randomPrice = getRandomInt(4700);
        $(this).children().children('img').attr('src', 'img/price-items/Frame ' + imageId + '.png');
        $(this).children().children('.item_price').children('p').html(randomPrice);

        $(this).addClass('shadow--style-' + shadowStyle);
    });
}
updateWheel();

$('.wheel_items').show();


//animate wheel
$('.btn_wheel').click(function() {
    if (wheelClick == false) {
        $(".wheel_wrap").animate({
            marginLeft: '-14056px'
        }, 8000, null, callback);

        if ($(window).width() < 1500)
            winItemLength = 68;

        if ($(window).width() < 769)
            winItemLength = 67;

        winItemImg = $('.wheel_wrap_item').eq(winItemLength).children().children('img').attr('src');
        winItemPrice = $('.wheel_wrap_item').eq(winItemLength).children().children('.item_price').children('p').html();
        wheelClick = true;
        var ind = 1;
        audio.volume = 0.03;
        audio.play();

    }
})

function callback() {
    $('.popup_price .popup_mask').show();
    $('.popup_price .popup_wrap').show();
    $('.popup_container .win_item_img .item_price p').html(winItemPrice);
    $('.popup_container .win_item_img img').attr('src', winItemImg);
    audio.pause();
    audio.currentTime = 0;
    wheelClick = false;
    $(".wheel_wrap").animate({
        marginLeft: '0px'
    }, 100, updateWheel);
}


//modals
var maxh = $(document).outerHeight(true);
$('.popup_mask').attr('style', 'height: ' + maxh + 'px;');

$('.popup_close').click(function() {
    $(this).parent().parent().siblings('.popup_mask').toggle();
    $(this).parent().parent('.popup_wrap').toggle();
})

$('.popup_mask').click(function() {
    $(this).toggle();
    $(this).siblings('.popup_wrap').hide();
})

$('.header_right_wallet').click(function() {
    $('.popup .popup_mask').toggle();
    $('.popup .popup_wrap').animate({ left: 'toggle' });
})