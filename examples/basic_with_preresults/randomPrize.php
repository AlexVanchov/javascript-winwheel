<?php

header('Content-Type: application/json');

$aResult;

$prizes = [10,20,30,40,50];

switch ($_POST['func']) {
    case 'randomPrize':
        $aResult = rand(0, 4);
        break;
}


echo json_encode($prizes[$aResult]);
