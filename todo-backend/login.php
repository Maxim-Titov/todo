<?php
header("Access-Control-Allow-Origin: http://localhost/todo-backend/");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$login = trim($data['login'] ?? '');
$password = trim($data['password'] ?? '');

if (!$login || !$password) {
    echo json_encode(['error' => 'Login and password are required!']);
    exit();
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE login = ?");
$stmt->execute([$login]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user || !password_verify($password, $user['password'])) {
    echo json_encode(['error' => 'Incorrect login or password']);
    exit();
}

echo json_encode([
    'success' => 'Authorization successful',
    'user' => [
        'user_id' => $user['user_id'],
        'login' => $user['login'],
        'username' => $user['username']
    ]
]);
?>