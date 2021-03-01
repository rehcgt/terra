<?php

use GuzzleHttp\Exception\GuzzleException;

$url_base = "https://search.torre.co/opportunities/_search/?";
include $_SERVER["DOCUMENT_ROOT"]."/api/vendor/autoload.php";
$client = new GuzzleHttp\Client([
    'headers' => [ 'Content-Type' => 'application/json' ]
]);
try {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    $request = $client->request('POST', 'https://search.torre.co/opportunities/_search', [
        'query' => [
            'offset' => '0',
            'size' => '5000',
            'aggregate' => 'false'
        ],
        'body' => '{"status": {"code": "open"}}'
    ]);
    $result = json_decode($request->getBody(), true);
    $jobs_array = array();
    if ($result["results"]) {
        foreach ($result["results"] as $job) {
            $jobs_array[$job["id"]]["description"] = $job["objective"];
            $jobs_array[$job["id"]]["type"] = $job["type"];
            $jobs_array[$job["id"]]["organizations"] = $job["organizations"];
            $jobs_array[$job["id"]]["locations"] = $job["locations"];
            $jobs_array[$job["id"]]["remote"] = $job["remote"];
            $jobs_array[$job["id"]]["salary_info"] = $job["compensation"];
            $jobs_array[$job["id"]]["deadline"] = $job["deadline"];
        }
    }
    echo json_encode($jobs_array);
} catch (GuzzleException $e) {
    echo "The following error has ocurred: ".$e->getCode()." - ".$e->getMessage();
}