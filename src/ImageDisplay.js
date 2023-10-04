// ImageDisplay.js

import imagesData from './images.json'; // Import the image paths
import nData from './n.json'; // Import nData for 'no' and 'nah' images

// Function to calculate a random number between 0 and 1
const getRandomNumber = () => Math.random();

// Function to get a random image path from the 'imagesData' array
const getRandomImagePath = () => {
  const randomIndex = Math.floor(Math.random() * imagesData.length);
  return imagesData[randomIndex].path;
};

// Function to get a random 'no' image path from the 'nData' array
const getRandomNoImagePath = () => {
  const randomIndex = Math.floor(Math.random() * nData.length);
  return nData[randomIndex].path;
};

// Function to simulate a loading delay (replace with actual image loading logic)
const simulateLoadingDelay = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

// Function to check if the input mentions a photo keyword and meets the probability criteria
const negativeKeywords = ["don't", 'dont', "won't", 'never', 'stop', 'wont'];

const shouldSendImage = (input) => {
  const photoKeywords = [
    'photo',
    'picture',
    'selfie',
    'selfies',
    'photos',
    'pictures',
    'pic',
    'pics',
    'photo?',
    'picture?',
    'selfie?',
    'selfies?',
    'photos?',
    'pictures?',
    'pic?',
    'pics?',
  ];
  const photoKeyword = ['nude', 'nudes', 'naked', 'nude?', 'nudes?', 'naked?'];
  const randomNumber = getRandomNumber();

  if (input.toLowerCase().split(' ').some((word) => negativeKeywords.includes(word))) {
    return null;
  } else if (
    input.toLowerCase().split(' ').some((word) => photoKeywords.includes(word)) &&
    randomNumber <= 0.5
  ) {
    return getRandomImagePath();
  } else if (
    input.toLowerCase().split(' ').some((word) => photoKeyword.includes(word)) &&
    randomNumber <= 0.5
  ) {
    return getRandomNoImagePath();
  }

  return null;
};

export { shouldSendImage, simulateLoadingDelay };
