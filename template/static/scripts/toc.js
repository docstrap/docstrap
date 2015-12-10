(function($) {
$.fn.toc = function(options) {
  var self = this;
  var opts = $.extend({}, jQuery.fn.toc.defaults, options);

  var container = $(opts.container);
  var tocs = [];
  var headings = $(opts.selectors, container);
  var headingOffsets = [];
  var activeClassName = 'active';
  var navbarHeight = $('.navbar').height();
  var ANCHOR_PREFIX = "__anchor";

  var scrollTo = function(e) {
    if (opts.smoothScrolling) {
      e.preventDefault();
      var target = $(e.target);
      if (target.prop('tagName').toLowerCase() !== "a") {
        target = target.parent();
      }
      var elScrollToId = target.attr('href').replace(/^#/, '') + ANCHOR_PREFIX;
      var $el = $(document.getElementById(elScrollToId));

      var offsetTop = $el.offset().top - (navbarHeight + opts.navbarOffset);

      $('body,html').animate({ scrollTop: offsetTop }, 400, 'swing', function() {
        location.hash = '#' + elScrollToId;
      });
    }
    $('a', self).removeClass(activeClassName);
    target.addClass(activeClassName);
  };

  var calcHadingOffsets = function() {
    headingOffsets = [];
    headings.each(function(i, heading) {
      var top = $(heading).prev("span").offset().top - (navbarHeight + opts.navbarOffset);
      headingOffsets.push(top > 0 ? top : 0);
    });
  }

  //highlight on scroll
  var timeout;
  var highlightOnScroll = function(e) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
      var top = $(window).scrollTop(),
        highlighted;
      for (var i = 0, c = headingOffsets.length; i < c; i++) {
        if (headingOffsets[i] >= top || (headingOffsets[i + 1] && headingOffsets[i + 1] > top)) {
          $('a', self).removeClass(activeClassName);
          if (i >= 0) {
            highlighted = tocs[i].addClass(activeClassName);
            opts.onHighlight(highlighted);
          }
          break;
        }
      }
    }, 50);
  };
  if (opts.highlightOnScroll) {
    $(window).bind('scroll', highlightOnScroll);
    $(window).bind('load resize', function() {
      calcHadingOffsets();
      highlightOnScroll();
    });
  }

  return this.each(function() {
    //build TOC
    var el = $(this);
    var ul = $('<div class="list-group">');

    headings.each(function(i, heading) {
      var $h = $(heading);

      var anchor = $('<span/>').attr('id', opts.anchorName(i, heading, opts.prefix) + ANCHOR_PREFIX).insertBefore($h);

      var span = $('<span/>')
        .text(opts.headerText(i, heading, $h));

      //build TOC item
      var a = $('<a class="list-group-item"/>')
        .append(span)
        .attr('href', '#' + opts.anchorName(i, heading, opts.prefix))
        .bind('click', function(e) {
          scrollTo(e);
          el.trigger('selected', $(this).attr('href'));
        });

      span.addClass(opts.itemClass(i, heading, $h, opts.prefix));

      tocs.push(a);

      ul.append(a);
    });
    el.html(ul);

    calcHadingOffsets();
  });
};


jQuery.fn.toc.defaults = {
  container: 'body',
  selectors: 'h1,h2,h3',
  smoothScrolling: true,
  prefix: 'toc',
  onHighlight: function() {},
  highlightOnScroll: true,
  navbarOffset: 0,
  anchorName: function(i, heading, prefix) {
    return prefix+i;
  },
  headerText: function(i, heading, $heading) {
    return $heading.text();
  },
  itemClass: function(i, heading, $heading, prefix) {
    return prefix + '-' + $heading[0].tagName.toLowerCase();
  }

};

})(jQuery);
