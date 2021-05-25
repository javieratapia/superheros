let button = document.getElementById("button");
let result = document.getElementById("result");
let search = "";

button.addEventListener("click", () => {
  search = parseInt(document.getElementById("idSuperHero").value);
  fetch(`https://www.superheroapi.com/api.php/${superHeroe.apiToken}/${search}`)
    .then((response) => response.json())
    .then((item) => {
      let data = {
        id: item.id,
        name: item.name,
        image: item.image.url,
        powerstats: [item.powerstats],
      };
      clean();
      createCard(data.id, data.name, data.image, data.powerstats);
      createChart(data.powerstats);
      document.getElementById("idSuperHero").value=''
    });
});

let createCard = (id, name, image) => {
  let card = `
  <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${image}" alt="${name}" class="card-img h-75">
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <p class="card-text">You choose: ${id}</p>
        <h5 class="card-title">${name}</h5>
        <div id="chartContainer" style="height: 200px; width: 100%;"></div>
      </div>
    </div>
  </div>
</div>
    `;
  result.innerHTML = card;
};

let createChart = (powerstats) => {
  let chartData = [];
  for (let element of powerstats) {
    let label = Object.keys(element);
    let y = Object.values(element);
    for (let i = 0; i < 6; i++) {
      let value = { label: label[i], y: y[i] };
      chartData.push(value);
    }
  }
  let explodePie = (e) => {
    if (
      typeof e.dataSeries.dataPoints[e.dataPointIndex].exploded ===
        "undefined" ||
      !e.dataSeries.dataPoints[e.dataPointIndex].exploded
    ) {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
  };
  let chart = new CanvasJS.Chart("chartContainer", {
    theme: "light1",
    animationEnabled: true,
    title: {
      text: "Powerstats",
    },
    legend: {
      cursor: "pointer",
      itemclick: explodePie,
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label} ({y})",
        showInLegend: true,
        legendText: "{label}",
        dataPoints: chartData,
      },
    ],
  });
  chart.render();
};

let clean = () => {
  let element = document.getElementsByClassName("card")[0];
  if (element) {
    element.remove();
  }
  let chart = document.getElementsByClassName('canvasjs-chart-canvas')[0];
    if (chart) {
        chart.remove()
    };
};
