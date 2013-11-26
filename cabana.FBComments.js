/*
*   jquery FBComments plugin
*   jQuery UI Widget-factory plugin (for 1.8/9+)
*   v0.1
*/

; (function ($, window, document, undefined) {

    $.widget("cabana.FBComments", {

        /*
        *   Options to be used as defaults
        *   https://developers.facebook.com/docs/plugins/comments/
        */
        options: {
            colorscheme: 'light',
            href: document.URL,
            mobile: false,
            num_posts: 5,
            order_by: 'social',
            width: '100%'
        },

        /*
        *   prefix all custom events that this widget will fire: "FBComments:beforerender"
        */
        widgetEventPrefix: 'FBComments:',

        /*
        *   set version
        */
        version: '0.1',

        /*
        *   Setup widget (eg. element creation, apply theming, bind events etc.)
        */
        _create: function () {

            var _this = this;

            // if no FB lib found, load it
            if (!$.isPlainObject(window.FB)) {

                var afterBody = '<div id="fb-root"></div>';
                $('body').prepend(afterBody);
                var api = (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));

            }

            // bind data- params
            this.options.colorscheme = ($.type(_this.element.data('colorscheme')) === 'undefined') ? this.options.colorscheme : _this.element.data('colorscheme');
            this.options.href = ($.type(_this.element.data('href')) === 'undefined') ? this.options.href : _this.element.data('href');
            this.options.num_posts = ($.type(_this.element.data('num-posts')) === 'undefined') ? this.options.num_posts : _this.element.data('num-posts');
            this.options.order_by = ($.type(_this.element.data('order-by')) === 'undefined') ? this.options.order_by : _this.element.data('order-by');
            this.options.width = ($.type(_this.element.data('width')) === 'undefined') ? this.options.width : _this.element.data('width');

            var _mobile;
            if ($.isPlainObject(window.Modernizr)) {
                if (Modernizr.touch) {
                    _mobile = true;
                } else {
                    _mobile = false;
                }
            } else {
                _mobile = false;
            }
            this.options.mobile = ($.type(_this.element.data('mobile')) === 'undefined') ? _mobile : _this.element.data('mobile');

            _this._render();

            if ($.type(_this.element.data('width')) === 'undefined') {
                _this._updateWidth();
            }

            $(window).on('resize', function () {
                _this._updateWidth();
            });

        },

        /*
        *   Destroy an instantiated plugin and clean up modifications the widget has made to the DOM
        */
        _destroy: function () {

            this.element.unbind();
            this.element.html('');

        },

        /*
        *   append ID and params to the url
        *   append the iframe to the this.element
        */
        _render: function () {
            
            var _iframeHtml = '';

            _iframeHtml += '<div class="fb-comments" ';
            _iframeHtml += 'data-colorscheme="' + this.options.colorscheme + '" ';
            _iframeHtml += 'data-href="' + this.options.href + '" ';
            _iframeHtml += 'data-num-posts="' + this.options.num_posts + '" ';
            _iframeHtml += 'data-mobile="' + this.options.mobile + '" ';
            _iframeHtml += 'data-width="' + this.options.width + '"';
            _iframeHtml += '></div>';

            this.element.html(_iframeHtml);

        },

        /*
        *   Update FB container width. Hack
        */
        _updateWidth: function () {

            this.element.children().attr('data-width', this.element.width());
            this.element.children().children().width(this.element.width());
            this.element.children().children().children().width(this.element.width());

        },

        /*
        *   set options
        */
        _setOption: function (key, value) {
            switch (key) {
                case "theme":
                    // check if current theme is not the same
                    if (this.options["theme"] !== value) {
                        this.options["theme"] = value;
                        this._render();
                    }
                    break;
                default:
                    this.options[ key ] = value;
                    break;
            }

            this._super( "_setOption", key, value );
        }
    });

})(jQuery, window, document);
