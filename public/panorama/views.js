// Add a separate panorama for each available floor / time combination.
// northYaw is the measured yaw (degrees) pointing north in that panorama.
// Keep it null until the orientation is verified.
window.panoramaViews = [
  { id: 'demo', floor: 10, time: 'day', image: './vista-360.jpg', northYaw: null, illustrative: true },
  {
    id: 'demo-night', floor: 10, time: 'night', image: './vista-noite.jpg', northYaw: null, illustrative: true,
    // Illustrative partial view: this supplied photo is not a full spherical panorama.
    // These display bounds are not measured camera calibration.
    projection: { haov: 100, vaov: 56.25, minYaw: -50, maxYaw: 50, minPitch: -28.125, maxPitch: 28.125, hfov: 70, minHfov: 30, maxHfov: 90, pitch: 0, avoidShowingBackground: true },
  },
];
