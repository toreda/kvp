import {series, src} from 'gulp';

import {Build} from '@toreda/build-tools';
import {EventEmitter} from 'events';
import {Log} from '@toreda/log';

const eslint = require('gulp-eslint');

const events = new EventEmitter();
const log = new Log();

const build: Build = new Build({
	log: log,
	events: events
});

function runLint() {
	return (
		src(['src/**.ts'])
			// eslint() attaches the lint output to the "eslint" property
			// of the file object so it can be used by other modules.
			.pipe(eslint())
			// eslint.format() outputs the lint results to the console.
			// Alternatively use eslint.formatEach() (see Docs).
			.pipe(eslint.format())
			// To have the process exit with an error code (1) on
			// lint error, return the stream and pipe to failAfterError last.
			.pipe(eslint.failAfterError())
	);
}

function createDist() {
	return build.gulpSteps.createDir('./dist', true);
}

function cleanDist() {
	return build.gulpSteps.cleanDir('./dist', true);
}

function buildSrc() {
	return build.run.typescript('./dist', 'tsconfig.json');
}

exports.default = series(createDist, cleanDist, runLint, buildSrc);
