import React from 'react';
// import PropTypes from 'prop-types';

function Setup(props) {
  console.log('props setup', props);

  return (
    <div>
      <h1>This is the setup page</h1>
    </div>
  );
}

Setup.propTypes = {
  // username: PropTypes.string.isRequired,
};

export default Setup;
