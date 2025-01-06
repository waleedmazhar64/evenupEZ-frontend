(function ($) {

    $(document).ready(function () {

        // hamburger menu --------------
        $('.hamburger-menu').on('click', function () {
            $('.hamburger-menu .line-top, .hamburger-menu .line-center, .hamburger-menu .line-bottom, .main-left-col, .ofcavas-menu').toggleClass('current');
        });

        $(document).on('click', function (event) {
            // if the click is outside the ofcanvas menu and the hamburger menu
            if (!$(event.target).closest('.main-left-col, .ofcavas-menu, .hamburger-menu').length) {
                $('.hamburger-menu .line-top, .hamburger-menu .line-center, .hamburger-menu .line-bottom, .main-left-col, .ofcavas-menu').removeClass('current');
            }
        });


        // Hide the ofcavas menu when a link is clicked ------
        $('.ofcanvas_body a').on('click', function () {
            $('.hamburger-menu .line-top, .hamburger-menu .line-center, .hamburger-menu .line-bottom, .ofcavas-menu').removeClass('current');
        });


        // Hide Show Password ---------------------
        $('.togglePassword').click(function(){
            const targetId = $(this).data('target');
            const passwordField = $('#' + targetId);
            const passwordFieldType = passwordField.attr('type');

            if (passwordFieldType === 'password') {
              passwordField.attr('type', 'text');
              $(this).find('img').attr('src', 'images/eye-slash.svg');
            } else {
              passwordField.attr('type', 'password');
              $(this).find('img').attr('src', 'images/eye.svg');
            }
        });



    });

})(jQuery);