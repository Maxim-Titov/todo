<?php
header("Access-Control-Allow-Origin: http://localhost/todo-backend/");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'config.php';

// Отримуємо JSON з тіла запиту
$data = json_decode(file_get_contents("php://input"), true);

$folder_id = $data['folder_id'] ?? null;

if (!$folder_id) {
    echo json_encode(["error" => "Missing folder_id"]);
    exit();
}

$stmt = $pdo->prepare("DELETE FROM folders WHERE folder_id = ?");
$result = $stmt->execute([$folder_id]);

if ($result) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to delete folder"]);
}
?>
