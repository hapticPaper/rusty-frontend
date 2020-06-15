
function render(data){

    document.getElementById('dataTableBody').innerHTML=""
    console.log(data)
    chartData=data.dataSetResults;
    data.dataSetResults.forEach((n, i)=>{
        tr = document.createElement("tr")
        td1 = document.createElement("td")
        td2 = document.createElement("td")
        td1.innerHTML = `<b>${i+1}</b>`
        td2.innerHTML = `<b>${n}</b>`            

        tr.appendChild(td1)
        tr.appendChild(td2)
        document.getElementById('dataTableBody').appendChild(tr);
        colors.push(`rgb(${255 * Math.random()},${10 * Math.random()},${100 * Math.random()})`)

});
    
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: chartType,
    
        // The data for our dataset
        data: {
            labels: chartData,
            datasets: [{
                
                label: data.formula ? data.formula :endpoint,
                backgroundColor: colors,
                borderColor: colors,
                data: chartData
            }]
        },
    
        // Configuration options go here
        options: {}
    });
    document.getElementById('secondDiv').innerHTML=""
    document.getElementById('secondDiv').appendChild(cnvs);
}



function updateData(){
    endpoint = $('#dataSelect').val()
    chartType = $('#chartSelect').val()
    points = $('#pointsSlider').val()
    document.getElementById('pointsDiv').innerHTML=points
    formula = $('#formulaInput').val()
    htmlList = []
    chartData = []
    colors = []
    cnvs = document.createElement("canvas")
    ctx = cnvs.getContext('2d')

    if (endpoint=='custom') {
        console.log("Do custom post request")
        document.getElementById('formulaInput').style.display="block"
        $.ajax({
            url: "https://rusty-api.herokuapp.com/custom?" + $.param({
                "length": points,
            }),
            type: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            contentType: "application/json",
            data: JSON.stringify({
                "formula": formula ? formula : '2x'
            }),
            beforeSend: function(xhr){
                console.log("Post prefetch")
                //$('secondDiv').html('<div class="loader"> </div>');
             },

             success: function(msg){
                 console.log("Completed")
             }
            
        })
        .done(function(data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            //console.log(data);

            render(data)

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
        })
        .always(function() {
            /* ... */
        });
        
        
    }
    else {
        document.getElementById('formulaInput').style.display="none"
        fetch(`https://rusty-api.herokuapp.com/${endpoint}?length=${points}`).then(data=>data.json()).then(d=>{
        render(d)
    })
}

    

}