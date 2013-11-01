# jQuery FBComments plugin

jQuery FBComments plugin is for rendering Facebook Comments widget

## Dependencies
* jQuery library
* jQuery UI Core library
* Modernizr (optional). Switches layout to mobile for touch devices

## Usage
Include `cabana.FBComments.js` in your JS (app.js) bundle.
To add Facebook comments widget, place this markup somewhere in your html:
```html
<div class="facebook-comments"></div>
```
and initiate it through javascript:
```js
$(document).ready(function(){

	$('.facebook-comments').FBComments();

});
```

## Data params
All data parameters are available from Facebook Developer page: https://developers.facebook.com/docs/plugins/comments/

## Options
Same as data params. Note that data params take the priority over options passed through javascript.

## Methods
* `destroy` Removes the FB Comments container content. This will return the element back to its pre-init state.

### Compatibility
IE9+, all modern browsers

### Tips and tricks
See `examples` folder for extended customization
