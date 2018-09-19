window.onload=function(){
    // var
    var context = Functions.context(0, 0),
        w = context.width,
        h = context.height,
        with_height_square = 20,
        screen_width = window.innerWidth,
        screen_height = window.innerHeight,
        radius = window.innerHeight / 2 - 150,
        center_x = window.innerWidth / 2,
        center_y = window.innerHeight / 2,
        vector_objects = new Array(),
        n_squares = 36,
        n_formula_add_angles = 1,
        velocity = 1,
        inputs,
        color = '#000000';
        funciones = Functions.anim(60, render);

    // Call to event on resize
    window.addEventListener("resize",resize_event);

    // Add Event inputs and save events into other function
    document.getElementById("one_option").addEventListener("click", function(){ n_formula_add_angles = 1; });
    document.getElementById("two_option").addEventListener("click", function(){ n_formula_add_angles = 2; });
    document.getElementById("three_option").addEventListener("click", function(){ n_formula_add_angles = 3; });

    // Add event angles and initialize vector objects and number of squares
    document.getElementById("angulos").addEventListener("change", function(){
        n_squares = this.value;
        vector_objects = new Array();
        keep_angles_object();
    });

    // Add event angles and initialize vector objects and number of squares
    document.getElementById("radius").addEventListener("change", function(){
        radius = window.innerHeight / 2 - this.value;
    });

    // Call to save angles
    keep_angles_object();

    // Save angles
    function keep_angles_object(){
        temp_grades = 0;
        grades = 360 / n_squares;
        for (var i=0;i < n_squares;i++){
            temp_grades = grades * i;
            x = center_x + radius * Math.cos(temp_grades*(Math.PI/180));
            y = center_y + radius * Math.sin(temp_grades*(Math.PI/180));
            z = 0;
            context.fillStyle = color;
            object = new Position(x,y,z,temp_grades);
            vector_objects.push(object);
        }// end for
    } // end function

    // Start animation
    funciones.start();

    // Render animation
    function render() {
        context.clear();
        for (var i=0;i<n_squares;i++){
            context.save();
            vector_objects[i].angle = vector_objects[i].angle + velocity;
            if (vector_objects[i].angle > 360){
                vector_objects[i].angle = vector_objects[i].angle - 360;
            }
            // Formula line rect
            x1 = center_x + radius * Math.cos(vector_objects[i].angle * (Math.PI/180));
            y1 = center_y + radius * Math.sin(vector_objects[i].angle * (Math.PI/180));
            // Turn Formula 2D
            x2 = center_x + Math.cos(vector_objects[i].angle * (Math.PI/180)) - radius * Math.sin(vector_objects[i].angle *(Math.PI/180));
            y2 = center_y + radius * Math.cos(vector_objects[i].angle * (Math.PI/180)) + Math.sin(vector_objects[i].angle *(Math.PI/180));
            // Formula add angles
            // Math.sin(a+b) = Math.sin(a)* Math.cos(b) + Math.sin(b) * Math.cos(a)
            // Math.cos(a+b) = Math.cos(a) * Math.cos(b) - Math.sin(a) * Math.sin(b)
            y3 = center_y + radius * (Math.sin(vector_objects[i].angle * (Math.PI/180)) * Math.cos(1 * (Math.PI/180)) + Math.sin(1 * (Math.PI/180)) * Math.cos(vector_objects[i].angle * (Math.PI/180)));
            x3 = center_x + radius * (Math.cos(vector_objects[i].angle * (Math.PI/180)) * Math.cos(1 * (Math.PI/180)) - Math.sin(vector_objects[i].angle * (Math.PI/180)) * Math.sin(1 * (Math.PI/180)));
            switch (n_formula_add_angles){
                case 1: x_final = x1; y_final = y1;rotate = (vector_objects[i].angle * Math.PI/180);//console.log("primera");
                break;
                case 2: x_final = x2; y_final = y2;rotate = (vector_objects[i].angle * Math.PI/180);//console.log("segunda");
                break;
                case 3: x_final = x3; y_final = y3;rotate = (vector_objects[i].angle * Math.PI/180);//console.log("tercera");
                break;
            }
            //console.log("x: "+x_final+" y_final: "+y_final+" x3: "+x3+" y3: "+y3+" angle: "+vector_objects[i].angle);
            context.save();
            context.translate(x_final,y_final);
            context.rotate(rotate);
            context.fillStyle=color;
            context.fillRect(-with_height_square/2, -with_height_square/2, with_height_square, with_height_square);
            context.restore();
        }
        context.restore();
    }

    function resize_event(){
        screen_width = window.innerWidth;
        screen_height = window.innerHeight;
        radius = window.innerHeight / 2 - 150;
        center_x = window.innerWidth / 2;
        center_y = window.innerHeight / 2;
    }
}

