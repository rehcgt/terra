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
            'size' => '1000',
            'aggregate' => 'false',
            'currency' => 'USD%24'
        ],
        'body' => '{"status": {"code": "open"}}'
    ]);
    $result = json_decode($request->getBody(), true);
    $jobs_array = array();
    if ($result["results"]) {
        foreach ($result["results"] as $job) {
            $jobs_array[$job["id"]]["id"] = $job["id"];
            $jobs_array[$job["id"]]["description"] = $job["objective"];
            $jobs_array[$job["id"]]["type"] = $job["type"];
            $jobs_array[$job["id"]]["company"] = $job["organizations"][0]["name"];                        
            $jobs_array[$job["id"]]["remote"] = $job["remote"];
            $jobs_array[$job["id"]]["min_salary"] = $job["compensation"]["data"]["currency"]." ".number_format($job["compensation"]["data"]["minAmount"], 2);
            $jobs_array[$job["id"]]["max_salary"] = $job["compensation"]["data"]["currency"]." ".number_format($job["compensation"]["data"]["maxAmount"], 2);
            $jobs_array[$job["id"]]["deadline"] = $job["deadline"];
            $jobs_array[$job["id"]]["apply_url"] = "https://torre.co/jobs/".$job["id"];
        }
    }
    echo json_encode(array_values($jobs_array));
} catch (GuzzleException $e) {
    echo "The following error has ocurred: ".$e->getCode()." - ".$e->getMessage();
}