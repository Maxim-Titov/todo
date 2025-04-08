<?php
header("Access-Control-Allow-Origin: http://localhost/todo-backend/");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$login = trim($data['login'] ?? '');
$password = trim($data['password'] ?? '');
$username = trim($data['username'] ?? '');

if (!$login || !$password || !$username) {
    echo json_encode(['error' => 'All fields are required!']);
    exit();
}

// Перевірка чи вже існує користувач
$stmt = $pdo->prepare("SELECT * FROM users WHERE login = ?");
$stmt->execute([$login]);
if ($stmt->fetch()) {
    echo json_encode(['error' => 'User already exists']);
    exit();
}

// Хешуємо пароль
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO users (login, password, username) VALUES (?, ?, ?)");
if ($stmt->execute([$login, $hashedPassword, $username])) {
    echo json_encode(['success' => 'User created successfully']);
} else {
    echo json_encode(['error' => 'Error while creating']);
}
?>
