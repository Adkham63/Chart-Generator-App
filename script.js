let charData = {
    labels: [], 
    datasets: [{
        label: '# of Value',
        data:[],
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1
    }]
};


function createChart (type, height = 400){
    const canvasContainer = document.getElementById("canvas-container");

    canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`;
    canvasContainer.style.height = `${height}px`;

    const ctx = document.getElementById('myChart').getContext('2d');
    return new Chart(ctx, {
        type:type,
        data:charData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            },onClick: (event, activeElements) =>{
                if(activeElements.length > 0){
                    const{datasetIndex, index} = activeElements[0];
                    removeData(datasetIndex, index);
                }
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

let myChart = createChart('bar');

function addData() {
    const labelInput = document.getElementById('labelInput');
    const dataInput = document.getElementById('dataInput');


    if(labelInput.value && dataInput.value){
        charData.labels.push(labelInput.value);
        charData.datasets.forEach((dataset)=>{
            dataset.data.push(dataInput.value);
        });
        myChart.update();
        labelInput.value ='';
        dataInput.value = '';
    }
}


function updateChartType(){
    const selectedType = document.getElementById('chartType').value;
    myChart.destroy();
    myChart = createChart(selectedType);
}

function removeData(datasetIndex, index){
    if(charData.labels.length > index){
        charData.labels.splice(index, 1);
        charData.datasets[datasetIndex].data.splice(index, 1);
        myChart.update();
    }
}