
/**
 * Load Styles
 */
import 'styles/style';

/**
 * Load Js
 */
import React from 'react';
import { render } from 'react-dom';
import FileSelect from './fileSelect';

render(<FileSelect />, document.querySelector('app'));
