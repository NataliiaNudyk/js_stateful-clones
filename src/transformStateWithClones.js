'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const key of actions) {
    const { type, extraData, keysToRemove } = key;

    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState }; // Clone the current state

        for (const i of keysToRemove) {
          delete currentState[i]; // Remove specified keys
        }
        break;

      case 'clear':
        currentState = {};
        break;
    }
    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
