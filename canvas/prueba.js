/* Hi! we kept a more readable version of the source for you at http://bomomo.com/default.js */
var app = new App();
var misc = new MiscLibrary();
window.onload = init;

function init() {
    app.init();
    app.intervalID = setInterval(run, app.intervalMS)
}

function run() {
    app.handleRageMode();
    for (var A in app.sprites) {
        app.sprites[A].move();
        var B = A == 0 ? app.maxSprites - 1 : A - 1;
        app.sprites[A].handleType(app.sprites[B], A, app.sprites[0])
    }
    app.draw()
}

function handleMouseMoved(B) {
    var A = 0,
        C = 0;
    if (!B) {
        var B = window.event
    }
    if (B.layerX) {
        A = B.layerX;
        C = B.layerY
    } else {
        A = B.x;
        C = B.y
    }
    if (A && C) {
        app.lastCursorX = app.cursorX;
        app.lastCursorY = app.cursorY;
        app.cursorX = A;
        app.cursorY = C
    }
}

function handleMouseDown(B) {
    app.cursorActive = true;
    for (var A in app.sprites) {
        app.sprites[A].initedAfterCursorActive = false
    }
}

function handleMouseUp(B) {
    app.cursorActive = false;
    if (app.timeout == 0) {
        app.timeout = setTimeout("switchSubmode()", 300)
    }
    for (var A in app.sprites) {
        app.sprites[A].initedAfterCursorInactive = false
    }
}

function switchSubmode() {
    app.submode = app.submode == 1 ? 2 : 1;
    app.timeout = 0
}

function handleMouseIn(A) {
    app.cursorIn = true
}

function handleMouseOut(A) {
    app.cursorIn = false;
    app.cursorActive = false
}

function showMenuHover() {
    if (app.hasSaveTypes) {
        showMenu()
    }
}

function showMenu() {
    if (app.hasSaveTypes) {
        if (app.menuTimeout != 0) {
            clearTimeout(app.menuTimeout)
        }
        misc.showElm("menu")
    } else {
        showAbout()
    }
}

function closeMenuDelay() {
    if (app.hasSaveTypes) {
        if (app.menuTimeout != 0) {
            clearTimeout(app.menuTimeout)
        }
        app.menuTimeout = setTimeout("closeMenu()", 300)
    }
}

function overMenu() {
    if (app.menuTimeout != 0) {
        clearTimeout(app.menuTimeout);
        app.menuTimeout = 0
    }
}

function closeMenu() {
    misc.hideElm("menu");
    app.menuTimeout = 0
}

function buttonClicked(C) {
    app.submode = 1;
    app.type = C;
    app.resetSprites();
    app.rageMode = false;
    app.rageAmount = 0;
    for (var A = 1; A <= app.maxSpriteTypes; A++) {
        var B = document.getElementById("button" + A);
        if (A == C) {
            B.style.borderLeft = "2px solid #777";
            B.style.borderTop = "2px solid #777";
            B.style.borderRight = "2px solid #fff";
            B.style.borderBottom = "2px solid #fff";
            B.style.backgroundColor = "rgb(255,255,0)"
        } else {
            B.style.borderLeft = "2px solid #fff";
            B.style.borderTop = "2px solid #fff";
            B.style.borderRight = "2px solid #777";
            B.style.borderBottom = "2px solid #777";
            B.style.backgroundColor = "rgb(198,198,198)"
        }
    }
}

function buttonOver(B) {
    var A = document.getElementById("button" + B);
    A.style.backgroundColor = app.type == B ? "rgb(0,255,255)" : "rgb(255,255,0)"
}

function buttonOut(B) {
    var A = document.getElementById("button" + B);
    A.style.backgroundColor = app.type == B ? "rgb(255,255,0)" : "rgb(198,198,198)"
}

function canSave() {
    return app.canCanvas && !!(app.canvasBackground.toDataURL)
}

function saveCanvas() {
    if (canSave()) {
        if (app.hasSaveTypes) {
            app.canvasForegroundContext.fillStyle = "rgb(255,255,255)";
            app.canvasForegroundContext.fillRect(0, 0, app.canvasWidth, app.canvasHeight);
            app.canvasForegroundContext.drawImage(app.canvasBackground, 0, 0);
            var C = app.canvasForeground.toDataURL("image/jpeg");
            var B = document.getElementById("canvasData");
            B.value = C;
            var A = document.getElementById("mainForm");
            A.submit()
        } else {
            saveCanvasHi()
        }
    } else {
        showSavingSorry()
    }
}

function saveCanvasHi() {
    if (canSave()) {
        var A = app.canvasBackground.toDataURL();
        if (app.hasSaveTypes) {
            A = A.replace(/data:image\/png/i, "data:application/foobar");
            document.location.href = A
        } else {
            var B = window.open(A)
        }
    } else {
        showSavingSorry()
    }
}

function showSavingSorry() {
    alert("Sorry, saving only works in the Firefox browser at the moment...")
}

function newCanvas() {
    app.clearBack();
    app.resetSprites();
    app.submode = 1;
    app.rageMode = false;
    app.rageAmount = 0
}

function showAbout() {
    misc.showElm("about");
    closeMenu()
}

function hideAbout() {
    misc.hideElm("about")
}

function App() {
    var A = 1;
    this.pressed = false;
    this.cursorX = 0;
    this.cursorY = 0;
    this.lastCursorX = 0;
    this.lastCursorY = 0;
    this.cursorIn = false;
    this.cursorActive = false;
    this.intervalMS = 10;
    this.intervalID = null;
    this.sprites = new Array();
    this.fullCircle = Math.PI * 2;
    this.canvasWidth = 760;
    this.canvasHeight = 520;
    this.canvasBackground = null;
    this.canvasBackgroundContext = null;
    this.canvasForeground = null;
    this.canvasForegroundContext = null;
    this.maxSprites = 7;
    this.submode = 1;
    this.timeout = 0;
    this.menuTimeout = 0;
    this.colors = new Array();
    this.canCanvas = false;
    this.hasSaveTypes = false;
    this.rageMode = false;
    this.rageAmount = 0;
    this.rageModeCounter = 0;
    this.rageModeJustActivated = false;
    this.rageModeJustInactivated = false;
    this.enumHunter = A++;
    this.enumBouncer = A++;
    this.enumEraser = A++;
    this.enumRobot = A++;
    this.enumCircleHunter = A++;
    this.enumCircle = A++;
    this.enumCrosshatch = A++;
    this.enumBubble = A++;
    this.enumCurve = A++;
    this.enumComet = A++;
    this.enumPendulum = A++;
    this.enumLines = A++;
    this.enumGrid = A++;
    this.enumSpray = A++;
    this.enumLineSpray = A++;
    this.enumMatrix = A++;
    this.enumFollower = A++;
    this.enumRectangler = A++;
    this.enumSprinkler = A++;
    this.enumShaper = A++;
    this.maxSpriteTypes = A - 1;
    this.indexRed = 0;
    this.indexGreen = 1;
    this.indexBlue = 2;
    this.paletteMax = 256;
    this.type = 1;
    this.enumDrawInk = A++;
    this.enumShow = A++;
    this.teleported = false
}
App.prototype.init = function() {
    var A = navigator.appName.indexOf("Microsoft") != -1;
    app.canCanvas = !A;
    app.type = 1;
    this.initCanvas();
    this.initColors();
    this.initSprites();
    app.hasSaveTypes = this.getHasSaveTypes();
    if (!canSave()) {
        misc.hideElm("toolbarButtonSave")
    }
};
App.prototype.getHasSaveTypes = function() {
    var B = "image/jpeg";
    var A = app.canvasForeground.toDataURL(B);
    return A.indexOf(B) >= 1
};
App.prototype.resetSprites = function() {
    app.sprites = new Array();
    app.initSprites()
};
App.prototype.initSprites = function() {
    for (i = 0; i < app.maxSprites; i++) {
        this.sprites[i] = new Sprite();
        this.sprites[i].type = app.type
    }
};
App.prototype.inCanvasWithPadding = function(A, C) {
    var B = 30;
    return A >= B && A <= this.canvasWidth - B && C >= B && C <= this.canvasHeight - B
};
App.prototype.draw = function() {
    this.canvasForegroundContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    for (var A in this.sprites) {
        var B = A == 0 ? this.maxSprites - 1 : A - 1;
        this.sprites[A].draw(this.canvasBackgroundContext, this.enumDrawInk, this.sprites[B], A);
        this.sprites[A].draw(this.canvasForegroundContext, this.enumShow, this.sprites[B], A)
    }
};
App.prototype.handleRageMode = function() {
    var B = 200;
    var D = 2000;
    var C = 15;
    var A = 400;
    this.rageModeJustActivated = false;
    this.rageModeJustInactivated = false;
    if (app.cursorIn) {
        if (app.inCanvasWithPadding(this.lastCursorX, this.lastCursorY) && app.inCanvasWithPadding(this.cursorY, this.cursorY)) {
            this.rageAmount += misc.getDistance(this.lastCursorX, this.lastCursorY, this.cursorX, this.cursorY)
        }
    }
    this.rageAmount -= C;
    if (this.rageAmount < 0) {
        this.rageAmount = 0
    } else {
        if (this.rageAmount >= D) {
            this.rageAmount = D
        }
    }
    if (!this.rageMode && this.rageAmount >= B) {
        this.rageMode = true;
        this.rageModeCounter = A;
        this.rageAmount = 0;
        this.rageModeJustActivated = true
    }
    if (this.rageMode) {
        this.rageAmount = 0;
        this.rageModeCounter--;
        if (this.rageModeCounter <= 0) {
            this.rageMode = false;
            this.rageModeJustInactivated = true
        }
    } else {}
};
App.prototype.initColors = function() {
    var B = 0;
    var A = 15;
    for (B = 0; B < A; B++) {
        this.colors[B] = new Array()
    }
    B = 0;
    this.colors[B][this.indexRed] = 250;
    this.colors[B][this.indexGreen] = 0;
    this.colors[B][this.indexBlue] = 0;
    B++;
    this.colors[B][this.indexRed] = 250;
    this.colors[B][this.indexGreen] = 100;
    this.colors[B][this.indexBlue] = 0;
    B++;
    this.colors[B][this.indexRed] = 250;
    this.colors[B][this.indexGreen] = 250;
    this.colors[B][this.indexBlue] = 0;
    B++;
    this.colors[B][this.indexRed] = 0;
    this.colors[B][this.indexGreen] = 250;
    this.colors[B][this.indexBlue] = 0;
    B++;
    this.colors[B][this.indexRed] = 0;
    this.colors[B][this.indexGreen] = 150;
    this.colors[B][this.indexBlue] = 50;
    B++;
    this.colors[B][this.indexRed] = 0;
    this.colors[B][this.indexGreen] = 50;
    this.colors[B][this.indexBlue] = 150;
    B++;
    this.colors[B][this.indexRed] = 100;
    this.colors[B][this.indexGreen] = 150;
    this.colors[B][this.indexBlue] = 250;
    B++;
    this.colors[B][this.indexRed] = 0;
    this.colors[B][this.indexGreen] = 200;
    this.colors[B][this.indexBlue] = 250;
    B++;
    this.colors[B][this.indexRed] = 100;
    this.colors[B][this.indexGreen] = 50;
    this.colors[B][this.indexBlue] = 0;
    B++;
    this.colors[B][this.indexRed] = 150;
    this.colors[B][this.indexGreen] = 0;
    this.colors[B][this.indexBlue] = 200;
    B++;
    this.colors[B][this.indexRed] = 250;
    this.colors[B][this.indexGreen] = 50;
    this.colors[B][this.indexBlue] = 150;
    B++;
    this.colors[B][this.indexRed] = 250;
    this.colors[B][this.indexGreen] = 150;
    this.colors[B][this.indexBlue] = 150;
    B++;
    this.colors[B][this.indexRed] = 200;
    this.colors[B][this.indexGreen] = 150;
    this.colors[B][this.indexBlue] = 50;
    B++;
    this.colors[B][this.indexRed] = 200;
    this.colors[B][this.indexGreen] = 250;
    this.colors[B][this.indexBlue] = 100;
    B++;
    this.colors[B][this.indexRed] = 124;
    this.colors[B][this.indexGreen] = 124;
    this.colors[B][this.indexBlue] = 124;
    B++
};
App.prototype.initCanvas = function() {
    this.canvasBackground = document.getElementById("canvasBackground");
    this.canvasBackgroundContext = this.canvasBackground.getContext("2d");
    this.canvasForeground = document.getElementById("canvasForeground");
    this.canvasForegroundContext = this.canvasForeground.getContext("2d");
    this.canvasBackground.width = this.canvasWidth;
    this.canvasBackground.height = this.canvasHeight;
    this.canvasForeground.width = this.canvasWidth;
    this.canvasForeground.height = this.canvasHeight;
    this.clearBack()
};
App.prototype.drawBackground = function() {
    var A = new Image();
    A.onload = function() {
        app.canvasBackgroundContext.drawImage(A, 0, 0)
    };
    A.src = "image/background/2.jpg"
};
App.prototype.pendulum = function(C, B, D, I, F) {
    var H = Math.cos(F * 2 * Math.PI);
    var A = I * 2 * Math.PI;
    var J = H * A;
    var G = C + Math.sin(J) * D;
    var E = B + Math.cos(J) * D;
    return {
        x: G,
        y: E
    }
};
App.prototype.mixColors = function(C, A, H, B, I, G, F) {
    var E = new Array();
    var D = (this.paletteMax - 1) - F;
    E[this.indexRed] = Math.ceil((C * F + B * D) / this.paletteMax);
    E[this.indexGreen] = Math.ceil((A * F + I * D) / this.paletteMax);
    E[this.indexBlue] = Math.ceil((H * F + G * D) / this.paletteMax);
    return E
};
App.prototype.toGridX = function(B, A) {
    if (!A) {
        A = 15
    }
    if (B > 0 && B < this.canvasWidth) {
        B = Math.floor(B / A) * A
    }
    return B
};
App.prototype.toGridY = function(B, A) {
    if (!A) {
        A = 15
    }
    if (B > 0 && B < this.canvasHeight) {
        B = Math.floor(B / A) * A
    }
    return B
};
App.prototype.clearBack = function() {
    this.canvasBackgroundContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
};

function Sprite() {
    this.x = Math.floor(app.canvasWidth / 2 + misc.getRandomInt(-50, 50));
    this.y = Math.floor(app.canvasHeight / 2 + misc.getRandomInt(-50, 50));
    this.radius = 2;
    this.speedX = 0;
    this.speedY = 0;
    this.speedMaxX = 4;
    this.speedMaxY = this.speedMaxX;
    this.speedStep = 0.3;
    this.originX = this.x;
    this.originY = this.y;
    this.targetX = null;
    this.targetY = null;
    this.oldX = this.x;
    this.oldY = this.y;
    this.speedStepX = null;
    this.speedStepY = null;
    this.offset = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.offsetXbase = 0;
    this.offsetYbase = 0;
    this.offsetRadius = 0;
    this.counter = 0;
    this.type = 0;
    this.energy = 0;
    this.colorR = 0;
    this.colorG = 0;
    this.colorB = 0;
    this.colorDirection = 1;
    this.opacity = 0;
    this.maxOpacity = 0.8;
    this.opacityStep = 0.02;
    this.inited = false;
    this.initedAfterCursorActive = false;
    this.initedAfterCursorInactive = false
}
Sprite.prototype.move = function() {
    if (this.speedX > this.speedMaxX) {
        this.speedX = this.speedMaxX
    } else {
        if (this.speedX < -this.speedMaxX) {
            this.speedX = -this.speedMaxX
        }
    }
    if (this.speedY > this.speedMaxY) {
        this.speedY = this.speedMaxY
    } else {
        if (this.speedY < -this.speedMaxY) {
            this.speedY = -this.speedMaxY
        }
    }
    this.oldX = this.x;
    this.oldY = this.y;
    this.x += this.speedX;
    this.y += this.speedY
};
Sprite.prototype.followTarget = function() {
    if (this.targetX != null && this.targetY != null) {
        if (this.speedStepX == null) {
            this.speedStepX = this.speedStep
        }
        if (this.speedStepY == null) {
            this.speedStepY = this.speedStep
        }
        if (this.x > this.targetX) {
            this.speedX -= this.speedStepX
        } else {
            if (this.x < this.targetX) {
                this.speedX += this.speedStepX
            }
        }
        if (this.y > this.targetY) {
            this.speedY -= this.speedStepY
        } else {
            if (this.y < this.targetY) {
                this.speedY += this.speedStepY
            }
        }
    }
};
Sprite.prototype.handleType = function(G, M, O) {
    this.teleported = false;
    switch (this.type) {
        case app.enumHunter:
            if (!this.inited) {
                this.speedX = misc.getRandomInt(-4, 4);
                this.speedY = misc.getRandomInt(-4, 4);
                this.speedMaxX = 2.5 + misc.getRandom(-0.5, 0.5);
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 0.1;
                this.radius = 5;
                this.colorR = 100;
                this.colorG = 100;
                this.colorB = misc.getRandomInt(0, 255);
                this.maxOpacity = 0.6
            }
            if (!this.initedAfterCursorActive) {
                this.colorG = misc.getRandomInt(0, 255);
                this.colorB = misc.getRandomInt(0, 255)
            }
            if (app.cursorIn && !app.rageMode) {
                this.radius = (this.getCursorDistance() + 0.01) / 30;
                if (this.radius <= 2) {
                    this.radius = 2
                }
            }
            if (app.rageModeJustActivated) {
                this.colorR = 250;
                this.speedMaxX = 8;
                this.speedStep = 0.5;
                this.speedMaxY = this.speedMaxX;
                this.radius = 18
            } else {
                if (app.rageModeJustInactivated) {
                    this.speedMaxX = 2.5 + misc.getRandom(-0.5, 0.5);
                    this.speedMaxY = this.speedMaxX;
                    this.speedStep = 0.1
                }
            }
            this.adjustOpacityToCursor();
            if (app.rageMode) {
                this.scrollBlue()
            } else {
                this.scrollRed()
            }
            this.follow(app.cursorX, app.cursorY);
            break;
        case app.enumBouncer:
            if (!this.inited) {
                this.doCenter();
                this.speedX = 0;
                this.speedY = misc.getRandomInt(-5, 5);
                this.speedMaxX = 8;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 0.3;
                this.radius = 4;
                this.colorR = misc.getRandomInt(150, 250);
                this.colorG = misc.getRandomInt(100, 250);
                this.colorB = misc.getRandomInt(150, 250);
                this.maxOpacity = 0.2
            }
            if (app.cursorIn) {
                this.speedMaxX = 8;
                this.speedMaxY = this.speedMaxX;
                if (app.submode == 1) {
                    if (this.speedX == 0) {
                        this.speedX = misc.getRandomInt(-5, 5);
                        this.speedY = 0
                    }
                    this.radius = 3 + Math.abs(this.speedY) * 2;
                    this.adjustOpacityToCursor();
                    this.scrollBlue();
                    if (app.cursorIn) {
                        this.x = app.toGridX(app.cursorX)
                    }
                    this.followY(app.toGridY(app.cursorY))
                } else {
                    if (this.speedY == 0) {
                        this.speedX = 0;
                        this.speedY = misc.getRandomInt(-5, 5)
                    }
                    this.radius = 3 + Math.abs(this.speedX) * 2;
                    this.adjustOpacityToCursor();
                    this.scrollBlue();
                    if (app.cursorIn) {
                        this.y = app.toGridY(app.cursorY)
                    }
                    this.followX(app.toGridX(app.cursorX))
                }
            } else {
                this.speedMaxX = 1;
                this.speedMaxY = this.speedMaxX;
                this.doRelax()
            }
            break;
        case app.enumEraser:
            if (!this.inited) {
                this.doCenter();
                this.speedX = misc.getRandomInt(-5, 5);
                this.speedY = misc.getRandomInt(-5, 5);
                this.speedMaxX = 3;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 0.3;
                this.radius = 4;
                this.colorR = 255;
                this.colorG = 255;
                this.colorB = 255;
                this.maxOpacity = 0.3
            }
            if (app.rageModeJustActivated) {
                this.speedMaxX = 8;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 0.6;
                this.radius = 20;
                this.maxOpacity = 0.6
            } else {
                if (app.rageModeJustInactivated) {
                    this.speedMaxX = 3;
                    this.speedMaxY = this.speedMaxX;
                    this.speedStep = 0.3;
                    this.radius = 4;
                    this.maxOpacity = 0.3
                }
            }
            if (!app.rageMode) {
                this.radius = 2 + (Math.abs(this.speedX) + Math.abs(this.speedY))
            }
            this.adjustOpacityToCursor();
            this.follow(app.cursorX, app.cursorY);
            break;
        case app.enumRobot:
            if (app.rageMode) {
                if (app.rageModeJustActivated) {
                    this.doCenter();
                    this.speedX = 0;
                    this.speedY = 0;
                    this.speedMaxX = 2 + misc.getRandomInt(0, 1);
                    this.speedMaxY = this.speedMaxX;
                    this.speedStepX = misc.getRandomInt(1, 3);
                    if (misc.chance(50)) {
                        this.speedStepX *= -1
                    }
                    this.speedStepY = misc.getRandomInt(1, 3);
                    if (misc.chance(50)) {
                        this.speedStepY *= -1
                    }
                    this.offsetX = misc.getRandomInt(-6, 6);
                    this.offsetY = misc.getRandomInt(-6, 6);
                    this.radius = 3 + misc.getRandomInt(0, 4);
                    switch (misc.getRandomInt(1, 4)) {
                        case 1:
                        case 2:
                        case 3:
                            this.setRGBSemiRandom(false, false, false);
                            break;
                        case 4:
                            this.setRGBRandom();
                            break
                    }
                    this.maxOpacity = 0.9
                }
                if (app.cursorActive) {
                    var S = Math.abs(this.x - app.cursorX);
                    var P = Math.abs(this.y - app.cursorY);
                    var U = 80;
                    if (S <= U) {
                        if (this.x <= app.cursorX) {
                            this.x -= this.speedStepX
                        } else {
                            this.x += this.speedStepX
                        }
                    }
                    if (P <= U) {
                        if (this.y <= app.cursorY) {
                            this.y -= this.speedStepY
                        } else {
                            this.y += this.speedStepY
                        }
                    }
                    this.adjustOpacityToCursor()
                } else {
                    if (misc.chance(5)) {
                        this.offsetX = misc.getRandomInt(-6, 6);
                        this.offsetY = misc.getRandomInt(-6, 6);
                        switch (misc.getRandomInt(1, 4)) {
                            case 1:
                            case 2:
                            case 3:
                                this.setRGBSemiRandom(false, false, false);
                                break;
                            case 4:
                                this.setRGBRandom();
                                break
                        }
                    }
                    this.opacity = 0;
                    this.x = app.cursorX + this.offsetX;
                    this.y = app.cursorY + this.offsetY
                }
            } else {
                if (!this.inited || app.rageModeJustInactivated) {
                    this.doCenter();
                    this.speedX = misc.getRandomInt(-5, 5);
                    this.speedY = misc.getRandomInt(-5, 5);
                    this.speedMaxX = 2 + misc.getRandomInt(-1, 2);
                    this.speedMaxY = this.speedMaxX;
                    this.speedStep = 0.3;
                    this.radius = 4;
                    this.colorR = misc.getRandomInt(100, 250);
                    this.colorG = misc.getRandomInt(100, 250);
                    this.colorB = misc.getRandomInt(100, 250)
                }
                var S = Math.abs(this.x - app.cursorX);
                var P = Math.abs(this.y - app.cursorY);
                if (S > P) {
                    this.speedY = 0;
                    if (S >= 20) {
                        this.followX(app.cursorX)
                    }
                } else {
                    this.speedX = 0;
                    if (P >= 20) {
                        this.followY(app.cursorY)
                    }
                }
                if (this.speedX < 0) {
                    this.colorR = 250
                } else {
                    if (this.speedX > 0) {
                        this.colorB = 50
                    }
                }
                if (this.speedY < 0) {
                    this.colorB = 250
                } else {
                    if (this.speedY > 0) {
                        this.colorR = 50
                    }
                }
                this.adjustOpacityToCursor()
            }
            break;
        case app.enumCircleHunter:
            if (!this.inited) {
                this.x = Math.floor(app.canvasWidth / 2 + misc.getRandomInt(-150, 150));
                this.y = Math.floor(app.canvasHeight / 2 + misc.getRandomInt(-150, 150));
                this.speedX = misc.getRandomInt(-4, 4);
                this.speedY = misc.getRandomInt(-4, 4);
                this.speedMaxY = 3;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 0.3;
                this.radius = 5;
                this.maxOpacity = 0.2;
                this.opacityStep = 0.005
            }
            var D = (this.getCursorDistance() + 0.01);
            this.radius = 5 + (60 - misc.forceMax(D, 60));
            this.colorG = 200 + (55 - misc.forceMax(D, 55));
            if (D <= 100 && app.cursorActive) {
                this.scrollRed();
                this.scrollBlue()
            }
            if (!this.initedAfterCursorActive) {
                this.colorR = 100 + misc.getRandomInt(0, 150);
                this.colorG = 200;
                this.colorB = misc.getRandomInt(0, 255)
            }
            if (misc.chance(40)) {
                this.follow(app.cursorX, app.cursorY)
            }
            this.keepInCanvas();
            this.adjustOpacityToCursor();
            this.followSimple(G.x, G.y);
            break;
        case app.enumCircle:
            if (!this.inited) {
                this.doCenter();
                this.speedX = 0;
                this.speedY = 0;
                this.speedMaxX = 3;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 1;
                this.maxOpacity = 0.4;
                this.radius = 10 + misc.getRandomInt(10, 30);
                this.offsetRadius = 60
            }
            if (!this.initedAfterCursorActive) {
                this.colorR = misc.getRandomInt(100, 240);
                this.colorG = misc.getRandomInt(100, 240);
                this.colorB = misc.getRandomInt(100, 240);
                this.counter = 0
            }
            if (!this.initedAfterCursorInactive) {
                this.offsetRadius = 60
            }
            if (app.cursorActive) {
                if (++this.counter >= 150) {
                    this.counter = 0;
                    this.offsetRadius = 110
                }
            }
            if (app.cursorIn) {
                this.x = app.cursorX;
                this.y = app.cursorY
            }
            this.scrollRed();
            this.scrollGreen();
            if (this.radius > 1) {
                this.radius -= this.speedStep
            } else {
                this.radius = this.offsetRadius
            }
            this.adjustOpacityToCursor();
            break;
        case app.enumCrosshatch:
            if (!this.inited) {
                this.doCenter();
                if (misc.chance(50)) {
                    this.speedX = 3 + misc.getRandom(0, 3);
                    this.speedY = 3 + misc.getRandom(0, 3)
                } else {
                    this.speedX = -(3 + misc.getRandom(0, 3));
                    this.speedY = 3 + misc.getRandom(0, 3)
                }
                this.speedMaxX = 10;
                this.speedMaxY = this.speedMaxY;
                this.speedStep = 2;
                this.offsetXbase = misc.getRandomInt(-15, 15);
                this.offsetYbase = misc.getRandomInt(-15, 15);
                this.radius = 3;
                this.offsetRadius = 20;
                this.offsetX = 0;
                this.offsetY = 0;
                if (misc.chance(33)) {
                    this.colorR = misc.getRandomInt(50, 200);
                    this.colorG = misc.getRandomInt(50, 200);
                    this.colorB = misc.getRandomInt(50, 200)
                } else {
                    this.setRGB(30, 30, 30)
                }
                this.maxOpacity = 0.3
            }
            if (!this.initedAfterCursorActive) {
                this.originX = app.cursorX;
                this.originY = app.cursorY;
                this.radius = 3
            }
            if (!this.initedAfterCursorInactive) {
                this.opacity = 0;
                this.radius = 3
            }
            if (app.cursorIn) {
                this.radius = 3 + (this.getCursorDistanceFromOrigin() + 0.01) / 10;
                if (misc.getRandomInt(0, 1000) <= 5) {
                    this.offsetXbase = misc.getRandomInt(-15, 15);
                    this.offsetYbase = misc.getRandomInt(-15, 15)
                }
                if (app.cursorActive) {
                    this.offsetRadius += 0.4;
                    if (this.offsetRadius > 100) {
                        this.offsetRadius = 100
                    }
                } else {
                    this.offsetRadius = 20
                }
                this.crosshatch(this.offsetRadius);
                if (app.cursorActive) {
                    this.x = this.originX + this.offsetXbase + this.offsetX;
                    this.y = this.originY + this.offsetYbase + this.offsetY
                } else {
                    this.x = app.cursorX + this.offsetXbase + this.offsetX;
                    this.y = app.cursorY + this.offsetYbase + this.offsetY
                }
            } else {
                this.offsetRadius = 20;
                this.doRelax()
            }
            this.adjustOpacityToCursor();
            break;
        case app.enumBubble:
            if (!this.inited) {
                this.doCenter();
                var C = misc.getRandom(0, 3);
                if (misc.chance(50)) {
                    this.speedX = 3 + C;
                    this.speedY = 3 + C
                } else {
                    this.speedX = -(3 + C);
                    this.speedY = 3 + C
                }
                this.speedMaxX = 10;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 2;
                this.offsetXbase = misc.getRandomInt(-15, 15);
                this.offsetYbase = misc.getRandomInt(-15, 15);
                this.radius = 5;
                this.colorR = misc.getRandomInt(50, 250);
                this.colorG = misc.getRandomInt(50, 250);
                this.colorB = misc.getRandomInt(50, 250);
                this.maxOpacity = 0.2;
                this.offsetRadius = 40
            }
            if (app.rageModeJustActivated) {
                this.colorR = misc.getRandomInt(255, 255);
                this.colorG = misc.getRandomInt(255, 255);
                this.colorB = misc.getRandomInt(210, 255)
            } else {
                if (app.rageModeJustInactivated) {
                    this.colorR = misc.getRandomInt(50, 250);
                    this.colorG = misc.getRandomInt(50, 250);
                    this.colorB = misc.getRandomInt(50, 250)
                }
            }
            if (app.cursorIn) {
                if (!app.cursorActive && misc.chance(15) && !app.rageMode) {
                    this.colorR = misc.getRandomInt(50, 250);
                    this.colorG = misc.getRandomInt(50, 250);
                    this.colorB = misc.getRandomInt(50, 250)
                }
                this.crosshatch(this.offsetRadius);
                if (app.submode == 1) {
                    this.radius = Math.abs(this.offsetX)
                } else {
                    this.radius = Math.abs(this.offsetRadius * 2 - (Math.abs(this.offsetX) + Math.abs(this.offsetY)))
                }
                this.x = app.cursorX + this.offsetXbase + this.offsetX;
                this.y = app.cursorY + this.offsetYbase + this.offsetY
            } else {
                this.doRelax()
            }
            this.adjustOpacityToCursor();
            break;
        case app.enumComet:
            if (!this.inited) {
                this.doCenter();
                this.speedX = misc.getRandomInt(-4, 4);
                this.speedY = misc.getRandomInt(-4, 4);
                this.speedMaxX = 1 + misc.getRandom(0, 2);
                this.speedMaxY = 1 + misc.getRandom(0, 2);
                this.speedStep = 1.5;
                this.offsetX = misc.getRandomInt(-30, 30);
                this.offsetY = misc.getRandomInt(-30, 30);
                this.offsetRadius = misc.getRandomInt(0, 10);
                this.radius = 5 + this.offsetRadius;
                switch (misc.getRandomInt(1, 3)) {
                    case 1:
                        this.setRGBSemiRandom(true, true, false);
                        break;
                    case 2:
                        this.setRGBSemiRandom(true, false, true);
                        break;
                    case 3:
                        this.setRGBSemiRandom(false, true, true);
                        break
                }
                this.maxOpacity = 0.9
            }
            if (!this.initedAfterCursorActive && !app.rageMode) {
                if (misc.chance(20)) {
                    switch (misc.getRandomInt(1, 3)) {
                        case 1:
                            this.setRGBSemiRandom(true, true, false);
                            break;
                        case 2:
                            this.setRGBSemiRandom(true, true, true);
                            break;
                        case 3:
                            this.setRGBSemiRandom(false, true, true);
                            break
                    }
                }
                this.speedMaxX = 3 + misc.getRandom(0, 4);
                this.speedMaxY = 3 + misc.getRandom(0, 4)
            }
            if (!this.initedAfterCursorInactive && !app.rageMode) {
                this.speedMaxX = 1 + misc.getRandom(0, 2);
                this.speedMaxY = 1 + misc.getRandom(0, 2)
            }
            if (misc.getRandomInt(0, 1000) <= 5) {
                this.offsetX = misc.getRandomInt(-30, 30);
                this.offsetY = misc.getRandomInt(-30, 30)
            }
            if (app.cursorActive) {
                this.radius += 0.2;
                if (this.radius > 30) {
                    this.radius = 30
                }
            } else {
                this.radius = 5 + this.offsetRadius
            }
            if (app.rageModeJustActivated) {
                this.speedMaxX = 5;
                this.speedMaxY = this.speedMaxX;
                this.offsetRadius = misc.getRandomInt(10, 20);
                this.radius = 5 + this.offsetRadius;
                var E = misc.getRandomInt(0, 80);
                var V = 30 + E,
                    T = 60 + E,
                    Q = 170 + E;
                if (misc.chance(50)) {
                    this.setRGB(V, T, Q)
                } else {
                    this.setRGB(V, Q, T)
                }
                this.maxOpacity = 0.3
            } else {
                if (app.rageModeJustInactivated) {
                    this.speedMaxX = 1 + misc.getRandom(0, 2);
                    this.speedMaxY = 1 + misc.getRandom(0, 2);
                    this.offsetRadius = misc.getRandomInt(0, 10);
                    this.radius = 5 + this.offsetRadius;
                    switch (misc.getRandomInt(1, 3)) {
                        case 1:
                            this.setRGBSemiRandom(true, true, false);
                            break;
                        case 2:
                            this.setRGBSemiRandom(true, false, true);
                            break;
                        case 3:
                            this.setRGBSemiRandom(false, true, true);
                            break
                    }
                    this.maxOpacity = 0.9
                }
            }
            if (this.getCursorDistance() <= 125) {
                this.follow(app.toGridX(app.cursorX) + this.offsetX, app.toGridY(app.cursorY) + this.offsetY)
            }
            this.keepInCanvasWithMargin(40);
            this.adjustOpacityToCursor();
            break;
        case app.enumPendulum:
            if (!this.inited) {
                this.radius = 5 + M / 3;
                this.colorR = 50 + 10 * M;
                this.colorG = misc.getRandomInt(0, 255);
                this.colorB = 50 + 30 * M;
                this.offsetRadius = 50 + 2 * M;
                this.maxOpacity = 0.05 + M / 20;
                this.speedStep = 0.003
            }
            if (app.cursorActive) {
                if (this.offsetRadius <= 150) {
                    this.offsetRadius += 0.2;
                    this.radius += 0.1
                }
            } else {
                var H = 5 + M / 3;
                var B = 50 + 2 * M;
                if (this.radius > H) {
                    this.radius -= 0.2
                }
                if (this.offsetRadius > B) {
                    this.offsetRadius -= 0.4
                }
            }
            this.counter += this.speedStep;
            if (this.counter == 1000) {
                this.counter = 0
            }
            this.counter %= 1;
            var F = 1;
            var N = app.pendulum(app.cursorX, app.cursorY, this.offsetRadius, F, this.counter);
            this.x = N.x;
            this.y = N.y;
            this.scrollRed();
            this.adjustOpacityToCursor();
            break;
        case app.enumLines:
            if (!this.inited) {
                this.x = Math.floor(app.canvasWidth / 2 + misc.getRandomInt(-150, 150));
                this.y = Math.floor(app.canvasHeight / 2 + misc.getRandomInt(-150, 150));
                this.speedX = misc.getRandomInt(-4, 4);
                this.speedY = misc.getRandomInt(-4, 4);
                this.radius = 5;
                this.speedMaxX = 6;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 0.3;
                this.colorR = misc.getRandomInt(40, 200);
                this.colorG = misc.getRandomInt(80, 255);
                this.colorB = misc.getRandomInt(0, 150);
                this.maxOpacity = 0.3
            }
            if (M == 0) {
                if (app.cursorIn) {
                    this.x = app.cursorX;
                    this.y = app.cursorY
                }
                this.maxOpacity = 0
            } else {
                this.followSimple(G.x, G.y)
            }
            if (app.rageModeJustActivated) {
                this.radius = 15;
                this.colorR = misc.getRandomInt(200, 255);
                this.colorG = misc.getRandomInt(200, 255);
                this.colorB = misc.getRandomInt(200, 255);
                this.maxOpacity = 0.6
            } else {
                if (app.rageModeJustInactivated) {
                    this.radius = 5;
                    this.colorR = misc.getRandomInt(40, 200);
                    this.colorG = misc.getRandomInt(80, 255);
                    this.colorB = misc.getRandomInt(0, 150);
                    this.maxOpacity = 0.3
                }
            }
            this.keepInCanvasWithMargin(70);
            this.adjustOpacityToCursor();
            break;
        case app.enumGrid:
            if (!this.inited) {
                this.x = M * (app.canvasWidth / app.maxSprites) + 50;
                this.y = misc.getRandomInt(50, app.canvasHeight - 50);
                this.speedX = 0;
                this.speedY = 10;
                this.speedMaxX = 5;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 0.5;
                this.radius = 60 + misc.getRandomInt(0, 20);
                this.setRGB(150, 150, 150);
                this.opacityStep = 0.005;
                this.maxOpacity = 0.1
            }
            if (app.submode == 1) {
                if (this.speedY == 0) {
                    this.speedX = 0;
                    this.speedY = 10
                }
            } else {
                if (this.speedX == 0) {
                    this.speedX = 10;
                    this.speedY = 0
                }
            }
            if (app.rageModeJustActivated) {
                this.speedMaxX = 25;
                this.speedMaxY = this.speedMaxX;
                this.radius = 140 + misc.getRandomInt(0, 20)
            } else {
                if (app.rageModeJustInactivated) {
                    this.speedMaxX = 5;
                    this.speedMaxY = this.speedMaxX;
                    this.radius = 60 + misc.getRandomInt(0, 20)
                }
            }
            if (app.cursorIn) {
                this.setColorFromPosition(app.cursorX, app.cursorY)
            } else {
                this.setRGB(150, 150, 150)
            }
            this.adjustOpacityToCursor();
            this.keepInCanvasAllowOverlap();
            break;
        case app.enumSpray:
            if (!this.inited) {
                this.doCenter();
                this.offsetRadius = 70;
                this.setCircleOffset();
                this.radius = misc.getRandomInt(2, 5);
                this.setRGBRandom();
                this.maxOpacity = 0.8
            }
            if (misc.chance(5)) {
                this.setRGBRandom();
                this.setCircleOffset();
                var D = Math.abs(this.offsetX) + Math.abs(this.offsetY);
                this.radius = (this.offsetRadius + 10 - D) / 10
            }
            if (app.cursorActive) {
                this.offsetRadius += 2;
                if (this.offsetRadius > 300) {
                    this.offsetRadius = 300
                }
            } else {
                this.offsetRadius = 70
            }
            if (app.cursorIn) {
                this.x = app.cursorX - this.offsetX;
                this.y = app.cursorY - this.offsetY
            } else {
                this.x = app.canvasWidth / 2 - this.offsetX;
                this.y = app.canvasHeight / 2 - this.offsetY
            }
            this.adjustOpacityToCursor();
            break;
        case app.enumLineSpray:
            if (!this.inited) {
                this.doCenter();
                this.offsetRadius = 120;
                this.setCircleOffset();
                this.radius = misc.getRandomInt(7, 12);
                switch (misc.getRandomInt(0, 3)) {
                    case 0:
                        this.setRGBSemiRandom(1, 1, 0);
                        break;
                    case 1:
                        this.setRGBSemiRandom(1, 0, 1);
                        break;
                    case 2:
                        this.setRGBSemiRandom(0, 1, 0);
                        break;
                    case 3:
                        this.setRGBSemiRandom(1, 0, 0);
                        break
                }
                this.maxOpacity = 0.7
            }
            if (misc.chance(5)) {
                this.setCircleOffset();
                this.radius = misc.getRandomInt(2, 5)
            }
            if (app.cursorIn) {
                this.x = app.toGridX(app.cursorX) - this.offsetX;
                this.y = app.toGridY(app.cursorY) - this.offsetY
            } else {
                this.x = app.canvasWidth / 2 - this.offsetX;
                this.y = app.canvasHeight / 2 - this.offsetY
            }
            this.adjustOpacityToCursor();
            break;
        case app.enumMatrix:
            if (!this.inited) {
                this.speedX = 0;
                this.speedY = 0;
                this.speedMaxX = 4;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 0.2;
                this.radius = 8;
                this.colorG = misc.getRandomInt(0, 255);
                this.colorB = misc.getRandomInt(0, 255);
                this.opacityStep = 0.01;
                this.maxOpacity = 0.2;
                this.offsetX = 0;
                this.offsetY = 0;
                if (M != 0) {
                    this.offsetX = -80;
                    this.offsetY = M * 15
                }
            }
            if (M == 0) {
                this.follow(app.cursorX, app.cursorY)
            } else {
                var X = app.sprites[0];
                this.follow(X.x - this.offsetX, X.y - this.offsetY)
            }
            if (app.rageModeJustActivated) {
                this.radius = 20;
                this.speedMaxX = 15;
                this.speedMaxY = this.speedMaxX
            } else {
                if (app.rageModeJustInactivated) {
                    this.radius = 8;
                    this.speedMaxX = 4;
                    this.speedMaxY = this.speedMaxX
                }
            }
            if (this.opacity == 0 && misc.chance(10)) {
                this.colorG = misc.getRandomInt(0, 255);
                this.colorB = misc.getRandomInt(0, 255)
            }
            this.adjustOpacityToCursor();
            this.scrollRed();
            break;
        case app.enumFollower:
            if (!this.inited) {
                this.doCenter();
                this.speedX = misc.getRandomInt(-4, 4);
                this.speedY = misc.getRandomInt(-4, 4);
                this.speedMaxX = 5;
                this.speedMaxY = this.speedMaxX;
                this.speedStep = 0.4;
                this.radius = 5;
                this.opacityStep = 0.005;
                this.maxOpacity = 0.2;
                if (M == 0 || M == app.maxSprites - 1) {
                    switch (misc.getRandomInt(1, 6)) {
                        case 1:
                            this.setRGB(250, 20, 20);
                            break;
                        case 2:
                            this.setRGB(250, 250, 20);
                            break;
                        case 3:
                            this.setRGB(20, 250, 250);
                            break;
                        case 4:
                            this.setRGB(23, 247, 157);
                            break;
                        case 5:
                            this.setRGB(250, 211, 184);
                            break;
                        case 6:
                            this.setRGB(62, 163, 238);
                            break
                    }
                } else {
                    this.setRGB(20, 20, 20)
                }
                this.offsetX = misc.getRandomInt(-25, 25);
                this.offsetY = misc.getRandomInt(-25, 25)
            }
            if (!this.initedAfterCursorActive && misc.chance(20)) {
                if (M == 0 || M == app.maxSprites - 1) {
                    switch (misc.getRandomInt(1, 6)) {
                        case 1:
                            this.setRGB(250, 20, 20);
                            break;
                        case 2:
                            this.setRGB(250, 250, 20);
                            break;
                        case 3:
                            this.setRGB(20, 250, 250);
                            break;
                        case 4:
                            this.setRGB(23, 247, 157);
                            break;
                        case 5:
                            this.setRGB(250, 211, 184);
                            break;
                        case 6:
                            this.setRGB(62, 163, 238);
                            break
                    }
                } else {
                    this.setRGB(20, 20, 20)
                }
            }
            if (misc.chance(5)) {
                this.offsetX = misc.getRandomInt(-35, 35);
                this.offsetY = misc.getRandomInt(-35, 35)
            }
            if (app.cursorActive) {
                this.radius += 0.5;
                if (this.radius > 30) {
                    this.radius = 30
                }
            } else {
                this.radius -= 1;
                if (this.radius < 5) {
                    this.radius = 5
                }
            }
            this.adjustOpacityToCursor();
            var J = app.toGridX(app.cursorX - this.offsetX, 90);
            var I = app.toGridY(app.cursorY - this.offsetY, 90);
            this.follow(J, I);
            var K = 20;
            if (this.x >= app.cursorX - K && this.x <= app.cursorX + K) {
                this.speedX *= 0.5
            }
            if (this.y >= app.cursorY - K && this.y <= app.cursorY + K) {
                this.speedY *= 0.5
            }
            break;
        case app.enumCurve:
            if (!this.inited) {
                if (M == 0) {
                    this.x = M * (app.canvasWidth / app.maxSprites) + 50;
                    this.y = misc.getRandomInt(50, app.canvasHeight - 50)
                } else {
                    this.x = G.x + 14;
                    this.y = G.y
                }
                this.speedX = 2;
                this.speedY = 0;
                this.speedMaxX = 3;
                this.speedMaxY = 3;
                this.speedStep = 0.2;
                this.radius = 5;
                this.maxOpacity = 0.3
            }
            if (!this.initedAfterCursorActive) {
                this.originX = app.cursorX;
                this.originY = app.cursorY;
                if (M == 0) {
                    this.setRGB(misc.getRandomInt(0, 200), misc.getRandomInt(0, 200), misc.getRandomInt(0, 200))
                } else {
                    this.setRGB(G.colorR - 10, G.colorG + 20, G.colorB + 40)
                }
            }
            if (!this.initedAfterCursorInactive) {
                this.opacity = 0
            }
            if (app.submode == 1) {
                if (app.cursorActive) {
                    var W = (this.originY - app.cursorY) / 2;
                    var A = Math.abs(Math.sin((this.x + this.originX / 2) / 50) * W);
                    if (this.speedY < 0) {
                        this.y = this.originY - A
                    } else {
                        this.y = this.originY + A
                    }
                } else {
                    if (app.cursorIn) {
                        this.follow(app.cursorX + M * 14, app.cursorY);
                        if (M != 0) {
                            this.x = O.x + M * 14;
                            this.y = O.y
                        }
                    }
                }
            } else {
                if (app.cursorActive) {
                    var W = (this.originX - app.cursorX) / 2;
                    var A = Math.abs(Math.sin((this.y + this.originY / 2) / 50) * W);
                    if (this.speedX < 0) {
                        this.x = this.originX - A
                    } else {
                        this.x = this.originX + A
                    }
                } else {
                    if (app.cursorIn) {
                        this.follow(app.cursorX, app.cursorY + M * 14);
                        if (M != 0) {
                            this.x = O.x;
                            this.y = O.y + M * 14
                        }
                    }
                }
            }
            this.adjustOpacityToCursor();
            this.keepInCanvasByTeleport();
            break;
        case app.enumRectangler:
            var R = 70;
            if (!this.inited) {
                this.doCenter();
                if (M == 0) {
                    var L = 30;
                    this.x = misc.getRandomInt(L, app.canvasWidth - L * 2);
                    this.y = misc.getRandomInt(L, app.canvasHeight - L * 2);
                    this.speedX = 0;
                    this.speedY = 0;
                    while (this.speedX == 0 && this.speedY == 0) {
                        this.speedX = misc.getRandom(-3, 3);
                        this.speedY = misc.getRandom(-3, 3)
                    }
                } else {
                    this.offsetX = misc.getRandomInt(-R, R);
                    this.offsetY = misc.getRandomInt(-R, R)
                }
                this.speedMaxX = 4;
                this.speedMaxY = this.speedMaxX;
                this.radius = 4;
                this.setRGBRandom();
                this.opacityStep = 0.001;
                this.maxOpacity = 0.25
            }
            if (!this.initedAfterCursorInactive) {
                if (M == 0) {
                    this.speedX = 0;
                    this.speedY = 0;
                    while (this.speedX == 0 && this.speedY == 0) {
                        this.speedX = misc.getRandom(-3, 3);
                        this.speedY = misc.getRandom(-3, 3)
                    }
                } else {
                    if (misc.chance(40)) {
                        this.offsetX = misc.getRandomInt(-R, R);
                        this.offsetY = misc.getRandomInt(-R, R)
                    }
                }
                if (misc.chance(15)) {
                    this.setRGBRandom()
                }
            }
            if (app.rageModeJustActivated) {
                this.radius = 12;
                this.opacityStep = 0.1;
                this.maxOpacity = 0.89;
                if (misc.chance(50)) {
                    this.setRGBRandom()
                } else {
                    this.setRGBSemiRandom(true, true, true)
                }
                this.speedMaxX = 8;
                this.speedMaxY = this.speedMaxX;
                this.speedX = 0;
                this.speedY = 0;
                while (this.speedX == 0 && this.speedY == 0) {
                    this.speedX = misc.getRandom(-3, 3);
                    this.speedY = misc.getRandom(-3, 3)
                }
            } else {
                if (app.rageModeJustInactivated) {
                    this.radius = 4;
                    this.opacityStep = 0.001;
                    this.maxOpacity = 0.25;
                    if (this.opacity > this.maxOpacity) {
                        this.opacity = this.maxOpacity
                    }
                    this.speedMaxX = 4;
                    this.speedMaxY = this.speedMaxX
                }
            }
            if (M != 0) {
                this.x = O.x + this.offsetX;
                this.y = O.y + this.offsetY
            }
            this.keepInCanvasWithMargin(50);
            this.adjustOpacityToCursor();
            break;
        case app.enumSprinkler:
            if (!this.inited) {
                this.doCenter();
                this.radius = 3;
                this.opacityStep = 0.06;
                this.setRGB(0, 0, 0)
            }
            if (!this.initedAfterCursorActive) {
                if (this.getCursorDistance() <= 50) {
                    this.x = app.cursorX + misc.getRandomInt(-5, 5);
                    this.y = app.cursorY + misc.getRandomInt(-5, 5);
                    this.speedX = misc.getRandom(-5, 5);
                    this.speedY = misc.getRandom(-5, 5)
                }
            }
            if (!this.initedAfterCursorInactive && !app.rageMode) {
                if (M == 0) {
                    this.radius = misc.getRandomInt(2, 6)
                } else {
                    this.radius = O.radius
                }
            }
            if (app.rageModeJustActivated) {
                if (M == 0) {
                    switch (misc.getRandomInt(1, 3)) {
                        case 1:
                            this.setRGB(200, 0, 0);
                            break;
                        case 2:
                            this.setRGB(144, 144, 144);
                            break;
                        case 3:
                            this.setRGB(240, 164, 117);
                            break
                    }
                } else {
                    this.setRGBFromOtherSprite(O, 10)
                }
                this.radius = 10
            } else {
                if (app.rageModeJustInactivated) {
                    this.setRGB(0, 0, 0);
                    this.radius = misc.getRandomInt(2, 6)
                }
            }
            if (app.cursorActive) {
                this.counter++;
                if (this.counter >= 200) {
                    this.speedX += misc.getRandom(-1, 1);
                    this.speedY += misc.getRandom(-1, 1);
                    this.counter = 200
                }
            } else {
                this.follow(app.cursorX, app.cursorY);
                this.counter = 0
            }
            this.keepInCanvasWithMargin(200);
            this.adjustOpacityToCursor();
            break;
        case app.enumShaper:
            if (!this.inited) {
                this.doCenter();
                this.radius = 6;
                this.offset = 40
            }
            if (M == 0) {
                if (!this.initedAfterCursorInactive || misc.chance(2)) {
                    this.targetX = misc.getRandomInt(0, app.canvasWidth);
                    this.targetY = misc.getRandomInt(0, app.canvasHeight);
                    this.speedX = 0;
                    this.speedY = 0;
                    this.speedMaxX = misc.getRandom(0.1, 4);
                    this.speedMaxY = misc.getRandom(0.1, 4);
                    this.speedStepX = misc.getRandom(0.01, 2);
                    this.speedStepY = misc.getRandom(0.01, 2);
                    this.maxOpacity = 0.9;
                    this.opacityStep = 0.2;
                    this.radius = 16
                }
            }
            if (app.cursorIn) {
                this.setColorFromPosition(app.cursorX, app.cursorY)
            } else {
                this.setRGB(150, 150, 150)
            }
            if (app.rageMode) {
                if (++this.offset > 80) {
                    this.offset = 80
                }
            } else {
                if (--this.offset < 40) {
                    this.offset = 40
                }
            }
            switch (Math.floor(M)) {
                case 0:
                    this.followTarget();
                    break;
                case 1:
                    this.x = O.x - this.offset;
                    this.y = O.y - this.offset / 2;
                    break;
                case 2:
                    this.x = O.x;
                    this.y = O.y - this.offset;
                    break;
                case 3:
                    this.x = O.x + this.offset;
                    this.y = O.y - this.offset / 2;
                    break;
                case 4:
                    this.x = O.x + this.offset;
                    this.y = O.y + this.offset / 2;
                    break;
                case 5:
                    this.x = O.x;
                    this.y = O.y + this.offset;
                    break;
                case 6:
                    this.x = O.x - this.offset;
                    this.y = O.y + this.offset / 2;
                    break
            }
            if (M == 0) {
                this.keepInCanvasByTeleport()
            }
            this.adjustOpacityToCursor();
            break
    }
    this.inited = true;
    this.initedAfterCursorActive = true;
    this.initedAfterCursorInactive = true
};
Sprite.prototype.setRGBFromOtherSprite = function(A, B) {
    this.colorR = A.colorR + misc.getRandomInt(-B, B);
    this.colorG = A.colorG + misc.getRandomInt(-B, B);
    this.colorB = A.colorB + misc.getRandomInt(-B, B)
};
Sprite.prototype.keepInCanvasByTeleport = function() {
    var A = this.radius * 2;
    if (this.x > app.canvasWidth + A) {
        this.x = -A;
        this.teleported = true
    } else {
        if (this.x < -A) {
            this.x = app.canvasWidth + A / 2;
            this.teleported = true
        }
    }
    if (this.y > app.canvasHeight + A) {
        this.y = -A;
        this.teleported = true
    } else {
        if (this.y < -A) {
            this.y = app.canvasHeight + A / 2;
            this.teleported = true
        }
    }
};
Sprite.prototype.setCircleOffset = function() {
    var B = misc.getRandomInt(0, this.offsetRadius);
    var A = Math.floor(B / 2);
    if (misc.getRandomInt(0, 1) == 1) {
        this.offsetX = misc.getRandomInt(-B, B);
        this.offsetY = misc.getRandomInt(-A, A)
    } else {
        this.offsetX = misc.getRandomInt(-A, A);
        this.offsetY = misc.getRandomInt(-B, B)
    }
};
Sprite.prototype.setColorFromPosition = function(K, I) {
    var B = app.canvasWidth,
        M = app.canvasHeight / 15;
    var D = I / M;
    D = Math.ceil(D) - 1;
    if (app.colors[D]) {
        var A = app.colors[D][app.indexRed];
        var E = app.colors[D][app.indexGreen];
        var J = app.colors[D][app.indexBlue];
        var G = new Array();
        if (K < B / 2) {
            var C = (B / 2) - K;
            var F = (C / (B / 2)) * 100;
            var H = app.paletteMax - (F * (app.paletteMax / 100));
            G = app.mixColors(A, E, J, 0, 0, 0, H)
        } else {
            if (K > B / 2) {
                var C = Math.abs((B / 2) - K);
                var L = (C / (B / 2)) * 100;
                var H = app.paletteMax - (L * (app.paletteMax / 100));
                G = app.mixColors(A, E, J, app.paletteMax - 1, app.paletteMax - 1, app.paletteMax - 1, H)
            } else {
                G[app.indexRed] = A;
                G[app.indexGreen] = E;
                G[app.indexBlue] = J
            }
        }
        this.colorR = G[app.indexRed];
        this.colorG = G[app.indexGreen];
        this.colorB = G[app.indexBlue]
    }
};
Sprite.prototype.crosshatch = function(A) {
    if (this.speedX > 0 && this.speedY > 0) {
        this.offsetX += this.speedStep;
        this.offsetY += this.speedStep;
        if (this.offsetX > A) {
            this.speedX *= -1;
            this.speedY *= -1
        }
    } else {
        if (this.speedX < 0 && this.speedY < 0) {
            this.offsetX -= this.speedStep;
            this.offsetY -= this.speedStep;
            if (this.offsetX < -A) {
                this.speedX *= -1;
                this.speedY *= -1
            }
        } else {
            if (this.speedX < 0 && this.speedY > 0) {
                this.offsetX -= this.speedStep;
                this.offsetY += this.speedStep;
                if (this.offsetX < -A) {
                    this.speedX *= -1;
                    this.speedY *= -1
                }
            } else {
                if (this.speedX > 0 && this.speedY < 0) {
                    this.offsetX += this.speedStep;
                    this.offsetY -= this.speedStep;
                    if (this.offsetX > A) {
                        this.speedX *= -1;
                        this.speedY *= -1
                    }
                }
            }
        }
    }
    if (misc.getRandomInt(0, 1000) <= 5) {
        this.offsetXbase = misc.getRandomInt(-15, 15);
        this.offsetYbase = misc.getRandomInt(-15, 15);
        this.colorR = misc.getRandomInt(50, 200);
        this.colorG = misc.getRandomInt(50, 200);
        this.colorB = misc.getRandomInt(50, 200);
        this.opacity = 0
    }
};
Sprite.prototype.scrollRed = function() {
    this.colorR += this.colorDirection;
    if (this.colorR <= 0 || this.colorR >= 255) {
        this.colorDirection *= -1
    }
};
Sprite.prototype.scrollGreen = function() {
    this.colorG += this.colorDirection;
    if (this.colorG <= 0 || this.colorG >= 255) {
        this.colorDirection *= -1
    }
};
Sprite.prototype.scrollBlue = function() {
    this.colorB += this.colorDirection;
    if (this.colorB <= 0 || this.colorB >= 255) {
        this.colorDirection *= -1
    }
};
Sprite.prototype.getCursorDistance = function() {
    var B = Math.abs(app.cursorX - this.x);
    var A = Math.abs(app.cursorY - this.y);
    return (B + A) / 2
};
Sprite.prototype.getCursorDistanceFromOrigin = function() {
    var B = Math.abs(app.cursorX - this.originX);
    var A = Math.abs(app.cursorY - this.originY);
    return (B + A) / 2
};
Sprite.prototype.doCenter = function() {
    this.x = Math.floor(app.canvasWidth / 2 + misc.getRandomInt(-50, 50));
    this.y = Math.floor(app.canvasHeight / 2 + misc.getRandomInt(-50, 50))
};
Sprite.prototype.doRelax = function() {
    this.keepInCanvas()
};
Sprite.prototype.adjustOpacityToCursor = function() {
    if (app.cursorActive) {
        this.opacity += this.opacityStep;
        if (this.opacity > this.maxOpacity) {
            this.opacity = this.maxOpacity
        }
    } else {
        this.opacity -= this.opacityStep;
        if (this.opacity < 0) {
            this.opacity = 0
        }
    }
};
Sprite.prototype.follow = function(B, A) {
    var D, C;
    if (app.cursorIn) {
        D = B;
        C = A
    } else {
        D = Math.floor(app.canvasWidth / 2 + misc.getRandomInt(-50, 50));
        C = Math.floor(app.canvasHeight / 2 + misc.getRandomInt(-50, 50))
    }
    if (this.x > D) {
        this.speedX -= this.speedStep;
        if (this.speedX < -this.speedMaxX) {
            this.speedX = -this.speedMaxX
        }
    } else {
        if (this.x < D) {
            this.speedX += this.speedStep;
            if (this.speedX > this.speedMaxX) {
                this.speedX = this.speedMaxX
            }
        }
    }
    if (this.y > C) {
        this.speedY -= this.speedStep;
        if (this.speedY < -this.speedMaxY) {
            this.speedY = -this.speedMaxY
        }
    } else {
        if (this.y < C) {
            this.speedY += this.speedStep;
            if (this.speedY > this.speedMaxY) {
                this.speedY = this.speedMaxY
            }
        }
    }
};
Sprite.prototype.followSimple = function(B, A) {
    if (this.x > B) {
        this.speedX -= this.speedStep;
        if (this.speedX < -this.speedMaxX) {
            this.speedX = -this.speedMaxX
        }
    } else {
        if (this.x < B) {
            this.speedX += this.speedStep;
            if (this.speedX > this.speedMaxX) {
                this.speedX = this.speedMaxX
            }
        }
    }
    if (this.y > A) {
        this.speedY -= this.speedStep;
        if (this.speedY < -this.speedMaxY) {
            this.speedY = -this.speedMaxY
        }
    } else {
        if (this.y < A) {
            this.speedY += this.speedStep;
            if (this.speedY > this.speedMaxY) {
                this.speed = this.speedMaxY
            }
        }
    }
};
Sprite.prototype.followX = function(A) {
    var B;
    if (app.cursorIn) {
        B = A
    } else {
        B = Math.floor(app.canvasWidth / 2 + misc.getRandomInt(-50, 50))
    }
    if (this.x > B) {
        this.speedX -= this.speedStep;
        if (this.speedX < -this.speedMaxX) {
            this.speedX = -this.speedMaxX
        }
    } else {
        if (this.x < B) {
            this.speedX += this.speedStep;
            if (this.speedX > this.speedMaxX) {
                this.speedX = this.speedMaxX
            }
        }
    }
};
Sprite.prototype.followY = function(A) {
    var B;
    if (app.cursorIn) {
        B = A
    } else {
        B = Math.floor(app.canvasHeight / 2 + misc.getRandomInt(-50, 50))
    }
    if (this.y > B) {
        this.speedY -= this.speedStep;
        if (this.speedY < -this.speedMaxY) {
            this.speedY = -this.speedMaxY
        }
    } else {
        if (this.y < B) {
            this.speedY += this.speedStep;
            if (this.speedY > this.speedMaxY) {
                this.speedY = this.speedMaxY
            }
        }
    }
};
Sprite.prototype.setRGB = function(C, B, A) {
    this.colorR = misc.forceMinMax(C, 0, 255);
    this.colorG = misc.forceMinMax(B, 0, 255);
    this.colorB = misc.forceMinMax(A, 0, 255)
};
Sprite.prototype.setRGBRandom = function() {
    this.colorR = misc.getRandomInt(0, 255);
    this.colorG = misc.getRandomInt(0, 255);
    this.colorB = misc.getRandomInt(0, 255)
};
Sprite.prototype.setRGBSemiRandom = function(B, A, C) {
    this.colorR = B ? misc.getRandomInt(200, 255) : misc.getRandomInt(50, 100);
    this.colorG = A ? misc.getRandomInt(200, 255) : misc.getRandomInt(50, 100);
    this.colorB = C ? misc.getRandomInt(200, 255) : misc.getRandomInt(50, 100)
};
Sprite.prototype.keepInCanvas = function() {
    if ((this.speedX < 0 && this.x - this.radius <= 0) || (this.speedX > 0 && this.x + this.radius >= app.canvasWidth)) {
        this.speedX *= -1
    }
    if ((this.speedY < 0 && this.y - this.radius <= 0) || (this.speedY > 0 && this.y + this.radius >= app.canvasHeight)) {
        this.speedY *= -1
    }
};
Sprite.prototype.keepInCanvasAllowOverlap = function() {
    if ((this.speedX < 0 && this.x <= 0) || (this.speedX > 0 && this.x >= app.canvasWidth)) {
        this.speedX *= -1
    }
    if ((this.speedY < 0 && this.y <= 0) || (this.speedY > 0 && this.y >= app.canvasHeight)) {
        this.speedY *= -1
    }
};
Sprite.prototype.keepInCanvasWithMargin = function(A) {
    if ((this.speedX < 0 && this.x <= -A) || (this.speedX > 0 && this.x >= app.canvasWidth + A)) {
        this.speedX *= -1
    }
    if ((this.speedY < 0 && this.y <= -A) || (this.speedY > 0 && this.y >= app.canvasHeight + A)) {
        this.speedY *= -1
    }
};
Sprite.prototype.getRGBString = function(D) {
    var C = this.colorR + D;
    var B = this.colorG + D;
    var A = this.colorB + D;
    return misc.forceMinMax(C, 0, 255) + "," + misc.forceMinMax(B, 0, 255) + "," + misc.forceMinMax(A, 0, 255)
};
Sprite.prototype.draw = function(I, D, G, A) {
    var H = this.oldX,
        F = this.oldY;
    if (this.type != app.enumLineSpray) {
        if (H == this.x) {
            H++
        }
        if (F == this.y) {
            F++
        }
    }
    switch (this.type) {
        case app.enumCircle:
            if (D == app.enumDrawInk) {
                I.beginPath();
                I.lineWidth = 4;
                I.strokeStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                I.stroke();
                I.closePath()
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(255,255,255,.05)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.4)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        case app.enumCircleHunter:
            if (D == app.enumDrawInk) {
                I.beginPath();
                I.lineWidth = 3;
                I.strokeStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                I.moveTo(this.x - this.radius, this.y - this.radius);
                I.lineTo(this.x + this.radius, this.y + this.radius);
                I.moveTo(this.x + this.radius, this.y - this.radius);
                I.lineTo(this.x - this.radius, this.y + this.radius);
                I.closePath();
                I.stroke()
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(255,255,255,.3)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.4)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        case app.enumLineSpray:
            if (D == app.enumDrawInk) {
                I.beginPath();
                I.lineWidth = 3;
                I.strokeStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                I.moveTo(H, F);
                I.lineTo(this.x, this.y);
                I.closePath();
                I.stroke()
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.strokeStyle = "rgba(0,0,0,.1)";
                    I.moveTo(G.x, G.y);
                    I.lineTo(this.x, this.y);
                    I.closePath();
                    I.stroke();
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(255,255,255,.5)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.4)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        case app.enumMatrix:
            if (D == app.enumDrawInk) {
                if (A != 0) {
                    var E = app.sprites[0];
                    I.beginPath();
                    I.lineWidth = 3;
                    I.strokeStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                    I.moveTo(this.x, this.y);
                    I.lineTo(E.x, E.y);
                    I.closePath();
                    I.stroke();
                    I.beginPath();
                    I.fillStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                    I.arc(this.x, this.y, this.radius / 2, 0, app.fullCircle, true);
                    I.fill();
                    I.closePath()
                }
            } else {
                if (D == app.enumShow) {
                    if (A != 0) {
                        var E = app.sprites[0];
                        I.beginPath();
                        I.lineWidth = 3;
                        I.strokeStyle = "rgba(0,0,0,.3)";
                        I.moveTo(this.x, this.y);
                        I.lineTo(E.x, E.y);
                        I.closePath();
                        I.stroke()
                    }
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(255,255,255,.5)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.4)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        case app.enumFollower:
            if (D == app.enumDrawInk) {
                I.beginPath();
                I.lineWidth = 3;
                I.strokeStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                I.moveTo(H, F);
                I.lineTo(this.x, this.y);
                I.closePath();
                I.stroke();
                I.beginPath();
                I.fillStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                I.arc(this.x, this.y, this.radius / 2, 0, app.fullCircle, true);
                I.fill();
                I.closePath()
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(255,255,255,.6)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.6)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        case app.enumRectangler:
            if (D == app.enumDrawInk) {
                I.beginPath();
                I.lineWidth = 3;
                I.strokeStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                I.moveTo(G.x, G.y);
                I.lineTo(this.x, this.y);
                I.closePath();
                I.stroke()
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.strokeStyle = "rgba(0,0,0,.1)";
                    I.moveTo(G.x, G.y);
                    I.lineTo(this.x, this.y);
                    I.closePath();
                    I.stroke();
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(255,255,255,.5)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.4)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        case app.enumLines:
            if (D == app.enumDrawInk) {
                I.beginPath();
                I.lineWidth = 3;
                I.strokeStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                I.moveTo(G.x, G.y);
                I.lineTo(this.x, this.y);
                I.closePath();
                I.stroke()
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.strokeStyle = "rgba(0,0,0,.1)";
                    I.moveTo(G.x, G.y);
                    I.lineTo(this.x, this.y);
                    I.closePath();
                    I.stroke();
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(255,255,255,.5)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.4)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        case app.enumGrid:
            if (D == app.enumDrawInk) {
                I.beginPath();
                I.fillStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                I.arc(this.x, this.y, this.radius / 2, 0, app.fullCircle, true);
                I.fill();
                I.closePath()
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + ",.4)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.3)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        case app.enumPendulum:
            if (D == app.enumDrawInk) {
                I.beginPath();
                I.fillStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                I.arc(this.x, this.y, this.radius / 2, 0, app.fullCircle, true);
                I.fill();
                I.closePath()
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(255,255,255,.2)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.2)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        case app.enumHunter:
        case app.enumCurve:
        case app.enumSprinkler:
            if (D == app.enumDrawInk) {
                if (!this.teleported && !(misc.getDistance(H, F, this.x, this.y) >= 50)) {
                    I.beginPath();
                    I.lineWidth = this.radius;
                    I.strokeStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                    I.moveTo(H, F);
                    I.lineTo(this.x, this.y);
                    I.closePath();
                    I.stroke()
                }
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(255,255,255,.6)";
                    I.arc(this.x, this.y, misc.forceMin(this.radius, 4), 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.6)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        case app.enumShaper:
            var C = Math.floor(A) < app.maxSprites - 1 ? app.sprites[Math.floor(A) + 1].x : app.sprites[1].x;
            var B = Math.floor(A) < app.maxSprites - 1 ? app.sprites[Math.floor(A) + 1].y : app.sprites[1].y;
            if (D == app.enumDrawInk) {
                if (Math.floor(A) >= 1) {
                    I.beginPath();
                    I.lineWidth = this.radius;
                    I.strokeStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                    I.moveTo(C, B);
                    I.lineTo(this.x, this.y);
                    I.closePath();
                    I.stroke()
                }
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + ",.4)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.3)";
                    if (Math.floor(A) >= 1) {
                        I.moveTo(C, B);
                        I.lineTo(this.x, this.y)
                    }
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break;
        default:
            if (D == app.enumDrawInk) {
                I.beginPath();
                I.fillStyle = "rgba(" + this.colorR + "," + this.colorG + "," + this.colorB + "," + this.opacity + ")";
                I.arc(this.x, this.y, this.radius / 2, 0, app.fullCircle, true);
                I.fill();
                I.closePath()
            } else {
                if (D == app.enumShow) {
                    I.beginPath();
                    I.lineWidth = 3;
                    I.fillStyle = "rgba(255,255,255,.6)";
                    I.arc(this.x, this.y, this.radius, 0, app.fullCircle, true);
                    I.strokeStyle = "rgba(0,0,0,.6)";
                    I.stroke();
                    I.fill();
                    I.closePath()
                }
            }
            break
    }
};

function MiscLibrary() {}
MiscLibrary.prototype.getRandomInt = function(B, A) {
    return Math.floor(((A + 1 - B) * Math.random()) + B)
};
MiscLibrary.prototype.getRandom = function(B, A) {
    return (A - B) * Math.random() + B
};
MiscLibrary.prototype.chance = function(A) {
    return this.getRandom(0, 100) <= A
};
MiscLibrary.prototype.showLayer = function(B) {
    var A = document.getElementById(B);
    if (A) {
        A.style.display = "block"
    }
};
MiscLibrary.prototype.hideLayer = function(B) {
    var A = document.getElementById(B);
    if (A) {
        A.style.display = "none"
    }
};
MiscLibrary.prototype.debug = function(A) {
    this.writeInLayer("debug", A)
};
MiscLibrary.prototype.debug2 = function(A) {
    this.writeInLayer("debug2", A)
};
MiscLibrary.prototype.writeInLayer = function(C, A) {
    var B = document.getElementById(C);
    if (B) {
        B.innerHTML = A
    }
};
MiscLibrary.prototype.forceMinMax = function(B, C, A) {
    if (B < C) {
        B = C
    } else {
        if (B > A) {
            B = A
        }
    }
    return B
};
MiscLibrary.prototype.forceMin = function(A, B) {
    return A < B ? B : A
};
MiscLibrary.prototype.forceMax = function(B, A) {
    return B > A ? A : B
};
MiscLibrary.prototype.showElm = function(B) {
    var A = document.getElementById(B);
    if (A) {
        A.style.display = "block"
    }
};
MiscLibrary.prototype.hideElm = function(B) {
    var A = document.getElementById(B);
    if (A) {
        A.style.display = "none"
    }
};
MiscLibrary.prototype.getDistance = function(B, D, A, C) {
    var F = B - A;
    var E = D - C;
    return Math.sqrt(F * F + E * E)
};