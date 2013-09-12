// Watermark function
// Add or remove a watermark on an input with class
// watermark
// David Lighty

(function ($) {

    var methods = {
        remove: function () {
            return this.each(function () {
                var $t = $(this);
                var data = $t.data('opts');
                if ($t.val() == data.opts._WM) {
                   $t.val('');
                }
            });
        },
        init: function (options) {
            var _opts = $.extend({}, $.fn.wn_watermark.opts, options);
            return this.each(function () {
                var $t = $(this);
                $t.data('opts', {
                    target: $t,
                    opts: _opts
                });
                var data = $t.data('opts');

                if ($t != null && $t.length > 0) {
                    // Set all the first time.
                    if ($t.val().length == 0) {
                        $t.val(data.opts._WM).addClass(data.opts._WNClass);
                    }

                    $t.blur(function () {
                        var t = $(this);
                        var data = t.data('opts');
                        if (t.val().length == 0) {
                            t.val(data.opts._WM).addClass(data.opts._WNClass);
                        }
                    });

                    $t.focus(function () {
                        var t = $(this);
                        var data = t.data('opts');
                        if (t.val() == data.opts._WM) {
                            t.val('').attr('style', '').removeClass(data.opts._WNClass);
                        }
                    });
                }
            });
        }
    };


    $.fn.wn_watermark = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
    }

    // Default options for watermark
    $.fn.wn_watermark.opts = {
        _WM: 'Add input',
        _WNClass: 'activeWatermark'
    };

})(jQuery);