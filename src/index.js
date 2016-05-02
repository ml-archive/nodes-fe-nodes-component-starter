/*
 * This file is only used by the build process (SystemJS)
 *
 * IMPORT ALL JAVASCRIPT FILES WHICH SHOULD BE INCLUDED IN THE BUNDLE HERE
 */
import module from './testing.module.js';
import directive from './testing.directive.js';
import service from './testing.service.js';

/*
 * Inline templates are generated under the build process
 * Which is why the path is returning 404
 */
import templates from './templates.js';