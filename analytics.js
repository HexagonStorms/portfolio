/**
 * PostHog Analytics Configuration
 * Tracks outbound links, pageviews, and other user interactions
 */
(function() {
  "use strict";
  
  var i = window.location,
      o = window.document,
      s = o.currentScript,
      l = s.getAttribute("data-api") || new URL(s.src).origin + "/api/event",
      u = s.getAttribute("data-domain");
  
  function p(t, e) {
    t && console.warn("Ignoring Event: " + t);
    e && e.callback && e.callback();
  }
  
  function t(t, e) {
    // Skip tracking on localhost/development environments
    if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(i.hostname) || "file:" === i.protocol)
      return p("localhost", e);
    
    // Skip tracking for bots/automation tools
    if ((window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) && !window.__plausible)
      return p(null, e);
    
    // Check for opt-out in localStorage
    try {
      if ("true" === window.localStorage.plausible_ignore)
        return p("localStorage flag", e);
    } catch (t) {}
    
    // Prepare event data
    var n = {};
    n.n = t;                               // Event name
    n.u = i.href;                          // URL
    n.d = u;                               // Domain
    n.r = o.referrer || null;              // Referrer
    
    // Add metadata if provided
    if (e && e.meta)
      n.m = JSON.stringify(e.meta);
    
    // Add props if provided
    if (e && e.props)
      n.p = e.props;
    
    // Get custom properties from data attributes
    var t = s.getAttributeNames().filter(function(t) {
      return "event-" === t.substring(0, 6);
    });
    
    var a = n.p || {};
    t.forEach(function(t) {
      var e = t.replace("event-", ""),
          t = s.getAttribute(t);
      a[e] = a[e] || t;
    });
    n.p = a;
    
    // Send the event via XMLHttpRequest
    var r = new XMLHttpRequest;
    r.open("POST", l, !0);
    r.setRequestHeader("Content-Type", "text/plain");
    r.send(JSON.stringify(n));
    
    // Execute callback if provided
    r.onreadystatechange = function() {
      4 === r.readyState && e && e.callback && e.callback({
        status: r.status
      });
    };
  }
  
  // Handle existing events in queue
  var e = window.plausible && window.plausible.q || [];
  window.plausible = t;
  for (var n, a = 0; a < e.length; a++)
    t.apply(this, e[a]);
  
  // Track page views
  function r() {
    n !== i.pathname && (n = i.pathname, t("pageview"));
  }
  
  function c() {
    r();
  }
  
  // Track history changes for SPAs
  var f, d = window.history;
  if (d.pushState) {
    f = d.pushState;
    d.pushState = function() {
      f.apply(this, arguments);
      c();
    };
    window.addEventListener("popstate", c);
  }
  
  // Handle prerendering
  if ("prerender" === o.visibilityState)
    o.addEventListener("visibilitychange", function() {
      n || "visible" !== o.visibilityState || r();
    });
  else
    r();
  
  // Track outbound link clicks
  var m = 1;
  
  function w(t) {
    if ("auxclick" !== t.type || t.button === m) {
      var e = function(t) {
        for (; t && (void 0 === t.tagName || !v(t) || !t.href);)
          t = t.parentNode;
        return t;
      }(t.target);
      
      if (e && e.href && e.href.split("?")[0]) {
        if (function t(e, n) {
          if (!e || b < n)
            return !1;
          if (k(e))
            return !0;
          return t(e.parentNode, n + 1);
        }(e, 0))
          return;
        
        if ((n = e) && n.href && n.host && n.host !== i.host)
          return h(t, e, {
            name: "Outbound Link: Click",
            props: {
              url: e.href
            }
          });
      }
      var n;
    }
  }
  
  function h(t, e, n) {
    var a, r = !1;
    
    function i() {
      r || (r = !0, window.location = e.href);
    }
    
    if (!function(t, e) {
      if (!t.defaultPrevented)
        return e = !e.target || e.target.match(/^_(self|parent|top)$/i), t = !(t.ctrlKey || t.metaKey || t.shiftKey) && "click" === t.type, e && t;
    }(t, e)) {
      a = {
        props: n.props
      };
      plausible(n.name, a);
    } else {
      a = {
        props: n.props,
        callback: i
      };
      plausible(n.name, a);
      setTimeout(i, 5e3);
      t.preventDefault();
    }
  }
  
  // Get event details from element or parent with plausible-event class
  function g(t) {
    var t = k(t) ? t : t && t.parentNode,
        e = {
          name: null,
          props: {}
        },
        n = t && t.classList;
    
    if (n)
      for (var a = 0; a < n.length; a++) {
        var r, i = n.item(a).match(/plausible-event-(.+)(=|--)(.+)/);
        i && (r = i[1], i = i[3].replace(/\+/g, " "), "name" == r.toLowerCase() ? e.name = i : e.props[r] = i);
      }
    
    return e;
  }
  
  // Track click events
  o.addEventListener("click", w);
  o.addEventListener("auxclick", w);
  
  var b = 3;
  
  function y(t) {
    if ("auxclick" !== t.type || t.button === m) {
      for (var e, n, a, r, i = t.target, o = 0; o <= b && i; o++) {
        if ((a = i) && a.tagName && "form" === a.tagName.toLowerCase())
          return;
        
        v(i) && (e = i);
        k(i) && (n = i);
        i = i.parentNode;
      }
      
      n && (r = g(n), e ? (r.props.url = e.href, h(t, e, r)) : ((t = {}).props = r.props, plausible(r.name, t)));
    }
  }
  
  // Check if element has plausible-event-name class
  function k(t) {
    var e = t && t.classList;
    if (e)
      for (var n = 0; n < e.length; n++)
        if (e.item(n).match(/plausible-event-name(=|--)(.+)/))
          return !0;
    return !1;
  }
  
  // Check if element is a link tag
  function v(t) {
    return t && t.tagName && "a" === t.tagName.toLowerCase();
  }
  
  // Track form submissions
  o.addEventListener("submit", function(t) {
    var e, n = t.target,
        a = g(n);
    
    function r() {
      e || (e = !0, n.submit());
    }
    
    if (a.name) {
      t.preventDefault();
      e = !1;
      setTimeout(r, 5e3);
      t = {
        props: a.props,
        callback: r
      };
      plausible(a.name, t);
    }
  });
  
  // Add click tracking
  o.addEventListener("click", y);
  o.addEventListener("auxclick", y);
  
})();