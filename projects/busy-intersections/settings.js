export default {
  // Colors chosen from material.io color palettes
  // https://material.io/guidelines/style/color.html#color-color-tool
  colors: ['#F44336', '#FF9800', '#03A9F4', '#8BC34A', '#673AB7'],

  // Minimum and maximum velocity of cars in a lane
  velocity: {
    min: 0.20,
    max: 0.25
  },

  // Radius of a car
  radius: 10,

  // Space between different roads
  roadSpacing: 400,

  // Space between lanes in the same road
  laneSpacing: 25,

  // Spawn interval between cars on a single lane
  spawnInterval: {
    min: 500,
    max: 1500
  }
}
