/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

Office.onReady((info) => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
  }
});

export async function run() {
  // Get a reference to the current message
  const item = Office.context.mailbox.item;
  var emailBody = "";

  // Write message property value to the task pane
  document.getElementById("item-subject").innerHTML = "<b>Subject:</b> <br/>" + item.subject;

  // Get the Text body of the email
  item.body.getAsync(Office.CoercionType.Text, function (asyncResult) {
    emailBody = asyncResult.value;
  });

  //TODO: call sentiment analysis APIs here
  // const axios = require("axios");

  // async function sentimentAnalysis(text) {
  //   const url = `https://${process.env.AZURE_REGION}.api.cognitive.microsoft.com/text/analytics/v3.0/sentiment`;

  //   const data = {
  //     documents: [
  //       {
  //         id: "1",
  //         text: text,
  //       },
  //     ],
  //   };

  //   const headers = {
  //     "Ocp-Apim-Subscription-Key": process.env.AZURE_API_KEY,
  //   };

  //   try {
  //     const response = await axios.post(url, data, { headers });
  //     return response.data.documents[0].score;
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // }

  //paste the sentiment on the add-in
  document.getElementById("sentiment-analysis").innerHTML = emailBody;
}
