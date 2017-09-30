export default {
  // Colors chosen from material.io color palettes
  // https://material.io/guidelines/style/color.html#color-color-tool
  colors: ['#F44336', '#FF9800', '#03A9F4', '#8BC34A', '#673AB7'],

  // Minimum and maximum starting distance between cars
  startingDistance: {
    min: 100,
    max: 300
  },

  // Minimum and maximum velocity of cars in a lane
  velocity: {
    min: 0.15,
    max: 0.30
  },

  // Radius of a car
  radius: 10,

  // Space between different roads
  roadSpacing: 400,

  // Space between lanes in the same road
  laneSpacing: 25
}
