// scene is provided to the module when it is created
px.import({
    scene: 'px:scene.1.js',
    keys: 'px:tools.keys.js'
}).then(function ready(imports) {
    let scene = imports.scene;
    let root = imports.scene.root;
    let keys = imports.keys;
    let base = px.getPackageBaseFilePath();
    const fontUrlBold = base + "/fonts/work-sans.black.otf";
    const fontUrllight = base + "/fonts/FreeSans.ttf";
    const roundedCorner = base + "/images/roundedCorner.svg"
    const roundedHighlighter = base+"/images/roundedConrner-transparent.svg";
    let dummyData = base + "/js/data.json";
    let dummyAppData = px.getFile(dummyData);

    dummyAppData.then(function(data) {
        loadpage(data);
    }).catch(function importFailed(err) {
        console.error("Import failed for Dummy Data: " + err)
    });

    // Constants declarations scene height & width
    const sceneWidth = 1280;
    const sceneHeight = 1800;

    /***
     * Carousel constants declaration
     * 
     */

    // Carousel bg image
    const carouselWidth = sceneWidth;
    const carouselHeight = 597;
    const carouselBg = "/images/NoMedia.jpg";
    // carousel logo
    const logoLeft = 35;
    const logoTop = 40;
    const logoWidth = 120;
    const logoHeight = 50;
    const logoUrl = "/images/logo/logo.png";

    // Carousel logo tagline text
    const taglinetextLeft = 50;
    const taglinetextTop = 80;
    const taglinetextWidth = 150;
    const taglinetextHeight = 20;
    const fontLight = 12;

    // Channel logo
    const channelLogoLeft = 100;
    const channelLogoTop = 250;
    const channelLogoWidth = 40;
    const channelLogoHeight = 30;
    const channelLogoUrl = "/images/logo/hbo.png";

    // Channel program title
    const channelprogTitleLeft = 100;
    const channelprogTitleTop = 285;
    const channelprogTitleWidth = 150;
    const channelprogTitleHeight = 40;
    const channeltitleFontSize = 24;
    const channelprogTitle = "No Media ";

    // Channel program text
    const channelprogContLeft = 100;
    const channelprogContTop = 325;
    const channelprogContWidth = 400;
    const channelprogContHeight = 100;
    const progInfoFontSize = 16;

    //Default dummy data, it will show before loading actual data
    const channelprogCont = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    // Navigation arrow left
    const navLeftImgLeft = 50;
    const navLeftImgTop = 300;
    const navLeftImgWidth = 15;
    const navLeftImgHeight = 25;
    const navLeftImgUrl = "/icons/arrow-left.png";

    // Navigation arrow right
    const navRightImgLeft = 1220;
    const navRightImgTop = 300;
    const navRightImgWidth = 15;
    const navRightImgHeight = 25;
    const navRightImgUrl = "/icons/arrow-right.png";

    // More info button
    const moreInfobtnLeft = 80;
    const moreInfobtnTop = 400;


    /***
     * Declarations
     *
     */
    const rowTitleHeight = 15;
    const rowTitleFontSize = 18;
    const rowContainerWidth = sceneWidth - 80;
    const mediaTitleHeight = 20;
    const mediaTitleFontSize = 16;
    const epsTitleHeight = 20;
    const epsFontSize = 12;
    const unHighlitedFontColor = "#cccccc";
    const highlitedFontColor = "#ffffff";
    
    let arrayGridParentFirstRow = [];
    let arrayGridParentSecondRow = [];
    let arrayGridParentThirdRow = [];

    // first row container
    const rowContainerLeft = 50;
    const firstRowTitleContainerTop = carouselHeight + 25;
    const firstRowContainerTop = firstRowTitleContainerTop;
    const firstRowContainerHeight = 385;

    // first row first grid | no of grid is 3*
    const firstRowGridWidth = 550; // firstRowGridWidth = firstRowImageWidth
    const firstRowGridHeight = firstRowContainerHeight - rowTitleHeight;
    const firstRowImageHeight = 300;
    // second row container
    const secondRowTitleContainerTop = firstRowContainerTop + firstRowContainerHeight + 25;
    const secondRowContainerTop = secondRowTitleContainerTop;
    const secondRowContainerHeight = 280;

    // second row grid | no of grid is 4*

    const secondRowGridWidth = 360;
    const secondRowGridHeight = firstRowContainerHeight - rowTitleHeight;
    const secondRowImageHeight = 200;

    // third row grid | no of grid is 4*
    const thirdRowGridWidth = 265;
    const thirdRowContainerHeight = 225;
    const thirdRowTitleContainerTop = secondRowContainerTop + secondRowContainerHeight + 25;
    const thirdRowContainerTop = thirdRowTitleContainerTop;
    const thirdRowImageHeight = 150;
    const thirdRowGridHeight = thirdRowContainerHeight;

   
    const marginTop = 20;

    let carouselObjArray;
    let firstRowTitle;
    let firstRowObjArray;
    let secondRowTitle;
    let secondRowObjArray;
    let thirdRowTitle;
    let thirdRowObjArray;
    let containerPos = 0;
 //   let verticalSelectedIndex = 0; 
 //   let focusPosition = 0;
    let parentContainer;
    let index = 0;
    let scrollTop = 400;
    let positionTop = -400;

    // Get the current date and time
    let date = new Date();
    let time = date.getHours()
    let min = date.getMinutes();

    function loadpage(data) {

        let dummyDataList = data;
        let dummyObj = JSON.parse(dummyDataList);
        // Carousel data 
        carouselObjArray = dummyObj.topCarousel;
        
        // First row title & objects
        firstRowTitle = dummyObj.firstrow.title;
        firstRowObjArray = dummyObj.firstrow.programdata;

        // Second row title & objects
        secondRowTitle = dummyObj.secondrow.title;
        secondRowObjArray = dummyObj.secondrow.programdata;

        // Third row title & objects
        thirdRowTitle = dummyObj.thirdrow.title;
        thirdRowObjArray = dummyObj.thirdrow.programdata;

        // creating youSee scene & populating data
        initialise();
    }

    /***
     * Initialise body content
     * 
     */

    function initialise() {
        // Initially on load it will load/render with default data
        // Scene container
        container = scene.create({
            t: "image9",
            x: 0,
            y: 0,
            w: sceneWidth,
            h: sceneHeight,
            url: base + "/bg/yousee_bg.jpg",
            parent: root
        });

        // carousel container
        carouselContainer = scene.create({
            t: "object",
            x: 0,
            y: 0,
            w: sceneWidth,
            h: carouselHeight,
            parent: container
        });

        initializecarousel();

        // first row media section
        firstRowTitleContainer = scene.create({
            t: "object",
            x: rowContainerLeft,
            y: firstRowTitleContainerTop,
            w: rowContainerWidth,
            h: rowTitleHeight,
            parent: container
        });
        firstRowContainer = scene.create({
            t: "object",
            id: "firstRowContainer",
            x: rowContainerLeft,
            y: firstRowContainerTop,
            w: rowContainerWidth,
            h: firstRowContainerHeight,
            parent: container
        });
        createInitFirstRowGrids();


        // Second row media section
        secondRowTitleContainer = scene.create({
            t: "object",
            x: rowContainerLeft,
            y: secondRowTitleContainerTop,
            w: rowContainerWidth,
            h: rowTitleHeight,
            parent: container
        });
        secondRowContainer = scene.create({
            t: "object",
            id: "secondRowContainer",
            x: rowContainerLeft,
            y: secondRowContainerTop,
            w: rowContainerWidth,
            h: secondRowContainerHeight,
            parent: container
        });
        createInitSecondRowGrids();

        // Third row media section
        thirdRowTitleContainer = scene.create({
            t: "object",
            x: rowContainerLeft,
            y: thirdRowTitleContainerTop,
            w: rowContainerWidth,
            h: rowTitleHeight,
            parent: container
        });
        thirdRowContainer = scene.create({
            t: "object",
            x: rowContainerLeft,
            y: thirdRowContainerTop,
            w: rowContainerWidth,
            h: thirdRowContainerHeight,
            parent: container
        });
        createInitThirdRowGrids();
    }
    /***
     * Carousel Section starts
     * 
     */

    function initializecarousel() {
        carouselSlideBg = scene.create({
            t: "image9",
            x: 0,
            y: 0,
            w: carouselWidth,
            h: carouselHeight,
            url: base + carouselBg,
            parent: carouselContainer
        });
        youSeeLogo = scene.create({
            t: "image9",
            x: logoLeft,
            y: logoTop,
            w: logoWidth,
            h: logoHeight,
            url: base + logoUrl,
            parent: carouselContainer
        });
        logoTagline = scene.create({
            t: "text",
            text: "SONDAG | 19:40",
            x: taglinetextLeft,
            y: taglinetextTop,
            w: taglinetextWidth,
            h: taglinetextHeight,
            pixelSize: fontLight,
            fontUrl: fontUrllight,
            parent: carouselContainer
        });
        channelLogo = scene.create({
            t: "image9",
            x: channelLogoLeft,
            y: channelLogoTop,
            w: channelLogoWidth,
            h: channelLogoHeight,
            url: base + channelLogoUrl,
            parent: carouselContainer
        });
        channelProgTitletxt = scene.create({
            t: "text",
            text: channelprogTitle,
            x: channelprogTitleLeft,
            y: channelprogTitleTop,
            w: channelprogTitleWidth,
            h: channelprogTitleHeight,
            pixelSize: channeltitleFontSize,
            fontUrl: fontUrlBold,
            wordWrap: true,
            parent: carouselContainer
        });
        channelProgInfotxt = scene.create({
            t: "textBox",
            text: channelprogCont,
            x: channelprogContLeft,
            y: channelprogContTop,
            w: channelprogContWidth,
            h: channelprogContHeight,
            pixelSize: progInfoFontSize,
            fontUrl: fontUrllight,
            wordWrap: true,
            parent: carouselContainer
        });
        naletrowLeft = scene.create({
            t: "image9",
            x: navLeftImgLeft,
            y: navLeftImgTop,
            w: navLeftImgWidth,
            h: navLeftImgHeight,
            a: 1,
            url: base + navLeftImgUrl,
            parent: carouselContainer
        });
        naletrowRight = scene.create({
            t: "image9",
            x: navRightImgLeft,
            y: navRightImgTop,
            w: navRightImgWidth,
            h: navRightImgHeight,
            a: 1,
            url: base + navRightImgUrl,
            parent: carouselContainer
        });
        moreInfoBtnContainer = scene.create({
            t: "object",
            x: moreInfobtnLeft+20,
            y: moreInfobtnTop+20,
            w: 150,
            h: 50,
            parent: carouselContainer
        });
        moreInfoBtn = scene.create({
            t: "image9",
            x: 0,
            y: 0,
            w: moreInfoBtnContainer.w,
            h: moreInfoBtnContainer.h,
            url: base + "/images/roundedBtnReadMore.svg",
            mask: true,
            clip: true,
            draw: true,
            parent: moreInfoBtnContainer
        });
        readMoreText = scene.create({
            t: "textBox",
            text: "Read More",
            w: moreInfoBtnContainer.w,
            h: moreInfoBtnContainer.h,
            textColor: "#fff",
            pixelSize: 16,
            fontUrl: fontUrllight,
            alignHorizontal: 1,
            alignVertical: 1,
            x: -7,
            y: 6,
            parent: moreInfoBtnContainer
        });
        updateCarouselData(index);
    }

    /***
     * Updating Carousel Section by passing object array index
     * 
     */

    function updateCarouselData(index) {
        let carouselObj = carouselObjArray[index];
        carouselSlideBg.url = base + carouselObj.carouselBg;
        logoTagline.text = "SONDAG | " + time + ":" + min;
        channelLogo.url = base + carouselObj.channelLogoUrl;
        channelProgTitletxt.text = carouselObj.progTitleText;
        channelProgInfotxt.text = carouselObj.progInfoText;
        naletrowLeft.a = 0;
        naletrowLeft.url = base + carouselObj.arrowLeftUrl;
        naletrowRight.a = 1;
        naletrowRight.url = base + carouselObj.arrowRightUrl;

    }

    /***
     * Creating First Row grids
     *
     */

    function createInitFirstRowGrids() {
            let totalNoOfCol = 3;
            let gridleft = 0;
            for (let firstColIndex = 0; firstColIndex < totalNoOfCol; firstColIndex++) {
                let columnContainer = scene.create({
                    t: "object",
                    id: "firstRowContainer" + (firstColIndex + 1),
                    x: gridleft,
                    y: rowTitleHeight,
                    w: firstRowGridWidth,
                    h: firstRowGridHeight,
                    parent: firstRowContainer
                });
                gridleft = gridleft + firstRowGridWidth + 20;
                arrayGridParentFirstRow.push(columnContainer);
            }

            initializeFirstRow(arrayGridParentFirstRow);
        }
        /***
         * Creating Second Row grids
         *
         */
    function createInitSecondRowGrids() {
        let totalNoOfCol = 4;
        let gridleft = 0;
        for (let firstColIndex = 0; firstColIndex < totalNoOfCol; firstColIndex++) {
            let columnContainer = scene.create({
                t: "object",
                id: "secondRowContainer" + (firstColIndex + 1),
                x: gridleft,
                y: rowTitleHeight,
                w: secondRowGridWidth,
                h: secondRowGridHeight,
                parent: secondRowContainer
            });
            gridleft = gridleft + secondRowGridWidth + 20;
            arrayGridParentSecondRow.push(columnContainer);
        }
        initializeSecondRow(arrayGridParentSecondRow);
    }

    /***
     * Creating Third Row grids
     *
     */
    function createInitThirdRowGrids() {
        let totalNoOfCol = 5;
        let gridleft = 0;
        for (let firstColIndex = 0; firstColIndex < totalNoOfCol; firstColIndex++) {
            let columnContainer = scene.create({
                t: "object",
                id: "thirdRowContainer" + (firstColIndex + 1),
                x: gridleft,
                y: rowTitleHeight,
                w: thirdRowGridWidth,
                h: thirdRowGridHeight,
                parent: thirdRowContainer
            });
            gridleft = gridleft + thirdRowGridWidth + 20;
            arrayGridParentThirdRow.push(columnContainer);
        }
        initializeThirdRow(arrayGridParentThirdRow);
    }
    /***
     * initializing First Row
     *
     */
    
    function initializeFirstRow(arrayGridParentFirstRow) {

        // first row Top title
        firstRowTopTitle = scene.create({
            t: "text",
            text: firstRowTitle.text,
            x: 0,
            y: 0,
            w: rowContainerWidth,
            h: rowTitleHeight,
            pixelSize: rowTitleFontSize,
            fontUrl: fontUrlBold,
            parent: firstRowTitleContainer
        });
        
        for (let i = 0; i < arrayGridParentFirstRow.length; i++) {
            parentContainer = arrayGridParentFirstRow[i];
            imgObjContainer = scene.create({
                t: "object",
                x: 0,
                y: rowTitleHeight,
                w: firstRowGridWidth,
                h: firstRowImageHeight,
                parent: parentContainer
            });

            firstRowGridroundedImage = scene.create({
                t: "image9",
                x: 0,
                y: 0,
                w: firstRowGridWidth,
                h: firstRowImageHeight,
                url: roundedCorner,
                parent: imgObjContainer,
                mask: true
            });
        
            firstRowGridMediaImage = scene.create({
                t: "image9",
                id: "thumbnaiIimage",
                x: 0,
                y: 0,
                w: firstRowGridWidth,
                h: firstRowImageHeight,
                url: base + "/images/NoMedia.jpg",
                focus: true,
                parent: imgObjContainer
            });
            
            firstRowGridMediaTitle = scene.create({
                t: "textBox",
                id: "thumbnailShow",
                text: "No Media",
                x: 0,
                y: firstRowImageHeight + marginTop,
                w: firstRowGridWidth,
                h: mediaTitleHeight,
                pixelSize: mediaTitleFontSize,
                truncation: 1,
                ellipsis: true,
                fontUrl: fontUrlBold,
                parent: parentContainer
            });
            firstRowGridMediaEpsName = scene.create({
                t: "text",
                id: "thumbnailTitle",
                text: "No Media",
                x: 0,
                y: firstRowImageHeight + mediaTitleHeight + marginTop,
                w: firstRowGridWidth,
                h: epsTitleHeight,
                pixelSize: epsFontSize,
                fontUrl: fontUrllight,
                textColor: unHighlitedFontColor,
                parent: parentContainer
            });

        }
        updateFirstRowData(index);
    }

    /***
     * Updating first row by passing object array index
     *
     */

    function updateFirstRowData(index) {
            let firstRowchildren = firstRowContainer.numChildren;
            for (let i = 0; i < firstRowchildren; i++) {
                if (index == firstRowObjArray.length){
                    index = 0;
                }
                    colObject = firstRowContainer.getChild(i);
                    let firstRowObj = firstRowObjArray[index++];
                    let tImage = colObject.getObjectById("thumbnaiIimage");
                    tImage.url = base + firstRowObj.imgurl;
                    let tShow = colObject.getObjectById("thumbnailShow");
                    tShow.text = firstRowObj.title;
                    let tTitle = colObject.getObjectById("thumbnailTitle");
                    tTitle.text = firstRowObj.eptitle;
                } 
                 
        }

    /***
     * initializing Second Row
     *
     */

    function initializeSecondRow(arrayGridParentSecondRow) {
        // second row title
        secondRowTopTitle = scene.create({
            t: "text",
            text: secondRowTitle.text,
            x: 0,
            y: 0,
            w: rowContainerWidth,
            h: rowTitleHeight,
            pixelSize: rowTitleFontSize,
            fontUrl: fontUrlBold,
            parent: secondRowTitleContainer
        });
        for (let i = 0; i < arrayGridParentSecondRow.length; i++) {
            let parentContainer = arrayGridParentSecondRow[i];
            imgObjContainer = scene.create({
                t: "object",
                x: 0,
                y: rowTitleHeight,
                w: secondRowGridWidth,
                h: secondRowImageHeight,
                parent: parentContainer
            });
            secondRowGridroundedImage = scene.create({
                t: "image9",
                x: 0,
                y: 0,
                w: secondRowGridWidth,
                h: secondRowImageHeight,
                url: roundedCorner,
                mask: true,
                parent: imgObjContainer
            });
            secondRowGridMediaImage = scene.create({
                t: "image9",
                id: "thumbnaiIimage",
                x: 0,
                y: 0,
                w: secondRowGridWidth,
                h: secondRowImageHeight,
                url: base + "/images/NoMedia.jpg",
                parent: imgObjContainer
            });
            secondRowGridMediaTitle = scene.create({
                t: "textBox",
                id: "thumbnailShow",
                text: "No Media  1",
                x: 0,
                y: secondRowImageHeight + marginTop,
                w: secondRowGridWidth,
                h: mediaTitleHeight,
                pixelSize: mediaTitleFontSize,
                truncation: 1,
                ellipsis: true,
                fontUrl: fontUrllight,
                parent: parentContainer
            });
            secondRowGridMediaEpsName = scene.create({
                t: "text",
                id: "thumbnailTitle",
                text: "Episode",
                x: 0,
                y: secondRowImageHeight + mediaTitleHeight + marginTop,
                w: secondRowGridWidth,
                h: epsTitleHeight,
                pixelSize: epsFontSize,
                fontUrl: fontUrllight,
                textColor: unHighlitedFontColor,
                parent: parentContainer
            });
        }
        updateSecondRowData(index);
    }

    /***
     * Updating second row by passing object array index
     *
     */

    function updateSecondRowData(index) {
        let secondRowchildren = secondRowContainer.numChildren;
        for (let i = 0; i < secondRowchildren; i++) {
            if (index == secondRowObjArray.length){
                index = 0;
            }
            colObject = secondRowContainer.getChild(i);
            let secondRowObj = secondRowObjArray[index++];
            let tImage = colObject.getObjectById("thumbnaiIimage");
            tImage.url = base + secondRowObj.imgurl;
            let tShow = colObject.getObjectById("thumbnailShow");
            tShow.text = secondRowObj.title;
            let tTitle = colObject.getObjectById("thumbnailTitle");
            tTitle.text = secondRowObj.eptitle;
        }
    }

    /***
     * initializing Third Row
     *
     */
    function initializeThirdRow(arrayGridParentThirdRow) {
        // third row Top title
        thirdRowTopTitle = scene.create({
            t: "text",
            text: thirdRowTitle.text,
            x: 0,
            y: 0,
            w: rowContainerWidth,
            h: rowTitleHeight,
            pixelSize: rowTitleFontSize,
            fontUrl: fontUrlBold,
            parent: thirdRowTitleContainer
        });
        for (let i = 0; i < arrayGridParentThirdRow.length; i++) {
            let parentContainer = arrayGridParentThirdRow[i];
            imgObjContainer = scene.create({
                t: "object",
                x: 0,
                y: rowTitleHeight,
                w: thirdRowGridWidth,
                h: thirdRowImageHeight,
                parent: parentContainer
            });
            thirdRowGridroundedImage = scene.create({
                t: "image9",
                x: 0,
                y: 0,
                w: thirdRowGridWidth,
                h: thirdRowImageHeight,
                url: roundedCorner,
                mask: true,
                parent: imgObjContainer
            });
            thirdRowGridMediaImage = scene.create({
                t: "image9",
                id: "thumbnaiIimage",
                x: 0,
                y: 0,
                w: thirdRowGridWidth,
                h: thirdRowImageHeight,
                url: base + "/images/NoMedia.jpg",
                parent: imgObjContainer
            });
            thirdRowGridMediaTitle = scene.create({
                t: "textBox",
                id: "thumbnailShow",
                text: "No Media ",
                x: 0,
                y: thirdRowImageHeight + marginTop,
                w: thirdRowGridWidth,
                h: mediaTitleHeight,
                pixelSize: mediaTitleFontSize,
                fontUrl: fontUrllight,
                truncation: 1,
                ellipsis: true,
                parent: parentContainer
            });
            thirdRowGridMediaEpsName = scene.create({
                t: "text",
                id: "thumbnailTitle",
                text: "No Media ",
                x: 0,
                y: thirdRowImageHeight + mediaTitleHeight + marginTop,
                w: thirdRowGridWidth,
                h: epsTitleHeight,
                pixelSize: epsFontSize,
                fontUrl: fontUrllight,
                textColor: unHighlitedFontColor,
                parent: parentContainer
            });
        }
        updateThirdRowData(index);
    }

    /***
     * Updating third row by passing object array index
     *
     */
    function updateThirdRowData(index) {
        let thirdRowchildren = thirdRowContainer.numChildren;
        for (let i = 0; i < thirdRowchildren; i++) {
            if (index == thirdRowObjArray.length){
                index = 0;
            }
            colObject = thirdRowContainer.getChild(i);
            let thirdRowObj = thirdRowObjArray[index++];
            let tImage = colObject.getObjectById("thumbnaiIimage");
            tImage.url = base + thirdRowObj.imgurl;
            let tShow = colObject.getObjectById("thumbnailShow");
            tShow.text = thirdRowObj.title;
            let tTitle = colObject.getObjectById("thumbnailTitle");
            tTitle.text = thirdRowObj.eptitle;
        }
    }

    let highlighter1;
    let highlighter2;
    let highlighter3;
    // Handling key events
    scene.root.on("onKeyDown", function(e) {
        switch (e.keyCode) {
            case keys.LEFT:
                NavigateLeft();
                break;
            case keys.RIGHT:
                NavigateRight();
                break;
            case keys.UP:
                NavigateUp();
                break;
            case keys.DOWN:
                NavigateDown();
                break;
            case keys.ENTER:
                NavigateEnter();
        }

    });

    function NavigateRight() {
        index++;
        if(containerPos==0){
            if (index < carouselObjArray.length) {
                updateCarouselData(index);
                naletrowLeft.a = 1;
            } else {
            index = carouselObjArray.length - 1;
            naletrowRight.a = 0; // Disable right navigation if index is = index.length;   
            }
        }
        if(containerPos == 1){
            if (index < firstRowObjArray.length) {
                updateFirstRowData(index);   
            } else{
                index = 0;
                updateFirstRowData(index);
            }
        }
        if(containerPos==2){
                if (index < secondRowObjArray.length) {
                updateSecondRowData(index);   
                }else {
                    index=0;
                    updateSecondRowData(index); 
                }
        }
        if(containerPos==3){
            if (index < thirdRowObjArray.length) {
            updateThirdRowData(index);   
            }else {
                index=0;
                updateThirdRowData(index); 
            }
    }
    }

    function NavigateLeft() {
        if(containerPos==0){
            if (index > 0) {
                index--;
                updateCarouselData(index);
                naletrowLeft.a = 1;
            } else {
                index = 0;
                naletrowLeft.a = 0; // Disable Left navigation if index is 0   
                }
        }
        if(containerPos == 1){
            if (index > 0) {
                index--;
                updateFirstRowData(index);   
            }
        }
            
        if(containerPos == 2){
                if (index > 0) {
                    index--;
                    updateSecondRowData(index);   
                    }
            }

        if(containerPos == 3){
                if (index > 0) {
                    index--;
                    updateThirdRowData(index);   
                    }
            }
    }

    function NavigateUp() {   
            if (containerPos == 3) {
                container.y = positionTop*3+scrollTop;
                containerPos--;
            }else if (containerPos == 2) {
                container.y = positionTop*2+scrollTop;
                containerPos--;
            }else if (containerPos == 1) {
                container.y = positionTop+scrollTop;
                containerPos--;
            }
            heighliter(containerPos);
    }

    function NavigateDown() {
        containerPos++
        if(containerPos == 1){
                container.y = positionTop;
            }else if(containerPos == 2){
                container.y = positionTop*2;
            }else if(containerPos == 3){
                container.y = positionTop*2-200;
            }else{
                containerPos = 3;
            }
            heighliter(containerPos);
    }

    function heighliter(containerPos){
        if(containerPos == 1){
            firstColContainer = arrayGridParentFirstRow[0];
            colObject = firstColContainer.getChild(0);
            imgHighliter1 = colObject.getObjectById("thumbnaiIimage");
            highlighter1 = scene.create({t:"image9", x: 0, y:0, a: 1, url:roundedHighlighter, parent:imgHighliter1, w: imgHighliter1.w, h:imgHighliter1.h, mask: true });  
        }else{
            highlighter1.a = 0;
        }
        
        if(containerPos == 2){
            secondColContainer = arrayGridParentSecondRow[0];
            colObject = secondColContainer.getChild(0);
            imgHighliter2 = colObject.getObjectById("thumbnaiIimage");
            highlighter2 = scene.create({t:"image9", x: 0, y:0, a: 1, url:roundedHighlighter, parent:imgHighliter2, w: imgHighliter2.w, h:imgHighliter2.h, mask: true });  
        } else{
            highlighter2.a = 0;
        }
        if(containerPos == 3){
            thirdColContainer = arrayGridParentThirdRow[0];
            colObject = thirdColContainer.getChild(0);
            imgHighliter3 = colObject.getObjectById("thumbnaiIimage");
            highlighter3 = scene.create({t:"image9", x: 0, y:0, a: 1, url:roundedHighlighter, parent:imgHighliter3, w: imgHighliter3.w, h:imgHighliter3.h, mask: true });  
        } else {
            highlighter3.a = 0;
        }
    }
    
    function NavigateEnter() {
        console.log(" TODO key Enter navigation");
    }

}).catch(function importFailed(err) {
    console.error("Import failed for Testapp.js: " + err)
});
