async function calculateHijriDates() {
  const dateInput = document.getElementById('dateInput').value;

  if (!dateInput) {
    alert("Please select a date.");
    return;
  }

  // Extract year, month, and day from the selected date
  const [year, month, day] = dateInput.split('-');

  try {
    // Fetch Ramadan start date (1st of September in the selected year)
    const ramadanResponse = await fetch(`https://api.aladhan.com/v1/gToH?date=1-09-${year}`);
    const ramadanData = await ramadanResponse.json();
    const ramadanDate = ramadanData.data.hijri;

    // Fetch Shawal start date (1st of October in the selected year)
    const shawalResponse = await fetch(`https://api.aladhan.com/v1/gToH?date=1-10-${year}`);
    const shawalData = await shawalResponse.json();
    const shawalDate = shawalData.data.hijri;

    // Display results
    document.getElementById('result').innerHTML = `
      <p><strong>1 Ramadan ${ramadanDate.year} AH:</strong> ${ramadanDate.day} ${ramadanDate.month.en}</p>
      <p><strong>1 Shawal ${shawalDate.year} AH:</strong> ${shawalDate.day} ${shawalDate.month.en}</p>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById('result').innerHTML = "<p>Error fetching Hijri dates. Please try again later.</p>";
  }
}
