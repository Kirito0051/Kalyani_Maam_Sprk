function investigate() {
  const html = document.getElementById("htmlInput").value;
  const css = document.getElementById("cssInput").value;
  const report = document.getElementById("report");
  const iframe = document.getElementById("preview");

  // ---- Live Preview ----
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
          </body>
        </html>
      `);
  doc.close();

  // ---- Crime Detection ----
  let crimes = [];
  let warnings = [];

  if (html.includes("style=")) {
    crimes.push("Inline styles detected.");
  }

  if (css.includes("!important")) {
    crimes.push("!important detected. Step away from it.");
  }

  const divCount = (html.match(/<div/gi) || []).length;
  if (divCount > 10) {
    warnings.push("Too many divs. Possible div soup.");
  }

  if (!crimes.length && !warnings.length) {
    report.innerHTML = `
          <span class="badge clean">CLEAN</span>
          <p>No crimes detected. Looks solid.</p>
        `;
    return;
  }

  report.innerHTML = `
        ${crimes.map((c) => `<span class="badge crime">CRIME</span><p>${c}</p>`).join("")}
        ${warnings.map((w) => `<span class="badge warning">WARNING</span><p>${w}</p>`).join("")}
      `;
}
