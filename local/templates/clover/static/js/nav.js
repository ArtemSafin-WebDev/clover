$.fn.nav = function(option){

    var nav = $(this),
        item = $(this).find('.nav-ul__li'),
        slideout = null,
        slideoutDisabled = false;

    var _def = $.extend({
        mobileViewport: 1245,
        slideoutOffset: 50,
        navMobile: false,
        panel: false,
        header: false,
        button: false
    }, option);
    var _offset = _def.header.height();

    function offsetMenu(delay){
        setTimeout(function(){
            if(_def.panel){
                _offset = _def.header.height();
                _def.panel.css({'padding-top': _offset })
                if(_def.navMobile){
                    _def.navMobile.find('.slideout-menu-header').css({
                        'height': _offset
                    })
                    _def.navMobile.find('.slideout-menu-body').css({
                        'top': _offset
                    });
                }
            }
        }, delay)
    }
    var headerTop;
    function scrolling(t){
        if(t > 130){
            if (t > headerTop){
                _def.header.addClass('--hide');
            } else if(t > _offset){
                _def.header.removeClass('--hide');
            } else{
                _def.header.removeClass('--hide');
            }
        }
        return t;
    }
    function header(){
        $(window).scroll(function(){
            headerTop = scrolling($(this).scrollTop());
        })
    }
    if(_def.header.length != 0){
        header();
    }

    function mw(){
        _offset = $(window).width() - _def.slideoutOffset;
        return _offset > 300 ? 270 : _offset;
    }

    var size = $(window).width();

    function slideOutIn(){
        if(_def.navMobile){
            
            $('body').addClass('slideout-menu-active');

            if(_def.panel){
                _mw = mw();
                slideout = new Slideout({
                    'panel': _def.panel.get(0),
                    'menu':  _def.navMobile.css({'width':_mw}).get(0),
                    'padding': _mw,
                    'tolerance': 70,
                    'side':'left'
                });
                //slideout.disableTouch();
                if(_def.button){
                    $(document).on('touched click', _def.button, function(){
                        slideout.toggle();
                    })
                }

               $(window).resize(function(){
                    if(size != $(window).width()){
                        size = $(window).width();
                        if($(window).width() > 760){
                            location.reload()
                        }
                    }
                })
            }
        }else{
            console.log('Ошибка. Не передано моб меню в nav.js')
        }
    }



	if($(window).width()<_def.mobileViewport && $('.fp-enabled').length == 0){
        slideOutIn(); 
    }

    offsetMenu();

    $(document).on('touched click', '[data-role=nav-burger]', function(){
        nav.toggleClass('nav-open');
    });

    var delay;

    $(window).resize(function(){
        clearTimeout(delay);
        delay = setTimeout(function(){
            if($(window).width() != size){
                size = $(window).width();
                if($(window).width() > 1020 || $('.fp-enabled').length != 0){
                    $('body').removeClass('slideout-menu-active');
                }else{
                    if(slideout == null){
                        slideOutIn();
                    }else{
                        $('body').addClass('slideout-menu-active');
                       // slideout._padding = mw();
                    }
                }
                offsetMenu();
            }
        }, 500) 
    });


}