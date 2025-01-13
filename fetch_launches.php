<?php
header('Content-Type: application/json');

$apiUrl = 'https://fdo.rocketlaunch.live/json/launches/next/5';

try {
    $response = file_get_contents($apiUrl);
    if ($response === FALSE) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch launches']);
        exit;
    }
    echo $response;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
