! function() {
    "use strict";

    function t() {
        this.$dom = $(document), this.$html = this.$dom.find("html"), this.isOldie = !!this.$html.hasClass("oldie"), this.click = "click", this.onReady = this.onOldie = this.onTouch = !1, this.autoInit = "false" === $("script[gumby-init]").attr("gumby-init") ? !1 : !0, this.debugMode = Boolean($("script[gumby-debug]").length), this.touchDevice = !!(Modernizr.touch || window.navigator.userAgent.indexOf("Windows Phone") > 0), this.gumbyTouch = !1, this.touchEvents = "js/libs", this.breakpoint = Number($("script[gumby-breakpoint]").attr("gumby-breakpoint")) || 768, this.uiModules = {}, this.inits = {};
        var t = $("script[gumby-touch]").attr("gumby-touch"),
            i = $("script[gumby-path]").attr("gumby-path");
        "false" === t ? this.touchEvents = !1 : t ? this.touchEvents = t : i && (this.touchEvents = i), this.touchDevice && $(window).width() < this.breakpoint ? (this.$html.addClass("gumby-touch"), this.gumbyTouch = !0) : this.$html.addClass("gumby-no-touch"), this.debugMode && this.debug("Gumby is in debug mode")
    }
    t.prototype.init = function(t) {
        var i = this,
            e = t ? t : {};
        return this.$dom.ready(function() {
            e.debug && (i.debugMode = !0), i.debug("Initializing Gumby");
            var t = e.uiModules ? e.uiModules : !1;
            i.initUIModules(t), i.onReady && i.onReady(), i.isOldie && i.onOldie && i.onOldie(), Modernizr.touch && i.onTouch && i.onTouch()
        }), this
    }, t.prototype.ready = function(t) {
        return t && "function" == typeof t && (this.onReady = t), this
    }, t.prototype.oldie = function(t) {
        return t && "function" == typeof t && (this.onOldie = t), this
    }, t.prototype.touch = function(t) {
        return t && "function" == typeof t && (this.onTouch = t), this
    }, t.prototype.console = function(t, i) {
        this.debugMode && window.console && console[console[t] ? t : "log"](i.length > 1 ? Array.prototype.slice.call(i) : i[0])
    }, t.prototype.log = function() {
        this.console("log", arguments)
    }, t.prototype.debug = function() {
        this.console("debug", arguments)
    }, t.prototype.warn = function() {
        this.console("warn", arguments)
    }, t.prototype.error = function() {
        this.console("error", arguments)
    }, t.prototype.dump = function() {
        return {
            $dom: this.$dom,
            isOldie: this.isOldie,
            touchEvents: this.touchEvents,
            debugMode: this.debugMode,
            autoInit: this.autoInit,
            uiModules: this.uiModules,
            click: this.click
        }
    }, t.prototype.selectAttr = function() {
        for (var t = 0; t < arguments.length; t++) {
            var i = arguments[t],
                e = "data-" + arguments[t],
                n = "gumby-" + arguments[t];
            if (this.is("[" + e + "]")) return this.attr(e) ? this.attr(e) : !0;
            if (this.is("[" + n + "]")) return this.attr(n) ? this.attr(n) : !0;
            if (this.is("[" + i + "]")) return this.attr(i) ? this.attr(i) : !0
        }
        return !1
    }, t.prototype.addInitalisation = function(t, i) {
        this.inits[t] = i
    }, t.prototype.initialize = function(t, i) {
        if ("object" == typeof t) {
            var e = 0;
            for (e; e < t.length; e++) this.inits[t[e]] && "function" == typeof this.inits[t[e]] ? this.inits[t[e]](i) : this.error("Error initializing module: " + t[e])
        } else this.inits[t] && "function" == typeof this.inits[t] ? this.inits[t](i) : this.error("Error initializing module: " + t);
        return this
    }, t.prototype.UIModule = function(t) {
        var i = t.module;
        this.uiModules[i] = t
    }, t.prototype.initUIModules = function(t) {
        var i, e, n = this.uiModules;
        t && (n = t);
        for (i in n) e = t ? n[i] : i, this.uiModules[e].init()
    }, window.Gumby = new t
}(), ! function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing Checkbox", t), this.$el = t, this.$input = this.$el.find("input[type=checkbox]");
        var i = this;
        this.$el.on(Gumby.click, function(t) {
            t.stopImmediatePropagation(), t.preventDefault(), i.$input.is("[disabled]") || (i.$el.hasClass("checked") ? i.update(!1) : i.update(!0))
        }).on("gumby.check", function() {
            Gumby.debug("Check event triggered", i.$el), i.update(!0)
        }).on("gumby.uncheck", function() {
            Gumby.debug("Uncheck event triggered", i.$el), i.update(!1)
        }), (this.$input.prop("checked") || this.$el.hasClass("checked")) && i.update(!0)
    }
    t.prototype.update = function(t) {
        var i = this.$el.find("span");
        t ? (Gumby.debug("Checking Checkbox", this.$el), i.append('<i class="icon-check" />'), this.$input.prop("checked", !0), Gumby.debug("Triggering onCheck event", this.$el), Gumby.debug("Triggering onChange event", this.$el), this.$el.addClass("checked").trigger("gumby.onCheck").trigger("gumby.onChange")) : (Gumby.debug("Unchecking Checkbox", this.$el), this.$input.prop("checked", !1), i.find("i").remove(), Gumby.debug("Triggering onUncheck event", this.$el), Gumby.debug("Triggering onChange event", this.$el), this.$el.removeClass("checked").trigger("gumby.onUncheck").trigger("gumby.onChange"))
    }, Gumby.addInitalisation("checkbox", function() {
        $(".checkbox").each(function() {
            var i = $(this);
            return i.data("isCheckbox") ? !0 : (i.data("isCheckbox", !0), new t(i), void 0)
        })
    }), Gumby.UIModule({
        module: "checkbox",
        events: ["onCheck", "onUncheck", "onChange", "check", "uncheck"],
        init: function() {
            Gumby.initialize("checkbox")
        }
    })
}(), ! function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing Fixed Position", t), this.$el = t, this.fixedPoint = "", this.pinPoint = !1, this.offset = 0, this.pinOffset = 0, this.top = 0, this.constrainEl = !0, this.state = !1, this.measurements = {
            left: 0,
            width: 0
        }, this.setup();
        var i = this;
        $(window).on("scroll load", function() {
            i.monitorScroll()
        }), this.$el.on("gumby.initialize", function() {
            Gumby.debug("Re-initializing Fixed Position", t), i.setup(), i.monitorScroll()
        })
    }
    t.prototype.setup = function() {
        var t = this;
        this.fixedPoint = this.parseAttrValue(Gumby.selectAttr.apply(this.$el, ["fixed"])), this.pinPoint = Gumby.selectAttr.apply(this.$el, ["pin"]) || !1, this.offset = Number(Gumby.selectAttr.apply(this.$el, ["offset"])) || 0, this.pinOffset = Number(Gumby.selectAttr.apply(this.$el, ["pinoffset"])) || 0, this.top = Number(Gumby.selectAttr.apply(this.$el, ["top"])) || 0, this.constrainEl = Gumby.selectAttr.apply(this.$el, ["constrain"]) || !0, "false" === this.constrainEl && (this.constrainEl = !1), this.$parent = this.$el.parents(".columns, .column, .row"), this.$parent = this.$parent.length ? this.$parent.first() : !1, this.parentRow = this.$parent ? !!this.$parent.hasClass("row") : !1, this.pinPoint && (this.pinPoint = this.parseAttrValue(this.pinPoint)), this.$parent && this.constrainEl && (this.measure(), $(window).resize(function() {
            t.state && (t.measure(), t.constrain())
        }))
    }, t.prototype.monitorScroll = function() {
        var t = $(window).scrollTop(),
            i = this.fixedPoint instanceof jQuery ? this.fixedPoint.offset().top : this.fixedPoint,
            e = !1;
        this.pinPoint && (e = this.pinPoint instanceof jQuery ? this.pinPoint.offset().top : this.pinPoint), this.offset && (i -= this.offset), this.pinOffset && (e -= this.pinOffset), t >= i && "fixed" !== this.state ? (!e || e > t) && this.fix() : i > t && "fixed" === this.state ? this.unfix() : e && t >= e && "pinned" !== this.state && this.pin()
    }, t.prototype.fix = function() {
        Gumby.debug("Element has been fixed", this.$el), Gumby.debug("Triggering onFixed event", this.$el), this.state = "fixed", this.$el.css({
            top: 0 + this.top
        }).addClass("fixed").removeClass("unfixed pinned").trigger("gumby.onFixed"), this.$parent && this.constrain()
    }, t.prototype.unfix = function() {
        Gumby.debug("Element has been unfixed", this.$el), Gumby.debug("Triggering onUnfixed event", this.$el), this.state = "unfixed", this.$el.addClass("unfixed").removeClass("fixed pinned").trigger("gumby.onUnfixed")
    }, t.prototype.pin = function() {
        Gumby.debug("Element has been pinned", this.$el), Gumby.debug("Triggering onPinned event", this.$el), this.state = "pinned", this.$el.css({
            top: this.$el.offset().top
        }).addClass("pinned fixed").removeClass("unfixed").trigger("gumby.onPinned")
    }, t.prototype.constrain = function() {
        Gumby.debug("Constraining element", this.$el), this.$el.css({
            left: this.measurements.left,
            width: this.measurements.width
        })
    }, t.prototype.measure = function() {
        var t, i = this.$parent.offset();
        this.measurements.left = i.left, this.measurements.width = this.$parent.width(), this.parentRow && (t = Number(this.$parent.css("paddingLeft").replace(/px/, "")), t && (this.measurements.left += t))
    }, t.prototype.parseAttrValue = function(t) {
        if ($.isNumeric(t)) return Number(t);
        if ("top" === t) return this.$el.offset().top;
        var i = $(t);
        return i.length ? i : (Gumby.error("Cannot find Fixed target: " + t), !1)
    }, Gumby.addInitalisation("fixed", function(i) {
        $("[data-fixed],[gumby-fixed],[fixed]").each(function() {
            var e = $(this);
            return e.data("isFixed") && !i ? !0 : e.data("isFixed") && i ? (e.trigger("gumby.initialize"), !0) : (e.data("isFixed", !0), new t(e), void 0)
        })
    }), Gumby.UIModule({
        module: "fixed",
        events: ["initialize", "onFixed", "onUnfixed"],
        init: function() {
            Gumby.initialize("fixed")
        }
    })
}(), ! function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing Navbar", t), this.$el = t, this.$dropDowns = this.$el.find("li:has(.dropdown)");
        var i = this;
        this.$dropDowns.on(Gumby.click, this.toggleDropdown).on("swiperight", this.openLink), "#" !== this.$dropDowns.children("a").attr("href") && this.$dropDowns.children("a").append('<i class="icon-popup"></i>').children("i").on(Gumby.click, this.openLink), this.$dropDowns.find(".dropdown li:not(:has(.dropdown)) a[href]").on(Gumby.click, this.openLink), $(window).on("mousemove touchstart", function(t) {
            t.stopImmediatePropagation(), "mousemove" === t.type && i.$dropDowns.on("mouseover mouseout", i.toggleDropdown)
        })
    }
    Gumby.gumbyTouch && (t.prototype.toggleDropdown = function(t) {
        t.stopImmediatePropagation(), t.preventDefault();
        var i = $(this);
        i.hasClass("active") ? i.removeClass("active") : i.addClass("active")
    }, t.prototype.openLink = function(t) {
        t.stopImmediatePropagation(), t.preventDefault();
        var i, e = $(this),
            n = e;
        e.is("i") ? n = e.parent("a") : e.is("li") && (n = e.children("a")), i = n.attr("href"), "blank" == n.attr("target") ? window.open(i) : window.location = i
    }, Gumby.addInitalisation("navbar", function() {
        $(".navbar").each(function() {
            var i = $(this);
            return i.data("isNavbar") ? !0 : (i.data("isNavbar", !0), new t(i), void 0)
        })
    }), Gumby.UIModule({
        module: "navbar",
        events: [],
        init: function() {
            Gumby.initialize("navbar")
        }
    }))
}(), ! function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing Radio Button", t), this.$el = t, this.$input = this.$el.find("input[type=radio]");
        var i = this;
        this.$el.on(Gumby.click, function(t) {
            t.stopImmediatePropagation(), t.preventDefault(), i.$input.is("[disabled]") || i.update()
        }).on("gumby.check", function() {
            Gumby.debug("Check event triggered", i.$el), i.update()
        }), (this.$input.prop("checked") || this.$el.hasClass("checked")) && i.update(!0)
    }
    t.prototype.update = function() {
        if (!(this.$el.hasClass("checked") && this.$input.prop("checked") && this.$el.find("i.icon-dot").length)) {
            Gumby.debug("Updating Radio Button group", this.$el);
            var t = this.$el.find("span"),
                i = 'input[name="' + this.$input.attr("name") + '"]';
            $(".radio").has(i).removeClass("checked").find("input").prop("checked", !1).end().find("i").remove(), this.$input.prop("checked", !0), t.append('<i class="icon-dot" />'), Gumby.debug("Triggering onCheck event", this.$el), this.$el.addClass("checked").trigger("gumby.onCheck")
        }
    }, Gumby.addInitalisation("radiobtn", function() {
        $(".radio").each(function() {
            var i = $(this);
            return i.data("isRadioBtn") ? !0 : (i.data("isRadioBtn", !0), new t(i), void 0)
        })
    }), Gumby.UIModule({
        module: "radiobtn",
        events: ["onChange", "check"],
        init: function() {
            Gumby.initialize("radiobtn")
        }
    })
}(), ! function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing Retina", t), this.$el = t, this.imageSrc = this.$el.attr("src"), this.retinaSrc = this.fetchRetinaImage(), this.$retinaImg = $(new Image);
        var i = this;
        return this.retinaSrc ? (this.$retinaImg.attr("src", this.retinaSrc).load(function() {
            i.retinaImageLoaded()
        }).error(function() {
            Gumby.error("Couln't load retina image: " + i.retinaSrc)
        }), void 0) : !1
    }
    t.prototype.fetchRetinaImage = function() {
        var t = this.imageSrc,
            i = this.imageSrc.search(/(\.|\/)(gif|jpe?g|png)$/i);
        return 0 > i ? !1 : t.substr(0, i) + "@2x" + t.substr(i, t.length)
    }, t.prototype.retinaImageLoaded = function() {
        Gumby.debug("Swapping image for retina version", this.$el), Gumby.debug("Triggering onRetina event", this.$el), this.$el.attr("src", this.$retinaImg.attr("src")).trigger("gumby.onRetina")
    }, Gumby.addInitalisation("retina", function() {
        !window.devicePixelRatio || window.devicePixelRatio <= 1 || $("img[data-retina],img[gumby-retina],img[retina]").each(function() {
            var i = $(this);
            return i.data("isRetina") ? !0 : (i.data("isRetina", !0), new t(i), void 0)
        })
    }), Gumby.UIModule({
        module: "retina",
        events: ["onRetina"],
        init: function() {
            Gumby.initialize("retina")
        }
    })
}(), ! function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing Skiplink", t), this.$el = t, this.targetPos = 0, this.duration = 0, this.offset = !1, this.easing = "", this.update = !1, this.setup();
        var i = this;
        this.$el.on(Gumby.click + " gumby.skip", function(t) {
            t.stopImmediatePropagation(), t.preventDefault(), "skip" === t.namespace && Gumby.debug("Skip event triggered", i.$el), i.update ? i.calculateTarget(i.skipTo) : i.skipTo()
        }).on("gumby.initialize", function() {
            Gumby.debug("Re-initializing Skiplink", i.$el), i.setup()
        })
    }
    t.prototype.setup = function() {
        this.duration = Number(Gumby.selectAttr.apply(this.$el, ["duration"])) || 200, this.offset = Gumby.selectAttr.apply(this.$el, ["offset"]) || !1, this.easing = Gumby.selectAttr.apply(this.$el, ["easing"]) || "swing", this.update = Gumby.selectAttr.apply(this.$el, ["update"]) ? !0 : !1, this.calculateTarget()
    }, t.prototype.calculateTarget = function(t) {
        var i, e = Gumby.selectAttr.apply(this.$el, ["goto"]);
        if ("top" == e) this.targetPos = 0;
        else if ($.isNumeric(e)) this.targetPos = Number(e);
        else {
            if (i = $(e), !i.length) return Gumby.error("Cannot find skiplink target: " + e), !1;
            this.targetPos = i.offset().top
        }
        t && t.apply(this)
    }, t.prototype.skipTo = function() {
        Gumby.debug("Skipping to target", this.$el);
        var t = this;
        $("html,body").animate({
            scrollTop: this.calculateOffset()
        }, this.duration, this.easing).promise().done(function() {
            Gumby.debug("Triggering onComplete event", t.$el), t.$el.trigger("gumby.onComplete")
        })
    }, t.prototype.calculateOffset = function() {
        if (!this.offset) return this.targetPos;
        var t = this.offset.substr(0, 1),
            i = Number(this.offset.substr(1, this.offset.length));
        return "-" === t ? this.targetPos - i : "+" === t ? this.targetPos + i : void 0
    }, Gumby.addInitalisation("skiplink", function(i) {
        $(".skiplink > a, .skip").each(function() {
            var e = $(this);
            return e.data("isSkipLink") && !i ? !0 : e.data("isSkipLink") && i ? (e.trigger("gumby.initialize"), !0) : (e.data("isSkipLink", !0), new t(e), void 0)
        })
    }), Gumby.UIModule({
        module: "skiplink",
        events: ["initialize", "onComplete", "skip"],
        init: function() {
            Gumby.initialize("skiplink")
        }
    })
}(), ! function() {
    "use strict";

    function t(t) {
        Gumby.debug("Initializing Tabs", t), this.$el = t, this.$nav = this.$el.find("ul.tab-nav > li"), this.$content = this.$el.find(".tab-content");
        var i = this;
        this.$nav.children("a").on(Gumby.click, function(t) {
            t.stopImmediatePropagation(), t.preventDefault(), i.click($(this))
        }), this.$el.on("gumby.set", function(t, e) {
            Gumby.debug("Set event triggered", i.$el), i.set(t, e)
        })
    }
    t.prototype.click = function(t) {
        var i = t.parent().index();
        this.$nav.eq(i).add(this.$content.eq(i)).hasClass("active") || (Gumby.debug("Setting active tab to " + i, this.$el), this.$nav.add(this.$content).removeClass("active"), this.$nav.eq(i).add(this.$content.eq(i)).addClass("active"), Gumby.debug("Triggering onChange event", this.$el), this.$el.trigger("gumby.onChange", i))
    }, t.prototype.set = function(t, i) {
        this.$nav.eq(i).find("a").trigger(Gumby.click)
    }, Gumby.addInitalisation("tabs", function() {
        $(".tabs").each(function() {
            var i = $(this);
            return i.data("isTabs") ? !0 : (i.data("isTabs", !0), new t(i), void 0)
        })
    }), Gumby.UIModule({
        module: "tabs",
        events: ["onChange", "set"],
        init: function() {
            Gumby.initialize("tabs")
        }
    })
}(), ! function() {
    "use strict";

    function t(t) {
        this.$el = $(t), this.targets = [], this.on = "", this.$el.length && (Gumby.debug("Initializing Toggle", t), this.init())
    }

    function i(t) {
        this.$el = $(t), this.targets = [], this.on = "", this.$el.length && (Gumby.debug("Initializing Switch", t), this.init())
    }
    t.prototype.init = function() {
        var t = this;
        this.setup(), this.$el.on(this.on, function(i) {
            i.stopImmediatePropagation(), "A" === $(this).prop("tagName") && i.preventDefault(), t.trigger(t.triggered)
        }).on("gumby.trigger", function() {
            Gumby.debug("Trigger event triggered", t.$el), t.trigger(t.triggered)
        }).on("gumby.initialize", function() {
            Gumby.debug("Re-initializing " + t.constructor, $el), t.setup()
        })
    }, t.prototype.setup = function() {
        this.targets = this.parseTargets(), this.on = Gumby.selectAttr.apply(this.$el, ["on"]) || Gumby.click, this.className = Gumby.selectAttr.apply(this.$el, ["classname"]) || "active"
    }, t.prototype.parseTargets = function() {
        var t = Gumby.selectAttr.apply(this.$el, ["trigger"]),
            i = 0,
            e = [];
        return t ? (i = t.indexOf("|"), -1 === i ? this.checkTargets([t]) ? [$(t)] : !1 : (e = t.split("|"), this.checkTargets(e) ? e.length > 1 ? [$(e[0]), $(e[1])] : [$(e[0])] : !1)) : !1
    }, t.prototype.checkTargets = function(t) {
        var i = 0;
        for (i; i < t.length; i++)
            if (t[i] && !$(t[i]).length) return Gumby.error("Cannot find " + this.constructor.name + " target: " + t[i]), !1;
        return !0
    }, t.prototype.triggered = function() {
        Gumby.debug("Triggering onTrigger event", this.$el), this.$el.trigger("gumby.onTrigger", [this.$el.hasClass(this.className)])
    }, i.prototype = new t, i.prototype.constructor = i, t.prototype.trigger = function(t) {
        Gumby.debug("Triggering Toggle", this.$el), this.targets ? 1 == this.targets.length ? this.$el.add(this.targets[0]).toggleClass(this.className) : this.targets.length > 1 && (this.targets[0].hasClass(this.className) ? (this.$el.add(this.targets[0]).removeClass(this.className), this.targets[1].addClass(this.className)) : (this.targets[1].removeClass(this.className), this.$el.add(this.targets[0]).addClass(this.className))) : this.$el.toggleClass(this.className), t && "function" == typeof t && t.apply(this)
    }, i.prototype.trigger = function(t) {
        Gumby.debug("Triggering Switch", this.$el), this.targets ? 1 == this.targets.length ? this.$el.add(this.targets[0]).addClass(this.className) : this.targets.length > 1 && (this.$el.add(this.targets[0]).addClass(this.className), this.targets[1].removeClass(this.className)) : this.$el.addClass(this.className), t && "function" == typeof t && t.apply(this)
    }, Gumby.addInitalisation("toggles", function(i) {
        $(".toggle").each(function() {
            var e = $(this);
            return e.data("isToggle") && !i ? !0 : (e.data("isToggle") && i && e.trigger("gumby.initialize"), e.data("isToggle", !0), new t(e), void 0)
        })
    }), Gumby.addInitalisation("switches", function(t) {
        $(".switch").each(function() {
            var e = $(this);
            return e.data("isSwitch") && !t ? !0 : e.data("isSwitch") && t ? (e.trigger("gumby.initialize"), !0) : (e.data("isSwitch", !0), new i(e), void 0)
        })
    }), Gumby.UIModule({
        module: "toggleswitch",
        events: ["initialize", "trigger", "onTrigger"],
        init: function() {
            Gumby.initialize("switches"), Gumby.initialize("toggles")
        }
    })
}(), ! function(t) {
    "use strict";

    function i(t, i) {
        Gumby && Gumby.debug("Initializing Validation", t), this.$this = t, this.$field = this.$this.parents(".field"), this.req = i || function() {
            return !!this.$this.val().length
        };
        var e = this;
        this.$this.is("[type=checkbox], [type=radio]") ? (this.$field = this.$this.parent("label"), this.$field.on("gumby.onChange", function() {
            e.validate()
        })) : this.$this.is("select") ? (this.$field = this.$this.parents(".picker"), this.$field.on("change", function() {
            e.validate()
        })) : this.$this.on("blur", function(t) {
            9 !== t.which && e.validate()
        })
    }
    i.prototype.validate = function() {
        var t = this.req(this.$this);
        return t ? this.$field.removeClass("danger").addClass("success") : this.$field.removeClass("success").addClass("danger"), t
    }, t.fn.validation = function(e) {
        var n = t.extend({
                submit: !1,
                fail: !1,
                required: []
            }, e),
            s = [];
        return this.each(function() {
            if (!n.required.length) return !1;
            var e, o = t(this),
                a = n.required.length;
            for (e = 0; a > e; e++) s.push(new i(o.find('[name="' + n.required[e].name + '"]'), n.required[e].validate || !1));
            o.on("submit", function(t) {
                var i = !1;
                if (!o.data("passed")) {
                    t.preventDefault();
                    var e, a = s.length;
                    for (e = 0; a > e; e++) s[e].validate() || (i = !0);
                    if (i) {
                        if (n.fail && "function" == typeof n.fail) return n.fail(), void 0
                    } else {
                        if (n.submit && "function" == typeof n.submit) return n.submit(o.serializeArray()), void 0;
                        o.data("passed", !0).submit()
                    }
                }
            })
        })
    }
}(jQuery), Gumby.autoInit && (Gumby.debug("Gumby auto initialization"), window.Gumby.init()), "function" == typeof define && define.amd && define(window.Gumby);
