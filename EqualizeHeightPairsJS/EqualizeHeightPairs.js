$(function () {
    if (typeof Sys !== 'undefined') {
        var oPageRequestManager = Sys.WebForms.PageRequestManager.getInstance();
        if (oPageRequestManager != null) {
            oPageRequestManager.add_pageLoaded(function () {
                // all the halves
                equalizeHeightsPairs($('.half'));

                // Equalize Action Buttons
                var maxWidth = 0;
                var buttons = $('ul.button-equal input, ul.button-equal a');
                // Grab all a/input within .button-equal and set the width to max
                buttons.each(function () {
                    var cW = $(this).width();
                    if (cW > maxWidth) maxWidth = cW;
                });
                buttons.width(maxWidth);
            });
        }

        if (typeof Page_ClientValidate == "function") {
            var originalValidationFunction = Page_ClientValidate;
            Page_ClientValidate = function (validationGroup) {
                var result = originalValidationFunction(validationGroup);
                if (!Page_IsValid) {
                    equalizeHeightsPairs($('.half'));
                }
                return result;
            };
        }
    }
});

// Equalize the heights for i and i+1
// 0 & 1, i+2 for 2 & 3, etc.
var equalizeHeightsPairs = function (arrE) {
    for (var i = 0; i < arrE.length;) {
        var box1 = arrE[i];
        var box2 = arrE[i + 1];
        $(box1).css("min-height", "");
        $(box2).css("min-height", "");

        var maxHeight = Math.max($(box1).outerHeight(), $(box2).outerHeight());
        $(box1).css("min-height", maxHeight);
        $(box2).css("min-height", maxHeight);
        i += 2;
    }
}