
let Colors = (function() {

    const RED = 'rgb(255,99,132)';
    const ORANGE = 'rgb(255, 159, 64)';
    const YELLOW = 'rgb(255, 205, 86)';
    const GREEN = 'rgb(75, 192, 192)';
    const BLUE = 'rgb(54, 162, 235)';
    const PUPPLE = 'rgb(153, 102, 255)';
    const GREY = 'rgb(201, 203, 207)';

    const RED_t = 'rgba(255, 99, 132, 0.5)';
    const ORANGE_t = 'rgba(255, 159, 64, 0.5)';
    const YELLOW_t = 'rgba(255, 205, 86, 0.5)';
    const GREEN_t = 'rgba(75, 192, 192, 0.5)';
    const BLUE_t = 'rgba(54, 162, 235, 0.5)';
    const PUPPLE_t = 'rgba(153, 102, 255, 0.5)';
    const GREY_t = 'rgba(201, 203, 207, 0.5)';

    const list = [RED, ORANGE, YELLOW, GREEN, BLUE, PUPPLE, GREY];
    const list_t = [RED_t, ORANGE_t, YELLOW_t, GREEN_t, BLUE_t, PUPPLE_t, GREY_t];

    return {
        RED,
        ORANGE,
        YELLOW,
        GREEN,
        BLUE,
        PUPPLE,
        GREY,
        
        RED_t,
        ORANGE_t,
        YELLOW_t,
        GREEN_t,
        BLUE_t,
        PUPPLE_t,
        GREY_t,

        list,
        list_t,
        
    }

})();

export default Colors;