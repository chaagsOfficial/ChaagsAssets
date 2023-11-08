/*** Initial ***/
// Check Element Has Attr
$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};
// get element attrs
(function (old) {
    $.fn.attrs = function () {
        if (arguments.length === 0) {
            if (this.length === 0) {
                return null;
            }

            var obj = {};
            $.each(this[0].attributes, function () {
                if (this.specified) {
                    obj[this.name] = this.value;
                }
            });
            return obj;
        }

        return old.apply(this, arguments);
    };
})($.fn.attrs);

// trim
String.prototype.chTrim = function () {
    return this.replace(/ +(?= )/g, "").trim();
};

/** Functions **/
// random integer
function chLibRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function chLibRange(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}


// Generate String
function chLibGenerateString(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
        counter += 1;
    }
    return result;
}

// check variable
function chLibIsset(variable) {
    return typeof variable !== "undefined";
}
// trim text
function chLibTrim(value) {
    if (Array.isArray(value)) {
        var values = [];
        for (var i = 0; i < value.length; i++) {
            if (value[i].trim().length > 0) {
                values.push(value[i].trim());
            }
        }

        return values;
    } else {
        return value.chTrim();
    }
}
// random integer
function chLibRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// loading Card
function chLibLoadingCardStart(element) {
    const HTMLloading =
        '<div class="overlay-loading"><style> .overlay-loading {left: 0;top: 0;width: 100%;height: 100%;position: absolute;z-index: 10000000;background: rgb(34 34 34 / 60%);}.overlay-loading__inner {left: 0;top: 0;width: 100%;height: 100%;position: absolute;}.overlay-loading__content {left: 50%;position: absolute;top: 50%;transform: translate(-50%, -50%);}.overlay-loading .spinner {width: 75px;height: 75px;display: inline-block;border-width: 2px;border-color: rgba(255, 255, 255, 0.05);border-top-color: #fff;animation: spin 1s infinite linear;border-radius: 100%;border-style: solid;}@keyframes spin {100% {transform: rotate(360deg);}}.overlay-loading {left: 0;top: 0;width: 100%;height: 100%;position: absolute;z-index: 1000;background: rgb(34 34 34 / 60%);}.overlay-loading__inner {left: 0;top: 0;width: 100%;height: 100%;position: absolute;}.overlay-loading__content {left: 50%;position: absolute;top: 50%;transform: translate(-50%, -50%);}.overlay-loading .spinner {width: 75px;height: 75px;display: inline-block;border-width: 2px;border-color: rgba(255, 255, 255, 0.05);border-top-color: #fff;animation: spin 1s infinite linear;border-radius: 100%;border-style: solid;}@keyframes spin {100% {transform: rotate(360deg);}}</style><div class="overlay-loading__inner"><div class="overlay-loading__content"><span class="spinner" style="background: transparent;"></span></div></div></div>';
    element.prepend(HTMLloading);
}
function chLibLoadingCardStop(element) {
    element.find(".overlay-loading").remove();
}
// check string is arabic or not
function chLibCheckArabic(string) {
    var arabic = /[\u0600-\u06FF]/;

    return arabic.test(string);
}
// set direction of inputs
function chLibGetDirection(_this_, left = "", right = "") {
    var arabic = /[\u0600-\u06FF]/;
    var tagInput = _this_.prop("tagName").toLowerCase();

    if (["input", "textarea", "select"].includes(tagInput)) {
        var values = _this_.val();
        if (tagInput == "select") {
            if (Array.isArray(values)) {
                values = values[0];
            }
            values = _this_
                .find("option[value='" + values + "']")
                .text()
                .trim();
        }

        var string = values;

        if (
            string.trim().length == 0 &&
            typeof _this_.attr("placeholder") !== "undefined"
        ) {
            string = _this_.attr("placeholder").trim();
        }
    } else {
        var string = _this_.text().trim();
    }

    if (string.trim().length > 0) {
        _this_.removeClass("text-right text-left text-start text-end");

        if (arabic.test(string)) {
            _this_.css({
                direction: "rtl",
                "text-align": "right",
            });
        } else {
            _this_.css({
                direction: "ltr",
                "text-align": "left",
            });
        }
    }
}

function chLibSetAllDirections() {
    $(".chLib-dir").each(function () {
        chLibGetDirection($(this));
    });
}

// add parameter to url
function chLibURLSetParameter(url = false, key, value) {
    if (url == false) {
        url = location.href;
    }

    var getURL = new URL(url);
    getURL.searchParams.set(key, value);

    return getURL.toString();
}

// append parameter to url
function chLibURLAppendParameter(url = false, key, value) {
    if (url == false) {
        url = location.href;
    }

    var getURL = new URL(url);
    getURL.searchParams.append(key, value);

    return getURL.toString();
}

// delete all parameters from url
function chLibURLRemoveParameters(url, key, value) {
    getURL = url;
    getURL = getURL.split("?")[0];

    return getURL;
}

// delete parameter from url
function chLibURLRemoveParameter(sourceURL, key) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString =
            sourceURL.indexOf("?") !== -1 ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

// set new url without reloading
function chLibSetNewUrl(url) {
    window.history.pushState([], "", url);
}

//  get random of array
function chLibItemOfArray(array, gen_nums) {
    var rand = Math.floor(Math.random() * array.length);
    if (gen_nums.indexOf(rand) < 0) {
        gen_nums.push(rand);
        return rand;
    }
    return chLibItemOfArray(array, gen_nums);
}

function chLibArrayMerge(firstArray, secArray) {

    $.each(secArray, function(key, data) {
        firstArray[key] = data;
    });

    return firstArray;
}

function chLibDecodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// placeholder animation
// Add something to given element placeholder
function chLibAddToPlaceholder(toAdd, el) {
    el.attr("placeholder", el.attr("placeholder") + toAdd);
    // Delay between symbols "typing"
    return new Promise((resolve) => setTimeout(resolve, 100));
}

// Cleare placeholder attribute in given element
function chLibClearPlaceholder(el) {
    el.attr("placeholder", "");
}

// Print one phrase
function chLibPrintPhrase(phrase, el) {
    return new Promise((resolve) => {
        // Clear placeholder before typing next phrase
        chLibClearPlaceholder(el);
        let letters = phrase.split("");
        // For each letter in phrase
        letters.reduce(
            (promise, letter, index) =>
                promise.then((_) => {
                    // Resolve promise when all letters are typed
                    if (index === letters.length - 1) {
                        // Delay before start next phrase "typing"
                        setTimeout(resolve, 1000);
                    }
                    return chLibAddToPlaceholder(letter, el);
                }),
            Promise.resolve()
        );
    });
}

// Print given phrases to element
function chLibPrintPhrases(phrases, el) {
    // For each phrase
    // wait for phrase to be typed
    // before start typing next
    phrases.reduce(
        (promise, phrase) => promise.then((_) => chLibPrintPhrase(phrase, el)),
        Promise.resolve()
    );
}

// detected color of text
function chLibPickTextColorBasedOnBgColorSimple(
    bgColor,
    lightColor = "white",
    darkColor = "black"
) {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function chLibRgbToHex(color) {
    if (color.indexOf("rgb") < 0) {
        return color;
    }
    color = color.replaceAll("rgb", "");
    color = color.replaceAll("(", "");
    color = color.replaceAll(")", "");

    var els = color.split(",");
    var r = parseInt(els[0]);
    var g = parseInt(els[1]);
    var b = parseInt(els[2]);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function chLibHexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? "rgb(" +
              parseInt(result[1], 16) +
              "," +
              parseInt(result[2], 16) +
              "," +
              parseInt(result[3], 16) +
              ")"
        : null;
}

function chLibArrayPrepend(array, value) {
    var newArray = array.slice();
    newArray.unshift(value);
    return newArray;
}
// events
$("body").on("keyup keypress keydown change", ".chLib-dir", function () {
    chLibGetDirection($(this));
});

$(".chLib-dir").trigger("change");
chLibSetAllDirections();
