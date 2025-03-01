async function convertHijriToGregorian() {
  const hijriYear = document.getElementById('hijriYearInput').value;

  if (!hijriYear || hijriYear < 1300 || hijriYear > 1500) {
    alert("Please enter a valid Hijri year between 1300 and 1500.");
    return;
  }

  try {
    // Fetch Gregorian date for 1 Ramadan
    const ramadanResponse = await fetch(`https://api.aladhan.com/v1/hToG?date=1-9-${hijriYear}`);
    const ramadanData = await ramadanResponse.json();
    const ramadanDate = ramadanData.data.gregorian;

    // Fetch Gregorian date for 1 Shawal
    const shawalResponse = await fetch(`https://api.aladhan.com/v1/hToG?date=1-10-${hijriYear}`);
    const shawalData = await shawalResponse.json();
    const shawalDate = shawalData.data.gregorian;

    // Display results
    document.getElementById('result').innerHTML = `
      <p><strong>1 Ramadan ${hijriYear} AH:</strong> ${ramadanDate.day} ${ramadanDate.month.en}, ${ramadanDate.year}</p>
      <p><strong>1 Shawal ${hijriYear} AH:</strong> ${shawalDate.day} ${shawalDate.month.en}, ${shawalDate.year}</p>
    `;
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById('result').innerHTML = "<p>Error fetching Gregorian dates. Please try again later.</p>";
  }
}
