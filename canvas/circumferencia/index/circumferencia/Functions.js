! function() {
    var a = {};
    if (a.anim = function(a, b) {
        return {
           fps: a,
            renderCallback: b,
            start: function() {
                this.running || (this.running = !0, this.render())
            },
            stop: function() {
                this.running = !1
            },
            toggle: function() {
                this.running ? this.stop() : this.start()
            },
            render: function() {
                if (this.running) {
                    this.renderCallback && this.renderCallback();
                    var a = this;
                    setTimeout(function() {
                        requestAnimationFrame(function() {
                            a.render()
                        })
                    }, 1e3 / this.fps)

                }
            }
        }
    }, a.context = function(b, c, d) {
    0 !== b && 0 !== c || (b = window.innerWidth, c = window.innerHeight);
    //var e = document.createElement("canvas"),f = e.getContext("2d");
    var e = document.getElementById("canvas"),f = e.getContext("2d");
    //d.appendChild(e),
    return a.extendContext(f), e.style.display = "block", f.setSize(b || 600, c || 600), document.body.style.margin = "0", document.body.style.padding = "0", d = d || document.body, f
    }, a.extendContext = function(a) {
        a.setShadow = function(a, b, c, d) {
            this.shadowColor = a, this.shadowOffsetX = b, this.shadowOffsetY = c, this.shadowBlur = d
        }, a.clear = function(a) {
            this.save(), this.setTransform(1, 0, 0, 1, 0, 0),
            a ? (this.fillStyle = a, this.fillRect(0, 0, this.canvas.width, this.canvas.height)) : this.clearRect(0, 0, this.canvas.width, this.canvas.height), this.restore()
        }, a.circle = function(a, b, c) {
            this.arc(a, b, c, 0, 2 * Math.PI)
        }, a.fillCircle = function(a, b, c) {
            this.beginPath(), this.circle(a, b, c), this.fill()
        }, a.strokeCircle = function(a, b, c) {
            this.beginPath(), this.circle(a, b, c), this.stroke()
        }, a.ellipse = function(a, b, c, d) {
            this.save(), this.translate(a, b), this.scale(c, d), this.arc(0, 0, 1, 0, 2 * Math.PI), this.restore()
        }, a.setSize = function(a, b) {
            this.width = this.canvas.width = a, this.height = this.canvas.height = b
        }
    },
    "function" == typeof define && define.amd) define(a);
    else if (window.Functions)
        for (var b in a) window.Functions[b] = a[b];
    else window.Functions = a
}();
