<?php
// Налаштування заголовків для CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

$folder_id = $data['folder_id'] ?? null;
$folder_title = $data['folder_title'] ?? null;

if (!$folder_id || !$folder_title) {
    echo json_encode(["error" => "Missing folder_id or folder_title"]);
    exit();
}

try {
    $stmt = $pdo->prepare("UPDATE folders SET folder_title = ? WHERE folder_id = ?");
    $result = $stmt->execute([$folder_title, $folder_id]);

    if ($result) {
        echo json_encode([
            "success" => true,
            "folder_id" => $folder_id,
            "folder_title" => $folder_title
        ]);
    } else {
        echo json_encode(["error" => "Failed to rename folder"]);
    }

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
