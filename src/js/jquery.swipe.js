// Reference: https://codepen.io/gpressutto5/pen/NjJobG?editors=0010

(function ($) {
    $.fn.swipe = function (options) {
        var settings = $.extend({
            cb: function() {
                console.log('swipe done');
            }
        }, options);

        return this.each(function () {
            var $this = $(this);
            var initialMouse = 0;
            var slideMovementTotal = 0;
            var mouseIsDown = false;
            var $slider = $this.find('.slider');
            var $text = $this.find('.text');

            $slider.on('mousedown touchstart', function (event) {
                mouseIsDown = true;
                slideMovementTotal = $this.width() - $(this).width() + 10;
                initialMouse = event.clientX || event.originalEvent.touches[0].pageX;
            });

            $(document.body, $slider).on('mouseup touchend', function (event) {
                if (!mouseIsDown)
                    return;
                mouseIsDown = false;
                var currentMouse = event.clientX || event.changedTouches[0].pageX;
                var relativeMouse = currentMouse - initialMouse;

                if (relativeMouse < slideMovementTotal) {
                    $text.fadeTo(300, 1);
                    $slider.animate({
                        left: "-10px"
                    }, 300);
                    return;
                }

                /* $slider.addClass('unlocked');
                $('#locker').text('lock_outline');
                setTimeout(function () {
                    $slider.on('click tap', function (event) {
                        if (!$slider.hasClass('unlocked'))
                            return;
                        $slider.removeClass('unlocked');
                        $('#locker').text('lock_open');
                        $slider.off('click tap');
                    });
                }, 0); */

                settings.cb();
                
            });

            $(document.body).on('mousemove touchmove', function (event) {
                if (!mouseIsDown)
                    return;

                var currentMouse = event.clientX || event.originalEvent.touches[0].pageX;
                var relativeMouse = currentMouse - initialMouse;
                var slidePercent = 1 - (relativeMouse / slideMovementTotal);

                $text.fadeTo(0, slidePercent);

                if (relativeMouse <= 0) {
                    $slider.css({ 'left': '-10px' });
                    return;
                }
                if (relativeMouse >= slideMovementTotal + 10) {
                    $slider.css({ 'left': slideMovementTotal + 'px' });
                    return;
                }
                $slider.css({ 'left': relativeMouse - 10 });
            });
        });
    }
})(jQuery);
