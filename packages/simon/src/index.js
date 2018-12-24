import freesewing from "freesewing";
import Brian from "@freesewing/brian";
import plugins from "@freesewing/plugin-bundle";
import flipPlugin from "@freesewing/plugin-flip";
import buttonPlugin from "@freesewing/plugin-buttons";
import config from "../config/config";
// Parts
import draftBack from "./back";
import draftFront from "./front";
import draftFrontRight from "./frontright";
import draftButtonPlacket from "./buttonplacket";
import draftFrontLeft from "./frontleft";
import draftButtonholePlacket from "./buttonholeplacket";
import draftYoke from "./yoke";
import draftSleeve from "./sleeve";
import draftCollarStand from "./collarstand";
import draftCollar from "./collar";
import draftSleevePlacketUnderlap from "./sleeveplacket-underlap";
import draftSleevePlacketOverlap from "./sleeveplacket-overlap";

// Constructor
const Simon = function(settings) {
  freesewing.Pattern.call(this, config);
  this.use(plugins)
    .use(flipPlugin)
    .use(buttonPlugin)
    .apply(settings);

  return this;
};

// Set up inheritance
Simon.prototype = Object.create(freesewing.Pattern.prototype);
Simon.prototype.constructor = Simon;

// Attach per-part draft methods to prototype
Simon.prototype.draftBase = function(part) {
  return new Brian(this.settings).draftBase(part);
};
Simon.prototype.draftFrontBase = function(part) {
  return new Brian(this.settings).draftFront(part);
};
Simon.prototype.draftBackBase = function(part) {
  return new Brian(this.settings).draftBack(part);
};
Simon.prototype.draftSleeveBase = function(part) {
  let brian = new Brian(this.settings);
  return brian.draftSleeve(brian.draftSleevecap(part));
};
Simon.prototype.draftBack = draftBack;
Simon.prototype.draftFront = draftFront;
Simon.prototype.draftFrontRight = draftFrontRight;
Simon.prototype.draftButtonPlacket = draftButtonPlacket;
Simon.prototype.draftFrontLeft = draftFrontLeft;
Simon.prototype.draftButtonholePlacket = draftButtonholePlacket;
Simon.prototype.draftYoke = draftYoke;
Simon.prototype.draftSleeve = draftSleeve;
Simon.prototype.draftCollarStand = draftCollarStand;
Simon.prototype.draftCollar = draftCollar;
Simon.prototype.draftSleevePlacketUnderlap = draftSleevePlacketUnderlap;
Simon.prototype.draftSleevePlacketOverlap = draftSleevePlacketOverlap;

export default Simon;
