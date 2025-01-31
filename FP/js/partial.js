// Partial.js 1.1.8
// Respect Underscore.js
// (c) 2015-2017 Marpple. MIT Licensed.
!(function (G) {
  var window = "object" != typeof window ? G : window,
    prev_ = window._;
  function _(n) {
    if (_.isString(n)) return _.method.apply(null, arguments);
    for (var t, r = [], e = arguments.length, i = e, u = 1; u < e; u++) {
      var o = arguments[u];
      (o === ___ && (i = u) && (t = [])) || (u < i ? r.push(o) : t.push(o));
    }
    var a = function () {
      return n.apply(this, merge_args(r, arguments, t));
    };
    return (a._p_async = n._p_async), a;
  }
  function _to_unde(n, t, r) {
    t && (n = n.concat(t)), r && (n = n.concat(r));
    for (var e = 0, i = n.length; e < i; e++) n[e] === _ && (n[e] = void 0);
    return n;
  }
  function merge_args(n, t, r) {
    if (!t.length) return r ? _to_unde(n, r) : _to_unde(_.clone(n));
    for (var e = _.clone(n), i = ((t = _.to_array(t)), -1), u = e.length; ++i < u; ) e[i] === _ && (e[i] = t.shift());
    if (!r) return _to_unde(e, t.length ? t : void 0);
    var o = _.clone(r);
    i = o.length;
    if (t.length) {
      for (; i--; ) o[i] === _ && (o[i] = t.pop());
      return _to_unde(e, t, o);
    }
    for (; i-- && o[i] === _; ) o.pop();
    return _to_unde(e, o);
  }
  function _1(n) {
    var t = _.apply(null, arguments);
    return function () {
      return 0 == arguments.length ? t.call(this, void 0) : t.apply(this, arguments);
    };
  }
  window._previous_underscore ||
    !prev_ ||
    prev_._partialjs ||
    (window._previous_underscore = function () {
      return prev_;
    }),
    (window._partial_namespace = function () {
      return _;
    }),
    (_.partial = _),
    (_.partial._partialjs = !0),
    (_.m = _.method =
      function (n) {
        return _.apply(
          null,
          [
            function (t) {
              return t[n].apply(t, _.rest(arguments));
            },
            _,
          ].concat(_.rest(arguments))
        );
      }),
    (_.bind = function (n) {
      var t = Function.prototype.bind.apply(n, _.rest(arguments));
      return (t._p_async = n._p_async), t;
    }),
    (_._1 = _1),
    (_.is_array = _.isArray = Array.isArray),
    each(["Arguments", "String", "Number", "Date", "RegExp", "Error"], function (n) {
      _["is_" + n.toLowerCase()] = _["is" + n] = function (t) {
        return Object.prototype.toString.call(t) === "[object " + n + "]";
      };
    }),
    (_.is_fn =
      _.is_function =
      _.isFunction =
        function (n) {
          return n instanceof Function;
        }),
    "function" != typeof /./ &&
      "object" != typeof Int8Array &&
      (_.is_fn =
        _.is_function =
        _.isFunction =
          function (n) {
            return "function" == typeof n || !1;
          }),
    (_.is_object = _.isObject =
      function (n) {
        var t = typeof n;
        return "function" == t || ("object" == t && !!n);
      }),
    (_.is_undefined = _.isUndefined =
      function (n) {
        return void 0 === n;
      });
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  function likearr(n) {
    var t = getLength(n);
    return "number" == typeof t && t >= 0 && t <= MAX_ARRAY_INDEX;
  }
  _.is_array_like = _.isArrayLike = likearr;
  var toString = Object.prototype.toString;
  function mr() {
    return (arguments.__mr = !0), arguments;
  }
  function mr_cat() {
    for (var n = { length: 0, __mr: !0 }, t = 0, r = arguments.length; t < r; t++) {
      var e = arguments[t];
      if (is_mr(e)) for (var i = 0, _ = e.length; i < _; i++) n[n.length++] = e[i];
      else n[n.length++] = e;
    }
    return n;
  }
  function to_mr(n) {
    return (n.__mr = !0), n;
  }
  function is_mr(n) {
    return n && n.__mr;
  }
  function safety_mr(n) {
    return n.length > 1 ? to_mr(n) : n[0];
  }
  function goapply(n, t, r, e) {
    for (var i, u = e || 0, o = t instanceof Error; (i = r[u++]); )
      try {
        if (t) {
          if (t.__mr) {
            if (thenable_mr(t)) return go_async(n, t, r, u - 1);
            if (o ? !i.__catch_pipe : i.__catch_pipe) continue;
            if (t.__stop) return 1 == t.length ? t[0] : (t.__stop = t);
            t = i.apply(n, t);
            continue;
          }
          if (t.then && _.is_fn(t.then)) return go_async(n, t, r, u - 1);
        }
        if (o ? !i.__catch_pipe : i.__catch_pipe) continue;
        (t = void 0 === t ? i.call(n) : i.call(n, t)), (o = !1);
      } catch (n) {
        (t = n), (o = !0);
      }
    return o && _.loge(t), t;
  }
  function __(n) {
    var t = "function" == typeof n ? arguments : n;
    return function () {
      return (arguments.__mr = !0), this === window || this === _ ? _.go(arguments, t) : goapply(this, arguments, t);
    };
  }
  function ___(n) {
    var t = "function" == typeof n ? arguments : n;
    return function () {
      return goapply(ithis(this, arguments), to_mr(arguments), t);
    };
  }
  function ithis(n, t) {
    return { parent: n, arguments: t };
  }
  function thenable(n) {
    return n && "function" == typeof n.then;
  }
  function thenable_mr(n) {
    for (var t = n.length; t--; ) if (n[t] && "function" == typeof n[t].then) return !0;
  }
  function unpack_promise(n) {
    return is_mr(n)
      ? thenable_mr(n) && _.go(Promise.all(PA == Promise.all ? n : _.toArray(n)), to_mr)
      : thenable(n) && n;
  }
  function go_async(n, t, r, e) {
    return new Promise(function (i, _) {
      var u,
        o = r.length;
      !(function t(a) {
        do {
          if (e == o) return u ? _(a) : i(fpro(a));
          var c = unpack_promise(a);
          if (c)
            return c.then(t, function (n) {
              (u = !0), t(n);
            });
          if (a && a.__stop) (e = o), (a = 1 == a.length ? a[0] : (a.__stop = a));
          else if ((u ? r[e].__catch_pipe : !r[e].__catch_pipe) || !e++) {
            u = !1;
            try {
              a = is_mr(a) ? r[e++].apply(n, a) : void 0 === a ? r[e++].call(n) : r[e++].call(n, a);
            } catch (n) {
              (a = n), (u = !0);
            }
          }
        } while (e <= o);
      })(t);
    });
  }
  function fpro(n) {
    return is_mr(n) && 1 == n.length ? n[0] : n;
  }
  (_.is_finite = _.isFinite =
    function (n) {
      return isFinite(n) && !isNaN(parseFloat(n));
    }),
    (_.is_nan = _.isNaN =
      function (n) {
        return _.isNumber(n) && n !== +n;
      }),
    (_.is_boolean = _.isBoolean =
      function (n) {
        return !0 === n || !1 === n || "[object Boolean]" === toString.call(n);
      }),
    (_.is_null = _.isNull =
      function (n) {
        return null === n;
      }),
    (_.is_numeric = _.isNumeric =
      function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }),
    (_.is_arguments = _.isArguments =
      function (n) {
        return !(!n || !n.callee);
      }),
    (_.is_element = _.isElement =
      function (n) {
        return !(!n || 1 !== n.nodeType);
      }),
    (_.wrapArray = _.wrap_arr =
      function (n) {
        return _.isArray(n) ? n : [n];
      }),
    (_.parseInt = _.parse_int =
      function (n) {
        return parseInt(n, 10);
      }),
    (_.go = function (n, t) {
      if (this != _ && this != window) return _.is_fn(t) ? goapply(this, n, arguments, 1) : goapply(this, n, t);
      var r,
        e = 0,
        i = arguments,
        u = n instanceof Error;
      for (_.is_fn(t) || ((e = -1), (i = t)); (r = i[++e]); )
        try {
          if (n) {
            if (n.__mr) {
              if (thenable_mr(n)) return go_async(null, n, i, e);
              if (u ? !r.__catch_pipe : r.__catch_pipe) continue;
              if (n.__stop) return 1 == n.length ? n[0] : (n.__stop = n);
              n = r.apply(void 0, n);
              continue;
            }
            if (n.then && _.is_fn(n.then)) return go_async(null, n, i, e);
          }
          if (u ? !r.__catch_pipe : r.__catch_pipe) continue;
          (n = void 0 === n ? r() : r(n)), (u = !1);
        } catch (t) {
          (n = t), (u = !0);
        }
      return u && _.loge(n), n;
    }),
    (_.mr = mr),
    (_.to_mr = to_mr),
    (_.is_mr = is_mr),
    (_.mr_cat = mr_cat),
    (_.stop = function () {
      return (arguments.__stop = arguments.__mr = !0), arguments;
    }),
    (_.pipe = __),
    (_.indent = ___),
    (_.tap = function () {
      var n = __(arguments);
      return function (t) {
        var r = safety_mr(arguments);
        return _.go.call(this, r, n, _.c(r));
      };
    }),
    (_.add_arg = function () {
      var n = __(arguments);
      return function () {
        var t = safety_mr(arguments);
        return _.go.call(this, t, n, function () {
          return mr_cat(t, to_mr(arguments));
        });
      };
    }),
    (_.go.async = function (n) {
      return go_async(_.go === this ? null : this, n, arguments, 1);
    }),
    (__.async = function (n) {
      var t = _.is_fn(n) ? arguments : n;
      function r() {
        return go_async(this, to_mr(arguments), t, 0);
      }
      return (r._p_async = !0), r;
    }),
    (_.async = __.async),
    (_.pipe.async = __.async),
    (___.async = _.indent.async =
      function (n) {
        var t = _.is_fn(n) ? arguments : n;
        return function () {
          return go_async(ithis(this, arguments), to_mr(arguments), t, 0);
        };
      }),
    (_.cb = _.callback =
      function (n) {
        return __.async(
          map(arguments, function (n) {
            return function () {
              var t = _.toArray(arguments),
                r = this;
              return new Promise(function (e) {
                n.apply(
                  r,
                  t.concat(function () {
                    e(safety_mr(arguments));
                  })
                );
              });
            };
          })
        );
      }),
    (_.boomerang = function () {
      var n = arguments;
      return _.callback(function () {
        var t = arguments,
          r = t[t.length - 1];
        t.length--;
        var e = ithis(this, t);
        (e.return = r), go_async(e, to_mr(t), n, 0);
      });
    }),
    (_.branch = function () {
      var n = arguments;
      return function () {
        return (arguments.__mr = !0), goapply(this, arguments, n), arguments;
      };
    }),
    (_.catch = function () {
      var n = __(arguments);
      return (n.__catch_pipe = !0), n;
    }),
    (_.all2 = function (n) {
      for (var t, r = [], e = 0, i = arguments.length, u = this === _ ? null : this; ++e < i; )
        if (((t = arguments[e][_.is_mr(n) ? "apply" : "call"](u, n)), _.is_mr(t)))
          for (var o = 0, a = t.length; o < a; o++) r.push(t[o]);
        else r.push(t);
      return to_mr(r);
    }),
    (_.all = _.All =
      function (n) {
        var t = [],
          r = -1;
        return _.is_number(n)
          ? function e() {
              return ++r < n ? (t.push(_.pipe(arguments)), e) : _.all2.apply(this, [to_mr(arguments)].concat(t));
            }
          : ((t = _.last(arguments)),
            _.is_array(t)
              ? _.all2.apply(this, [to_mr(n)].concat(t))
              : ((t = _.to_array(arguments)),
                function () {
                  return _.all2.apply(this, [to_mr(arguments)].concat(t));
                }));
      }),
    (_.spread2 = function (n) {
      for (var t, r = _.rest(arguments, 1), e = [], i = 0, u = r.length, o = n.length; i < u || i < o; i++)
        if (
          ((t = _.is_mr(n[i])
            ? (r[i] || _.idtt).apply(this === _ ? null : this, n[i])
            : (r[i] || _.idtt).call(this === _ ? null : this, n[i])),
          _.is_mr(t))
        )
          for (var a = 0, c = t.length; a < c; a++) e.push(t[a]);
        else e.push(t);
      return to_mr(e);
    }),
    (_.spread = _.Spread =
      function () {
        var n = _.last(arguments);
        return _.isArray(n)
          ? _.spread2.apply(this, [to_mr(_.initial(arguments))].concat(n))
          : ((n = _.toArray(arguments)),
            function () {
              return _.spread2.apply(this, [to_mr(arguments)].concat(n));
            });
      }),
    (_.if = _.If =
      function (n, t) {
        var r = [t ? [n, t] : [_.identity, n]];
        return (
          G.console && console.warn("_.if 함수는 곧 _.if2로 대체될 예정입니다."),
          _.extend(i, {
            else_if: e,
            elseIf: e,
            else: function (n) {
              return r.push([_.constant(!0), n]) && i;
            },
          })
        );
        function e(n, t) {
          return r.push(t ? [n, t] : [_.identity, n]) && i;
        }
        function i() {
          var n = arguments;
          return _.go.call(
            this,
            r,
            _.find(function (t) {
              return t[0].apply(this, n);
            }),
            function (t) {
              return t ? t[1].apply(this, n) : void 0;
            }
          );
        }
      }),
    (_.if2 = _.If2 =
      function () {
        var n = _.pipe(arguments);
        return function () {
          var t = [[n, _.pipe(arguments)]];
          return _.extend(e, {
            else_if: r,
            elseIf: r,
            else: function () {
              return t.push([_.constant(!0), _.pipe(arguments)]) && e;
            },
          });
          function r() {
            var n = _.pipe.apply(this, arguments);
            return function () {
              return t.push([n, _.pipe(arguments)]) && e;
            };
          }
          function e() {
            var n = arguments;
            return _.go.call(
              this,
              t,
              _.find(function (t) {
                return t[0].apply(this, n);
              }),
              function (t) {
                return t ? t[1].apply(this, n) : void 0;
              }
            );
          }
        };
      }),
    (_.or = function () {
      var n = arguments;
      return function () {
        var t = to_mr(arguments);
        return (function r(e, i) {
          return i == n.length - 1
            ? _.go(e, n[i])
            : _.go(e, n[i], function (n) {
                return n || r(t, i + 1);
              });
        })(t, 0);
      };
    }),
    (_.noop = function () {}),
    (_.this = function () {
      return this;
    }),
    (_.idtt = _.identity =
      function (n) {
        return n;
      }),
    (_.aidtt = _.async(_.idtt)),
    (_.i = _.i18n =
      function (n) {
        return 1 == arguments.length ? n : _.toArray(arguments).join(" ");
      }),
    (_.args = function () {
      return arguments;
    }),
    (_.args0 = _.identity),
    (_.args1 = function () {
      return arguments[1];
    }),
    (_.args2 = function () {
      return arguments[2];
    }),
    (_.args3 = function () {
      return arguments[3];
    }),
    (_.args4 = function () {
      return arguments[4];
    }),
    (_.a =
      _.c =
      _.always =
      _.constant =
        function (n) {
          return function () {
            return n;
          };
        }),
    (_.true = _.constant(!0)),
    (_.false = _.constant(!1)),
    (_.null = _.constant(null)),
    (_.not = function (n) {
      return !n;
    }),
    (_.nnot = function (n) {
      return !!n;
    }),
    (_.log =
      window.console && window.console.log
        ? console.log.bind
          ? console.log.bind(console)
          : function () {
              console.log.apply(console, arguments);
            }
        : _.idtt),
    (_.loge =
      window.console && window.console.error
        ? console.error.bind
          ? console.error.bind(console)
          : function () {
              console.error.apply(console, arguments);
            }
        : _.idtt),
    (_.Err = function (n) {
      return new Error(n);
    }),
    (_.hi = _.tap(_.log)),
    (_.Hi = function (n) {
      return _.tap(_1(_.log, n));
    }),
    (_.f = function (n) {
      var t = _.val(window, n),
        r = Error("warning: " + n + " is not defined");
      return (
        t ||
        (setTimeout(function () {
          (t = t || _.val(window, n)) || _.loge(r);
        }, 500) &&
          function () {
            return (t || (t = _.val(window, n))).apply(this, arguments);
          })
      );
    }),
    (_.v = _.val =
      function (n, t, r) {
        return 1 == arguments.length
          ? _.property(n)
          : null == t
          ? void 0
          : (function n(t, r, e, i) {
              return (t = t[e[r]]) ? (i == r ? t : n(t, r + 1, e, i)) : i == r ? t : void 0;
            })(n || {}, 0, (r = (t + "").split(".")), r.length - 1);
      }),
    (_.property = function (n) {
      return _1(_.val, _, n);
    }),
    (_.propertyOf = function (n) {
      return null == n
        ? function () {}
        : function (t) {
            return n[t];
          };
    });
  var hasOwnProperty = Object.hasOwnProperty;
  _.has = function (n, t) {
    return null != n && hasOwnProperty.call(n, t);
  };
  var slice = Array.prototype.slice;
  function _keys(n) {
    return _.isObject(n) ? Object.keys(n) : [];
  }
  function _invert(n) {
    for (var t = _keys(n), r = t.length, e = {}, i = 0; i < r; i++) e[n[t[i]]] = t[i];
    return e;
  }
  (_.rest = function n(t, r, e) {
    return _.isNumber(t) ? _1(n, _, t) : slice.call(t, null == r || e ? 1 : r);
  }),
    (_.values = function (n) {
      for (var t = _keys(n), r = t.length, e = Array(r), i = -1; ++i < r; ) e[i] = n[t[i]];
      return e;
    }),
    (_.toArray = _.to_array =
      function (n) {
        return _.isArray(n) ? n : likearr(n) ? slice.call(n) : _.values(n);
      }),
    (_.keyval =
      _.obj =
      _.object =
        function (n, t) {
          var r = {};
          if (_.isString(n)) r[n] = t;
          else for (var e = 0, i = getLength(n); e < i; e++) t ? (r[n[e]] = t[e]) : (r[n[e][0]] = n[e][1]);
          return r;
        }),
    (_.valkey = function (n, t) {
      return _.obj(t, n);
    }),
    (_.obj2 = _.object2 =
      function n(t, r, e) {
        return 2 == arguments.length ? _1(n, _, t, r) : _.obj(_.wrap_arr(r), _.values(_.pick(t, e)));
      }),
    (_.keys = _keys),
    (_.size = function (n) {
      return likearr(n) ? n.length : _keys(n).length;
    }),
    (_.nest = function n(t, r) {
      return 1 == arguments.length ? _1(n, t) : _.reduceRight(t.split("."), _.valkey, r);
    }),
    (_.invert = _invert);
  var escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" },
    unescapeMap = _invert(escapeMap),
    createEscaper = function (n) {
      var t = function (t) {
          return n[t];
        },
        r = "(?:" + _keys(n).join("|") + ")",
        e = RegExp(r),
        i = RegExp(r, "g");
      return function (n) {
        return (n = null == n ? "" : "" + n), e.test(n) ? n.replace(i, t) : n;
      };
    };
  (_.escape = createEscaper(escapeMap)), (_.unescape = createEscaper(unescapeMap));
  var idCounter = 0,
    yd;
  (_.unique_id = _.uniqueId =
    function (n) {
      var t = ++idCounter + "";
      return n ? n + t : t;
    }),
    (_.clone = function (n) {
      if (!_.isObject(n)) return n;
      if (_.isArray(n)) return n.slice();
      var t = _.extend({}, n);
      return delete t._memoize, t;
    }),
    (_.is_empty = _.isEmpty =
      function (n) {
        return 0 === (likearr(n) && (_.isArray(n) || _.isString(n) || _.isArguments(n)) ? n : _keys(n)).length;
      }),
    (_.memoize = function (n, t) {
      var r = function (e) {
        var i = r.cache,
          u = "" + (t ? t.apply(this, arguments) : e);
        return _.has(i, u) || (i[u] = n.apply(this, arguments)), i[u];
      };
      return (r.cache = {}), r;
    }),
    (_.memoize2 =
      ((yd = 0),
      function (n) {
        var t = ++yd,
          r = 1 == arguments.length ? n : __(arguments);
        return function (n) {
          return _.has(n._memoize || (n._memoize = function () {}), t) ? n._memoize[t] : (n._memoize[t] = r(n));
        };
      })),
    (_.wait = function (n) {
      return function () {
        var t = arguments;
        return _.go(
          new Promise(function (t) {
            setTimeout(t, n || 0);
          }),
          function () {
            return _.to_mr(t);
          }
        );
      };
    }),
    (_.delay = function (n, t) {
      var r = slice.call(arguments, 2);
      return setTimeout(function () {
        return n.apply(null, r);
      }, t);
    }),
    (_.defer = _.partial(_.delay, _, 1)),
    (_.throttle = function (n, t, r) {
      var e,
        i,
        _,
        u = null,
        o = 0;
      r || (r = {});
      var a = function () {
        (o = !1 === r.leading ? 0 : Date.now()), (u = null), (_ = n.apply(e, i)), u || (e = i = null);
      };
      return function () {
        var c = Date.now();
        o || !1 !== r.leading || (o = c);
        var l = t - (c - o);
        return (
          (e = this),
          (i = arguments),
          l <= 0 || l > t
            ? (u && (clearTimeout(u), (u = null)), (o = c), (_ = n.apply(e, i)), u || (e = i = null))
            : u || !1 === r.trailing || (u = setTimeout(a, l)),
          _
        );
      };
    }),
    (_.debounce = function (n, t, r) {
      var e,
        i,
        _,
        u,
        o,
        a = function () {
          var c = Date.now() - u;
          c < t && c >= 0 ? (e = setTimeout(a, t - c)) : ((e = null), r || ((o = n.apply(_, i)), e || (_ = i = null)));
        };
      return function () {
        (_ = this), (i = arguments), (u = Date.now());
        var c = r && !e;
        return e || (e = setTimeout(a, t)), c && ((o = n.apply(_, i)), (_ = i = null)), o;
      };
    }),
    (_.negate = function (n) {
      return function () {
        return !n.apply(this, arguments);
      };
    }),
    (_.after = function (n, t) {
      return function () {
        if (--n < 1) return t.apply(this, arguments);
      };
    }),
    (_.before = function (n, t) {
      var r;
      return function () {
        return --n > 0 && (r = t.apply(this, arguments)), n <= 1 && (t = null), r;
      };
    }),
    (_.once = _.partial(_.before, 2));
  var eq = function (n, t, r, e) {
    if (n === t) return 0 !== n || 1 / n == 1 / t;
    if (null == n || null == t) return n === t;
    n instanceof _ && (n = n._wrapped), t instanceof _ && (t = t._wrapped);
    var i = toString.call(n);
    if (i !== toString.call(t)) return !1;
    switch (i) {
      case "[object RegExp]":
      case "[object String]":
        return "" + n == "" + t;
      case "[object Number]":
        return +n != +n ? +t != +t : 0 == +n ? 1 / +n == 1 / t : +n == +t;
      case "[object Date]":
      case "[object Boolean]":
        return +n == +t;
    }
    var u = "[object Array]" === i;
    if (!u) {
      if ("object" != typeof n || "object" != typeof t) return !1;
      var o = n.constructor,
        a = t.constructor;
      if (
        o !== a &&
        !(_.is_fn(o) && o instanceof o && _.is_fn(a) && a instanceof a) &&
        "constructor" in n &&
        "constructor" in t
      )
        return !1;
    }
    (r = r || []), (e = e || []);
    for (var c = r.length; c--; ) if (r[c] === n) return e[c] === t;
    if ((r.push(n), e.push(t), u)) {
      if ((c = n.length) !== t.length) return !1;
      for (; c--; ) if (!eq(n[c], t[c], r, e)) return !1;
    } else {
      var l,
        f = _keys(n);
      if (((c = f.length), _keys(t).length !== c)) return !1;
      for (; c--; ) if (((l = f[c]), !_.has(t, l) || !eq(n[l], t[l], r, e))) return !1;
    }
    return r.pop(), e.pop(), !0;
  };
  function each(n, t, r) {
    for (var e = r || 0, i = getLength(n); e < i; e++) t(n[e], e, n);
    return n;
  }
  function map(n, t) {
    for (
      var r = -1, e = "number" == typeof (_ = n && n.length) ? null : _keys(n), i = [], _ = (e || n).length;
      ++r < _;

    )
      i[r] = t(n[e ? e[r] : r]);
    return i;
  }
  function filter(n, t) {
    for (
      var r, e = -1, i = "number" == typeof (u = n && n.length) ? null : _keys(n), _ = [], u = (i || n).length;
      ++e < u;

    )
      t((r = n[i ? i[e] : e])) && (_[_.length] = r);
    return _;
  }
  function times2(n, t) {
    for (var r = 1; r <= n; r++) t(r);
  }
  (_.is_equal = _.isEqual =
    function n(t, r) {
      return 1 == arguments.length ? _1(n, t) : eq(t, r);
    }),
    (_.is_match =
      _.isMatch =
      _.matcher =
        function n(t, r) {
          if (1 == arguments.length) return _1(n, _, t);
          var e = _keys(r),
            i = e.length;
          if (null == t) return !i;
          for (var u, o = 0, a = Object(t); o < i; o++) if (r[(u = e[o])] != a[u] || !(u in a)) return !1;
          return !0;
        }),
    (_.times = function (n, t) {
      for (var r = 0; r < n; r++) t(r);
    });
  try {
    var has_lambda = !0;
    eval("a=>a");
  } catch (n) {
    var has_lambda = !1;
  }
  function lambda(str) {
    if ("string" != typeof str) return str;
    if (((str = str.replace(/\*\*/g, '"')), has_lambda || (str = str.replace(/`/g, "'")), lambda[str]))
      return lambda[str];
    if (0 == str.indexOf("#"))
      return (lambda[str] =
        ((cf = parseInt(str.substr(1))),
        function (n) {
          return n.id == cf;
        }));
    var cf;
    if (!str.match(/=>/)) return (lambda[str] = new Function(lamda_make_$args_str(str), "return (" + str + ")"));
    if (has_lambda) return (lambda[str] = eval(str));
    var ex_par = str.split(/\s*=>\s*/);
    return (lambda[str] = new Function(
      ex_par[0]
        .replace(
          /(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*\s*:|this|arguments|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,
          ""
        )
        .match(/([a-z_$][a-z_$\d]*)/gi) || [],
      "return (" + ex_par[1] + ")"
    ));
  }
  function lamda_make_$args_str(n) {
    return _.go(
      n.match(/\$\d*/g),
      _.map(function (n) {
        return n.slice(1);
      }),
      _.max,
      function (n) {
        return "" == n || void 0 == n
          ? "$"
          : _.go(
              _.range(2, parseInt(n) + 1),
              _.reduce(function (n, t) {
                return n + ", $" + t;
              }, "$")
            );
      }
    );
  }
  function bexdf(n, t) {
    for (var r = 1, e = t.length, i = t[0]; r < e; r++) i && t[r] && n(i, t[r]);
    return i && delete i._memoize, i;
  }
  function setter(n, t) {
    for (var r in t) n[r] = t[r];
  }
  function dsetter(n, t) {
    for (var r in t) _.has(n, r) || (n[r] = t[r]);
  }
  function flat(n, t, r, e) {
    return (
      each(
        t,
        function (t) {
          if (!likearr(t) || (!_.isArray(t) && !_.isArguments(t))) return n.push(t);
          r
            ? each(t, function (t) {
                n.push(t);
              })
            : flat(n, t, r);
        },
        e
      ),
      n
    );
  }
  function Iter(n, t) {
    for (var r = t ? 3 : 2, e = n[n.length - (t ? 2 : 1)], i = [], _ = 0, u = n.length - r; _ < u; _++) i[_] = n[_];
    i[_ + r] = n[n.length - 2];
    var o = function () {
      return (i[_] = arguments[0]), (i[_ + 1] = arguments[1]), t && (i[_ + 2] = arguments[2]), e.apply(this, i);
    };
    return (o._p_async = e._p_async), o;
  }
  function collf(n, t) {
    return function r(e, i) {
      if (1 == arguments.length && (_.is_fn(e) || "string" == typeof e)) return _1(r, ___, e);
      if (arguments.length > 2)
        var u = arguments[arguments.length - 2],
          o = Iter(arguments);
      else (u = e), (o = "string" == typeof i ? _.val(i) : i || _.idtt);
      this != _ && this != G && (o = _.bind(o, this));
      var a,
        c,
        l = likearr(u) ? null : _keys(u),
        f = (l || u).length;
      i = -1;
      return o._p_async
        ? t(u, o, l, a, i, f, c)
        : (t && f && (a = o(u[(c = l ? l[++i] : ++i)], c, u)),
          ((a && (a.__mr ? thenable_mr(a) : a.then && _.is_fn(a.then)) ? t : n) || t)(u, o, l, a, i, f, c));
    };
  }
  (_.l = _.lambda = lambda),
    (_.extend = function () {
      return bexdf(setter, arguments);
    }),
    (_.defaults = function () {
      return bexdf(dsetter, arguments);
    }),
    (_.flatten = function (n, t, r) {
      return flat([], n, t, r);
    }),
    (_.each = collf(
      function (n, t, r, e, i, _, u) {
        for (; ++i < _; ) t(n[(u = r ? r[i] : i)], u, n);
        return n;
      },
      function n(t, r, e, i, u, o, a) {
        return _.go.async(i, function () {
          return ++u < o ? n(t, r, e, r(t[(a = e ? e[u] : u)], a, t), u, o) : t;
        });
      }
    )),
    (_.map = collf(
      function (n, t, r, e, i, _, u) {
        if (!_) return [];
        for (var o = [e]; ++i < _; ) o[i] = t(n[(u = r ? r[i] : i)], u, n);
        return o;
      },
      function n(t, r, e, i, u, o, a, c) {
        return o
          ? _.go.async(i, function (i) {
              return (
                c ? (c[u] = i) : (c = [i]), ++u < o ? n(t, r, e, r(t[(a = e ? e[u] : u)], a, t), u, o, a, c || []) : c
              );
            })
          : _.aidtt([]);
      }
    )),
    (_.if_arr_map = function n(t, r) {
      return 1 == arguments.length ? _1(n, _, t) : _.is_array(t) ? _.map(t, r) : r(t);
    }),
    (_.cmap = collf(null, function (n, t, r, e, i, u, o) {
      if (!u) return _.aidtt([]);
      for (var a = 0 == i ? [e] : []; ++i < u; ) a[i] = t(n[(o = r ? r[i] : i)], o, n);
      return Promise.all(a);
    })),
    (_.sum = function n(t) {
      return _.is_fn(t)
        ? _1(n, ___, t)
        : (_.is_fn(arguments[arguments.length - 1]) || (arguments[arguments.length++] = _.idtt),
          _.go(to_mr(arguments), _.map, function (n) {
            if (!n.length) return n;
            for (var t = 0, r = n[0], e = n.length; ++t < e; ) r += n[t];
            return r;
          }));
    }),
    (_.join = function n(t, r) {
      return void 0 == t || "string" == typeof t ? _1(n, _, t) : _.toArray(t).join(r);
    });
  var _reduce_async = function n(t, r, e, i, u) {
    return _.go(i, function (i) {
      var _ = e ? e[u] : u;
      return (e || t).length == u ? i : n(t, r, e, r(i, t[_], _, t), ++u);
    });
  };
  function reduce(n, t) {
    return function r(e, i, u) {
      if (1 == arguments.length) return _1(r, _, ___, e, _);
      if (2 == arguments.length && _.is_fn(e)) return _1(r, ___, e, _.is_fn(i) ? i : _(_.clone, i));
      if (arguments.length < 4)
        var o = e,
          a = i,
          c = u;
      else (o = arguments[arguments.length - 3]), (a = Iter(arguments, !0)), (c = arguments[arguments.length - 1]);
      (c = _.is_fn(c) ? c.call(this, e) : c), this != _ && this != G && (a = _.bind(a, this));
      var l = likearr(o) ? null : _keys(o);
      return (a._p_async ? t : n)(o, a, l, c, arguments.length > 2, 0);
    };
  }
  _.reduce = reduce(
    function (n, t, r, e, i, u) {
      if (r) {
        if (((e = i ? e : n[r[u++]]), !(o = r.length) || o == u)) return e;
        if ((e = t(e, n[r[u]], r[u++], n)) && (e.__mr ? thenable_mr(e) : e.then && _.is_fn(e.then)))
          return _reduce_async(n, t, r, e, u);
        for (; u < o; ) e = t(e, n[r[u]], r[u++], n);
      } else {
        var o;
        if (((e = i ? e : n[u++]), !(o = n.length) || o == u)) return e;
        if ((e = t(e, n[u], u++, n)) && (e.__mr ? thenable_mr(e) : e.then && _.is_fn(e.then)))
          return _reduce_async(n, t, null, e, u);
        for (; u < o; ) e = t(e, n[u], u++, n);
      }
      return e;
    },
    function (n, t, r, e, i, _) {
      return _reduce_async(n, t, r, i ? e : r ? n[r[_++]] : n[_++], _);
    }
  );
  var _reduce_right_async = function n(t, r, e, i, u) {
    return _.go(i, function (i) {
      var _ = e ? e[u] : u;
      return (e || t).length == u ? i : n(t, r, e, r(i, t[_], _, t), ++u);
    });
  };
  function every_or_some(n) {
    return collf(
      function (t, r, e, i, _, u, o) {
        if (!u) return !1;
        if (n ? i : !i) return n;
        for (; ++_ < u; ) if (((i = r(t[(o = e ? e[_] : _)], o, t)), n ? i : !i)) return n;
        return !n;
      },
      function t(r, e, i, u, o, a, c) {
        return a
          ? _.go.async(u, function (_) {
              return o > -1 && (n ? _ : !_) ? n : ++o < a ? t(r, e, i, e(r[(c = i ? i[o] : o)], c, r), o, a, c) : !n;
            })
          : _.aidtt(!1);
      }
    );
  }
  function getLength(n) {
    return null == n ? void 0 : n.length;
  }
  function createIndexFinder(n, t, r) {
    return function (e, i, u) {
      var o = 0,
        a = getLength(e);
      if ("number" == typeof u)
        n > 0 ? (o = u >= 0 ? u : Math.max(u + a, o)) : (a = u >= 0 ? Math.min(u + 1, a) : u + a + 1);
      else if (r && u && a) return e[(u = r(e, i))] === i ? u : -1;
      if (i != i) return (u = t(slice.call(e, o, a), _.isNaN)) >= 0 ? u + o : -1;
      for (u = n > 0 ? o : a - 1; u >= 0 && u < a; u += n) if (e[u] === i) return u;
      return -1;
    };
  }
  (_.reduceRight = _.reduce_right =
    reduce(
      function (n, t, r, e, i) {
        if (r) {
          var u = r.length - 1;
          if (((e = i ? e : n[r[u--]]), !r.length || -1 == u)) return e;
          if ((e = t(e, n[r[u]], r[u--], n)) && (e.__mr ? thenable_mr(e) : e.then && _.is_fn(e.then)))
            return _reduce_async(n, t, r, e, u);
          for (; u > -1; ) e = t(e, n[r[u]], r[u--], n);
        } else {
          u = n.length - 1;
          if (((e = i ? e : n[u--]), !n.length || -1 == u)) return e;
          if ((e = t(e, n[u], u--, n)) && (e.__mr ? thenable_mr(e) : e.then && _.is_fn(e.then)))
            return _reduce_async(n, t, null, e, u);
          for (; u > -1; ) e = t(e, n[u], u--, n);
        }
        return e;
      },
      function (n, t, r, e, i) {
        var _ = (r || n).length - 1;
        return _reduce_right_async(n, t, r, i ? e : r ? n[r[_--]] : n[_--], _);
      }
    )),
    (_.break = function () {
      return (arguments.__break = !0), arguments;
    }),
    (_.loop = function n(t, r, e) {
      if (1 == arguments.length) return _1(n, _, ___, t, _);
      if (2 == arguments.length && _.is_fn(t)) return _1(n, ___, t, _.is_fn(r) ? r : _(_.clone, r));
      if (arguments.length < 4)
        var i = t,
          u = r,
          o = e;
      else (i = arguments[arguments.length - 3]), (u = Iter(arguments, !0)), (o = arguments[arguments.length - 1]);
      (o = _.is_fn(o) ? o.call(this) : o), this != _ && this != G && (u = _.bind(u, this));
      var a = likearr(i) ? null : _keys(i);
      return (
        (o = arguments.length > 2 ? o : i[a ? a[0] : 0]),
        _.go(
          _.find(i, function (n, t, r) {
            return _.go(u(o, n, t, r), function (n) {
              var t = n && n.__break;
              return (o = t ? n[0] : n), t;
            });
          }),
          function () {
            return o;
          }
        )
      );
    }),
    (_.find = collf(
      function (n, t, r, e, i, _, u) {
        if (e) return n[u];
        for (; ++i < _; ) if (t(n[(u = r ? r[i] : i)], u, n)) return n[u];
      },
      function n(t, r, e, i, u, o, a) {
        return o
          ? _.go(i, function (i) {
              return i ? t[a] : ++u < o ? n(t, r, e, r(t[(a = e ? e[u] : u)], a, t), u, o, a) : void 0;
            })
          : _.aidtt();
      }
    )),
    (_.filter = collf(
      function (n, t, r, e, i, _, u) {
        if (!_) return [];
        for (var o = e ? [n[u]] : []; ++i < _; ) t(n[(u = r ? r[i] : i)], u, n) && o.push(n[u]);
        return o;
      },
      function n(t, r, e, i, u, o, a, c) {
        return o
          ? _.go(i, function (i) {
              return (
                (c = c || []), i && c.push(t[a]), ++u < o ? n(t, r, e, r(t[(a = e ? e[u] : u)], a, t), u, o, a, c) : c
              );
            })
          : _.aidtt([]);
      }
    )),
    (_.reject = collf(
      function (n, t, r, e, i, _, u) {
        if (!_) return [];
        for (var o = e ? [] : [n[u]]; ++i < _; ) t(n[(u = r ? r[i] : i)], u, n) || o.push(n[u]);
        return o;
      },
      function n(t, r, e, i, u, o, a, c) {
        return o
          ? _.go(i, function (i) {
              return (
                (c = c || []), i || c.push(t[a]), ++u < o ? n(t, r, e, r(t[(a = e ? e[u] : u)], a, t), u, o, a, c) : c
              );
            })
          : _.aidtt([]);
      }
    )),
    (_.every = every_or_some(!1)),
    (_.some = every_or_some(!0)),
    (_.where = function (n, t) {
      return 1 == arguments.length
        ? _.filter(function (t) {
            return _.is_match(t, n);
          })
        : _.filter(n, function (n) {
            return _.is_match(n, t);
          });
    }),
    (_.findWhere = _.find_where =
      function (n, t) {
        return 1 == arguments.length
          ? _.find(function (t) {
              return _.is_match(t, n);
            })
          : _.find(n, function (n) {
              return _.is_match(n, t);
            });
      }),
    (_.contains = function (n, t, r) {
      return likearr(n) || (n = _.values(n)), "number" != typeof r && (r = 0), _.indexOf(n, t, r) >= 0;
    }),
    (_.invoke = function (n, t) {
      var r = _.rest(arguments, 2),
        e = _.is_fn(t);
      return _.map(n, function (n) {
        var i = e ? t : n[t];
        return i && i.apply(n, r);
      });
    }),
    (_.pluck = function n(t, r) {
      return 1 == arguments.length ? _1(n, _, t) : _.map(t, _.val(r));
    }),
    (_.deep_pluck = _.deepPluck =
      function n(t, r) {
        if (1 == arguments.length) return _1(n, _, t);
        var e,
          i = (r = _.isString(r) ? r.split(/\s*\.\s*/) : [""]).length;
        return _.reduce(
          likearr(t) ? t : [t],
          function (t, u) {
            for (var o = u, a = -1; ++a < i && _.isObject(o) && !_.isArray(o); ) o = o[r[a]];
            return t.concat(
              a >= i ? (_.isArray(o) ? [o] : o) : _.isArray(o) ? n(o, e || (e = _.rest(r, a).join("."))) : void 0
            );
          },
          []
        );
      }),
    (_.max = collf(function (n, t, r, e, i, _, u) {
      if (_) {
        for (var o, a = n[(u = r ? r[++i] : ++i)], c = t(n[u], u, n); ++i < _; )
          c < (o = t(n[(u = r ? r[i] : i)], u, n)) && ((a = n[u]), (c = o));
        return a;
      }
    })),
    (_.min = collf(function (n, t, r, e, i, _, u) {
      if (_) {
        for (var o, a = n[(u = r ? r[++i] : ++i)], c = t(n[u], u, n); ++i < _; )
          c > (o = t(n[(u = r ? r[i] : i)], u, n)) && ((a = n[u]), (c = o));
        return a;
      }
    })),
    (_.sortBy = _.sort_by =
      collf(function (n, t) {
        return _.pluck(
          _.map(n, function (n, r, e) {
            return { val: n, idx: r, criteria: t(n, r, e) };
          }).sort(function (n, t) {
            var r = n.criteria,
              e = t.criteria;
            if (r !== e) {
              if (r > e || void 0 === r) return 1;
              if (r < e || void 0 === e) return -1;
            }
            return n.idx - t.idx;
          }),
          "val"
        );
      })),
    (_.groupBy = _.group_by =
      collf(function (n, t, r, e, i, u, o) {
        for (var a, c = {}; ++i < u; )
          _.has(c, (e = t((a = n[(o = r ? r[i] : i)]), o, n))) ? c[e].push(a) : (c[e] = [a]);
        return c;
      })),
    (_.indexBy = _.index_by =
      collf(function (n, t, r, e, i, _, u) {
        for (var o, a = {}; ++i < _; ) a[t((o = n[(u = r ? r[i] : i)]), u, n)] = o;
        return a;
      })),
    (_.countBy = _.count_by =
      collf(function (n, t, r, e, i, u, o) {
        for (var a = {}; ++i < u; ) _.has(a, (e = t(n[(o = r ? r[i] : i)], o, n))) ? a[e]++ : (a[e] = 1);
        return a;
      })),
    (_.shuffle = function (n) {
      for (var t, r = likearr(n) ? n : _.values(n), e = r.length, i = Array(e), u = 0; u < e; u++)
        (t = _.random(0, u)) !== u && (i[u] = i[t]), (i[t] = r[u]);
      return i;
    }),
    (_.random = function (n, t) {
      return null == t && ((t = n), (n = 0)), n + Math.floor(Math.random() * (t - n + 1));
    }),
    (_.sample = function (n, t) {
      return 2 == arguments.length && t < 1 ? [] : t ? _.shuffle(n).slice(0, t) : _.shuffle(n)[0];
    }),
    (_.partition = collf(function (n, t, r, e, i, _, u) {
      for (var o = [], a = []; ++i < _; ) (t(n[(u = r ? r[i] : i)], u, n) ? o : a).push(n[u]);
      return [o, a];
    })),
    (_.first =
      _.head =
      _.take =
        function n(t, r, e) {
          return 1 == arguments.length && _.isNumber(t)
            ? _1(n, _, t)
            : null != t
            ? null == r || e
              ? t[0]
              : _.initial(t, t.length - r)
            : void 0;
        }),
    (_.initial = function n(t, r, e) {
      return 1 == arguments.length && _.isNumber(t)
        ? _1(n, _, t)
        : slice.call(t, 0, Math.max(0, t.length - (null == r || e ? 1 : r)));
    }),
    (_.last = function n(t, r, e) {
      return 1 == arguments.length && _.isNumber(t)
        ? _1(n, _, t)
        : null != t
        ? null == r || e
          ? t[t.length - 1]
          : _.rest(t, Math.max(0, t.length - r))
        : void 0;
    }),
    (_.compact = _.filter(_.identity)),
    (_.without = function (n) {
      return _.difference(n, slice.call(arguments, 1));
    }),
    (_.union = function () {
      return _.uniq(_.flatten(arguments, !0));
    }),
    (_.intersection = function (n) {
      for (var t = [], r = arguments.length, e = 0, i = getLength(n); e < i; e++) {
        var u = n[e];
        if (!_.contains(t, u)) {
          for (var o = 1; o < r && _.contains(arguments[o], u); o++);
          o === r && t.push(u);
        }
      }
      return t;
    }),
    (_.difference = function (n) {
      var t = _.flatten(arguments, !0, 1);
      return _.reject(n, function (n) {
        return _.contains(t, n);
      });
    }),
    (_.zip = function () {
      return _.unzip(arguments);
    }),
    (_.unzip = function (n) {
      for (var t = (n && getLength(_.max(n, getLength))) || 0, r = Array(t), e = 0; e < t; e++) r[e] = _.pluck(n, e);
      return r;
    }),
    (_.unique = _.uniq =
      collf(function (n, t, r, e, i, _, u) {
        for (var o = [], a = []; ++i < _; )
          -1 == a.indexOf((e = t(n[(u = r ? r[i] : i)], u, n))) && (a.push(e), o.push(n[u]));
        return o;
      })),
    (_.append = function (n, t) {
      for (var r = 1, e = arguments.length; r < e; r++) n[n.length++] = arguments[r];
      return n;
    }),
    (_.sortedIndex = _.sorted_i =
      function n(t, r, e) {
        if (_.is_fn(t)) return _1(n, _, _, t);
        if (arguments.length > 3)
          var i = arguments[arguments.length - 3],
            u = arguments[arguments.length - 2],
            o = _.apply(null, _.last(arguments, 1).concat(_.initial(arguments, 3)));
        else (i = t), (u = r), (o = e || _.idtt);
        this != _ && this != G && (o = _.bind(o, this));
        for (var a = o(u), c = 0, l = getLength(i); c < l; ) {
          var f = Math.floor((c + l) / 2);
          o(i[f]) < a ? (c = f + 1) : (l = f);
        }
        return c;
      }),
    (_.find_i = _.findIndex =
      collf(function (n, t, r, r, e, i) {
        for (; ++e < i; ) if (t(n[e], e, n)) return e;
        return -1;
      })),
    (_.findLastIndex = _.find_last_i =
      collf(function (n, t, r, r, r, e) {
        for (; e--; ) if (t(n[e], e, n)) return e;
        return -1;
      })),
    (_.index_of = _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex)),
    (_.last_index_of = _.lastIndexOf = createIndexFinder(-1, _.findLastIndex)),
    (_.range = function (n, t, r) {
      null == t && ((t = n || 0), (n = 0)), (r = r || 1);
      for (var e = Math.max(Math.ceil((t - n) / r), 0), i = Array(e), _ = 0; _ < e; _++, n += r) i[_] = n;
      return i;
    }),
    (_.mapObject = _.map_object =
      collf(function (n, t, r, e, i, _, u) {
        for (var o = {}; ++i < _; ) o[(u = r ? r[i] : i)] = t(n[u], u, n);
        return o;
      })),
    (_.pairs = function (n) {
      for (var t = _keys(n), r = t.length, e = Array(r), i = -1; ++i < r; ) e[i] = [t[i], n[t[i]]];
      return e;
    }),
    (_.functions = function (n) {
      var t = [];
      for (var r in n) _.is_fn(n[r]) && t.push(r);
      return t.sort();
    }),
    (_.find_k =
      _.find_key =
      _.findKey =
        collf(function (n, t, r, e, i, _, u) {
          for (; ++i < _; ) if (t(n[(u = r ? r[i] : i)], u, n)) return u;
        })),
    (_.pick = function n(t, r) {
      if (1 == arguments.length) return _1(n, ___, t);
      if (2 == arguments.length)
        var e = t,
          i = r;
      else (e = arguments[arguments.length - 2]), (i = Iter(arguments));
      if (!e) return {};
      this != _ && this != G && _.is_fn(i) && (i = _.bind(i, this));
      var u = {};
      r = -1;
      if (_.is_fn(i))
        for (var o = (c = _keys(e)).length; ++r < o; ) {
          var a = e[(l = c[r])];
          i(a, l, e) && (u[l] = a);
        }
      else {
        var c;
        for (o = (c = _.wrap_arr(i)).length; ++r < o; ) {
          var l;
          (l = c[r]) in e && (u[l] = e[l]);
        }
      }
      return u;
    }),
    (_.omit = function n(t, r) {
      if (1 == arguments.length) return _1(n, ___, t);
      if (2 == arguments.length)
        var e = t,
          i = r;
      else (e = arguments[arguments.length - 2]), (i = Iter(arguments));
      if (!e) return {};
      this != _ && this != G && _.is_fn(i) && (i = _.bind(i, this));
      var u = {};
      r = -1;
      if (_.is_fn(i)) for (var o = (c = _keys(e)).length; ++r < o; ) i(e[c[r]], c[r], e) || (u[c[r]] = e[c[r]]);
      else {
        var a = _keys(e),
          c = _.wrap_arr(i);
        for (o = a.length; ++r < o; ) -1 == c.indexOf(a[r]) && (u[a[r]] = e[a[r]]);
      }
      return u;
    });
  var s_matcher_reg1 = /\{\{\{.*?\}\}\}/g,
    s_matcher_reg2 = /\{\{.*?\}\}/g,
    insert_datas1 = _.partial(s_exec, s_matcher_reg1, _.escape),
    insert_datas2 = _.partial(s_exec, s_matcher_reg2, _.idtt),
    TAB,
    TAB_SIZE,
    REG1,
    REG2,
    REG3,
    REG4,
    REG5,
    REG6,
    REG7,
    REG8;
  function number_of_tab(n) {
    var t = n.match(REG1)[0],
      r = (t.match(/\t/g) || []).length;
    return t.replace(/\t/g, "").length / TAB_SIZE + r;
  }
  function s(n, t) {
    function r() {
      for (var n = arguments.length; n--; ) arguments[n + 1] = arguments[n];
      return arguments.length++, (arguments[0] = r), _.go(mr(e, arguments, i), insert_datas1, insert_datas2, _.idtt);
    }
    var e = remove_comment(
        _.map(_.rest(arguments, 2), function (n) {
          if (_.isString(n)) return n;
          var t = _.uniqueId("f");
          return (r[t] = n), "__PTFS__." + t;
        }).join("")
      ),
      i = { matcher: {} };
    return (
      (i.matcher[s_matcher_reg1] = s_matcher(3, s_matcher_reg1, e, t)),
      (e = e.replace(s_matcher_reg1, "__PJT__")),
      (i.matcher[s_matcher_reg2] = s_matcher(2, s_matcher_reg2, e, t)),
      (e = n(e.replace(s_matcher_reg2, "{{}}").replace(/__PJT__/g, "{{{}}}"))),
      r
    );
  }
  function s_matcher(n, t, r, e) {
    return map(r.match(t), function (t) {
      try {
        return new Function("__PTFS__" + (e ? ", " : "") + e, "return " + t.substring(n, t.length - n) + ";");
      } catch (r) {
        console.log(r),
          console.log("start ----"),
          console.log(1, e),
          console.log(2, t),
          console.log(3, t.substring(n, t.length - n)),
          console.log("end ----");
      }
    });
  }
  function remove_comment(n) {
    return n.replace(/\/\*(.*?)\*\//g, "").replace(REG2, "");
  }
  function s_exec(n, t, r, e, i) {
    var u = !1,
      o = _.map(i.matcher[n], function (n) {
        var r = _.go(n.apply(null, e), t, return_check);
        return thenable(r) && (u = !0), r;
      });
    return _.go(mr(r.split(n), u && _.isArray(o) ? _.map(o, _.async(_.idtt)) : o), function (n, t) {
      var r = 0;
      return mr(
        map(t, function (t) {
          return n[r++] + t;
        }).join("") + n[n.length - 1],
        e,
        i
      );
    });
  }
  function convert_to_html(n) {
    var t = [],
      r = n.match(REG3),
      e = number_of_tab(r[0]),
      i = 0;
    r[r.length - 1] = r[r.length - 1].replace(REG4[e] || (REG4[e] = new RegExp(TAB + "{" + e + "}$")), "");
    for (var _ = 0; _ < r.length; _++) {
      for (; number_of_tab(r[_]) - e < t.length && ((i = 0), 0 != t.length); ) r[_ - 1] += end_tag(t.pop());
      var u = r[_];
      i
        ? ((r[_] = r[_].replace(REG6[i] || (REG6[i] = new RegExp("(" + TAB + "{" + i + "})", "g")), "\n")),
          r[_] !== (r[_] = r[_].replace(REG7, "\n")) && (r = push_in(r, _ + 1, RegExp.$1)))
        : ((r[_] = line(r[_], t)), u.match(REG5) && (i = number_of_tab(RegExp.$1) + 1));
    }
    for (; t.length; ) r[r.length - 1] += end_tag(t.pop());
    return r.join("");
  }
  function line(n, t) {
    return (n = n.replace(REG8, "\n").replace(/^[ \t]*/, "")).match(/^[\[.#\w\-]/)
      ? n.replace(/^(\[.*\]|\{.*?\}|\S)+ ?/, function (n) {
          return start_tag(n, t);
        })
      : n;
  }
  function push_in(n, t, r) {
    var e = n.splice(t);
    return n.push(r), n.concat(e);
  }
  function start_tag(n, t, r, e, i) {
    return (
      (r = ""),
      "input" != (e = (e = n.match(/^\w+/)) && "d" != e ? ("sp" == e ? "span" : e) : "div") && "br" != e && t.push(e),
      (n = n.replace(/\[(.*)\]/, function (n, t) {
        return (r += " " + t) && "";
      })),
      (i = _.map(n.match(/\.(\{\{\{.*?\}\}\}|\{\{.*?\}\}|[\w\-]+)/g), function (n) {
        return n.slice(1);
      }).join(" ")) &&
        r ==
          (r = r.replace(/class\s*=\s*((\").*?\"|(\{.*?\}|\S)+)/, function (n, t, r) {
            return ' class="' + i + " " + (r ? t.slice(1, -1) : t) + '"';
          })) &&
        (r = ' class="' + i + '"' + r),
      "<" +
        e +
        (r =
          [""]
            .concat(
              _.map(n.match(/#(\{\{\{.*?\}\}\}|\{\{.*?\}\}|[\w\-]+)/g), function (n) {
                return n.slice(1);
              })
            )
            .join(" id=") + r) +
        " >"
    );
  }
  function end_tag(n) {
    return "</" + n + ">";
  }
  function return_check(n) {
    return null == n || void 0 == n ? "" : n;
  }
  function _set(n, t, r) {
    n && (n[t] = _.is_fn(r) ? r(n[t]) : r);
  }
  function _unset(n, t) {
    delete n[t];
  }
  function _remove(n, t) {
    return _.removeByIndex(n, n.indexOf(t)), n;
  }
  function _pop(n) {
    return n.pop(), n;
  }
  function _shift(n) {
    return n.shift(), n;
  }
  function _push(n, t) {
    return n.push.apply(n, _.is_fn(t) ? [t(n)] : _.rest(arguments)), n;
  }
  function _unshift(n, t) {
    return n.unshift.apply(n, _.is_fn(t) ? [t(n)] : _.rest(arguments)), n;
  }
  function Box() {}
  (_.TAB_SIZE = function (n) {
    TAB_SIZE = n;
    var t = (TAB = "( {" + n + "}|\\t)") + "+";
    (REG1 = new RegExp("^" + t)),
      (REG2 = new RegExp("//" + t + ".*?(?=((//)?" + t + "))|//" + t + ".*", "g")),
      (REG3 = new RegExp(t + "\\S.*?(?=" + t + "\\S)|" + t + "\\S.*", "g")),
      (REG4 = {}),
      times2(20, function (n) {
        REG4[n] = new RegExp(TAB + "{" + n + "}$");
      }),
      (REG5 = new RegExp("^(" + t + ")(\\[.*?\\]|\\{.*?\\}|\\S)+\\.(?!\\S)")),
      (REG6 = {}),
      times2(20, function (n) {
        REG6[n] = new RegExp("(" + TAB + "{" + n + "})", "g");
      }),
      (REG7 = new RegExp("\\n(" + t + "[\\s\\S]*)")),
      (REG8 = new RegExp("^" + t + "\\|"));
  }),
    _.TAB_SIZE(2),
    (_.template = _.t =
      function () {
        return s.apply(null, [convert_to_html].concat(_.toArray(arguments)));
      }),
    (_.template$ = _.t$ =
      function () {
        return s.apply(null, [convert_to_html, "$"].concat(_.toArray(arguments)));
      }),
    (_.string = _.s =
      function () {
        return s.apply(null, [_.idtt].concat(_.toArray(arguments)));
      }),
    (_.string$ = _.s$ =
      function () {
        return s.apply(null, [_.idtt, "$"].concat(_.toArray(arguments)));
      }),
    (_.remove = _remove),
    (_.remove_by_i = _.removeByIndex =
      function (n, t) {
        if (-1 !== t) {
          var r = n.slice(t + 1 || n.length);
          (n.length = t), n.push.apply(n, r);
        }
        return t;
      }),
    (_.sel = _.select =
      function n(t, r) {
        return 1 == arguments.length
          ? _1(n, _, t)
          : r &&
              _.reduce(
                r.split(/\s*->\s*/),
                function (n, t) {
                  if (n && t)
                    return t.match(/^\((.+)\)/)
                      ? _.find(n, _.lambda(RegExp.$1))
                      : t.match(/\[(.*)\]/)
                      ? (function (n, t) {
                          if (
                            t.length > 2 ||
                            t.length < 1 ||
                            _.filter(t, function (n) {
                              return isNaN(n);
                            }).length
                          )
                            return _.Err("[] sel in [num] or [num ~ num]");
                          var r = t[0],
                            e = t[1];
                          return e
                            ? slice.call(n, r < 0 ? n.length + r : r, e < 0 ? n.length + e : e + 1)
                            : n[r < 0 ? n.length + r : r];
                        })(n, _.map(RegExp.$1.replace(/\s/g, "").split("~"), _.parseInt))
                      : n[t];
                },
                t
              );
      }),
    _.extend(_, {
      set: function n(t, r, e) {
        if (2 == arguments.length) return _1(n, _, t, r);
        if (1 == arguments.length) return _1(n, _, t);
        var i = r.split(/\s*->\s*/),
          u = i.length - 1;
        return _set(1 == i.length ? t : _.sel(t, i.slice(0, u).join("->")), i[u], e), t;
      },
      unset: function (n, t) {
        var r = t.split(/\s*->\s*/),
          e = r.length - 1;
        return _unset(1 == r.length ? n : _.sel(n, r.slice(0, e).join("->")), r[e]), n;
      },
      remove2: function (n, t, r) {
        if (r) _remove(_.sel(n, t), r);
        else {
          var e = t.split(/\s*->\s*/),
            i = e.length - 1,
            u = 1 == e.length ? n : _.sel(n, e.slice(0, i).join("->"));
          _remove(u, _.sel(u, e[i]));
        }
        return n;
      },
      extend2: function (n, t) {
        return _.extend.apply(null, [_.sel(n, t)].concat(_.rest(arguments, 2))), n;
      },
      defaults2: function (n, t) {
        return _.defaults.apply(null, [_.sel(n, t)].concat(_.rest(arguments, 2))), n;
      },
      pop: function (n, t) {
        return _pop(_.sel(n, t)), n;
      },
      shift: function (n, t) {
        return _shift(_.sel(n, t)), n;
      },
      push: function (n, t) {
        return _push.apply(null, [_.sel(n, t)].concat(_.rest(arguments, 2))), n;
      },
      unshift: function (n, t, r) {
        return _unshift.apply(null, [_.sel(n, t)].concat(_.rest(arguments, 2))), n;
      },
    }),
    (_.immutable = _.im =
      _.extend(
        function (n, t) {
          var r = _.clone(n);
          return {
            start: r,
            selected: _.reduce(
              t.split(/\s*->\s*/),
              function (n, t) {
                return t.match(/^\((.+)\)/)
                  ? ((r = n), (e = _.find(n, _.lambda(RegExp.$1))), (r[r.indexOf(e)] = _.clone(e)))
                  : t.match(/\[(.*)\]/)
                  ? (function (n, t) {
                      if (t.length > 2 || t.length < 1 || _.filter(t, _.pipe(_.identity, isNaN)).length)
                        return _.Err("[] sel in [num] or [num ~ num]");
                      var r,
                        e = t[0],
                        i = t[1];
                      return i
                        ? ((r = n),
                          each(slice.call(n, e < 0 ? n.length + e : e, i < 0 ? n.length + i : i + 1), function (n) {
                            r[r.indexOf(n)] = _.clone(n);
                          }))
                        : (n[e] = _.clone(n[e < 0 ? n.length + e : e]));
                    })(n, map(RegExp.$1.replace(/\s/g, "").split("~"), parseInt))
                  : (n[t] = _.clone(n[t]));
                var r, e;
              },
              r
            ),
          };
        },
        {
          set: function (n, t, r) {
            var e = t.split(/\s*->\s*/),
              i = e.length - 1,
              u = _.im(n, e.slice(0, 1 == e.length ? void 0 : i).join("->"));
            return _set(1 == e.length ? u.start : u.selected, e[i], r), u.start;
          },
          unset: function (n, t) {
            var r = t.split(/\s*->\s*/),
              e = r.length - 1,
              i = _.im(n, r.slice(0, e).join("->"));
            return _unset(1 == r.length ? i.start : i.selected, r[e]), i.start;
          },
          remove2: function (n, t, r) {
            var e = _.im(n, t);
            if (r) _remove(e.selected, r);
            else {
              var i = t.split(/\s*->\s*/),
                u = i.length - 1;
              _remove(1 == i.length ? e.start : _.sel(e.start, i.slice(0, u).join("->")), e.selected);
            }
            return e.start;
          },
          extend: function (n) {
            return _.extend.apply(
              null,
              [_.is_array(n) ? [] : {}, n].concat(_.toArray(arguments).slice(1, arguments.length))
            );
          },
          defaults: function (n) {
            return _.defaults.apply(
              null,
              [_.is_array(n) ? [] : {}, n].concat(_.toArray(arguments).slice(1, arguments.length))
            );
          },
          extend2: function (n, t) {
            var r = _.im(n, t);
            return _.extend.apply(null, [r.selected].concat(_.toArray(arguments).slice(2, arguments.length))), r.start;
          },
          defaults2: function (n, t) {
            var r = _.im(n, t);
            return (
              _.defaults.apply(null, [r.selected].concat(_.toArray(arguments).slice(2, arguments.length))), r.start
            );
          },
          pop: function (n, t) {
            var r = _.im(n, t);
            return _pop(r.selected), r.start;
          },
          shift: function (n, t) {
            var r = _.im(n, t);
            return _shift(r.selected), r.start;
          },
          push: function (n, t) {
            var r = _.im(n, t);
            return _push.apply(null, [r.selected].concat(_.rest(arguments, 2))), r.start;
          },
          unshift: function (n, t) {
            var r = _.im(n, t);
            return _unshift.apply(null, [r.selected].concat(_.rest(arguments, 2))), r.start;
          },
        }
      )),
    (_.box = function (n, t) {
      var r,
        e = new Box(),
        i = _.isString(n);
      if (i && 2 == arguments.length) e[n] = t;
      else if (!i && 1 == arguments.length) for (r in n) e[r] = n[r];
      return _.extend(
        function () {
          return e;
        },
        {
          stringify: function () {
            return JSON.stringify(e);
          },
          select: u,
          sel: u,
          set: function (n, t) {
            return _.set(e, o(n), t);
          },
          unset: function (n) {
            return _.unset(e, o(n));
          },
          remove2: function (n) {
            return _.remove2(e, o(n));
          },
          extend: function (n) {
            return _.extend(e, n);
          },
          defaults: function (n) {
            return _.defaults(e, n);
          },
          extend2: function (n) {
            return _.extend2.apply(null, [e, o(n)].concat(_.rest(arguments)));
          },
          defaults2: function (n) {
            return _.defaults2.apply(null, [e, o(n)].concat(_.rest(arguments)));
          },
          pop: function (n) {
            return _.pop(e, o(n));
          },
          push: function (n) {
            return _.push.apply(null, [e, o(n)].concat(_.rest(arguments)));
          },
          shift: function (n) {
            return _.shift(e, o(n));
          },
          unshift: function (n) {
            return _.unshift.apply(null, [e, o(n)].concat(_.rest(arguments)));
          },
          im: {
            set: function (n, t) {
              return _.im.set(e, o(n), t);
            },
            unset: function (n) {
              return _.im.unset(e, o(n));
            },
            remove2: function (n) {
              return _.im.remove2(e, o(n));
            },
            extend: function () {
              return _.im.extend.apply(null, [e].concat(_.toArray(arguments)));
            },
            defaults: function () {
              return _.im.defaults.apply(null, [e].concat(_.toArray(arguments)));
            },
            extend2: function (n) {
              return _.im.extend2.apply(null, [e, o(n)].concat(_.rest(arguments)));
            },
            defaults2: function (n) {
              return _.im.defaults2.apply(null, [e, o(n)].concat(_.rest(arguments)));
            },
            pop: function (n) {
              return _.im.pop(e, o(n));
            },
            push: function (n) {
              return _.im.push.apply(null, [e, o(n)].concat(_.rest(arguments)));
            },
            shift: function (n) {
              return _.im.shift(e, o(n));
            },
            unshift: function (n) {
              return _.im.unshift.apply(null, [e, o(n)].concat(_.rest(arguments)));
            },
          },
        }
      );
      function u(n) {
        if (n && (!likearr(n) || n.length)) return _.select(e, o(n));
      }
      function o(n) {
        return _.isString(n)
          ? (t = n).indexOf("./") < 0
            ? t
            : o(document.querySelector('[_sel="' + t + '"]'))
          : (function (n) {
              try {
                var t = n.getAttribute("_sel").trim();
                return t.indexOf("./") < 0
                  ? t
                  : arguments.callee(n.parentElement.closest("[_sel]")) + "->" + t.replace("./", "");
              } catch (t) {
                var r = $.closest(n, "[_sel]");
                return r ? arguments.callee(r) : void 0;
              }
            })(likearr(n) ? n[0] : n);
        var t;
      }
    }),
    (function (n, t) {
      function r(n, r, e, i) {
        var _ = t[n];
        return (e.is_once = !!i), _ || (_ = t[n] = {}), (_[r] = _[r] || []).push(e), e;
      }
      function e(t, r, e) {
        _set(
          r,
          e,
          n.reject(r[e], function (n) {
            return n.apply(null, t), n.is_once;
          })
        );
      }
      n.noti = n.notice = {
        on: r,
        once: n(r, n, n, n, !0),
        off: function (r, e) {
          var i = t[r];
          1 == arguments.length
            ? _unset(t, r)
            : i && 2 == arguments.length && each(n.isString(e) ? [e] : e, n(_unset, i));
        },
        emit: function (r, i, _) {
          (u = t[r]),
            (o = n.is_fn(i) ? i(n.keys(t[r])) : i),
            u && (n.isString(o) ? e(_, u, o) : n.isArray(o) && each(o, n(e, _, u)));
          var u, o;
        },
        emitAll: function (n, r) {
          var i,
            _ = t[n];
          if (_) for (i in _) e(r, _, i);
        },
      };
    })(_, {});
  var L = (window.L = _.L = {});
  function Ladd(n, t, r, e, i) {
    if (n && n._p_lz) return n.is_strict && e ? (n.data = r(n.data, e)) : t && (n[n.length] = t), n;
    var _,
      u = n && n.length;
    return (
      (i = i || "number" != typeof u),
      t ? (i ? ((_ = []).data = r(n, e)) : ((_ = [t]).data = n)) : ((_ = []).data = n),
      (_._p_lz = !0),
      (_.is_strict = i),
      _
    );
  }
  function Lloop(n, t, r, e) {
    var i,
      _,
      u,
      o = -1,
      a = n.data,
      c = a.length,
      l = n.length;
    n: for (; ++o < c; ) {
      for (i = -1, u = a[o]; ++i < l; )
        if ((_ = n[i])._p_lzt_m) u = (_ = _.fn)(u);
        else if (!_(u)) continue n;
      if ((e ? (r = t(r, u)) : ((r = u), (e = !0)), r && r.__break)) return r[0];
    }
    return r;
  }
  function Ltake1(n, t) {
    return L.take(Ladd(n && n._p_lz && n.is_strict ? n.data : n, t), 1);
  }
  if (
    ((L.map = function n(t, r) {
      return _.is_fn(t)
        ? function (r) {
            return n(r, t);
          }
        : Ladd(t, { fn: r, _p_lzt_m: !0 }, map, r);
    }),
    (L.filter = function n(t, r) {
      return _.is_fn(t)
        ? function (r) {
            return n(r, t);
          }
        : Ladd(t, r, filter, r);
    }),
    (L.reject = function n(t, r) {
      return _.is_fn(t)
        ? function (r) {
            return n(r, t);
          }
        : Ladd(t, _.negate(r), _.reject, r);
    }),
    (L.take = function n(t, r) {
      if (!t || !t._p_lz)
        return function (r) {
          return n(r, t);
        };
      if (t.is_strict) return t.data.length > r && (t.data.length = r || 1), t.data;
      r = r || 1;
      var e,
        i,
        _,
        u = [],
        o = -1,
        a = t.data,
        c = a.length,
        l = t.length;
      n: for (; ++o < c; ) {
        for (e = -1, _ = a[o]; ++e < l; )
          if ((i = t[e])._p_lzt_m) _ = (i = i.fn)(_);
          else if (!i(_)) continue n;
        if (((u[u.length] = _), u.length == r)) return u;
      }
      return u;
    }),
    (L.loop = function n(t, r, e) {
      return _.is_fn(t)
        ? 1 == arguments.length
          ? function (r) {
              return n(r, t);
            }
          : function (e) {
              return n(e, t, _.clone(r));
            }
        : Lloop(Ladd(t, null, null, null, !1), r, e, arguments.length > 2);
    }),
    (L.find = function n(t, r) {
      return _.is_fn(t)
        ? function (r) {
            return n(r, t);
          }
        : Ltake1(t, r)[0];
    }),
    (L.some = function n(t, r) {
      return _.is_fn(t)
        ? function (r) {
            return n(r, t);
          }
        : !!Ltake1(t, r || _.idtt).length;
    }),
    (L.every = function n(t, r) {
      return _.is_fn(t)
        ? function (r) {
            return n(r, t);
          }
        : !Ltake1(t, r ? _.negate(r) : _.not).length;
    }),
    (L.commit = L.take(1 / 0)),
    (L.strict = function n(t, r) {
      return 1 == arguments.length
        ? function (r) {
            return n(r, t);
          }
        : Ladd(t, null, null, null, _.isNumber(r) ? t.length < r : r(t));
    }),
    "function" == typeof define && define.amd
      ? define("partial", [], function () {
          return _;
        })
      : "undefined" != typeof exports && "undefined" != typeof module && module.exports
      ? (module.exports = _)
      : (window._ = _),
    (window._p = _),
    (window.__ = __),
    (window.___ = ___),
    !window.Promise)
  ) {
    var timeoutf =
      "function" == typeof setImmediate
        ? setImmediate
        : function (n) {
            setTimeout(n, 0);
          };
    (window.Promise = function (n) {
      tryp(n, _.extend(this, { _state: 0, _handled: !1, _value: void 0, _deferreds: [] }));
    }),
      (Promise.prototype.then = function (n, t) {
        var r = new Promise(function () {});
        return handle(this, { onFulfilled: n, onRejected: t, promise: r }), r;
      }),
      (Promise.prototype.catch = function (n) {
        return this.then(null, n);
      }),
      (Promise.resolve = function (n) {
        return new Promise(function (t) {
          t(n);
        });
      }),
      (Promise.reject = function (n) {
        return new Promise(function (t, r) {
          r(n);
        });
      }),
      (Promise.all = PA),
      (Promise.race = function (n) {
        return new Promise(function (t, r) {
          each(n, function (n) {
            n.then(t, r);
          });
        });
      });
  }
  function handle(n, t) {
    for (; 3 == n._state; ) n = n._value;
    if (0 == n._state) return n._deferreds.push(t);
    (n._handled = !0),
      timeoutf(function () {
        var r,
          e = 1 == n._state ? t.onFulfilled : t.onRejected;
        if (!e) return (1 == n._state ? resovle : reject)(t.promise, n._value);
        try {
          r = e(n._value);
        } catch (n) {
          return reject(t.promise, n);
        }
        resovle(t.promise, r);
      });
  }
  function resovle(n, t) {
    try {
      t && t instanceof Promise
        ? finale(_.extend(n, { _state: 3, _value: t }))
        : t && "function" == typeof t.then
        ? tryp(_.bind(t.then, t), n)
        : finale(_.extend(n, { _state: 1, _value: t }));
    } catch (t) {
      reject(n, t);
    }
  }
  function reject(n, t) {
    finale(_.extend(n, { _state: 2, _value: t }));
  }
  function finale(n) {
    2 == n._state &&
      0 == n._deferreds.length &&
      timeoutf(function () {
        n._handled || _.loge("Possible Unhandled Promise Rejection:", n._value);
      }),
      _.each(n, n._deferreds, handle),
      (n._deferreds = null);
  }
  function tryp(n, t) {
    var r = 0,
      e = function (n) {
        r++ || reject(t, n);
      };
    try {
      n(function (n) {
        r++ || resovle(t, n);
      }, e);
    } catch (n) {
      e(n);
    }
  }
  function PA(n) {
    return new Promise(function (t, r) {
      var e = n.length;
      if (!e) return t([]);
      var i = Array(e);
      each(n, function n(_, u) {
        try {
          if (thenable(_))
            return _.then.call(
              _,
              function (t) {
                n(t, u);
              },
              r
            );
          (i[u] = _), --e || t(i);
        } catch (n) {
          r(n);
        }
      });
    });
  }
})(("object" == typeof global && global.global == global && (global.G = global)) || (window.G = window));
