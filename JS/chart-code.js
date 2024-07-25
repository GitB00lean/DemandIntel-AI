import { GoogleGenerativeAI } from "@google/generative-ai";

const ctx = document.getElementById('Chart-canvas');

const getInputValues = () => {
  return [
    String(document.getElementById("num1").value),
    String(document.getElementById("num2").value),
    String(document.getElementById("num3").value),
    String(document.getElementById("num4").value),
    String(document.getElementById("num5").value),
    String(document.getElementById("num6").value),
    String(document.getElementById("num7").value)
  ];
}

const API_KEY = "AIzaSyC9BBMNK5FeUXCcHpuEMqdiN_iP9IjPJsA";
const genAI = new GoogleGenerativeAI(API_KEY);

const modelConfig = {
  model: "gemini-1.5-flash",
  systemInstruction: `
    You are a sales prediction API. Given an array of 7 numbers representing sales data for the past 7 days,
    you will predict the sales for the next 7 days. Respond only with the 7 predicted sales figures in an array format.
    *Input:* [100, 120, 130, 110, 115, 150, 140] 
    *Output:* [110, 125, 135, 120, 130, 160, 145]
    *Input:* [200, 220, 210, 230, 240, 250, 260]
    *Output:* [210, 225, 215, 235, 245, 255, 265]
    *Input:* [300, 310, 320, 330, 340, 350, 360]
    *Output:* [310, 320, 330, 340, 350, 360, 370]
    *Input:* [150, 160, 170, 180, 190, 200, 210]
    *Output:* [160, 170, 180, 190, 200, 210, 220]
    *Input:* [50, 55, 60, 65, 70, 75, 80]
    *Output:* [55, 60, 65, 70, 75, 80, 85]"
  `,
};

document.getElementById("predict").addEventListener("click", predictSales);

async function predictSales() {
  document.getElementById("loadingText").style.opacity = 1;
  const pastdata = getInputValues();
  console.log('Past Data:', pastdata);  
  let predData = [];

  try {
    const model = await genAI.getGenerativeModel(modelConfig);
    const result = await model.generateContent("Here's the data: "+pastdata);
    const response = await result.response;
    predData = JSON.parse(await response.text()); // Await the text extraction and parse as JSON
    console.log('Predicted Data:', predData);
  } catch (error) {
    console.error('Error enhancing the prompt:', error);
  } finally {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
          {
            type: 'bar',
            label: 'Current Data Stats',
            data: pastdata,
            borderWidth: 1,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)'
          },
          {
            type: 'line',
            label: 'Predicted Data Stat',
            data: predData,
            borderWidth: 1,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    document.getElementById("loadingText").style.opacity = 0;
}
}

