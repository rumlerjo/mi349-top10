const ANIMATION_FPS = 60;

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
/**
 * Get a random integer from 0 to max exculsive
 * @param {number} max The upper limit
 * @returns interger from 0 to max exclusive
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// create a class for velocity that handles changing velocity
class Velocity2 {
    constructor(initialX, initialY) {
        this.x = initialX;
        this.y = initialY;
    }

    update_velocity(deltaX, deltaY) {
        this.x += deltaX;
        this.y += deltaY;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    reflectX() {
        this.x = -this.x;
    }

    reflectY() {
        this.y = -this.y;
    }

    /**
     * Randomly affect the x velocity
     */
    random_affect_x() {
        // whether we should affect it
        var affect = getRandomInt(2);
        var negative = getRandomInt(2);
        if (affect == 1) {
            var shift = getRandomInt(Math.abs(3));
            if (negative == 1) {
                shift = -shift;
            }
            this.update_velocity(shift, 0);
        }
    }

    /**
     * Randomly affect the x velocity
     */
        random_affect_y() {
        // whether we should affect it
        var affect = getRandomInt(2);
        var negative = getRandomInt(2);
        if (affect == 1) {
            var shift = getRandomInt(Math.abs(3));
            if (negative == 1) {
                shift = -shift;
            }
            this.update_velocity(0, shift);
        }
    }
}

class Position2 {
    constructor(initialX, initialY) {
        this.x = initialX;
        this.y = initialY;
    }

    update_position(deltaX, deltaY) {
        this.x += deltaX;
        this.y += deltaY;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

class DVDMover {
    constructor() {
        // define the screen bounds
        this.screenTop = -40;
        this.screenBottom = window.innerHeight + 10;
        this.screenLeft = -50;
        this.screenRight = window.innerWidth + 10;
        // define the object position and velocity
        this.position = new Position2(1, 1);
        this.velocity = new Velocity2(10, 10);
        // define our image representation
        this.representation = document.createElement("img");
        this.representation.style.position = "absolute";
        this.representation.setAttribute("src", "Assets/dvd.png");
        this.representation.setAttribute("width", "100px");
        this.representation.setAttribute("height", "50px");
        document.body.insertBefore(this.representation, document.body.firstChild);
        // get the height and width
        this.height = this.representation.clientHeight;
        this.width = this.representation.clientWidth;
        // set initial pos
        this.representation.style.left = this.position.getX() + "px";
        this.representation.style.top = this.position.getY() + "px";
    }

    check_horizontal_constraints() {
        if (this.position.getX() + this.width >= this.screenRight || this.position.getX() <= this.screenLeft) {
            return true;
        }
        return false;
    }

    check_vertical_constraints() {
        if (this.position.getY() + this.height >= this.screenBottom || this.position.getY() <= this.screenTop) {
            return true;
        }
        return false;
    }

    update() {
        // check our current position and change velocity accordingly
        if (this.check_horizontal_constraints() == true) {
            this.velocity.reflectX()
            // randomly affect our x velocity upon hit
            this.velocity.random_affect_x()
        }

        if (this.check_vertical_constraints() == true) {
            this.velocity.reflectY();
            // randomly affect our y velocity upon hit
            this.velocity.random_affect_y()
        }

        // update the record of our position
        this.position.update_position(this.velocity.getX(), this.velocity.getY());
        // update the position representation
        this.representation.style.left = this.position.getX() + (this.width / 2) + "px";
        this.representation.style.top = this.position.getY() + (this.height / 2) + "px";
    }
}

mover = new DVDMover();
setInterval(()=>{
    mover.update();
}, 1000 / ANIMATION_FPS);