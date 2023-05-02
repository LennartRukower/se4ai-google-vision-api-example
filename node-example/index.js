// use dotenv to read the ENV variables from the .env file
require("dotenv").config();
const getImageFilenames = require("./utils");
// abort if the Google API key location is not present as an ENV variable
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_APPLICATION_CREDENTIALS === "") {
  console.error("Error: GOOGLE_APPLICATION_CREDENTIALS env variable not set! Aborting...");
  process.exit(1);
}

// TODO: adapt the main function to send all images in `resources` to the Google Cloud Vision API and to identify all images with cat labels in the results

async function main() {
  // import the Google Cloud client library
  const vision = require("@google-cloud/vision");
  // create a client
  const client = new vision.ImageAnnotatorClient();

  const images = getImageFilenames("../resources");

  // TODO: Start requests simultaneously with promise.all
  const catPredictions = [];
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const result = await client.labelDetection(
      "../resources/"+image
    );
    result[0].labelAnnotations.forEach(label => {
      if(label.description === "Cat") {
        catPredictions.push({
          image,
          score: label.score
        });
      }
    });
  }

  // print out label annotations of the result to identify the necessary attributes
  console.log(`Length: ${catPredictions.length}`);
}

// execute main function
main();