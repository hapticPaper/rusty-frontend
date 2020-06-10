
function updateData(){
    endpoint = $('#dataSelect').val()
    chartType = $('#chartSelect').val()
    htmlList = []
    chartData = []
    colors = []
    cnvs = document.createElement("canvas")
    ctx = cnvs.getContext('2d')
    fetch(`https://rusty-api.herokuapp.com/${endpoint}`).then(data=>data.json()).then(d=>{
        console.log(d);
        chartData=d.dataSetResults;
        d.dataSetResults.forEach((n, i)=>{
            htmlList.push(`<b>${i+1}).   </b><i>${n}</i>`);
            colors.push(`rgb(${255 * Math.random()},${255 * Math.random()},${255 * Math.random()})`)
    });
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: chartType,
    
        // The data for our dataset
        data: {
            labels: chartData,
            datasets: [{
                
                label: endpoint,
                backgroundColor: colors,
                borderColor: colors,
                data: chartData
            }]
        },
    
        // Configuration options go here
        options: {}
    });
    document.getElementById('onlydiv').innerHTML=htmlList.join("<br>");
    document.getElementById('secondDiv').innerHTML=""
    document.getElementById('secondDiv').appendChild(cnvs);
})
}