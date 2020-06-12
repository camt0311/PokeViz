// Function for printing the Pokemon name, displaying the Pokemon image and drawing a radar graph
// Parameters: Pokemon dataset, Pokemon ID to be visualized, and pokemonNum (indicates position on
// page, if it is left, then it is 1, if it is right then it is 2)
function drawAll(data, id, pokemonNum) {
    // margins, height and width of the radar
    var marginRadar = {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100
    },
        widthRadar = Math.min(700, window.innerWidth - 10) - marginRadar.left - marginRadar.right,
        heightRadar = Math.min(widthRadar, window.innerHeight - marginRadar.top - marginRadar.bottom - 20);

    // Display the name and image of the pokemon
    d3.select(`#pokemon${pokemonNum}name`).html(data[id - 1]["Name"])
    d3.select(`#pokemon${pokemonNum}Image`).attr("src", `https://www.serebii.net/art/th/${id}.png`)
    d3.select(`#pokemon${pokemonNum}Type1`).html(data[id - 1]["Type 1"])
    d3.select(`#pokemon${pokemonNum}Type2`).html(data[id - 1]["Type 2"])
    // Initialize the data field for the Pokemon to be visualized
    pokeData[pokemonNum - 1] = []

    // If the Pokemon drawing on the right (second Pokemon) is selected first, 
    // the data for the first Pokemon is set to 0 due to the way the library is written
    if (pokemonNum == 2 && pokeData[0].length == 0) {
        for (key in allowedKeys) {
            pokeData[0].push({
                axis: allowedKeys[key],
                value: 0
            })
        }
    }
    // Format data so that the RadarChart library can be used
    for (key in allowedKeys) {
        pokeData[pokemonNum - 1].push({
            axis: allowedKeys[key],
            value: data[id - 1][allowedKeys[key]]
        })
    }

    // Defining colors for a radar graph
    var colorRadar = d3.scale.ordinal()
        .range(["#EDC951", "#6FAD5E"]);

    // Defining radar graph options
    var radarChartOptions = {
        w: widthRadar - 100,
        h: heightRadar - 100,
        margin: marginRadar,
        maxValue: 120,
        levels: 6,
        roundStrokes: false,
        color: colorRadar
    };

    // Drawing a radar graph
    // SOURCE:
    // https://www.visualcinnamon.com/2015/10/different-look-d3-radar-chart.html
    RadarChart(".radarChart", pokeData, radarChartOptions);
}


// Function for finding Pokemon IDs depending on the submitted name
function findPokemonByName(name, data) {
    return data.find(obj => obj.Name == name)["#"];
}
