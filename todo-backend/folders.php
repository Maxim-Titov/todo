<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'config.php';

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(["error" => "Missing user_id"]);
    exit();
}

$stmt = $pdo->prepare("SELECT * FROM folders WHERE user_id = ?");
$stmt->execute([$user_id]);
$folders = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($folders);
?>
