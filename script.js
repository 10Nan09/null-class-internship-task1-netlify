// Time condition (show only between 3PM and 5PM IST)
function checkTimeCondition() {
  const now = new Date();
  const utcHour = now.getUTCHours(); 
  const istHour = (utcHour + 5 + Math.floor((30 / 60))) % 24; // Convert to IST (UTC+5:30)
  
  return istHour >= 15 && istHour < 17; // 3PM to 5PM
}

// Load CSV and build chart
if (checkTimeCondition()) {
  document.getElementById("myChart").classList.remove("hidden");

  Papa.parse("filtered_intern_data.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;

      // Count Preference vs Work Type
      let counts = {};
      data.forEach(row => {
        const key = row.Preference + " - " + row["Work Type"];
        counts[key] = (counts[key] || 0) + 1;
      });

      const labels = Object.keys(counts);
      const values = Object.values(counts);

      new Chart(document.getElementById("myChart"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: [{
            label: "Number of Internships",
            data: values
          }]
        }
      });
    }
  });
}
