export default {
  // Colors chosen from material.io color palettes
  // https://material.io/guidelines/style/color.html#color-color-tool
  colors: [
    '#F44336', // Red
    '#E91E63', // Pink
    '#9C27B0', // Purple
    '#673AB7', // Deep Purple
    '#3F51B5', // Indigo
    '#2196F3', // Blue
    '#03A9F4', // Light Blue
    '#00BCD4', // Cyan
    '#009688', // Teal
    '#4CAF50', // Green
    '#8BC34A', // Light Green
    '#CDDC39', // Lime
    '#FFEB3B', // Yellow
    '#FFC107', // Amber
    '#FF9800', // Orange
    '#FF5722', // Deep Orange
    '#795548', // Brown
    '#607D8B' // Blue Grey
  ],

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
