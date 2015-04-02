var notSupportedBrowsers = [{
        os: "Any",
        browser: "MSIE",
        version: 9
    }, {
        os: "Any",
        browser: "Firefox",
        version: 1
    }],
    supportedBrowsers = [],
    BrowserDetection = {
        init: function() {
            if ((null == notSupportedBrowsers || notSupportedBrowsers.length < 1) && (notSupportedBrowsers = this.defaultNotSupportedBrowsers), this.detectBrowser(), this.detectOS(), "" != this.browser && "Unknown" != this.browser && "" != this.os && "Unknown" != this.os && "" != this.browserVersion && 0 != this.browserVersion) {
                for (var e = !1, t = 0; t < notSupportedBrowsers.length; t++)
                    if (("Any" == notSupportedBrowsers[t].os || notSupportedBrowsers[t].os == this.os) && ("Any" == notSupportedBrowsers[t].browser || notSupportedBrowsers[t].browser == this.browser) && ("Any" == notSupportedBrowsers[t].version || this.browserVersion <= parseFloat(notSupportedBrowsers[t].version))) {
                        e = !0;
                        break
                    }
                e && this.displayNotice()
            }
        },
        getEl: function(e) {
            return window.document.getElementById(e)
        },
        getElSize: function(e) {
            var t = this.getEl(e);
            return null == t ? null : {
                width: parseInt(t.offsetWidth),
                height: parseInt(t.offsetHeight)
            }
        },
        getWindowSize: function() {
            return "undefined" != typeof window.innerWidth ? {
                width: parseInt(window.innerWidth),
                height: parseInt(window.innerHeight)
            } : 0 != window.document.documentElement.clientWidth ? {
                width: parseInt(window.document.documentElement.clientWidth),
                height: parseInt(window.document.documentElement.clientHeight)
            } : {
                width: parseInt(window.document.body.clientWidth),
                height: parseInt(window.document.body.clientHeight)
            }
        },
        displayNotice: function() {
            this.writeNoticeCode(), document.getElementById("close").onclick = function() {
                document.getElementById("close").parentNode.style.display = "none", document.getElementById("black_overlay").display = "none"
            }
        },
        writeNoticeCode: function() {
            var e = "Out of date browser detected!",
                t = "Unfortunately, LibCrowds is not compatible with your browser. If you choose to continue, without upgrading, your experience while using this website is likely to be deeply unpleasant.",
                r = "We strongly recommend that you upgrade now, via one of the links below, thank you.",
                o = null,
                s = '<div id="black_overlay"></div><div class="hcenter text-center"><div id="browser-detection"><a class="close" id="close">x</a>';
            t = t.replace("\n", '</p><p class="bd-notice">'), t = t.replace("{browser_name}", this.browser + " " + this.browserVersion), s += "<h2>" + e + '</h2><p class="padding-bottom-sm">' + t + "</p><br><p><b>" + r + "</b></p>", o = supportedBrowsers.length > 0 ? supportedBrowsers : this.supportedBrowsers, s += '<ul class="bd-browsers-list">';
            for (var n = 0; n < o.length; n++) s += '<li class="' + o[n].cssClass + '"><a href="' + o[n].downloadUrl + '" target="_blank"></a></li>';
            s += "</ul>", s += "</div></div>", window.document.body.innerHTML += s
        },
        detectBrowser: function() {
            this.browser = "", this.browserVersion = 0, /Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent) ? this.browser = "Opera" : /MSIE (\d+\.\d+);/.test(navigator.userAgent) ? this.browser = "MSIE" : /Navigator[\/\s](\d+\.\d+)/.test(navigator.userAgent) ? this.browser = "Netscape" : /Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent) ? this.browser = "Chrome" : /Safari[\/\s](\d+\.\d+)/.test(navigator.codeuserAgent) ? (this.browser = "Safari", /Version[\/\s](\d+\.\d+)/.test(navigator.userAgent), this.browserVersion = new Number(RegExp.$1)) : /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) && (this.browser = "Firefox"), "" == this.browser ? this.browser = "Unknown" : 0 == this.browserVersion && (this.browserVersion = parseFloat(new Number(RegExp.$1)))
        },
        detectOS: function() {
            for (var e = 0; e < this.operatingSystems.length; e++)
                if (-1 != this.operatingSystems[e].searchString.indexOf(this.operatingSystems[e].subStr)) return void(this.os = this.operatingSystems[e].name);
            this.os = "Unknown"
        },
        noticeHeight: 0,
        browser: "",
        os: "",
        browserVersion: "",
        supportedBrowsers: [{
            cssClass: "firefox",
            name: "Mozilla Firefox",
            downloadUrl: "http://www.getfirefox.com/"
        }, {
            cssClass: "chrome",
            name: "Google Chrome",
            downloadUrl: "http://www.google.com/chrome/"
        }, {
            cssClass: "msie",
            name: "Internet Explorer",
            downloadUrl: "http://www.getie.com/"
        }, {
            cssClass: "opera",
            name: "Opera",
            downloadUrl: "http://www.opera.com/"
        }, {
            cssClass: "safari",
            name: "Apple Safari",
            downloadUrl: "http://www.apple.com/safari/"
        }],
        operatingSystems: [{
            searchString: navigator.platform,
            name: "Windows",
            subStr: "Win"
        }, {
            searchString: navigator.platform,
            name: "Mac",
            subStr: "Mac"
        }, {
            searchString: navigator.platform,
            name: "Linux",
            subStr: "Linux"
        }, {
            searchString: navigator.userAgent,
            name: "iPhone",
            subStr: "iPhone/iPod"
        }],
        defaultNotSupportedBrowsers: [{
            os: "Any",
            browser: "MSIE",
            version: 6
        }]
    };
window.onload = function() {
    BrowserDetection.init()
};