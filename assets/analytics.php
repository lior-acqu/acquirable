<?php
header("Allow: GET, POST, HEAD");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

session_start();

// Generate a session token if it doesn’t exist
if (!isset($_SESSION["csrf_token"])) {
    $_SESSION["csrf_token"] = bin2hex(random_bytes(32));
}

$trackingFile = "tracking.json";

// Ensure the JSON file exists
if (!file_exists($trackingFile)) {
    file_put_contents($trackingFile, json_encode([]));
}

// Load current tracking data
$data = json_decode(file_get_contents($trackingFile), true);

// Get request method
$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    // Validate CSRF token
    if (!isset($input["token"]) || $input["token"] !== $_SESSION["csrf_token"]) {
        echo json_encode(["error" => "Invalid token"]);
        exit;
    }

    if (!isset($input["name"])) {
        echo json_encode(["error" => "Invalid data"]);
        exit;
    }

    $name = $input["name"];

    // Initialize counter if not set
    if (!isset($data[$name])) {
        $data[$name] = 0;
    }

    // Increment the counter
    $data[$name]++;

    // Save updated data
    file_put_contents($trackingFile, json_encode($data, JSON_PRETTY_PRINT));

    echo json_encode(["message" => "Updated successfully"]);
    exit;
}

// Send token for JavaScript to use
if ($method === "GET") {
    echo json_encode(["csrf_token" => $_SESSION["csrf_token"], "data" => $data]);
    exit;
}

echo json_encode(["error" => "Invalid request"]);
