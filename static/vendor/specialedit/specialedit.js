/**
 * Copyright 2010 Ganzogo. All Rights Reserved.
 *
 * jQuery plugin that adds buttons to text input fields which allow the user
 * to easily enter special characters.
 *
 * Author: Matthew Hasler (matthew@ganzogo.com)
 *
 * Edited to fit the LibCrowds theme!
 */
(function($) {
  $.fn.specialedit = function(charset) {

    var KEYCODE_SHIFT = 16;
    var ESZETT = '&#223;';
    var chars = [];

    switch(charset) {
        case 'latin':
            chars = ['&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;',
                     '&Aring;', '&AElig;', '&Ccedil;', '&Egrave;', '&Eacute;',
                     '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;',
                     '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;',
                     '&Ocirc;', '&Otilde;', '&Ouml;', '&Oslash;', '&Ugrave;',
                     '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;',
                     '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;',
                     '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;',
                     '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;',
                     '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;',
                     '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&oslash;',
                     '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;',
                     '&thorn;', '&yuml;'];
            break;
        default: // Latin
            chars = ['&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;',
                     '&Aring;', '&AElig;', '&Ccedil;', '&Egrave;', '&Eacute;',
                     '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;',
                     '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;',
                     '&Ocirc;', '&Otilde;', '&Ouml;', '&Oslash;', '&Ugrave;',
                     '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;',
                     '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;',
                     '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;',
                     '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;',
                     '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;',
                     '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&oslash;',
                     '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;',
                     '&thorn;', '&yuml;'];
    }

    return this.each(function() {

      // Create the toolbar for this text input.
      var $this = $(this);
      var hover = false;
      var buttons = new Array();
      var button_top = $this.offset().top + $this.outerHeight() + 5;
      var button_right = $this.offset().left + $this.outerWidth() - 2;
      var toolbar = $('<ul/>')
          .css('display', 'none')
          .css('border', '1px solid #cccccc')
          .css('background', '#fff')
          .mouseover(function() {
              hover = true;
          })
          .mouseout(function() {
              hover = false;
          })
          .click(function() {
              $this.focus();
          });


      // Create each of the buttons on the toolbar.
      $.each(chars, function(i, c) {
        buttons[i] = $('<li/>').html(c)
            .css('padding', '0px 5px')
            .css('color', '#000000')
            .css('border', '0')
            .css('text-align', 'center')
            .css('cursor', 'pointer')
            .css('display', 'inline-block')
            .css('border', '1px solid #fff')
            .mouseover(function() {
                $(this).css('border', '1px solid #000000')
                       .css('background', '#b2bbd0');
            })
            .mouseout(function() {
                $(this).css('border', '1px solid #fff')
                       .css('background', '#fff');
            })
            .mousedown(function() {
                var input = $this[0];
                var value = htmlDecode($(this).html());
                if (document.selection) {
                  input.focus();
                  sel = document.selection.createRange();
                  sel.text = value;
                  input.focus();
                } else if (input.selectionStart ||
                    input.selectionStart == '0') {
                  var startPos = input.selectionStart;
                  var endPos = input.selectionEnd;
                  var scrollTop = input.scrollTop;
                  input.value = input.value.substring(0, startPos) + value +
                      input.value.substring(endPos, input.value.length);
                  input.focus();
                  input.selectionStart = startPos + value.length;
                  input.selectionEnd = startPos + value.length;
                  input.scrollTop = scrollTop;
                } else {
                  input.value += value;
                  input.focus();
                }
            });
        toolbar.append(buttons[i]);
      });

      $this.after(toolbar);

      function htmlDecode(value) {
        return $('<div/>').html(value).text();
      }

      // Bind events to text input using '.specialedit' namespace.
      $this.bind('keydown.specialedit', function(event) {
        if (event.which == KEYCODE_SHIFT) {
          for (var c in buttons) {
            // The eszett doesn't play well with toUpperCase method.
            if (buttons[c].html() != htmlDecode(ESZETT)) {
              buttons[c].html(buttons[c].html().toUpperCase());
            }
          }
        }
      });

      $this.bind('keyup.specialedit', function(event) {
        if (event.which == KEYCODE_SHIFT) {
          for (var c in buttons) {
            buttons[c].html(buttons[c].html().toLowerCase());
          }
        }
      });

      $this.bind('focus.specialedit', function() {
        toolbar.fadeIn();
      });

      /**
       * We check to see if the mouse is currently over the buttons. If it is
       * then we take this to mean that the user has clicked a button, and
       * that's why the blur event has been triggered. In that case, the
       * buttons shouldn't be hidden.
       *
       * This causes a minor bug if the user is hovering over the buttons,
       * while the text field loses focus some over way, (for example, by
       * pressing TAB).
       */
      $this.bind('blur.specialedit', function() {
        if (!hover) {
          toolbar.hide();
        }
      });
    });
  };
})( jQuery );