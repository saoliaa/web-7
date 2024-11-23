package main

// некоторые импорты нужны для проверки
import (
	"fmt"
	"net/http" // пакет для поддержки HTTP протокола
)

func handler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		name = "Guest"
	}
	response := fmt.Sprintf("Hello,%s!", name)

	fmt.Fprintln(w, response)
}

func main() {
	http.HandleFunc("/api/user", corsMiddleware(handler))
	err := http.ListenAndServe(":8082", nil)
	if err != nil {
		fmt.Println("Ошибка запуска сервера:", err)
	}
}

// CORS Middleware
func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")                   // Позволяет всем доменам
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS") // Разрешенные HTTP методы
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")       // Разрешенные заголовки

		// Обработка предзапроса
		if r.Method == http.MethodOptions {
			return
		}

		next(w, r) // Вызов следующего обработчика
	}
}
