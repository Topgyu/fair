function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var names = [
'???',
'두메!',
'마루!',
'파파존',
'길림성',
'강정!',
'마시내',
'우빈!',
'메이루',
'오니기',
'동원홈',
'뚝배기',
'시크릿',
'북측!',
'동측!',
'서측!',
'그라지',
'스킵!'
];
var numColumns = 7;
var numRows = Math.ceil((names.length-1) / numColumns);

var order = [];
for (var i=1;i<names.length;i++){
    order.push(i+1);
}
order = shuffle(order);
var p = 0;

var spinningSound, applauseSound, applauseSound2;
soundManager.onload = function(){
    spinningSound = soundManager.createSound({id:"spinning", url:"sounds/spinning.mp3"});
    applauseSound = soundManager.createSound({id:"applause", url:"sounds/applause.mp3"});
    applauseSound2 = soundManager.createSound({id:"applause2", url:"sounds/applause2.mp3"});
};


function generateTable(){
    // generate table
    var wrapper = $('#tableWrapper');
    var table = $('<table></table>').attr('id', 'list').appendTo(wrapper);
    for (var i=0;i<numRows;i++){
        var tr = $('<tr></tr>').appendTo(table);
        for (var j=0;j<numColumns;j++){
            var index = i * numColumns + j + 1;
            var td = $('<td></td>').appendTo(tr);
            if (index < names.length){
                td.text(names[index]);
            } else {
                td.text(' ');
            }
        }
    }

    // generate slot items
    $('.fancy .slot').each(function(i){
        var slot = $(this);
        for (var j=0;j<names.length;j++){
            $('<li><span>'+ names[j][i] +'</span></li>').appendTo(slot);
        }
    });
}

function playFireworks(fireworksCount){
    $('#modal').fadeIn(500);
    fireworksIndex = 0;
    if (typeof(fireworksPid) !== 'undefined'){
        clearInterval(fireworksPid);
    }
    fireworksPid = setInterval(function(){
        var rand = Math.random();
        createFirework(41,95,6,5,null,null,null,null,false,true);
        fireworksIndex++;
        if (fireworksIndex >= fireworksCount){
            $('#modal').fadeOut(500);
            clearInterval(fireworksPid);
        }
    }, 180);
}

$(function(){
    $('#modal').hide();
    generateTable();
    $('.fancy .slot').each(function(i){
        if (i == 2){
            $(this).jSlots({
            number : 1,
            winnerNumber : 100,
            spinner : '#playFancy',
            easing : 'easeOutSine',
            time : 1900 + 1000*i,
            loops : 6,
            onStart : function() {
                spinningSound.play();
            },
            onEnd: function(){
                var name = $('.fancy .slot').eq(0).children().eq(order[p]-1).find('span').text() +
                    $('.fancy .slot').eq(1).children().eq(order[p]-1).find('span').text() +
                    $('.fancy .slot').eq(2).children().eq(order[p]-1).find('span').text();
                $('.selected.now').removeClass('now');

                $('#list td').each(function(){
                    var ele = $(this);
                    if (ele.text() == name){
                        ele.addClass('selected now');
                    }
                });
                if (name && name.length > 0){
                    if (name == '김준겸'){
                        setTimeout(function(){ applauseSound2.play(); }, 500);
                        playFireworks(20);
                    } else {
                        setTimeout(function(){ applauseSound.play(); }, 500);
                        playFireworks(8);
                    }
                    $('.fancy .slot li').addClass('selected-animation');
                    setTimeout(function(){
                        $('.fancy .slot li').removeClass('selected-animation');
                    }, 1000);
                }
                p++;
            }
            });
        } else {
            $(this).jSlots({
            number : 1,
            winnerNumber : 100,
            spinner : '#playFancy',
            easing : 'easeOutSine',
            time : 1900 + 1000*i,
            loops : 6,
            });
        }
    });

    $('body').keyup(function(e){
        var key = event.keyCode || event.which;
        if (key === 13) {
            $('#playFancy').click();
            return false;
        }
    });
});