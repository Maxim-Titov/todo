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

$data = json_decode(file_get_contents("php://input"), true);

$folder_id = $data['folder_id'] ?? null;
$user_id = $data['user_id'] ?? null;
$task_title = $data['task_title'] ?? null;
$task_content = $data['task_content'] ?? null;
$priority = $data['priority'] ?? null;

// Логування даних
error_log("Received data: " . print_r($data, true));

if (!$user_id || !$folder_id || !$task_title || !$task_content) {
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

$stmt = $pdo->prepare("INSERT INTO tasks (folder_id, user_id, task_title, task_content, priority) VALUES (?, ?, ?, ?, ?)");
$result = $stmt->execute([$folder_id, $user_id, $task_title, $task_content, $priority]);

if ($result) {
    echo json_encode([
        "success" => true,
        "task_id" => $pdo->lastInsertId(),
        "folder_id" => $folder_id,
        "task_title" => $task_title,
        "task_content" => $task_content,
        "priority" => $priority
    ]);
} else {
    echo json_encode(["error" => "Failed to add task"]);
}
?>
