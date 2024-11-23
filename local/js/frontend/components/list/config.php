<?php

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) {
	die();
}

return [
	'css' => './dist/main.bundle.css',
	'js' => './dist/main.bundle.umd.cjs',
    'rel' => [
        "frontend.components.card"
    ],
	'skip_core' => true,
];
