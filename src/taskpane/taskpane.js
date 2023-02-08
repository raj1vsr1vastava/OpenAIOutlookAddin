/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global document, Office */

import { sentimentanalysis } from "./sentimentanalysis.js";

Office.onReady((info) => {
  // if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
  // }
});

export async function run() {
  // Get a reference to the current message
  // const item = Office.context.mailbox.item;
  // var emailBody = "";
  var result = "";
  var overall_sentiment = "";
  var confscore_positive = "";
  var confscore_neutral = "";
  var confscore_negative = "";

  // Write message property value to the task pane
  // document.getElementById("item-subject").innerHTML = "<b>Subject:</b> <br/>" + item.subject;

  // Get the Text body of the email
  // item.body.getAsync(Office.CoercionType.Text, function (asyncResult) {
  //   emailBody = asyncResult.value;
  // });

  //TODO call sentiment analysis function
  result = await sentimentanalysis();
  for (const { sentiment, confidenceScores, text } of result.sentences) {
      // console.log(`\t- Sentence text: ${text}`);
      // console.log(`\t  Sentence sentiment: ${sentiment}`);
      // console.log("\t  Confidence scores:", confidenceScores);
      const { positive, neutral, negative } = confidenceScores
      confscore_positive = positive*100;
      confscore_neutral = neutral*100;
      confscore_negative = negative*100;
    }


  //paste the sentiment on the add-in
  document.getElementById("overall-sentiment").innerHTML = "The Overall Sentiment is <b>" + result.sentiment + "</b>";
  document.getElementById("confidence-score").innerHTML = "<b>Confidence Score :</b> <br/>" + "Positive: "+confscore_positive + "%</br>  Neutral: " + confscore_neutral+ "%</br>  Negative: " + confscore_negative + "%";
}