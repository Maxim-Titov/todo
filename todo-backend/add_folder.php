<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php';

// ОТРИМУЄМО JSON ДАНІ
$data = json_decode(file_get_contents("php://input"), true);

$user_id = $data['user_id'] ?? null;
$folder_title = $data['folder_title'] ?? null;

if (!$user_id || !$folder_title) {
    echo json_encode(["error" => "Missing user_id or folder_title"]);
    exit();
}

$stmt = $pdo->prepare("INSERT INTO folders (user_id, folder_title) VALUES (?, ?)");
$result = $stmt->execute([$user_id, $folder_title]);

if ($result) {
    echo json_encode([
        "success" => true,
        "folder_id" => $pdo->lastInsertId(),
        "folder_title" => $folder_title
    ]);
} else {
    echo json_encode(["error" => "Failed to add folder"]);
}
?>
