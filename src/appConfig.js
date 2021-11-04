"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const description = "This is an art pics generator";
const baseUri = "ipfs://NewUriToReplace";

const layerConfigurations = [
  {
    growEditionSizeTo: 2,
    layersOrder: [
      {name: "Background"},
      { name: "Eyeball" },
      { name: "Eye color" },
      { name: "Bottom lid" },
    ]
  }
]

const shuffleLayerConfigurations = false;

const debugLogs = false;

const format = {
  width: 512,
  height: 512
}

const background = {
  generate: true,
  brightness: "80%"
}

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;


module.exports = {
  format,
  baseUri,
  description,
  background, 
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata
}