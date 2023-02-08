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
const apiKey = ""; // Get your own API key

const documents = [
  "Weather is ok today",
];

var overall_sentiment = "";
var confidence_score = "";

export async function sentimentanalysis() {

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const results = await client.analyzeSentiment(documents);


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
      return result;
      
    } else {
      console.error(`  Error: ${result.error}`);
    }
  }
}
