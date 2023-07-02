//===========================================================================
// functions.js
// Steampunk Media Player widget  1.0.10
// Originally written and Steampunked by: Dean Beedell
// Dean.beedell@lightquick.co.uk
// Vitality code, advice and patience from Harry Whitfield
//
//===========================================================================

/*global mainWindow, mainWindowwidthDefault, mainWindowheightDefault,
	cableWheelSet, cableWheelSethoffsetDefault, cableWheelSetvoffsetDefault,
	cableWheelSetwidthDefault, cableWheelSetheightDefault, cable, cablehoffsetDefault,
	cablevoffsetDefault, cablewidthDefault, cableheightDefault, pipes, pipeshoffsetDefault,
	pipesvoffsetDefault, pipeswidthDefault, pipesheightDefault, bell, bellhoffsetDefault,
	bellvoffsetDefault, bellwidthDefault, bellheightDefault, indicatorRed,
	indicatorRedhoffsetDefault, indicatorRedvoffsetDefault, indicatorRedwidthDefault,
	indicatorRedheightDefault, speaker, speakerhoffsetDefault, speakervoffsetDefault,
	speakerwidthDefault, speakerheightDefault, bar, barhoffsetDefault, barvoffsetDefault,
	barwidthDefault, barheightDefault, sliderSet, sliderSethoffsetDefault,
	sliderSetvoffsetDefault, sliderSetwidthDefault, sliderSetheightDefault, percentTextShadow,
	percentTextShadowhoffsetDefault, percentTextShadowvoffsetDefault, percentTextShadowfontDefault, percentText, percentTexthoffsetDefault,
	percentTextvoffsetDefault, percentTextfontDefault, tingingSound, startup, Scale:true
*/

/*properties
    altKey, contextMenuItems, data, debug, event, fontsize, hOffset, height,
    hoffset, hoffsetpref, imageCmdPref, onContextMenu, onRunCommandInBgComplete,
    onSelect, open, openFilePref, maxWidthPref, soundpref, style, title, tooltip,
    tooltipPref, vOffset, value, visible, voffset, voffsetpref, widgetTooltip,
    width
*/

//======================================================================================
// Function to move the main_window onto the main screen
//======================================================================================
function mainScreen() {
// if the widget is off screen then move into the viewable window
    //preferences.musicFolderPref.value = "C:\Documents and Settings\All Users\Documents\My Music";
    if (preferences.hoffsetpref.value > 0) {
        mainWindow.hOffset = parseInt(preferences.hoffsetpref.value, 10);
    }
    if (preferences.voffsetpref.value > 0) {
        mainWindow.vOffset = parseInt(preferences.voffsetpref.value, 10);
    }

    if (mainWindow.hOffset < 0) {
        mainWindow.hOffset = 10;
    }
    if (mainWindow.vOffset < 32) {
        mainWindow.vOffset = 32; // avoid Mac toolbar
    }
    if (mainWindow.hOffset > screen.width - 50) {
        mainWindow.hOffset = screen.width - mainWindow.width;
    }
    if (mainWindow.vOffset > screen.height - 50) {
        mainWindow.vOffset = screen.height - mainWindow.height; // avoid Mac toolbar
    }
}
//=====================
//End function
//=====================


//===============================
// function to resize all layers
//===============================
function resize() {
    Scale = Number(preferences.maxWidthPref.value) / 100;	// sets global scale because it is used elsewhere
    log("Resizing: preferences.maxWidthPref.value: " + preferences.maxWidthPref.value);
    log("Scale: " + Scale);

    //main_frame.hoffset = 32 * scale;
    //main_frame.voffset = 32 * scale;

    //mainWindow.height = mainWindowheightDefault * Scale;
    //mainWindow.width  = mainWindowwidthDefault * Scale;

    //scaleImage(o, hOffset, vOffset, width, height, hRegP, vRegP) {
    scaleImage(cableWheelSet, 288, 81, 37, 39);
    scaleImage(cable, 224, 100, 130, 16);
    scaleImage(lockArea, 64, 18, 23, 78);
    scaleImage(lockAreaLocked, 61, 4, 25, 36);
    scaleImage(endPipe, 8, 18, 39, 78);
    scaleImage(pipes, 44, 19, 396, 78);
    scaleImage(positionSlider, 60, 30, 52, 27);
    scaleImage(pipesRight, 365, 72, 30, 17);
    scaleImage(helpLug, 224, 19, 21, 21);
    scaleImage(bell, 264, 60, 33, 32);
    scaleImage(playButton, 265, 60, 32, 32);
    scaleImage(pauseButton, 266, 60, 32, 32);
    scaleImage(nextButton, 340, 64, 35, 32);
    scaleImage(prevButton, 317, 64, 35, 32);
    scaleImage(indicatorRed, 301, 65, 25, 25);
    scaleImage(speaker, 247, 0, 95, 69);
    scaleImage(bar, 31, 66, 230, 29);
    scaleImage(sliderSet, 160, 49, 85, 84);

    scaleText(percentTextShadow, 27, 54, 30, 30, 14);
    scaleText(percentText, 26, 53, 30, 30, 14);
    scaleText(trackNameText, 85, 32, 208, 30, 13);
    scaleText(trackNoText, 10, 34, 47, 30, 13);

    scaleImage(playlistArea, 50, 100, 340, 469);

    scaleText(playListTitle, 100, 170, 190, 24, 15);
    scaleText(playListPage, 145, 138, 105, 24, 15);
    scaleText(playListText0, 100, 200, 190, 24, 15);
    scaleText(playListText1, 100, 222, 190, 24, 15);
    scaleText(playListText2, 100, 244, 190, 24, 15);
    scaleText(playListText3, 100, 266, 190, 24, 15);
    scaleText(playListText4, 100, 288, 190, 24, 15);
    scaleText(playListText5, 100, 310, 190, 24, 15);
    scaleText(playListText6, 100, 332, 190, 24, 15);
    scaleText(playListText7, 100, 354, 190, 24, 15);
    scaleText(playListText8, 100, 376, 190, 24, 15);
    scaleText(playListText9, 100, 398, 190, 24, 15);
    scaleText(playListText10, 100, 420, 190, 24, 15);
    scaleText(playListText11, 100, 442, 190, 24, 15);

    scaleImage(prevChunk, 140, 450, 35, 32);
    scaleImage(nextChunk, 216, 450, 35, 32);
    scaleImage(firstChunk, 112, 450, 35, 32);
    scaleImage(lastChunk, 243, 450, 35, 32);
    scaleImage(tap, 305, 120, 20, 20);
    scaleImage(chain, 326, 61, 23, 130);
    scaleImage(buttonConfig, 50, 90, 340, 468);
    scaleImage(sButton, 270, 450, 35, 32);
    scaleImage(oButton, 85, 450, 35, 32);
    scaleImage(ovalButton, 130, 470, 128, 32);


    scaleImage(deleteButton0, 75, 190, 20, 20);
    scaleImage(deleteButton1, 75, 211, 20, 20);
    scaleImage(deleteButton2, 75, 232, 20, 20);
    scaleImage(deleteButton3, 75, 253, 20, 20);
    scaleImage(deleteButton4, 75, 274, 20, 20);
    scaleImage(deleteButton5, 75, 296, 20, 20);
    scaleImage(deleteButton6, 75, 318, 20, 20);
    scaleImage(deleteButton7, 75, 339, 20, 20);
    scaleImage(deleteButton8, 75, 362, 20, 20);
    scaleImage(deleteButton9, 75, 384, 20, 20);
    scaleImage(deleteButton10, 75, 406, 20, 20);
    scaleImage(deleteButton11, 75, 427, 20, 20);

    mainWindow.visible = true;

    }
//=====================
//End function
//=====================




//======================================================================================
// Function to scale the image
//======================================================================================
function scaleImage(o, hOffset, vOffset, width, height, hRegP, vRegP) {
    Scale = Number(preferences.maxWidthPref.value) / 100;	// sets global scale because it is used elsewhere
        o.width  = Math.round(Scale * width);
    	o.height = Math.round(Scale * height);
	//print("**SCALE**" + scale);
    	hRegP = hRegP || 0;                     // hRegP and vRegP are optional parameters
    	vRegP = vRegP || 0;

    	hOffset += hRegP;
    	vOffset += vRegP;

    	o.hOffset = Math.round(Scale * hOffset);
    	o.vOffset = Math.round(Scale * vOffset);

    	o.hRegistrationPoint =  Math.round(Scale * hRegP);
    	o.vRegistrationPoint =  Math.round(Scale * vRegP);
	};
//=====================
//End function
//=====================



//======================================================================================
// Function to scale the text
//======================================================================================
function scaleText(o, hOffset, vOffset, width, height, fontSize) {
    Scale = Number(preferences.maxWidthPref.value) / 100;	// sets global scale because it is used elsewhere
        o.width  = Math.round(Scale * width);
    	o.height = Math.round(Scale * height);

    	o.hOffset = Math.round(Scale * hOffset);
    	o.vOffset = Math.round(Scale * vOffset);

        o.style.fontsize = (fontSize * Scale + "px");

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
        openURL("http://lightquick.co.uk/instructions-for-the-steampunk-media-player-yahoo-widget.html");
    }
}
//=====================
//End function
//=====================
//===========================================
// this function opens the URL for paypal
//===========================================
function menuitem2OnClick() {
    var answer = alert("Help support the creation of more widgets like this, send us a beer! This button opens a browser window and connects to the Paypal donate page for this widget). Will you be kind and proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
//openURL("https://www.paypal.com/uk/cgi-bin/webscr?cmd=_flow&SESSION=CHFojKaws7BH7Nnavk7M3I8M369MmoGfUxkSu_lfOygjH_Qm9e2ZDao7Fs4&dispatch=5885d80a13c0db1f8e263663d3faee8d14f86393d55a810282b64afed84968ec");
                openURL("https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=info@lightquick.co.uk&currency_code=GBP&amount=2.50&return=&item_name=Donate%20a%20Beer");
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
function nullfunction() { print("null"); }
//=====================
//End function
//=====================

//=========================================================================
// this function assigns
//=========================================================================
function setmenu() {
    mainWindow.onContextMenu = function () {
 	var items = [], mItem;

	mItem = new MenuItem();
	mItem.title = "";
	mItem.onSelect = nullfunction;
	items.push(mItem);

	mItem = new MenuItem();
	mItem.title = "Select a file to play...";
	mItem.onSelect = function () {
            //PlayFile(chooseFile(new Array('.mp3','.flv','.aac','.wav','.wma','.aif','.aiff','.au','.snd','.m3u','.wpl','.wax')));
            //chosenFolder = "";
            addSingleTrack();
	};
        items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Select a folder to play";
        mItem.onSelect = function () {
                       openFolderToPlay();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Play last used folder - "+preferences.musicFolderPref.value;
        mItem.onSelect = function () {
            playerState = "folder"; //this is to ensure that shuffle mode is respected
            if (filesystem.isDirectory(preferences.musicFolderPref.value)) {
               chosenFolder = preferences.musicFolderPref.value;
			   path = chosenFolder;
            } else {
				if (debugFlg == 1) {print("folder not found")};
               alert('The folder does not exist. Selecting the previous folder/playlist instead.');
            }
            ReadFolderRecursively(chosenFolder);
            updatePlayList();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Play previous folder - "+preferences.musicFolderPref2.value;
        mItem.onSelect = function () {
            playerState = "folder"; //this is to ensure that shuffle mode is respected
            if (filesystem.isDirectory(preferences.musicFolderPref2.value)) {
               chosenFolder = preferences.musicFolderPref2.value;
			   path = chosenFolder;
            } else {
				if (debugFlg == 1) {print("folder not found")};
               alert('The folder does not exist. Selecting the previous folder/playlist instead.');
            }
            ReadFolderRecursively(chosenFolder);
            updatePlayList();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Play previous folder - "+preferences.musicFolderPref3.value;
        mItem.onSelect = function () {
            playerState = "folder"; //this is to ensure that shuffle mode is respected
            if (filesystem.isDirectory(preferences.musicFolderPref3.value)) {
               chosenFolder = preferences.musicFolderPref3.value;
			   path = chosenFolder;
            } else {
				if (debugFlg == 1) {print("folder not found")};
               alert('The folder does not exist. Selecting the previous folder/playlist instead.');
            }
            ReadFolderRecursively(chosenFolder);
            updatePlayList();
    };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Play previous folder - "+preferences.musicFolderPref4.value;
        mItem.onSelect = function () {
            playerState = "folder"; //this is to ensure that shuffle mode is respected
            if (filesystem.isDirectory(preferences.musicFolderPref4.value)) {
               chosenFolder = preferences.musicFolderPref4.value;
			   path = chosenFolder;
            } else {
				if (debugFlg == 1) {print("folder not found")};
               alert('The folder does not exist. Selecting the previous folder/playlist instead.');
            }
            ReadFolderRecursively(chosenFolder);
            updatePlayList();


        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Play previous folder - "+preferences.musicFolderPref5.value;
        mItem.onSelect = function () {
            playerState = "folder"; //this is to ensure that shuffle mode is respected
            if (filesystem.isDirectory(preferences.musicFolderPref5.value)) {
               chosenFolder = preferences.musicFolderPref5.value;
			   path = chosenFolder;
            } else {
				if (debugFlg == 1) {print("folder not found")};
               alert('The folder does not exist. Selecting the previous folder/playlist instead.');
            }
            ReadFolderRecursively(chosenFolder);
            updatePlayList();
        };
	items.push(mItem);

        //print("CDROM.count "+CDROM.count);
        //print (" CDROM.Item(drvCnt).driveSpecifier "+CDROM.Item(drvCnt).driveSpecifier);
        //print (" CDROM.Item(drvCnt).Playlist "+CDROM.Item(drvCnt).Playlist);
        if (CDROMcount != 0 ) {
            if (CDROM.Item(cdRomNo)) {
               cdMenuItem = new MenuItem();
      	       cdMenuItem.title = "Audio CD Drive ("+ CDROM.Item(cdRomNo).driveSpecifier +")";
      	       cdMenuItem.onSelect = function () {
		//	 if (debugFlg == 1) {print("Audio CD Drive ("+ CDROM.Item(cdRomNo).driveSpecifier +")")};
                 PlayAudioCD( 0 , CDROM.Item(cdRomNo).Playlist);
            };
            items.push(cdMenuItem);
            }
        }

        mItem = new MenuItem();
        mItem.title = "";
        mItem.onSelect = function () {
            nullfunction();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Install the Centurion Font";
        mItem.onSelect = function () {
            installFont();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "";
        mItem.onSelect = function () {
            nullfunction();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Online Help";
        mItem.onSelect = function () {
            menuitem1OnClick();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Donate with Paypal";
        mItem.onSelect = function () {
            menuitem2OnClick();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Donate with Amazon";
        mItem.onSelect = function () {
            menuitem3OnClick();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Vote on Rocketdock";
        mItem.onSelect = function () {
            menuitem4OnClick();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "";
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
        mItem.title = "";
        mItem.onSelect = function() {
            nullfunction();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Chat about Steampunk Widgets on Facebook";
        mItem.onSelect = function() {
            facebookChat();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "";
        mItem.onSelect = function() {
            nullfunction();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Reveal Widget in Windows Explorer";
        mItem.onSelect = function() {
            findWidget();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "";
        mItem.onSelect = function() {
            nullfunction();
        };
	items.push(mItem);

        mItem = new MenuItem();
        mItem.title = "Reload Widget (F5)";
        mItem.onSelect = function () {
            reloadWidget();
        };
	items.push(mItem);

        mainWindow.contextMenuItems = items;
    };
}
//=====================
//End function
//=====================

//==============================================================
// this function reloads the widget when preferences are changed
//==============================================================
function changePrefs() {
    log("preferences Changed");
    restrictRootFolder();

    savePreferences(); 	/// <<<<<<<<<<<<<
    sleep(1000);
    startup();			/// <<<<<<<<<<<<<

//	reloadWidget();
}
//=====================
//End function
//=====================

//==============================================================
// this function restricts the chosen folder from choosing the root
//==============================================================
function restrictRootFolder() {
    var vols = filesystem.volumes;
    var a, volscnt, nn;
    //count the drive volumes, create new images for each drive
    //print ("creating drives");
    for (a in vols) {
        if (vols.hasOwnProperty(a)) {
            volscnt = Number(a);
            nn = filesystem.getDisplayName( vols[a].path ) ;
			if (debugFlg == 1) {print ("drives available "+vols[a].path )};
            if (convertPathToPlatform(preferences.musicFolderPref.value) == vols[a].path) {
				if (debugFlg == 1) {print ("restricting access to the root")};
        	 preferences.musicFolderPref.value = "C:\\Documents and Settings\\All Users\\Documents\\My Music";
            }
        }
    }
}
//=====================
//End function
//=====================


//==============================================================
// this function sets the tooltip hints
//==============================================================
function settooltip() {
    if (preferences.tooltipPref.value == "enabled") {
    	        cableWheelSet.tooltip = "";
		lockArea.tooltip = "Click here to lock";
		lockAreaLocked.tooltip = "Click here to unlock";
		endPipe.tooltip = "Click here to select a single file for playing";
		helpLug.tooltip = "Click on me for help";
		pipesRight.tooltip = "Shuffle the tracks";
		pipes.tooltip = "Double click on me to assign a double-click function to this widget";
		speaker.tooltip = "Click here to select a whole folder for playing";
		sliderSet.tooltip = "slide me to change the media player sound levels...";
		nextButton.tooltip = "Click me to select the next track";
		prevButton.tooltip = "Click me to select the preceding track";
		playButton.tooltip = "Click me to play the current track";
		pauseButton.tooltip = "Click me to pause the current track";
		positionSlider.tooltip = "Slide me to select any part of the track";
                firstChunk.tooltip = "Click to view next page of the playlist";
                lastChunk.tooltip = "Click to view next page of the playlist";
                nextChunk.tooltip = "Click to view next page of the playlist";
		prevChunk.tooltip = "Click to view the previous page of the playlist";
		oButton.tooltip = "Open a new playlist here";
		ovalButton.tooltip = "";
		sButton.tooltip = "Save the playlist here";
		tap.tooltip = "Toggle Hints on/off";
		chain.tooltip = "Pull me to toggle the playlist";
		bar.tooltip = preferences.widgetTooltip.value;
                busy.tooltip = "The player is doing something - Click to close early";
                busy.tooltip = "Click to close";
		deleteButton0.tooltip = "Click to delete";
		deleteButton1.tooltip = "Click to delete";
		deleteButton2.tooltip = "Click to delete";
		deleteButton3.tooltip = "Click to delete";
		deleteButton4.tooltip = "Click to delete";
		deleteButton5.tooltip = "Click to delete";
		deleteButton6.tooltip = "Click to delete";
		deleteButton7.tooltip = "Click to delete";
		deleteButton8.tooltip = "Click to delete";
		deleteButton9.tooltip = "Click to delete";
		deleteButton10.tooltip = "Click to delete";
		deleteButton11.tooltip = "Click to delete";
                playListTitle.tooltip =  "Double click here to open selected folder";

        if (preferences.widgetTooltip.value !== "enabled") {
        } else {
            if (preferences.imageCmdPref.value === "") {
        			//speaker.tooltip = "";
            } else {
               			//speaker.tooltip = "Current command is - " + preferences.imageCmdPref.value;
            }
        }
    } else {
                cableWheelSet.tooltip = "";
		lockArea.tooltip = "";
                cableWheelSet.tooltip = "";
		lockAreaLocked.tooltip = "";
		endPipe.tooltip = "";
                helpLug.tooltip = "";
		pipesRight.tooltip = "";
		pipes.tooltip = "";
		speaker.tooltip = "";
		sliderSet.tooltip = "";
		nextButton.tooltip = "";
		prevButton.tooltip = "";
		playButton.tooltip = "";
		pauseButton.tooltip = "";
		positionSlider.tooltip = "";
                firstChunk.tooltip = "";
                lastChunk.tooltip = "";
		nextChunk.tooltip = "";
		prevChunk.tooltip = "";
		oButton.tooltip = "";
		ovalButton.tooltip = "";
		sButton.tooltip = "";
		tap.tooltip = "";
		chain.tooltip = "";
		bar.tooltip = "";
		busy.tooltip = "";
		busy.tooltip = "";
		deleteButton0.tooltip = "";
		deleteButton1.tooltip = "";
		deleteButton2.tooltip = "";
		deleteButton3.tooltip = "";
		deleteButton4.tooltip = "";
		deleteButton5.tooltip = "";
		deleteButton6.tooltip = "";
		deleteButton7.tooltip = "";
		deleteButton8.tooltip = "";
		deleteButton9.tooltip = "";
		deleteButton10.tooltip = "";
		deleteButton11.tooltip = "";
		playListTitle.tooltip =  "";
          }
}
//=====================
//End function
//=====================

//======================================================================================
// Function to perform commands
//======================================================================================
var runningTask;

function performCommand() {
    var answer;

    if (preferences.soundpref.value === "enabled") {
        play(tingingSound, false);
    }

    if (system.event.altKey) { // filesystem.open() call
        if (preferences.openFilePref.value === "") {
            answer = alert("This widget has not been assigned an alt+double-click function. You need to open the preferences and select a file to be opened. Do you wish to proceed?", "Open Preferences", "No Thanks");
            if (answer === 1) {
                showWidgetPreferences();
            }
            return;
        }
        filesystem.open(preferences.openFilePref.value);
    } else { // runCommandInBg() call
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
//=====================
//End function
//=====================


//===========================================
// this function runs the stored command
//===========================================
widget.onRunCommandInBgComplete = function () {
    var theTag = system.event.data;
	if (debugFlg == 1) {print("onRunCommandInBgComplete for tag: " + theTag)};
    if (theTag === "runningTask") {
		if (debugFlg == 1) {
			print(preferences.imageCmdPref.value + "\n\n" + runningTask);
        } else {
            alert(preferences.imageCmdPref.value + "\n\n" + runningTask);
        }
    }
};
//=====================
//End function
//=====================


//===========================================
// this function causes explorer to be opened and the file selected
//===========================================
function findWidget() {

 var widgetName = "steampunk mediaplayer ywidget.widget";
 // temporary development version of the widget
 //var widgetName = "magnifier2.widget";
 var widgetFullPath = convertPathToPlatform(system.userWidgetsFolder + "/" + widgetName);
 var alertString = "The widget folder is: \n";
 alertString += system.userWidgetsFolder + " \n\n";
 alertString += "The widget name is: \n";
 alertString += widgetName+".\n ";
 var answer = alert(alertString, "Open the widget's folder?", "No Thanks");
 if (answer === 1) {
            if (filesystem.itemExists(widgetFullPath) )   {
              //dosCommand = "Explorer.exe /e, /select,E:\\Documents and Settings\\Dean Beedell\\My Documents\\My Widgets\\mars 2.widget";
              dosCommand = "Explorer.exe /e, /select," + widgetFullPath;
              //print("dosCommand "+dosCommand);
              //var explorerExe = runCommand(dosCommand, "bgResult");
              filesystem.reveal(widgetFullPath);
            }
 }
}
//=====================
//End function
//=====================

//==============================
// pins the widget in place
//==============================
lockArea.onMouseDown = function () {
        toggleLock();
};
//=====================
//End function
//=====================


//==============================
// releases the widget
//==============================
lockAreaLocked.onMouseDown = function () {
        toggleLock();
};
//=====================
//End function
//=====================


//===================================
// function to toggle the lock state
//===================================
function toggleLock(){
	if (!mainWindow.locked) {
		mainWindow.locked = true;
		preferences.widgetLockPref.value = "1";
		lockArea.visible=false;
		lockAreaLocked.visible=true;
	} else {
                mainWindow.locked = false;
	        // this does not work yet
		lockArea.visible=true;
		lockAreaLocked.visible=false;
		preferences.widgetLockPref.value = "0";
        }

	if (preferences.soundpref.value === "enabled") {
		play(lock, false);
	}
};
//=====================
//End function
//=====================




//===================================
// function to install the font
//===================================
function installFont() {

  var extPath = widget.extractFile( "Centurion Light SF.ttf" );
    var answer =   alert("I have extracted the centurion font to the widget data folder, the widget cannot install it as it does not have the privileges to do so. You will have to install it yourself by double clicking on it in Windows File Explorer, then clicking install. I will open that folder now. Do you wish to proceed?", "Open File Explorer", "No Thanks");
    if (answer === 1) {
        filesystem.reveal(system.widgetDataFolder+"/Centurion Light SF.ttf");
    }

  /*
  // no longer works under Windows 7 and above for a normal user.
  var objShell = COM.createObject("Shell.Application");
  COM.connectObject(objShell, "SHE_");
  objFolder = objShell.Namespace(system.widgetDataFolder);
  objFolderItem = objFolder.ParseName("Centurion Light SF.ttf");
  objFolderItem.InvokeVerb("Install");
  */
};
//=====================
//End function
//=====================



//======================================================================================
// END script functions.js
//======================================================================================
