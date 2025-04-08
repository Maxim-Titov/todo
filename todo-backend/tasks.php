<?php
header("Access-Control-Allow-Origin: http://localhost/todo-backend/");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'config.php';

$user_id = $_GET['user_id'] ?? null;
$folder_id = $_GET['folder_id'] ?? null;

if (!$folder_id) {
    $stmt = $pdo->prepare("SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
} else {
    $stmt = $pdo->prepare("SELECT * FROM tasks WHERE user_id = ? AND folder_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id, $folder_id]);
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode($tasks);
?>
