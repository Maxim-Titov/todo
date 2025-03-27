<?php
header("Access-Control-Allow-Origin: http://localhost/todo-backend/");
header("Access-Control-Allow-Methods: POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'config.php';

// Отримуємо дані з POST-запиту
$data = json_decode(file_get_contents("php://input"), true);

// Перевіряємо, чи є вибрані завдання
if (isset($data['task_ids']) && !empty($data['task_ids'])) {
    // Підготовка запиту для видалення завдань за їх ID
    $placeholders = implode(',', array_fill(0, count($data['task_ids']), '?'));
    $stmt = $pdo->prepare("DELETE FROM tasks WHERE task_id IN ($placeholders)");
    
    // Виконання запиту з переданими ID завдань
    $stmt->execute($data['task_ids']);
    
    // Перевірка на успішність
    if ($stmt->rowCount() > 0) {
        echo json_encode(["status" => "success", "message" => "Завдання успішно видалено"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Не вдалося видалити завдання"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Не були передані ID завдань"]);
}
?>
