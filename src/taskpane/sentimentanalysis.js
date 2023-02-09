// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * In this sample, we use the sentiment analysis endpoint to retrieve
 * estimations of document sentiment (positive, negative, or mixed) within some
 * example text. The endpoint allows us to analyze sentiment on a per-sentence
 * or overall (per-document) basis.
 *
 * @summary analyzes the sentiment of a piece of text
 */

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
// require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = "https://openaiservice.cognitiveservices.azure.com/"; // process.env["ENDPOINT"] || "<cognitive services endpoint>";
const apiKey = ""; // Get yor own API key

const documents = [
  "This was win32 specifically, we haven’t stopped it fully.  We also are getting close to a good point for win32 to be usable (possibly) as a mvp but we aren’t sure if we will hit that goal or we will need to regroup the resources yet.  We originally had planned a M-L sized work item around enabled core SDX functionality and \
   as of now haven’t de-prioritized it.NAA still takes priority over SDX and is 100% committed and full speed ahead still.",
];

var overall_sentiment = "";
var confidence_score = "";

export async function sentimentanalysis(text, callback) {
  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));
  const results =  await client.analyzeSentiment([text]);

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    if (!result.error) {
      // console.log(`\tDocument text: ${documents[i]}`);
      // console.log(`\tOverall Sentiment: ${result.sentiment}`);
      // console.log("\tSentiment confidence scores: ", result.confidenceScores);
      // console.log("\tSentences");
      // for (const { sentiment, confidenceScores, text } of result.sentences) {
      //   // console.log(`\t- Sentence text: ${text}`);
      //   // console.log(`\t  Sentence sentiment: ${sentiment}`);
      //   console.log("\t  Confidence scores:", confidenceScores);
        
      // }
      callback(result);
      
    } else {
      console.error(`  Error: ${result.error}`);
    }
  }
}
