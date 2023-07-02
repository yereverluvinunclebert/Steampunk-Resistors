/*
        Resistors - A special purpose calculator to decode the colored bands on
        resistors (and small capacitors).
        Copyright © 2004-2020 Dean Beedell and Harry Whitfield

        This program is free software; you can redistribute it and/or modify it under
        the terms of the GNU General Public License as published by the Free Software
        Foundation; either version 2 of the License, or (at your option) any later
        version.

        This program is distributed in the hope that it will be useful, but WITHOUT ANY
        WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
        PARTICULAR PURPOSE.  See the GNU General Public License for more details.

        You should have received a copy of the GNU General Public License along with
        this program; if not, write to the Free Software Foundation, Inc., 51 Franklin
        St, Fifth Floor, Boston, MA  02110-1301  USA

        Resistors - version 3.0
        25 April, 2020 Dean Beedell and Harry Whitfield
        mailto:g6auc@arrl.net
*/

/*jslint for, this */

/* global buildVitality, resValue, main_window */

/*property
    MouseWheelPref, alignment, bandsPref, bgColor, checked, color,
    componentImagePref, componentPref, contextMenuItems, ctrlKey, data,
    editable, enabled, font, fontsize, hAlign, hOffset, hRegistrationPoint,
    height, index, internationalPref, length, lines, maxLength, maxWidthPref,
    minLength, onMouseDown, onMouseUp, onMouseWheel, onPreferencesChanged,
    onSelect, opacity, open, pow, push, round, scrollDelta, scrollbar, shadow,
    size, src, style, ticks, title, toPrecision, toString, tooltip, vAlign,
    vOffset, vRegistrationPoint, value, visible, width, window, wrap, zOrder,
    zorder
*/

"use strict";

//var resValue;
var main_window;
var createLicence;
var displayLicence;
var buildVitality;
var buildSwatches;
var findWidget;

var mBand = Number(preferences.bandsPref.value);
var band = 1;   // takes values 1..4 and represents the state of the state machine
var value = 0;
var key = [];
var bands = [];

var colors = [
    "#000000", "#812900", "#FF0000", "#FF6E00", "#FFFB0A", "#37FF10", "#140CFF", "#E400FF", "#8D8D8D", "#FFFFFF", "#FFC400", "#CECECE"
];
var tooltips = [
    "black x 1", "brown x 10  1% (F)  100ppm", "red x 100  2% (G)  50ppm", "orange x 1000  15ppm", "yellow x 10,000  25ppm", "green x 100,000  0.5% (D)",
    "blue x 1,000,000  0.25% (C)", "violet x 10,000,000  0.1% (B)", "gray x 100,000,000  0.05% (A)", "white x 1,000,000,000", "gold", "silver"
];

var debugFlg = 1;

var buzzer = "Resources/buzzer.mp3";
var ting = "Resources/ting.mp3";
var lock = "Resources/lock.mp3";
var winding = "Resources/winding.mp3";
var cReturn = "Resources/creturn.mp3";
var keyPress = "Resources/keypress-quiet.mp3";
var steamSound = "Resources/steamsound.mp3";

var widgetName = "Steampunk Resistors";

var debugFlg = "";

var Scale = Number(preferences.maxWidthPref.value) / 100;       // sets global scale because it is used elsewhere

function show(value, multiplier, unit) {    // multiplier -2..1
    var ls;
    var ms;

    if (value > 99) {   // occurs when mBand === 4
        switch (multiplier) {
        case 1:
            return value + unit;
        case 0:
            ls = value % 10;
            ms = Math.round((value - ls) / 10);
            return ms + unit + ls;
        case -1:
            ls = value % 100;
            ms = Math.round((value - ls) / 100);
            ls = String(ls);
            if (ls.length === 1) {
                ls = "0" + ls;
            }
            return ms + unit + ls;
        default:
            play(buzzer, false);
            return "";
        }
    }
    // occurs when mBand === 3
    switch (multiplier) {
    case 1:
        return 10 * value + unit;
    case 0:
        return value + unit;
    case -1:
        ls = value % 10;
        ms = Math.round((value - ls) / 10);
        return ms + unit + ls;
    case -2:
        return "0" + unit + value;
    default:
        play(buzzer, false);
        return "";
    }
}

function internationalFormat(value, multiplier) {   // multiplier -2..9
    var prefix = ["p", "n", "µ", "m", "R", "k", "M", "G"];
    var prBase = 0;

    if (preferences.componentPref.value === "Resistor") {
        prBase = 4;
    }

    if (value > 99) {
        multiplier += 1;
    }    // occurs when mBand === 4

    if (multiplier >= 8) {
        return show(value, multiplier - 9, prefix[prBase + 3]);
    }
    if (multiplier >= 5) {
        return show(value, multiplier - 6, prefix[prBase + 2]);
    }
    if (multiplier >= 2) {
        return show(value, multiplier - 3, prefix[prBase + 1]);
    }
    return show(value, multiplier, prefix[prBase]);
}

function display(value, multiplier) {   // multiplier -2..9
    var strValue;
    var temp = value;
    var color4;
    var bColor4;

    if (preferences.internationalPref.value === "0") {  // use integer format
        temp = temp * Math.pow(10, multiplier);
        if (multiplier < 0) {
            strValue = temp.toPrecision(mBand - 1);
        } else {
            strValue = temp.toString();
        }
        resValue.data = strValue;
//      if (multiplier > 7) { strValue = internationalFormat(value, multiplier); }
//      resValue.data = strValue;
    } else {    // use international format
        strValue = internationalFormat(value, multiplier);
        resValue.data = strValue;
    }
    color4 = undefined;
    bColor4 = undefined;
    if (mBand === 4) {
        color4 = colors[bands[4]];
        bColor4 = bands[4];
    }
    buildVitality(strValue, colors[bands[1]], colors[bands[2]], colors[bands[3]], color4);
    buildSwatches(bands[1], bands[2], bands[3], bColor4);
}

function process() {// handles keys 0 to 9
    var s = this.index;

    this.opacity = 127;

    switch (band) {
    case 1:
        if (s !== 0) {
            buildVitality("", "#445663", "#445663", "#445663", "#445663");
            buildSwatches();
            bands[1] = Number(s);
            resValue.data = s;
            value = Number(s);
            band = 2;
            play(keyPress, false);
            return;
        }
        if (preferences.componentPref.value === "Resistor") {
            buildVitality("0", "#000000", "#445663", "#445663", "#445663");
            buildSwatches(0);
            resValue.data = (
                preferences.internationalPref.value === "0"
                ? "0"
                : "0R"
            );
            play(keyPress, false);
            return;
        }
        buildVitality("", "#445663", "#445663", "#445663", "#445663");
        buildSwatches(0);
        resValue.data = "";
        play(buzzer, false);
        return;
    case 2:
        bands[2] = Number(s);
        resValue.data += s;
        value = 10 * value + Number(s);
        band = 3;
        play(keyPress, false);
        return;
    case 3:
        bands[3] = Number(s);
        if (mBand === 3) {
            display(value, Number(s));
            band = 1;
            play(keyPress, false);
            return;
        }
        resValue.data += s;
        value = 10 * value + Number(s);
        band = 4;
        play(keyPress, false);
        return;
    case 4:
        bands[4] = Number(s);
        display(value, Number(s));
        band = 1;
        play(keyPress, false);
        return;
    default:
        play(buzzer, false);
        return; // invalid state
    }
}

function processStarHash() { // handles the * and # keys
    var multiplier = this.index;

    this.opacity = 127;
    if (band === mBand) {
        bands[band] = 9 - multiplier;
        display(value, multiplier);
        band = 1;
        play(keyPress, false);
    } else {
        play(buzzer, false);
    }
}

function processClear() { // handles the CLEAR key
    this.opacity = 127;
    resValue.data = "";
    buildVitality("", "#445663", "#445663", "#445663", "#445663");
    buildSwatches();
    band = 1;
    play(cReturn, false);
}

function setOpacity255() {
    this.opacity = 255;
}

function makeKeys() { //creates the images for keys 0 to 9
    var coords = [[66, 191], [26, 71], [66, 71], [106, 71], [26, 111], [66, 111], [106, 111], [26, 151], [66, 151], [106, 151]];
    var i;

    for (i = 0; i < 10; i += 1) {
        key[i] = new Image();
        key[i].window = main_window;
        key[i].src = "Resources/Pictures/" + i + ".png";
        key[i].alignment = "left";
        key[i].hOffset = coords[i][0];
        key[i].vOffset = coords[i][1];
        key[i].index = i;
        key[i].opacity = 255;
        key[i].onMouseUp = setOpacity255;
        key[i].onMouseDown = process;
        key[i].tooltip = tooltips[i];
        key[i].zOrder = 5;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////

function newWindow(title, width, height, shadow, visible) {
    var w = new Window();

    w.title = title;
    w.width = width;
    w.height = height;
    w.shadow = shadow;
    w.visible = visible;
    return w;
}

function newImage(window, src, width, height, hAlign, vAlign, hOffset, vOffset, opacity, zOrder) {
    var i = new Image(window);

    i.src = src;
    i.width = width;
    i.height = height;
    i.hAlign = hAlign;
    i.vAlign = vAlign;
    i.hOffset = hOffset;
    i.vOffset = vOffset;
    i.opacity = opacity;
    i.zOrder = zOrder;
    return i;
}

function newText(window, width, lines, hAlign, vAlign, hOffset, vOffset, opacity, zorder) {
    var t = new Text(window);

    t.width = width;
    t.lines = lines;
    t.hAlign = hAlign;
    t.vAlign = vAlign;
    t.hOffset = hOffset;
    t.vOffset = vOffset;
    t.opacity = opacity;
    t.zorder = zorder;
    return t;
}

function newContextMenuItem(title, onSelect, enabled, checked) {
    var o = new MenuItem();

    o.title = title;
    o.onSelect = onSelect;
    o.enabled = enabled;
    o.checked = checked;
    return o;
}

//////////////////////////////////////////////////////////////////////////////////////////

main_window = newWindow("Resistors", 180, 328, false, false);	// was 196
//var roller = newImage(main_window, "Resources/Pictures/roller.png", 154, 68, "left", "top", 18, 31, 255);

var background = newImage(main_window, "Resources/Pictures/roller.png", 122, 55, "left", "top", 18, 231, 255, 5);

var dockBg = newImage(main_window, "Resources/Pictures/dockbg.png", 100, 30, "left", "top", 180, 237, 255, 5);	// ***

var resistor = newImage(main_window, "Resources/Pictures/resistor.png", 75, 30, "left", "top", 190, 237, 255, 5);	// ***

var keyStar = newImage(main_window, "Resources/Pictures/star.png", 27, 29, "left", "top", 25, 191, 255, 5);
keyStar.index = -2;
keyStar.onMouseUp = setOpacity255;
keyStar.onMouseDown = processStarHash;
keyStar.tooltip = "silver x 0.01  10% (K)";

var keyHash = newImage(main_window, "Resources/Pictures/hash.png", 27, 29, "left", "top", 107, 191, 255, 5);
keyHash.index = -1;
keyHash.onMouseUp = setOpacity255;
keyHash.onMouseDown = processStarHash;
keyHash.tooltip = "gold x 0.1  5% (J)";

var clear = newImage(main_window, "Resources/Pictures/CLR.png", 27, 29, "left", "top", 127, 36, 255, 6);
clear.onMouseUp = setOpacity255;
clear.onMouseDown = processClear;
clear.tooltip = "CLEAR";

//function newImage(window, src, width, height, hAlign, vAlign, hOffset, vOffset, opacity) {

var pipe = newImage(main_window, "Resources/Pictures/pipe.png", 25, 312, "left", "top", 69, 14, 255, 4);
var menuarea = newImage(main_window, "Resources/Pictures/menuarea.png", 172, 292, "left", "top", 0, 31, 255, 4);
var outerBase = newImage(main_window, "Resources/Pictures/outer-base.png", 114, 182, "left", "top", 22, 58, 255, 4);
var innerBase = newImage(main_window, "Resources/Pictures/inner-base.png", 121, 191, "left", "top", 20, 57, 255, 4);
var bars = newImage(main_window, "Resources/Pictures/bars.png", 149, 155, "left", "top", 0, 93, 255, 4);
var base = newImage(main_window, "Resources/Pictures/base.png", 154, 68, "left", "top", 3, 231, 255, 4);
var slider = newImage(main_window, "Resources/Pictures/slider.png", 49, 36, "left", "top", 60, 256, 255, 7);
var rightBar = newImage(main_window, "Resources/Pictures/rightbar.png", 15, 68, "left", "top", 135, 52, 255, 5);
var roundButton1 = newImage(main_window, "Resources/Pictures/roundbutton1.png", 24, 31, "left", "top", 17, 183, 255, 5);
var roundButton2 = newImage(main_window, "Resources/Pictures/roundbutton2.png", 24, 31, "left", "top", 143, 103, 255, 5);
var leftButton1 = newImage(main_window, "Resources/Pictures/leftbutton1.png", 30, 33, "left", "top", 0, 219, 255, 5);
var leftButton2 = newImage(main_window, "Resources/Pictures/leftbutton2.png", 30, 33, "left", "top", 0, 181, 255, 5);
var leftButton3 = newImage(main_window, "Resources/Pictures/leftbutton3.png", 30, 33, "left", "top", 0, 141, 255, 5);
var slot = newImage(main_window, "Resources/Pictures/slot.png", 22, 84, "left", "top", 139, 141, 255, 5);
var knob = newImage(main_window, "Resources/Pictures/knob.png", 15, 11, "left", "top", 139, 198, 255, 5);


var resValue = newText(main_window, 112, 1, "left", "top", 25, 260, 255, 6);
resValue.size = 18;
resValue.font = "times";
resValue.style = "font-style:italic";
resValue.wrap = false;
resValue.color = "#333333";
resValue.bgColor = "#FFFFFF";
resValue.scrollbar = false;
resValue.editable = false;

makeKeys();
resValue.data = "";
main_window.visible = true;

//////////////////////////////////////////////////////////////////////////////////////////

var swbase = "Resources/Swatches/";
var swatch1 = newImage(main_window, swbase + "swatch4.png", 8, 16, "left", "top", 205, 244, 0, 5);
var swatch2 = newImage(main_window, swbase + "swatch7.png", 8, 16, "left", "top", 217 + 190, 244, 0, 5);
var swatch3 = newImage(main_window, swbase + "swatch6.png", 8, 16, "left", "top", 229 + 190, 244, 0, 5);
var swatch4 = newImage(main_window, swbase + "swatch9.png", 8, 16, "left", "top", 241 + 190, 244, 0, 5);

buildSwatches = function (color1, color2, color3, color4) {
    if (color1 !== undefined) {
        swatch1.src = swbase + "swatch" + String(color1) + ".png";
        swatch1.opacity = 255;
    } else {
        swatch1.opacity = 0;
    }
    if (color2 !== undefined) {
        swatch2.src = swbase + "swatch" + String(color2) + ".png";
        swatch2.opacity = 255;
    } else {
        swatch2.opacity = 0;
    }
    if (color3 !== undefined) {
        swatch3.src = swbase + "swatch" + String(color3) + ".png";
        swatch3.opacity = 255;
    } else {
        swatch3.opacity = 0;
    }
    if (color4 !== undefined) {
        swatch4.src = swbase + "swatch" + String(color4) + ".png";
        swatch4.opacity = 255;
    } else {
        swatch4.opacity = 0;
    }
};

//////////////////////////////////////////////////////////////////////////////////////////

//======================================================================================
// Function to scale the image
//======================================================================================
function scaleImage(o, width, height, hOffset, vOffset, hRegP, vRegP) {
    //Scale = 50 /100;

    o.width = Math.round(Scale * width);
    o.height = Math.round(Scale * height);
    //print("**SCALE**" + Scale);
    hRegP = hRegP || 0;                 // hRegP and vRegP are optional parameters
    vRegP = vRegP || 0;

    hOffset += hRegP;
    vOffset += vRegP;

    o.hOffset = Math.round(Scale * hOffset);
    o.vOffset = Math.round(Scale * vOffset);

    o.hRegistrationPoint = Math.round(Scale * hRegP);
    o.vRegistrationPoint = Math.round(Scale * vRegP);
}
//=====================
//End function
//=====================

//======================================================================================
// Function to scale the text
//======================================================================================
function scaleText(o, width, ignore, hOffset, vOffset, fontSize) {
    o.width = Math.round(Scale * width);
    //o.height = Math.round(Scale * height);

    o.hOffset = Math.round(Scale * hOffset);
    o.vOffset = Math.round(Scale * vOffset);

    o.style.fontsize = (fontSize * Scale + "px");
}
//=====================
//End function
//=====================

//===============================
// function to resize all layers
//===============================
function resize() {
    var coords = [[66, 191], [26, 71], [66, 71], [106, 71], [26, 111], [66, 111], [106, 111], [26, 151], [66, 151], [106, 151]];
    var i;

    Scale = Number(preferences.maxWidthPref.value) / 100; // sets global scale because it is used elsewhere

    //scaleImage(o, hOffset, vOffset, width, height, hRegP, vRegP) {

    main_window.height = 328 * Scale;
    main_window.width = 180 * Scale + (
    	preferences.componentImagePref.value === "1"
    	? 100
    	: 0
    );

    for (i = 0; i < 10; i += 1) {
        scaleImage(key[i], 27, 29, coords[i][0], coords[i][1]);
    }

    scaleImage(background, 122, 55, 18, 231);
    scaleImage(keyStar, 27, 29, 25, 191);
    scaleImage(keyHash, 27, 29, 107, 191);
    scaleImage(clear, 27, 29, 127, 36);

    scaleText(resValue, 112, 1, 25, 260, 18);

    scaleImage(innerBase, 121, 191, 20, 57);
    scaleImage(pipe, 25, 312, 69, 14);
    scaleImage(menuarea, 172, 292, 0, 31);
    scaleImage(outerBase, 114, 182, 22, 58);
    scaleImage(innerBase, 121, 191, 20, 57);
    scaleImage(bars, 149, 155, 0, 93);
    scaleImage(base, 154, 68, 3, 231);
    scaleImage(slider, 49, 36, 60, 256);
    scaleImage(rightBar, 15, 68, 135, 52);
    scaleImage(roundButton1, 24, 31, 17, 183);
    scaleImage(roundButton2, 24, 31, 143, 103);
    scaleImage(leftButton1, 30, 33, 0, 219);
    scaleImage(leftButton2, 30, 33, 0, 181);
    scaleImage(leftButton3, 30, 33, 0, 141);
    scaleImage(slot, 22, 84, 139, 141);
    scaleImage(knob, 15, 11, 139, 198);

    dockBg.hOffset = 180 * Scale;
    resistor.hOffset = 180 * Scale + 10;

    dockBg.vOffset = 252 * Scale - 15;
    resistor.vOffset = 252 * Scale - 15;

    swatch1.hOffset = 180 * Scale + 25;
    swatch2.hOffset = 180 * Scale + 37;
    swatch3.hOffset = 180 * Scale + 49;
    swatch4.hOffset = 180 * Scale + 61;

    swatch1.vOffset = 252 * Scale - 8;
    swatch2.vOffset = 252 * Scale - 8;
    swatch3.vOffset = 252 * Scale - 8;
    swatch4.vOffset = 252 * Scale - 8;
}
//=====================
//End function
//=====================

//===================================
// function to resize using mousewheel + CTRL key as per Firefox
//===================================
function capMouseWheel(event) {
    var size = Number(preferences.maxWidthPref.value);
    var maxLength = Number(preferences.maxWidthPref.maxLength);
    var minLength = Number(preferences.maxWidthPref.minLength);
    var ticks = Number(preferences.maxWidthPref.ticks);
    var step = Math.round((maxLength - minLength) / (ticks - 1));

    if (event.scrollDelta > 0) {
        if (preferences.MouseWheelPref.value === "up") {
            size -= step;
            if (size < minLength) {
                size = minLength;
            }
        } else {
            size += step;
            if (size > maxLength) {
                size = maxLength;
            }
        }
    } else if (event.scrollDelta < 0) {
        if (preferences.MouseWheelPref.value === "up") {
            size += step;
            if (size > maxLength) {
                size = maxLength;
            }
        } else {
            size -= step;
            if (size < minLength) {
                size = minLength;
            }
        }
    }
    preferences.maxWidthPref.value = String(size);
    //screenwrite("using mousewheel");
    resize();

}
//=====================
//End function
//=====================

menuarea.onMouseWheel = function (event) {
    if (event.ctrlKey) {
        capMouseWheel(event);   //this event is not captured in the Xwidget version
    }
};
//=====================
//End function
//=====================

//===========================================
// this function opens the online help file
//===========================================
function menuitem1OnClick() {
    var answer = alert("This button opens a browser window and connects to the help page for this widget. Do you wish to proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        filesystem.open("Resources/Help.pdf");
        //openURL("http://lightquick.co.uk/instructions-for-the-steampunk-media-player-yahoo-widget.html");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the URL for paypal
//===========================================
function menuitem2OnClick() {
    var answer = alert("Help support the creation of more widgets like this, send us a coffee! This button opens a browser window and connects to the Kofi donate page for this widget). Will you be kind and proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
                openURL("https://www.ko-fi.com/yereverluvinunclebert");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens my Amazon URL wishlist
//===========================================
function menuitem3OnClick() {
    var answer = alert("Help support the creation of more widgets like this. Buy me a small item on my Amazon wishlist! This button opens a browser window and connects to my Amazon wish list page). Will you be kind and proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        openURL("http://www.amazon.co.uk/gp/registry/registry.html?ie=UTF8&id=A3OBFB6ZN4F7&type=wishlist");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the rocketdock URL
//===========================================
function menuitem4OnClick() {
    var answer = alert("Log in and vote for the widget on Rocketdock. This button opens a browser window and connects to the Rocketdock page where you can give the widget a 5 star rating... Will you be kind and proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        openURL("http://rocketdock.com/addon/misc/45672");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens other widgets URL
//===========================================
function menuitem5OnClick() {
    var answer = alert("This button opens a browser window and connects to the Steampunk widgets page on my site. Do you wish to proceed", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        openURL("http://lightquick.co.uk/steampunk-widgets.html?Itemid=264");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the download URL
//===========================================
function menuitem6OnClick() {
    var answer = alert("Download latest version of the widget - this button opens a browser window and connects to the widget download page where you can check and download the latest zipped .WIDGET file). Proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        openURL("http://lightquick.co.uk/downloads/steampunk-media-player-yahoo-widget.html?Itemid=264");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the browser at the contact URL
//===========================================
function menuitem7OnClick() {
    var answer = alert("Visiting the support page - this button opens a browser window and connects to our contact us page where you can send us a support query or just have a chat). Proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        openURL("http://lightquick.co.uk/contact.html?Itemid=3");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the browser at the contact URL
//===========================================
function facebookChat() {
    var answer = alert("Visiting the Facebook chat page - this button opens a browser window and connects to our Facebook chat page.). Proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
        openURL("http://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function allows a spacer in the menu
//===========================================
function nullfunction() {
    print("null");
}
//=====================
//End function
//=====================

//=========================================================================
// this function assigns
//=========================================================================
function setmenu() {
    function makeContextMenu() {
    	var items = [];
    	var mItem;

        mItem = new MenuItem();
        mItem.title = "-";
        mItem.onSelect = nullfunction;
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Online Help";
        mItem.onSelect = function () {
            menuitem1OnClick();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Donate a Coffee with Ko-Fi";
        mItem.onSelect = function () {
            menuitem2OnClick();
        };
        items.push(mItem);


        mItem = new MenuItem();
        mItem.title = "-";
        mItem.onSelect = function () {
            nullfunction();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "See More Steampunk Widgets";
        mItem.onSelect = function () {
            menuitem5OnClick();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Download Latest Version";
        mItem.onSelect = function () {
            menuitem6OnClick();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Display Licence Agreement...";
        mItem.onSelect = function () {
            displayLicence();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Contact Support";
        mItem.onSelect = function () {
            menuitem7OnClick();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "-";
        mItem.onSelect = function () {
            nullfunction();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Chat about Steampunk Widgets on Facebook";
        mItem.onSelect = function () {
            facebookChat();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "-";
        mItem.onSelect = function () {
            nullfunction();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Reveal Widget in Windows Explorer";
        mItem.onSelect = function () {
            findWidget();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "-";
        mItem.onSelect = function () {
            nullfunction();
        };
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Reload Widget (F5)";
        mItem.onSelect = function () {
            reloadWidget();
        };
        items.push(mItem);

        if (preferences.imageEditPref.value != "" && debugFlg === "1") {
            mItem = new MenuItem();
            mItem.title = "Edit Widget using " + preferences.imageEditPref.value ;
            mItem.onSelect = function () {
                editWidget();
            };
            items.push(mItem);
        }        

        return items;
    }

    main_window.contextMenuItems = makeContextMenu();
}
//=====================
//End function
//=====================

//////////////////////////////////////////////////////////////////////////////////////////

widget.onPreferencesChanged = function () {
    main_window.width = 180 * Scale + (	// was 196
    	preferences.componentImagePref.value === "1"
    	? 100
    	: 0
    );

    print("main_window.width: " + main_window.width);

 	mBand = Number(preferences.bandsPref.value);
	band = 1;
	resValue.data = "";
	buildVitality("", "#445663", "#445663", "#445663", "#445663");
	buildSwatches();
	resize();
};

//===========================================
// this function runs on startup
//===========================================
                    
function startup() {
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
        preferences.imageEditPref.hidden=false;
        preferences.imageCmdPref.hidden=false;
    } else {
        preferences.imageEditPref.hidden=true;		
        preferences.imageCmdPref.hidden=true;
    }	
    createLicence(main_window);         // create the licence window
    setmenu();
    resize();
}


//===========================================
// this function causes explorer to be opened and the file selected
//===========================================
function findWidget() {

 // temporary development version of the widget
    var widgetFullPath = convertPathToPlatform(system.userWidgetsFolder + "/" + widgetName);
    var alertString = "The widget folder is: \n";
    if (filesystem.itemExists(widgetFullPath)) {
        alertString += system.userWidgetsFolder + " \n\n";
        alertString += "The widget name is: \n";
        alertString += widgetName + ".\n ";

        alert(alertString, "Open the widget's folder?", "No Thanks");

        filesystem.reveal(widgetFullPath);
    } else {
        widgetFullPath = resolvePath(".");   
        filesystem.reveal(widgetFullPath);
        print("widgetFullPath " + widgetFullPath);
    }
}
//=====================
//End function
//=====================


//===========================================
// this function edits the widget
//===========================================
function editWidget() {
    //var answer = alert("Editing the widget. Proceed?", "Open Editor", "No Thanks");
    //if (answer === 1) {
        //uses the contents of imageEditPref to initiate your default editor
        performCommand("menu");
    //}

}
//=====================
//End function
//=====================


//=====================
// function to carry out a command
//=====================
function performCommand(method) {
    var answer;
    
    if (method === "menu") {
        runCommandInBg(preferences.imageEditPref.value, "runningTask");
    } else {
        print("method "+method);
        if (system.event.altKey) { // filesystem.open() call
            if (preferences.openFilePref.value === "") {
                answer = alert("This widget has not been assigned an alt+double-click function. You need to open the preferences and select a file to be opened. Do you wish to proceed?", "Open Preferences", "No Thanks");
                if (answer === 1) {
                    showWidgetPreferences();
                }
                return;
            }
            filesystem.open(preferences.openFilePref.value);
        } else { 
            if (preferences.imageCmdPref.value === "") {
                answer = alert("This widget has not been assigned a double-click function. You need to open the preferences and enter a run command for this widget. Do you wish to proceed?", "Open Preferences", "No Thanks");
                if (answer === 1) {
                    showWidgetPreferences();
                }
                return;
            }
                runCommandInBg(preferences.imageCmdPref.value, "runningTask");
        }
    }
}
//=====================
//End function
//=====================