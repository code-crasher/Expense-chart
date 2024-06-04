const dataWrapper = document.querySelector(".bars");
const getExpenceData = async () => {
  const url = "./data.json";
  const response = await fetch(url);
  const data = await response.json();

  let displayData = data
    .map((item) => {
      return `<div class="bar">
    <div class="bar__amount"><p><small>$${item.amount}</small></p></div>
      <div class="bar__data" style="height:${item.amount}%;"></div>
    <p><small>${item.day}</small></p>
  </div>`;
    })
    .join("");

  dataWrapper.innerHTML = displayData;
};

getExpenceData();
