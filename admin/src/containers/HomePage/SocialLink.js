import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Gh from '../../assets/images/social_gh.png';
import Linkedln from '../../assets/images/logo_linkedln.svg';
import Medium from '../../assets/images/social_medium.png';


import { SocialLinkWrapper } from './components';

function getSrc(name) {
  switch (name) {
    case 'GitHub':
      return Gh;
    case 'Medium':
      return Medium;
    case 'Linkedln':
      return Linkedln;
  default:
      return Gh;
  }
}

const SocialLink = ({ link, name }) => {
  return (
    <SocialLinkWrapper className="col-6">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={getSrc(name)} alt={name} />
        <span>{name}</span>
      </a>
    </SocialLinkWrapper>
  );
};

SocialLink.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(SocialLink);
