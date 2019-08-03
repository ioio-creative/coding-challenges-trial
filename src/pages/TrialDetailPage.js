import React from 'react';

import { getTrialBySlug } from 'trials/trials';

import './TrialDetailPage.css';


function TrialDetailPage(props) {
  const { match } = props;
  const trialSlug = match.params.trialSlug;
  const trial = getTrialBySlug(trialSlug);
  const AsyncTrialSketch = trial.AsyncComponent;

  return (
    <div className="trial-detail-page">
      <AsyncTrialSketch />
    </div>
  );
}


export default TrialDetailPage;