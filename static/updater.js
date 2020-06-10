
function updateData(){
    endpoint = $('#dataSelect').val()
    chartType = $('#chartSelect').val()
    points = $('#lengthInput').val()
    document.getElementById('dataTableBody').innerHTML=""
    htmlList = []
    chartData = []
    colors = []
    cnvs = document.createElement("canvas")
    ctx = cnvs.getContext('2d')
    fetch(`https://rusty-api.herokuapp.com/${endpoint}?length=${points}`).then(data=>data.json()).then(d=>{
        console.log(d);
        chartData=d.dataSetResults;
        d.dataSetResults.forEach((n, i)=>{
            tr = document.createElement("tr")
            td1 = document.createElement("td")
            td2 = document.createElement("td")
            td1.innerHTML = `<b>${i+1}</b>`
            td2.innerHTML = `<b>${n}</b>`            

            tr.appendChild(td1)
            tr.appendChild(td2)
            document.getElementById('dataTableBody').appendChild(tr);
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
    document.getElementById('secondDiv').innerHTML=""
    document.getElementById('secondDiv').appendChild(cnvs);
})
}