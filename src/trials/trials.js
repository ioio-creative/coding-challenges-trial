import asyncLoadingComponent from 'components/loading/asyncLoadingComponent';


const trials = [
  {
    id: 1,
    slug: 'lissajous-curve-table',
    refs: [
      'https://thecodingtrain.com/CodingChallenges/116-lissajous.html',
      'https://youtu.be/--6eyLO78CY'
    ],
    AsyncComponent: asyncLoadingComponent(_ => import('trials/sketches/1/LissajousCurveTableCanvas'))
  },
  {
    id: 2,
    slug: 'double-pendulum',
    refs: [
      'https://thecodingtrain.com/CodingChallenges/093-double-pendulum.html',
      'https://youtu.be/uWzPe_S-RVE'
    ],
    AsyncComponent: asyncLoadingComponent(_ => import('trials/sketches/2/DoublePendulumCanvas'))
  }
];

let trialSlugToTrialMap = {};
trials.forEach((trial) => {
  trialSlugToTrialMap[trial.slug] = trial
});

const getTrialBySlug = (slug) => {
  return trialSlugToTrialMap[slug];
}


export default trials;

export {
  getTrialBySlug
};