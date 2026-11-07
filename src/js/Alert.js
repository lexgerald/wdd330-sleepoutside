export default class Alert {
  constructor(jsonPath = "/json/alerts.json") {
    this.jsonPath = jsonPath;
  }

  async getAlerts() {
    try {
      const response = await fetch(this.jsonPath);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
    return [];
  }

  // Main method
  async render() {
    const alerts = await this.getAlerts();

    // If alerts exist & array is not empty
    if (alerts && alerts.length > 0) {
      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");

      // Loop through each alert item in json
      alerts.forEach((alertData) => {
        const alertParagraph = document.createElement("p");
        alertParagraph.textContent = alertData.message;
        alertParagraph.style.backgroundColor = alertData.background;
        alertParagraph.style.color = alertData.color;
        alertParagraph.style.padding = "10px";
        alertParagraph.style.textAlign = "center";
        alertSection.appendChild(alertParagraph);
      });

      const mainElement = document.querySelector("main");
      if (mainElement) {
        mainElement.prepend(alertSection);
      }
    }
  }
}
