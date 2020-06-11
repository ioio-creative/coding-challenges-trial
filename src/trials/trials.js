const trials = [
  {
    id: 1,
    slug: 'lissajous-curve-table',
    authors: ['ioio-tech-team'],
    techs: ['p5'],
    hashTags: ['p5', 'processing', 'lissajous_curve_table'],
    refs: [
      'https://thecodingtrain.com/CodingChallenges/116-lissajous.html',
      'https://youtu.be/--6eyLO78CY'
    ],
    loadComponentFunc: _ =>
      import('trials/sketches/lissajous-curve-table/LissajousCurveTableCanvas')
  },
  {
    id: 2,
    slug: 'double-pendulum',
    authors: ['ioio-tech-team'],
    techs: ['p5'],
    hashTags: ['p5', 'processing', 'double_pendulum'],
    refs: [
      'https://thecodingtrain.com/CodingChallenges/093-double-pendulum.html',
      'https://youtu.be/uWzPe_S-RVE'
    ],
    loadComponentFunc: _ =>
      import('trials/sketches/double-pendulum/DoublePendulumCanvas')
  },
  {
    id: 3,
    slug: 'flocking',
    authors: ['ioio-tech-team'],
    techs: ['p5'],
    hashTags: ['p5', 'flocking', 'boids'],
    refs: [
      'https://www.youtube.com/watch?v=mhjuuHl6qHM',
      'https://www.red3d.com/cwr/boids/',
      'https://p5js.org/examples/simulate-flocking.html'
    ],
    loadComponentFunc: _ => import('trials/sketches/flocking/index')
  },
  {
    id: 4,
    slug: 'pick-from-basket-without-replacement',
    authors: ['ioio-tech-team'],
    techs: ['vanilla-js'],
    hashTags: ['random_number'],
    refs: [],
    loadComponentFunc: _ =>
      import('trials/sketches/pick-from-basket-without-replacement/index')
  }
];

let trialSlugToTrialMap = {};
trials.forEach(trial => {
  trialSlugToTrialMap[trial.slug] = trial;
});

const getTrialBySlug = slug => {
  return trialSlugToTrialMap[slug];
};

export default trials;

export { getTrialBySlug };
