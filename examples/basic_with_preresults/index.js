
let theWheel = new Winwheel({
    'numSegments': 15, // Specify number of segments.
    'outerRadius': 212, // Set outer radius so wheel fits inside the background.
    'textFontSize': 28, // Set font size as desired.
    'segments': // Define segments including colour and text.
        [
            {
                'fillStyle': '#cc3131',
                'text': '10 lv'
            },
            {
                'fillStyle': '#98cc31',
                'text': '30 lv'
            },
            {
                'fillStyle': '#3179cc',
                'text': '20 lv'
            },
            {
                'fillStyle': '#db9137',
                'text': '10 lv'
            },
            {
                'fillStyle': '#9631cc',
                'text': '20 lv'
            },
            {
                'fillStyle': '#cc3131',
                'text': '30 lv'
            },
            {
                'fillStyle': '#98cc31',
                'text': '10 lv'
            },
            {
                'fillStyle': '#3179cc',
                'text': '20 lv'
            },
            {
                'fillStyle': '#db9137',
                'text': '10 lv'
            },
            {
                'fillStyle': '#9631cc',
                'text': '30 lv'
            },
            {
                'fillStyle': '#cc3131',
                'text': '10 lv'
            },
            {
                'fillStyle': '#98cc31',
                'text': '40 lv'
            },
            {
                'fillStyle': '#3179cc',
                'text': '40 lv'
            },
            {
                'fillStyle': '#db9137',
                'text': '10 lv'
            },
            {
                'fillStyle': '#9631cc',
                'text': '50 lv'
            }
        ],
    'animation':
    {
        'type': 'spinToStop',
        'duration': 5, // Duration in seconds.
        'spins': 8, // Number of complete spins.
        'callbackFinished': alertPrize
    }
});

let wheelPower = 0;
let wheelSpinning = false;


document.getElementById('spin_button').src = "spin_on.png";
document.getElementById('spin_button').className = "clickable";

async function startSpin() {
    document.getElementById('spin_button').src = "spin_off.png";
    document.getElementById('spin_button').className = "";
    if (wheelSpinning == false) {

        theWheel.animation.spins = 3;


        let prize = await getRandomPrize();
        theWheel.startAnimation(prize);

        wheelSpinning = true;
    }
}

function resetWheel() {
    theWheel.stopAnimation(false);
    theWheel.rotationAngle = 0; 
    theWheel.draw(); 

    document.getElementById('pw1').className = "";
    document.getElementById('pw2').className = "";
    document.getElementById('pw3').className = "";

    wheelSpinning = false; 
}

function alertPrize(indicatedSegment) {
    alert("You won: " + indicatedSegment.text);
}

async function getRandomPrize() {
    let dataResult = '0';
    await $.ajax({
        method: "POST",
        dataType: "json",
        url: "randomPrize.php",
        data: {
            func: 'randomPrize'
        },
        success: function (data) {
            try {
                data = JSON.parse(data);
            } catch (e) {}

            dataResult = data;
        }
    });
    return dataResult;
}